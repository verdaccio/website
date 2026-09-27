---
authors: juan_picado
title: Migrating from Verdaccio 6 to Verdaccio 7
description: What actually breaks when you upgrade a Verdaccio 6 registry to 7, in the order you hit it.
tags: [migration, verdaccio]
hide_table_of_contents: true
---

:::danger Work in progress
**This guide is being written while Verdaccio 7 is still in pre-release.** It is published
early so people testing `verdaccio@next-7` can follow along and tell us what we missed.

Expect it to change. Items may be added, corrected or removed as 7.x reaches its final
release, and nothing here should be treated as a finished migration procedure yet. **Do not
run it against a production registry without a backup.** If you hit something that is not
covered below, that is exactly what we want to hear about — see the end of the post.
:::

Verdaccio 7 is mostly a platform major: the registry behaves like the one you already run,
but the runtime underneath moved forward. This post is only about **what breaks**, in
roughly the order you will hit it. For what is new, see the release notes.

<!--truncate-->

## The good news first: your storage is not touched

**There is no data migration.** Verdaccio 7 reads a Verdaccio 6 storage folder as it is. The
database file is still `.verdaccio-db.json`, tokens still live in `.token-db.json`, and each
package still keeps its manifest in a `package.json` inside its own folder.

You still want a backup before upgrading a real registry, but you are not converting
anything.

## Before you start the upgrade

### Node.js 22 is not enough any more

Verdaccio 6 requires **Node.js 22 or newer**. Verdaccio 7 requires **Node.js 24 or newer**.
Upgrade the runtime first — if you run from the Docker image this is already handled for you.

### Your configuration file must be YAML

Verdaccio 6 accepts a `.json` file or a Node.js module as configuration: it loads them with
`require` and prints the `VERDEP004` deprecation warning. **Verdaccio 7 removed that.** Any
extension other than `.yaml` or `.yml` fails at startup with:

```
config file must be a YAML file (.yaml or .yml)
```

Convert the file before upgrading. This is a straightforward one, and it fails loudly.

### A secret that is not 32 characters will stop the server

This is the one that catches long-lived installations, so it deserves the most attention.

The server secret stored in `.verdaccio-db.json` must be **exactly 32 characters**. Registries
created years ago often hold a **64-character** secret instead.

What each line does with that differs, and the difference is the whole problem:

- **Verdaccio 6 hides it from you.** `security.api.migrateToSecureLegacySignature` defaults to
  **`true`**, so a secret of the wrong length is quietly replaced with a freshly generated one
  at startup. The registry comes up and nothing is reported.
- **Verdaccio 7 removed that property**, and a wrong-length secret is a hard startup error:

  ```
  Invalid storage secret key length, must be 32 characters long but is 64
  ```

So a registry that 6.x had been silently patching on every boot simply **does not start**
after the upgrade.

Deal with it *before* you upgrade, while you can still choose the moment, because the fix has
a cost: **regenerating the secret invalidates every token that was issued with the old one**,
and every CI job and developer using one will have to log in again.

To see what you are dealing with on 6.x, set the property to `false` and start the server: it
will now fail instead of rewriting the secret, telling you whether you are affected.

```yaml
security:
  api:
    legacy: true
    migrateToSecureLegacySignature: false # 6.x only, to surface the problem
```

## After it starts

### It listens on IPv6 by default

The Docker image changed its default address from `0.0.0.0` (IPv4) in 6.x to **`[::]`** (IPv6)
in 7.x. On a dual-stack host `[::]` also accepts IPv4 connections, so most setups do not
notice. **On a host without IPv6, nothing can reach the registry.** Set it back explicitly:

```bash
VERDACCIO_ADDRESS=0.0.0.0
```

### Graceful shutdown is no longer opt-in

`VERDACCIO_HANDLE_KILL_SIGNALS` only exists in 6.x, where graceful shutdown had to be turned
on with it. **Verdaccio 7 removed the variable** and always shuts down gracefully. Setting it
does nothing; remove it from your deployment.

### Two endpoints are gone

- **`/-/all`**, the legacy npm search endpoint. Verdaccio 6 still answers it while logging a
  deprecation warning; Verdaccio 7 answers `404`. Use `/-/v1/search`.
- **star and unstar**, removed because npm dropped the client-side feature. If you built
  anything on starred packages, it stops working.

### One feature flag left, two arrived

`searchRemote` no longer exists in 7.x. It was already inert in 6.x — the value was overridden
before anything read it — so removing it from your config changes nothing except one startup
warning.

Two new flags are **7.x only**, both off by default and both experimental:
[`stage`](/docs/staged-publishing) for staged publishing and
[`tfa`](/docs/two-factor-authentication) for two-factor authentication.

## If you start Verdaccio from Node.js code

This is where the upgrade can fail **silently**, so read it even if the rest went smoothly.

### The default export is a different function now

On 6.x, `require('verdaccio').default` is `startVerdaccio`, which takes six positional
arguments and a callback. On 7.x the default export is **`runServer`**, which takes only a
configuration and **ignores every argument after the first**.

That code therefore does not crash on 7.x. It returns a server that is not listening,
configured with the defaults, and reports nothing:

```js
// 6.x — the old callback API, removed in 7.x
const startServer = require('verdaccio').default;
startServer(config, 6000, undefined, '1.0.0', 'verdaccio', (webServer, addrs) => {
  webServer.listen(addrs.port || addrs.path, addrs.host);
});

// 7.x
import { runServer } from 'verdaccio';
const app = await runServer(config);
app.listen(4873);
```

**Import `runServer` by name.** It exists on both lines and means the same thing on both,
which the default export does not.

### Other programmatic changes

- **`startVerdaccio` is gone.** `initServer(config, port, version, pkgName)` is the new entry
  point that also starts listening; `runServer` hands you a server that is not listening yet,
  which is usually what a test harness wants.
- **`runServer` lost its second argument.** On 6.x it accepted `{ listenArg }` to override the
  `listen` entry of the configuration. Pass the port to `listen()` instead.
- **The utility re-exports are gone.** `fileUtils`, `errorUtils`, `cryptoUtils` and `pkgUtils`
  are no longer re-exported from `verdaccio`; import them from
  [`@verdaccio/core`](https://www.npmjs.com/package/@verdaccio/core), which works on both
  lines.
- **`self_path` no longer exists.** The workaround of setting it manually when passing a
  configuration object is not needed, and the property is gone from the configuration type.
  Use `configPath`.

## If you maintain a plugin

Verdaccio 6 and 7 use the same plugin interface **names** — `Auth`, `Storage`,
`StorageHandler`, `ExpressMiddleware` and `ManifestFilter` under `pluginUtils` in
`@verdaccio/core` — so a plugin written for 6.x is not renaming anything. What changes is the
runtime around it.

### Depend on the right dist-tag

This trips people up because the obvious answer is wrong. Only the **`verdaccio` binary** is
tagged after its own line. The `@verdaccio/*` packages and the plugins are versioned
separately:

| Building against | The `verdaccio` binary | `@verdaccio/*` packages and plugins |
| ---------------- | ---------------------- | ----------------------------------- |
| **6.x**          | `latest`               | **`latest`**                        |
| **7.x**          | `next-7`               | **`next-9`**                        |

The `next-7` and `6-next` tags **do** exist on those packages, which is what makes this a
trap: they do not fail, they install prereleases those lines stopped using. `verdaccio@7.0.0-next-7.28`
depends on `@verdaccio/core@9.0.0-next-9.31`, not on anything tagged `next-7`.

### Express 5 changes route syntax

Verdaccio 6 runs **Express 4**; Verdaccio 7 runs **Express 5** with `path-to-regexp` 8. If
your middleware plugin registers routes, review them: the wildcard syntax changed from `*` to
`{*all}`, and `req.params` can come back as an array depending on the route shape.

### `req.body` is already parsed

On 7.x the body parser runs **before** middleware plugins, so `req.body` is populated when
your plugin's handler is called. On 6.x there is no parser at that point and `req.body` is
`undefined`, so plugins that installed their own parser should check they are not now parsing
twice.

### Storage plugins: callbacks became promises

The native storage contract on 7.x is **promise-based**; on 6.x it is callbacks. Existing
callback plugins keep working on 7.x through a compatibility adapter added in
`7.0.0-next-7.28`, so this is a migration path and not an immediate break — but the adapter is
a shim, not the destination. New plugins should implement the promise contract.

Verdaccio 7 also loads **pure ESM plugins**, so a plugin no longer needs a CommonJS entry
point just to be loadable.

### The debug-only publish route is gone

With `_debug` enabled, Verdaccio 6 also registered `PUT /:package/:version/-tag/:tag` for
adding a single version. **That route does not exist in 7.x.** Only test harnesses should have
been using it.

## Tell us what is missing

This guide is written from the differences we could verify between the two lines. If your
upgrade broke on something that is not here, that gap is the useful part — report it in
[GitHub Discussions](https://github.com/verdaccio/verdaccio/discussions), as an issue at
[verdaccio/verdaccio](https://github.com/verdaccio/verdaccio/issues), or on
[Discord](https://discord.gg/7qWJxBf), and it will end up in this post.
