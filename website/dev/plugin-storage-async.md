---
id: plugin-storage-async
title: 'Migrate a storage plugin from callbacks to promises'
description: 'Move a callback and stream based storage plugin to the promise contract that Verdaccio 7 runs natively, method by method.'
---

Verdaccio 7 runs storage plugins on a **promise-based contract**. A plugin written for 6.x
with callbacks still works on 7.x, because Verdaccio detects it and wraps it, but the wrapper
is a compatibility shim and logs this warning on every start:

```
a legacy callback-based storage plugin was detected and wrapped for compatibility;
consider upgrading it to the promise-based storage API
```

This page walks through the migration. The two contracts are described in
[Storage Plugin](plugin-storage.md#api); here is how to get from one to the other.

:::info Only storage plugins change
Authentication, middleware, filter and the other plugin types were never callback based, and
nothing about them changes. Pure ESM plugins are also supported on 7.x for every plugin type,
and that is independent of this migration.
:::

## Before you start {#before-you-start}

- **Keep a callback build for 6.x if you still support it.** 6.x only understands callbacks.
  Publish the promise version for 7.x, ideally from a separate major version of your plugin.
- The promise types come from `pluginUtils` in `@verdaccio/core`, replacing the callback
  types of `@verdaccio/types`.
- You do not declare anything. Verdaccio tells the contracts apart by arity: a `get` that
  takes an argument, or an `add` that takes two, is read as the callback contract. So after
  migrating, `get()` **must take no parameters**.

## The plugin object {#plugin}

Every method on the plugin returns a promise and no longer takes a callback.

| Callback (6.x)                             | Promise (7.x)                                                       |
| ------------------------------------------ | ------------------------------------------------------------------- |
| `add(name, callback)`                      | `add(name): Promise<void>`                                          |
| `remove(name, callback)`                   | `remove(name): Promise<void>`                                       |
| `get(callback)`                            | `get(): Promise<string[]>`                                          |
| `search(onPackage, onEnd, validateName)`   | `search(query): Promise<SearchItem[]>`                              |
| `getSecret(): Promise<string>`             | unchanged                                                           |
| `setSecret(secret): Promise<any>`          | unchanged                                                           |
| `getPackageStorage(name): IPackageStorage` | `getPackageStorage(name): StorageHandler`                           |
| _not in the contract_                      | `init(): Promise<void>`, called once at startup                     |
| token methods                              | `saveToken`, `deleteToken` and `readTokens`, all returning promises |

Callback errors become rejected promises: where you called `callback(err)`, throw or reject.

```diff
- add(name, callback) {
-   this.db.insert(name, (err) => callback(err));
- }
+ async add(name) {
+   await this.db.insert(name);
+ }
```

### Search {#search}

The callback `search` streamed every package through `onPackage(item, done)` and finished
with `onEnd`. The promise version **receives the query** and **returns an array**.

```diff
- search(onPackage, onEnd, validateName) {
-   for (const name of this.names()) {
-     onPackage(this.readManifest(name), () => {});
-   }
-   onEnd();
- }
+ async search(query) {
+   const text = query.text?.toLowerCase();
+   return this.names()
+     .filter((name) => !text || name.toLowerCase().includes(text))
+     .map((name) => ({
+       package: this.readManifest(name),
+       score: { final: 1, detail: { quality: 1, popularity: 1, maintenance: 1 } },
+     }));
+ }
```

Two details that bite:

- **You filter by `query.text` yourself.** The callback contract had no way to receive it. The
  compatibility wrapper filters the collected results by name for you; a native plugin has to.
- **Each item has the shape `{ package, score }`**, with the manifest under `package`. The
  callback contract emitted the manifest itself.

## The package handler {#handler}

`getPackageStorage(name)` returns the object that does the I/O for one package. Its methods
follow the same rule.

| Callback (6.x)                                                         | Promise (7.x)                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------ |
| `readPackage(name, callback)`                                          | `readPackage(name): Promise<Manifest>`                 |
| `createPackage(name, manifest, callback)`                              | `createPackage(name, manifest): Promise<void>`         |
| `savePackage(name, manifest, callback)`                                | `savePackage(name, manifest): Promise<void>`           |
| `deletePackage(fileName, callback)`                                    | `deletePackage(fileName): Promise<void>`               |
| `removePackage(callback)`                                              | `removePackage(name): Promise<void>`                   |
| `updatePackage(name, updateHandler, onWrite, transformPackage, onEnd)` | `updatePackage(name, handleUpdate): Promise<Manifest>` |
| `writeTarball(name): IUploadTarball`                                   | `writeTarball(name, { signal }): Promise<Writable>`    |
| `readTarball(name): IReadTarball`                                      | `readTarball(name, { signal }): Promise<Readable>`     |
| _not in the contract_                                                  | `hasPackage(name): Promise<boolean>`                   |
| _not in the contract_                                                  | `hasTarball(name): Promise<boolean>`                   |

### Existence checks are now explicit {#exists}

The callback contract had no way to ask whether something exists, so Verdaccio probed it:
it called `readPackage` and treated a failure as "not there", and opened `readTarball` and
looked for an `open` or a `404`. The promise contract asks directly. Implement both and
return `false` for a missing item instead of throwing.

```typescript
async hasPackage(name: string): Promise<boolean> {
  return this.db.exists(name);
}

async hasTarball(fileName: string): Promise<boolean> {
  return this.bucket.exists(fileName);
}
```

### updatePackage {#update-package}

This is the method that changes shape the most. The callback version took four functions
and a final callback; the promise version takes **one function** and returns the manifest.

```diff
- updatePackage(name, updateHandler, onWrite, transformPackage, onEnd) {
-   this.lockAndRead(name, (err, manifest) => {
-     if (err) return onEnd(err);
-     updateHandler(manifest, (err) => {
-       if (err) return this.unlock(name, () => onEnd(err));
-       onWrite(name, transformPackage(manifest), (err) => this.unlock(name, () => onEnd(err)));
-     });
-   });
- }
+ async updatePackage(name, handleUpdate) {
+   const manifest = await this.lockAndRead(name);
+   try {
+     return await handleUpdate(manifest);
+   } finally {
+     await this.unlock(name);
+   }
+ }
```

What your plugin owns is the **lock**: read the manifest under a lock, call `handleUpdate`
with it, release the lock whatever happens, and return what the handler returned. Verdaccio
persists the updated manifest itself, so there is no `onWrite` and no transform step to run.

### Tarballs {#tarballs}

The callback contract returned special stream classes, `UploadTarball` and `ReadTarball`,
and finished an upload with `.done()`. The promise contract uses **plain Node.js streams**
and an `AbortSignal`.

| Callback (6.x)                     | Promise (7.x)                                         |
| ---------------------------------- | ----------------------------------------------------- |
| `UploadTarball`, ended by `done()` | a `Writable`; Verdaccio ends it and waits for `close` |
| `ReadTarball`, `abort()`           | a `Readable`; stop when `signal` aborts               |
| `emit('success')` after `done()`   | `emit('close')` once the bytes are durable            |

The rules for events, `open`, `close` and a single `error`, are the same ones the callback
plugins had to follow, and they are spelled out in
[how the store drives your plugin](plugin-storage.md#lifecycle). The new part is the signal:
when the client disconnects, abort the transfer and consume the rejection of any promise your
backend still has in flight.

```typescript
async writeTarball(fileName: string, { signal }: { signal: AbortSignal }): Promise<Writable> {
  const stream = this.bucket.createWriteStream(fileName);
  signal.addEventListener('abort', () => stream.destroy(new Error('upload aborted')), {
    once: true,
  });
  return stream;
}
```

## Check it {#check}

1. Start Verdaccio 7 with the plugin. The "legacy callback-based storage plugin" warning must
   be gone.
2. Publish a package, install it, and run `npm search` against the registry: search is the
   method most likely to have been wrong, because it is the one whose shape changed.
3. Unpublish it and make sure the tarball is removed from your backend.
4. Publish two versions of the same package at once. Whatever lock your plugin keeps in
   `updatePackage` is what protects the manifest.

## What is not covered {#not-covered}

- The `getSecret` and `setSecret` methods were already promise based and are untouched.
- Plugins for Verdaccio 6.x keep using callbacks. A single package cannot satisfy both
  contracts, because Verdaccio chooses by the arity of `get` and `add`.
