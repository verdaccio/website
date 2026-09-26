---
id: plugin-storage
title: 'Storage Plugin'
---

## What's a Storage Plugin? {#whats-a-storage-plugin}

Verdaccio by default uses a file system storage plugin [local-storage](https://github.com/verdaccio/verdaccio/tree/master/packages/plugins/local-storage). The default storage can be easily replaced, either using a community plugin or creating one by your own.

### API {#api}

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Storage is the one plugin type whose contract changed: it moved from callbacks to
promises. Which one you implement depends on the Verdaccio you target.

| Verdaccio | Native contract | A callback plugin                                                   |
| --------- | --------------- | ------------------------------------------------------------------- |
| **6.x**   | callbacks       | works — it is the native one                                        |
| **7.x**   | promises        | works, wrapped by a compatibility adapter (since `7.0.0-next-7.28`) |
| **9.x**   | promises        | **not supported**                                                   |

New plugins should implement the promise contract. It is the only one 9.x accepts, and 7.x
runs it natively rather than through the adapter.

<Tabs groupId="storage-contract">
<TabItem value="promise" label="Promises (Verdaccio 7 and newer)" default>

Two interfaces, both from `pluginUtils` in `@verdaccio/core`. `Storage` handles the local
database of private packages:

```typescript
import { pluginUtils } from '@verdaccio/core';

interface Storage<PluginConfig> extends Plugin<PluginConfig> {
  add(packageName: string): Promise<void>;
  remove(packageName: string): Promise<void>;
  get(): Promise<string[]>;
  init(): Promise<void>;
  getSecret(): Promise<string>;
  setSecret(secret: string): Promise<any>;
  getPackageStorage(packageName: string): StorageHandler;
  search(query: searchUtils.SearchQuery): Promise<searchUtils.SearchItem[]>;
  saveToken(token: Token): Promise<any>;
  deleteToken(user: string, tokenKey: string): Promise<any>;
  readTokens(filter: TokenFilter): Promise<Token[]>;
}
```

`StorageHandler` is returned by `getPackageStorage` and does the I/O for one package's
manifest and tarballs:

```typescript
interface StorageHandler {
  logger: Logger;
  createPackage(packageName: string, manifest: Manifest): Promise<void>;
  readPackage(packageName: string): Promise<Manifest>;
  savePackage(packageName: string, manifest: Manifest): Promise<void>;
  deletePackage(fileName: string): Promise<void>;
  removePackage(packageName: string): Promise<void>;
  updatePackage(
    packageName: string,
    handleUpdate: (manifest: Manifest) => Promise<Manifest>
  ): Promise<Manifest>;
  readTarball(fileName: string, { signal }: { signal: AbortSignal }): Promise<Readable>;
  writeTarball(fileName: string, { signal }: { signal: AbortSignal }): Promise<Writable>;
  hasTarball(fileName: string): Promise<boolean>;
  hasPackage(packageName: string): Promise<boolean>;
}
```

Note that `readTarball` and `writeTarball` return real Node streams and receive an
`AbortSignal`: a plugin is expected to stop the transfer when the client disconnects.

</TabItem>
<TabItem value="callback" label="Callbacks (Verdaccio 6)">

:::caution
This is the legacy contract. Verdaccio 9 does not support it, and 7.x only runs it through
a compatibility adapter. Do not start a new plugin with it.
:::

```typescript
interface IPluginStorage<T> extends IPlugin<T>, ITokenActions {
  logger: Logger;
  config: T & Config;
  add(name: string, callback: Callback): void;
  remove(name: string, callback: Callback): void;
  get(callback: Callback): void;
  getSecret(): Promise<string>;
  setSecret(secret: string): Promise<any>;
  getPackageStorage(packageInfo: string): IPackageStorage;
  search(
    onPackage: onSearchPackage,
    onEnd: onEndSearchPackage,
    validateName: onValidatePackage
  ): void;
}
```

```typescript
interface IPackageStorage {
  logger: Logger;
  writeTarball(pkgName: string): IUploadTarball;
  readTarball(pkgName: string): IReadTarball;
  readPackage(fileName: string, callback: ReadPackageCallback): void;
  createPackage(pkgName: string, value: Package, cb: CallbackAction): void;
  deletePackage(fileName: string, callback: CallbackAction): void;
  removePackage(callback: CallbackAction): void;
  updatePackage(
    pkgFileName: string,
    updateHandler: StorageUpdateCallback,
    onWrite: StorageWriteCallback,
    transformPackage: PackageTransformer,
    onEnd: CallbackAction
  ): void;
  savePackage(fileName: string, json: Package, callback: CallbackAction): void;
}
```

</TabItem>
</Tabs>

### How Verdaccio tells them apart {#contract-detection}

7.x decides by arity, not by configuration: a `get` that takes an argument and an `add`
that takes two are read as the callback contract, and the plugin is wrapped. There is
nothing to declare — but it also means a promise-based `get()` must take no parameters.

## Generate a storage plugin {#generate-an-middleware-plugin}

Run `yo verdaccio-plugin` and pick `storage` when asked for the plugin type; the
[plugin generator page](plugin-generator.md) covers installation and the prompts. The
scaffold implements the promise contract against the current `@verdaccio/core`.
