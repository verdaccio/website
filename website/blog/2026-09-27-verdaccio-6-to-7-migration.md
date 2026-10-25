---
authors: juan_picado
title: Migrating from Verdaccio 6 to Verdaccio 7
description: 'Prepare a Verdaccio 6 registry for 7: runtime, configuration, authentication, storage, plugins, validation and rollback.'
tags: [migration, verdaccio]
hide_table_of_contents: true
---

Moving from Verdaccio 6 to 7 keeps the familiar registry workflow, but changes the runtime,
configuration and plugin interfaces. This guide covers the checks to make before switching,
the changes that need action, and how to validate the result. For feature highlights, see
[what's new in Verdaccio 7](/blog/2026/10/25/verdaccio-7-release).

<!--truncate-->

## Plan the upgrade

1. Record your exact Verdaccio version, Node.js version, plugin versions and container tag.
2. Back up the YAML configuration, package storage, registry database, token database and
   authentication data. Stop writes while taking a filesystem backup, or use a consistent
   snapshot supported by your storage backend.
3. Restore the backup into a test environment. Point its configuration at the copied storage
   and authentication files, and use a separate address or port.
4. Run the checks below against that copy before scheduling the production upgrade.

Keep the previous binary or image and the matching backup available for rollback. Do not run
6.x and 7.x concurrently against the same storage directory.

The [Docker examples for Verdaccio 7](https://github.com/verdaccio/verdaccio/tree/master/docker-examples/v7) are a quick way to build that test environment:
the [local storage volume example](https://github.com/verdaccio/verdaccio/tree/master/docker-examples/v7/docker-local-storage-volume) mounts a configuration
and a storage folder from the host, so you can point it at the copied backup and start the
7.0.0 image without installing anything else.

## Storage and token compatibility

The bundled filesystem storage keeps package manifests and tarballs, `.verdaccio-db.json`
for the package list and server secret, and `.token-db.json` for API tokens. A bulk package
conversion is not part of the normal upgrade.

Verdaccio 6 and 7 share the on-disk storage layout and the token format. A 7.0.0 registry
reads the storage written by 6.x as it is: packages published on one line install from the
other, and tokens issued by 6.x keep working as long as the server secret and the
authentication settings are preserved. Rotating the secret invalidates them.

That covers the bundled filesystem storage and the htpasswd plugin. Verify your own storage
plugin and token flows as part of the upgrade, and use the backup as your rollback boundary
rather than assuming every write by 7.x can safely be consumed by 6.x.

## Before you start the upgrade

### Node.js 22 is not enough any more

Current Verdaccio 6 releases (6.9.0 and later) require **Node.js 22 or newer**. Verdaccio 7 requires **Node.js 24 or newer**.
Upgrade the runtime first — if you run from the Docker image this is already handled for you.

### Your configuration file must be YAML

Verdaccio 6 accepts a `.json` file or a Node.js module as configuration: it loads them with
`require` and prints the `VERDEP004` deprecation warning. **Verdaccio 7 removed that.** Any
extension other than `.yaml` or `.yml` fails at startup with:

```
config file must be a YAML file (.yaml or .yml)
```

Convert the file before upgrading. This is a straightforward one, and it fails loudly.

### A secret that is not 32 characters stops the server, and the escape hatch is gone

The server secret stored in `.verdaccio-db.json` must be **exactly 32 characters**. Registries
created years ago sometimes hold a **64-character** secret instead.

On a default configuration **both versions refuse to start** with that, so if this affects you
there is a good chance you already know:

```
Invalid storage secret key length, must be 32 characters long but is 64.
```

The difference is the way out. Verdaccio 6 has an opt-in that rewrites the secret for you:

```yaml
security:
  api:
    legacy: true
    migrateToSecureLegacySignature: true # 6.x only
```

With that set, 6.x starts and replaces the 64-character secret with a fresh 32-character one —
verified: the file goes from 64 to 32 characters and the registry comes up.

**Verdaccio 7 removed the property.** Given the same configuration and the same 64-character
secret, 7.x refuses to start and leaves the secret alone. The deprecated AES helpers that could
read data encrypted with an over-long key were deleted too, so there is no fallback path left.

If you are relying on `migrateToSecureLegacySignature`, generate a 32-character secret **before
upgrading**, while you still choose the moment: replacing it **invalidates every token issued
with the old one**, so every CI job and developer has to log in again.

## After it starts

### Docker still defaults to IPv4

The published 7.x Dockerfile sets **`VERDACCIO_ADDRESS=0.0.0.0`**, as the 6.x image does.
There is no required IPv6 migration. Keep any explicit listen address your deployment needs,
and check port mappings and reverse-proxy connectivity in the test environment. The
[reverse proxy examples](https://github.com/verdaccio/verdaccio/tree/master/docker-examples/v7/reverse_proxy) show working nginx, Apache and HTTPS Portal
configurations for the 7 image, at the root path and under a relative path.

### Graceful shutdown is no longer opt-in

`VERDACCIO_HANDLE_KILL_SIGNALS` only exists in 6.x, where graceful shutdown had to be turned
on with it. **Verdaccio 7 removed the variable**; its normal CLI startup registers shutdown handlers.
Remove the obsolete variable from your deployment. If you embed the server with `runServer`,
manage the listener and shutdown lifecycle in your application.

### Package API requests require Bearer tokens

This is the one most likely to break a working setup, because it does not look like an
upgrade problem — it looks like wrong credentials.

Verdaccio 6 accepts an `Authorization: Basic <base64 user:password>` header for API requests.
**Verdaccio 7 requires Bearer tokens for package API requests**, and `WWW-Authenticate` advertises
only `Bearer`. Verified against both: the same Basic header that authenticates on 6.x gets

```json
{ "error": "bad username/password, access denied" }
```

on 7.x, and a write that needs authentication answers `401` — exactly as if no credentials had
been sent.

What sends Basic auth in practice:

- an `.npmrc` using **`_auth`** (or `_password` plus `username`) instead of `_authToken`
- `curl`, scripts and internal tooling that build the header by hand
- anything that never logged in and just encodes `user:password`

Use a token for package requests. With the registry running, verify your current login:

```bash
npm whoami --registry http://localhost:4873/
```

If a new login is needed:

```bash
npm login --registry http://localhost:4873/ --auth-type=legacy
```

The client stores a registry-scoped `_authToken` in your user `.npmrc`. Replace the local URL
with your registry URL. An existing token may continue to work when its secret, expiry and
authentication configuration remain valid; test it before rotating credentials.

**Login is an exception.** Verdaccio 7 accepts Basic credentials on the
`GET` and `PUT /-/user/org.couchdb.user:<name>` login routes so npm, pnpm and Yarn
can obtain a token. This is controlled by [`security.api.basicLogin`](/docs/configuration#basic-login),
which defaults to `true`. It does not re-enable Basic authentication for package requests. This correction
([#6354](https://github.com/verdaccio/verdaccio/pull/6354)) is part of `7.0.0`; it first shipped in `7.0.0-next-7.31`.
If an older 7.x preview rejects CLI logins with `401`, update before changing your credentials.
Setting `basicLogin: false` disables that login path; use the supported web login flow instead.

As part of the same change, **Web UI session tokens are now accepted as Bearer tokens for
package API requests**, so the same package access rules apply to browser and client traffic.

### Two endpoints are gone

- **`/-/all`**, the legacy npm search endpoint. Verdaccio 6 still answers it while logging a
  deprecation warning; Verdaccio 7 answers `404`. Use `/-/v1/search`.
- **star and unstar**, removed because npm dropped the client-side feature. If you built
  anything on starred packages, it stops working.

### One feature flag left, two arrived

`searchRemote` no longer exists in 7.x. It was already inert in 6.x — the value was overridden
before anything read it — so removing it from your config changes nothing except one startup
warning.

Two new flags are available in **7.x and later**, both off by default and both experimental:
[`stage`](/docs/staged-publishing) for staged publishing and
[`tfa`](/docs/two-factor-authentication) for two-factor authentication.

## If you start Verdaccio from Node.js code

This is where the upgrade can fail **silently**, so read it even if the rest went smoothly.

### The default export is a different function now

On 6.x, `require('verdaccio').default` is `startVerdaccio`, which takes six positional
arguments and a callback. On 7.x the default export is **`runServer`**, which takes only a
configuration and **ignores every argument after the first**.

Calling the old callback signature on 7.x no longer invokes your callback or starts the
listener. Await the returned value and call `listen()` explicitly:

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

**Import `runServer` by name and await it.** It is already asynchronous in current 6.x;
async itself is not a new 7.x breaking change. The default export and supported arguments
are what change. Review code that depends on the concrete returned server type as well as
code that starts the listener.

### Other programmatic changes

- **`startVerdaccio` is gone.** `initServer(config, port, version, pkgName)` is the new entry
  point that also starts listening; `runServer` hands you a server that is not listening yet,
  which is usually what a test harness wants.
- **`runServer` lost its second argument.** On 6.x it accepted `{ listenArg }` to override the
  `listen` entry of the configuration. Set listener options explicitly in the new startup path;
  for a plain HTTP listener, pass the port to `listen()` and review HTTPS setup separately.
- **The core utility re-exports are gone.** `fileUtils`, `errorUtils`, `cryptoUtils` and `pkgUtils`
  are no longer re-exported from `verdaccio`; import them from
  [`@verdaccio/core`](https://www.npmjs.com/package/@verdaccio/core), which works on both
  lines. `Config`, `ConfigBuilder`, `getDefaultConfig` and `parseConfigFile` are still
  exported by the current 7.x binary.
- **`self_path` no longer exists.** The workaround of setting it manually when passing a
  configuration object is not needed, and the property is gone from the configuration type.
  Use `configPath`.
- **The deprecated AES helpers are gone.** `aesEncryptDeprecated`, `aesDecryptDeprecated` and
  `generateRandomSecretKeyDeprecated` are no longer exported from `@verdaccio/signature`, and
  the `legacy-signature` module was deleted. Encryption is `aes-256-ctr` through
  `createCipheriv` / `createDecipheriv` only.
- **The logger packages were merged.** `@verdaccio/logger-commons` and
  `@verdaccio/logger-prettify` are now a single `@verdaccio/logger`. Update imports if you
  depended on either directly.
- **`isNodeVersionGreaterThan21()` was removed** from `@verdaccio/config`.
- **The `Config` constructor no longer takes `configOverrideOptions`**, which is what carried
  `forceMigrateToSecureLegacySignature`.
- **Use public package entry points.** Both current 6.x and 7.x publish ESM and CJS builds;
  dual output reached 6.x in 6.9.0. Paths and `exports` differ by package, so replace deep
  `build/` imports with supported package exports rather than assuming a common file layout.

## If you maintain a plugin

Verdaccio 6 and 7 use the same plugin interface **names** — `Auth`, `Storage`,
`StorageHandler`, `ExpressMiddleware` and `ManifestFilter` under `pluginUtils` in
`@verdaccio/core` — so a plugin written for 6.x is not renaming anything. What changes is the
runtime around it. To try a plugin against the 7 image without touching a real registry, the
[plugin examples](https://github.com/verdaccio/verdaccio/tree/master/docker-examples/v7/plugins) build an image with a plugin installed from a registry or
copied from a local folder.

### Depend on the right dist-tag

This trips people up because the obvious answer is wrong. Only the **`verdaccio` binary** is
tagged after its own line. The `@verdaccio/*` packages and the plugins are versioned
separately:

| Building against | The `verdaccio` binary | `@verdaccio/*` packages and plugins |
| ---------------- | ---------------------- | ----------------------------------- |
| **6.x**          | `latest-6`             | **`latest`**                        |
| **7.x**          | `latest`               | **`next-9`**                        |

The `next-7` and `6-next` tags **do** exist on those packages, which is what makes this a
trap: they do not fail, they install prereleases those lines stopped using. `verdaccio@7.0.0`
depends on the `next-9` modules (`@verdaccio/core@9.0.0-next-9.40` at the time of writing),
not on anything tagged `next-7`. On 6.x, `latest` of the `@verdaccio/*` packages is the 8.x
module line that binary uses.

### Express 5 changes route syntax

Verdaccio 6 runs **Express 4**; Verdaccio 7 runs **Express 5** with `path-to-regexp` 8. If
your middleware plugin registers routes, review them: wildcards must be named. For example, use `/*splat` to match non-root paths, or `/{*splat}`
to include `/`. Wildcard parameter values are arrays. Review `sendFile` use and the
[Express 5 migration guide](https://expressjs.com/en/guide/migrating-5.html).

### `req.body` is already parsed

On 7.x the body parser runs **before** middleware plugins, so `req.body` is populated when
your plugin's handler is called. Since 6.10.4 the same is true on 6.x; on earlier 6.x releases
there is no parser at that point and `req.body` is `undefined`. Plugins that installed their
own parser should check they are not now parsing twice.

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

## Validate the upgrade and rollback plan

On the isolated copy, check the paths your team actually uses:

- Start the registry with the copied configuration and check the startup logs.
- Log in and run `whoami` with each package manager used by developers or CI.
- Install an existing private package using an existing token, then publish and install a
  disposable test package.
- Check anonymous and authenticated access rules, scoped packages, public-package proxying
  and search through any configured uplink subpath.
- Check your storage and auth plugins, Web UI, reverse proxy, notifications and shutdown.
- Test restoring the backup with the previous version before the production cutover.

For Kubernetes deployments, the [Helm example](https://github.com/verdaccio/verdaccio/tree/master/docker-examples/v7/kubernetes/helm) deploys the 7 image
with the official chart and is a good base for the test namespace.

If you roll back after accepting production writes on 7.x, account for those new packages and
metadata changes before restoring the older snapshot. A rollback can otherwise discard them.

## Verification references

The 25 October update compares the local 6.x and 7.x startup code with the published
[`7.0.0-next-7.31` source](https://github.com/verdaccio/verdaccio/tree/v7.0.0-next-7.31),
the last prerelease before `7.0.0`, and the distributed config, auth and local-storage modules it uses. The
[7.x Dockerfile](https://github.com/verdaccio/verdaccio/blob/v7.0.0-next-7.31/Dockerfile)
confirms the IPv4 default. The [6.9.0 release notes](https://github.com/verdaccio/verdaccio/releases/tag/v6.9.0)
document the Node.js 22 requirement and dual ESM/CJS backport.

The storage and token compatibility was exercised on earlier 6.x and 7.x prereleases sharing
one storage directory; the format did not change since. Follow the validation checklist with
your own configuration and plugins.

Report missing migration steps in [GitHub Discussions](https://github.com/verdaccio/verdaccio/discussions)
or [GitHub Issues](https://github.com/verdaccio/verdaccio/issues), including the exact versions,
relevant configuration and the failing operation.
