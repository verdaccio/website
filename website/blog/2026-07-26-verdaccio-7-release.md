---
authors: juan_picado
title: Verdaccio 7 release notes
description: Verdaccio 7 is a new major line focused on a cleaner runtime, better distribution, package filtering, notifications, and refreshed tooling.
tags: [release, verdaccio]
hide_table_of_contents: true
---

**Verdaccio 7 is the next major line of Verdaccio.** This release keeps the familiar private registry experience, while updating the platform underneath so Verdaccio is easier to run, easier to package, and easier to extend.

For most users, Verdaccio 7 should feel like Verdaccio: a lightweight private npm-compatible registry that works with npm, pnpm, and Yarn. The important changes are in the places that matter over time: **package filtering**, **notifications**, **Web UI polish**, **Docker examples**, **pure ESM plugin support**, **async storage plugins**, **the proxy layer**, and **the way Verdaccio itself is distributed**.

<!--truncate-->

## Highlights for users

### Package filtering is built in

Verdaccio 7 includes the package filter plugin work, making it possible to **enforce package filtering rules as part of the registry flow**.

This is useful for teams that need to block, quarantine, allow, or replace packages before they reach developers. The filtering is applied where it matters: metadata reads, tarball downloads, uplink syncs, and local package listings.

This work is also available in Verdaccio 6.x through a backport.

### Staged publishing and two-factor authentication

Verdaccio 7 adds **staged publishing** (`npm stage`) and **TOTP two-factor authentication**, each behind a feature flag that defaults to `false`, so nothing changes until you turn them on. Landed in [#6176](https://github.com/verdaccio/verdaccio/pull/6176) by [@jotadeveloper](https://github.com/jotadeveloper).

### Publish and unpublish notifications

Notifications can now cover **both publish and unpublish events**. Notification templates can include information such as the package being affected and whether the event is a publish or unpublish.

For teams that wire Verdaccio into chat, audit, release, or internal automation systems, this makes registry events easier to track.

This work is also available in Verdaccio 6.x through a backport.

### Web UI improvements

Verdaccio 7 includes several Web UI improvements:

- **Dark mode support**, a refreshed theme foundation, the move from Rematch to React context and SWR, refreshed login/signup/change-password screens, and the new contributors/support content in the info dialog landed in [#5563](https://github.com/verdaccio/verdaccio/pull/5563) by [@juanpicado](https://github.com/juanpicado).
- Package lists can be sorted by update time through [#5659](https://github.com/verdaccio/verdaccio/pull/5659) by [@mbtools](https://github.com/mbtools).
- **Web UI search** works better with scoped packages and path-based queries, empty search results are clearer, and package detail tabs behave better across desktop and mobile layouts thanks to [#5647](https://github.com/verdaccio/verdaccio/pull/5647) by [@juanpicado](https://github.com/juanpicado).
- The Web UI can auto-detect the search response shape, so it no longer depends on the old `searchRemote` flag. That landed in [#5801](https://github.com/verdaccio/verdaccio/pull/5801) by [@juanpicado](https://github.com/juanpicado).
- The JSON viewer received fixes in [#5651](https://github.com/verdaccio/verdaccio/pull/5651) by [@mbtools](https://github.com/mbtools).

There is also a new `web.assetFolder` option for serving custom assets under `/-/assets/`, which is useful for Docker and volume-based deployments. That landed in [#5653](https://github.com/verdaccio/verdaccio/pull/5653) by [@mbtools](https://github.com/mbtools).

The Web UI is also moving through the shared **`@verdaccio/ui-theme` package**, now used by both Verdaccio 6.x and 7.x. That gives both release lines a common UI foundation. Compatible UI fixes and improvements can continue landing there regularly without waiting for another major Verdaccio release.

### Search that works with legacy storage plugins

`/-/v1/search` now filters by the text searched for even when the storage plugin still uses the callback API. Before this fix the compatibility adapter dropped the query, so the endpoint answered with the whole catalogue, and a plugin following the documented contract could make it fail with a 500. Plugins on the promise-based API were never affected.

### More control over the package filter

The package filter gained glob patterns for allow and block rules ([#5872](https://github.com/verdaccio/verdaccio/pull/5872) by [@koliveira15](https://github.com/koliveira15)) and an `excludeDeprecated` option that removes deprecated versions from the manifest ([#6028](https://github.com/verdaccio/verdaccio/pull/6028) by [@davidus27](https://github.com/davidus27)).

### Safer npm search endpoint

The npm `/-/v1/search` endpoint was improved with **rate limiting**, **bounded pagination**, and **batched package access checks**. This avoids scanning the full catalog for every request and makes anonymous search requests less useful as an amplification vector.

The response metadata was also adjusted to be more compatible with npm search clients, including npm 11 on Node.js 24.

This work is also available in Verdaccio 6.x through [#6005](https://github.com/verdaccio/verdaccio/pull/6005).

### Sturdier access rules and downloads

- Package access, publish and unpublish rules now **match case-insensitively**, so a rule applies to every casing of a package name ([#6091](https://github.com/verdaccio/verdaccio/pull/6091)).
- `publish.check_owners` is enforced ([#6219](https://github.com/verdaccio/verdaccio/pull/6219) by [@mbtools](https://github.com/mbtools)).
- Tarball downloads are more reliable: the right uplink is chosen by URL, failed downloads are cleaned up, clients no longer hang and `content-length` is correct ([#6194](https://github.com/verdaccio/verdaccio/pull/6194)).
- Verdaccio **no longer fetches client-controlled `dist.tarball` URLs** that do not belong to an uplink ([#6225](https://github.com/verdaccio/verdaccio/pull/6225)).
- The uplink cache is refreshed when an uplink answers `304` ([#6276](https://github.com/verdaccio/verdaccio/pull/6276)), and uplink tarball errors become Verdaccio errors instead of leaking raw `got` errors ([#6022](https://github.com/verdaccio/verdaccio/pull/6022)).
- Search fixes from [@dianmorales](https://github.com/dianmorales): ISO timestamps, version validation before merging results, uplink errors preserved, and `400` for a missing search text.

### Better behavior behind proxies

The Web UI login flow **no longer sends a Basic auth challenge for login failures**. This avoids browser or reverse-proxy behavior where a failed Web UI login can trigger a native browser authentication popup instead of showing the error in the UI.

This fix is also available in Verdaccio 6.x through a backport.

### New server options

- `server.cors` takes the standard `CorsOptions` and forwards them to the CORS middleware ([#6255](https://github.com/verdaccio/verdaccio/pull/6255)).
- `server.hidePingLogs` hides successful ping logs ([#6192](https://github.com/verdaccio/verdaccio/pull/6192)).
- `server.legacyAuthCache` caches successful legacy AES token validation ([#6133](https://github.com/verdaccio/verdaccio/pull/6133)).
- `ConfigBuilder` has methods for web, listen, https, publish, flags, notify, middlewares, filters and more ([#5805](https://github.com/verdaccio/verdaccio/pull/5805)).

### An experimental admin CLI

A new `@verdaccio/admin-cli` package ships an experimental `verdaccio-admin` binary with a `storage` command group. The `verdaccio` CLI is unchanged ([#6231](https://github.com/verdaccio/verdaccio/pull/6231)).

### Updated Docker examples

The Docker examples for Verdaccio 7 were refreshed, including local storage, reverse proxy, plugin examples, and Kubernetes Helm examples.

If you deploy Verdaccio through containers, the examples should be a better starting point for modern setups.

### Pure ESM plugins

Verdaccio 7 can load **pure ESM plugins**. That matters for plugin authors and teams maintaining internal Verdaccio plugins, because new plugins no longer need to publish a CommonJS wrapper just to be loaded by Verdaccio.

CommonJS plugins remain part of the compatibility story, including legacy callback-based storage plugins, but Verdaccio 7 moves the plugin loading path forward with async loading and CJS/ESM interop.

### Async storage plugins with backward compatibility

Storage plugins can now use the **promise-based async storage API**. This is an important step for plugin authors because storage backends usually talk to databases, object storage, or remote services where async code is the natural model.

Verdaccio 7 keeps compatibility with existing callback/stream-based storage plugins through a thin wrapper, so current integrations should keep working while plugin authors migrate. The implementation landed in [#5933](https://github.com/verdaccio/verdaccio/pull/5933). Dedicated migration documentation is still pending.

## What changes compared with 6.x?

Verdaccio 7 is mostly a platform major. The user-facing registry behavior remains familiar, but the runtime and distribution model move forward:

- **Verdaccio 7 runs on Node.js 24.**
- **Verdaccio 7 uses Express 5 internally**, so middleware plugins may need route wildcard and `sendFile` adjustments.
- The proxy layer moved to `@verdaccio/proxy`, built on `got`.
- The 7.x release branch moved to pnpm.
- Verdaccio packages are distributed as reusable `@verdaccio/*` packages.
- **Pure ESM plugins are supported.**
- **Storage plugins can use the async promise-based API**, with backward compatibility for existing callback/stream-based storage plugins.
- Logger packages were consolidated into `@verdaccio/logger`.
- **Deprecated registry features were removed**, including star/unstar support.
- The deprecated npm search **`/-/all` endpoint was removed**; use `/-/v1/search`.

Until npm `latest` moves, Verdaccio 6.x remains the stable line (currently `6.10.5`) and keeps receiving fixes. Some improvements listed in this post have already been backported to 6.x. That means they are part of Verdaccio 7, but not exclusive to Verdaccio 7.

## Upgrading from 6.x

Verdaccio 7 is a major, so a few things need reviewing before you upgrade: the Node.js
requirement, YAML-only configuration, the server secret, incoming Basic authentication,
the removed endpoints, and the changes that affect the programmatic API and plugins.

**Those are collected, with the exact errors you get and what to do about each, in the
[migration guide from Verdaccio 6 to 7](/blog/2026/09/27/verdaccio-6-to-7-migration).**
The short version:

- Your **storage is not touched** — no data migration, and a rollback to 6.x keeps working.
- Tokens issued by 6.x keep authenticating, but an `.npmrc` using **`_auth`** instead of
  `_authToken` stops working, because Basic authentication is no longer accepted.
- A server secret that is not exactly 32 characters prevents startup, and the 6.x option
  that rewrote it for you is gone.

## Backported to 6.x

The following work is included in Verdaccio 7 and has also landed in Verdaccio 6.x:

- **Package filter plugin**: [#5548](https://github.com/verdaccio/verdaccio/pull/5548), backported via [#5786](https://github.com/verdaccio/verdaccio/pull/5786), included since `verdaccio@6.4.0`
- **Web UI login 401 handling without a Basic auth challenge**: [#5819](https://github.com/verdaccio/verdaccio/pull/5819), backported via [#5821](https://github.com/verdaccio/verdaccio/pull/5821), included since `verdaccio@6.5.2`
- **Publish/unpublish notification hooks**: [#5920](https://github.com/verdaccio/verdaccio/pull/5920), backported via [#6020](https://github.com/verdaccio/verdaccio/pull/6020), included since `verdaccio@6.8.0`
- **npm `/-/v1/search` endpoint hardening**: backported via [#6005](https://github.com/verdaccio/verdaccio/pull/6005), included since `verdaccio@6.8.0`
- **Dual ESM/CJS package output**: [#5643](https://github.com/verdaccio/verdaccio/pull/5643), backported to the 6.x branch via [#6050](https://github.com/verdaccio/verdaccio/pull/6050), included since `verdaccio@6.9.0`, which also requires Node.js 22 or higher
- **External e2e CLI workflow**: [#5678](https://github.com/verdaccio/verdaccio/pull/5678) and [#5679](https://github.com/verdaccio/verdaccio/pull/5679), backported via [#5675](https://github.com/verdaccio/verdaccio/pull/5675). This is a branch workflow change; the first 6.x npm release after it was `verdaccio@6.4.0`.
- **Search validation, token store, package name validation and htpasswd fixes**, included since `verdaccio@6.10.5`: [#6306](https://github.com/verdaccio/verdaccio/pull/6306), [#6307](https://github.com/verdaccio/verdaccio/pull/6307), [#6309](https://github.com/verdaccio/verdaccio/pull/6309), [#6314](https://github.com/verdaccio/verdaccio/pull/6314) and [#6317](https://github.com/verdaccio/verdaccio/pull/6317)
- **Shared `@verdaccio/ui-theme` updates** for compatible Web UI fixes and improvements across 6.x and 7.x, including the UI state-management refresh ([#5563](https://github.com/verdaccio/verdaccio/pull/5563)), search UI fixes ([#5647](https://github.com/verdaccio/verdaccio/pull/5647)), JSON viewer fixes ([#5651](https://github.com/verdaccio/verdaccio/pull/5651)), and search response auto-detection ([#5801](https://github.com/verdaccio/verdaccio/pull/5801)). Verdaccio 6.x receives these through `@verdaccio/ui-theme` update PRs such as [#5794](https://github.com/verdaccio/verdaccio/pull/5794) (`verdaccio@6.5.0`, `@verdaccio/ui-theme@9.0.0-next-9.10`), [#5822](https://github.com/verdaccio/verdaccio/pull/5822) (`verdaccio@6.5.2`, `@verdaccio/ui-theme@9.0.0-next-9.14`), [#5961](https://github.com/verdaccio/verdaccio/pull/5961) (`verdaccio@6.7.3`, `@verdaccio/ui-theme@9.0.0-next-9.20`), and [#6003](https://github.com/verdaccio/verdaccio/pull/6003) (`verdaccio@6.8.0`, `@verdaccio/ui-theme@9.0.0-next-9.21`).

## For plugin authors and distributions

Verdaccio 7 is designed to make reuse easier. **Downstream distributions can reuse the server and CLI composition** instead of forking large parts of Verdaccio.

The relevant exports include:

- `@verdaccio/server`: `defineAPI(config, storage)`
- `@verdaccio/cli`: `runCli`, `configureCli`, and command classes

Verdaccio 7 also supports the **async promise-based storage API** and keeps a thin storage wrapper for callback/stream-based legacy storage plugins. Existing integrations have a clearer path forward while the core packages continue to move into the shared `@verdaccio/*` model.

Verdaccio 7 also supports **pure ESM plugins**, so plugin packages can follow modern Node.js packaging without requiring a CommonJS compatibility entry point just for Verdaccio.

Some plugins were relocated from the monorepo into their own repositories:

- `verdaccio-active-directory`
- `verdaccio-aws-s3-storage`, now at [verdaccio/verdaccio-aws-s3-storage](https://github.com/verdaccio/verdaccio-aws-s3-storage)
- `verdaccio-google-cloud`, now at [verdaccio/verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud)

## Try Verdaccio 7

Verdaccio 7 has an explicit rollout. It is published under the `7` tag first, and npm `latest` moves a few days later, once the release has had time to settle. Docker follows the same rule: images are published with explicit version tags such as `7` or an exact version, and there is no Docker `latest` for this line during the initial rollout. Helm users should pin the image tag explicitly.

Install it with your package manager of choice:

```bash npm2yarn
npm install -g verdaccio@7
```

Or run it with Docker:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio:7
```

Use a copy of your storage and configuration when testing a major release. Verdaccio 7 requires Node.js 24 or higher. Please report any issues at [verdaccio/verdaccio](https://github.com/verdaccio/verdaccio/issues).

## Thanks

Thanks to everyone who contributed to the Verdaccio 7 release line and the related 6.x backports, including [@davidus27](https://github.com/davidus27), [@dianmorales](https://github.com/dianmorales), [@jotadeveloper](https://github.com/jotadeveloper), [@juanpicado](https://github.com/juanpicado), [@koliveira15](https://github.com/koliveira15), [@mbtools](https://github.com/mbtools), [@moglerdev](https://github.com/moglerdev), [@pranshuchittora](https://github.com/pranshuchittora), [@tmota900](https://github.com/tmota900), and [@vsugrob](https://github.com/vsugrob).

You can follow the full release checklist in [Verdaccio 7 Release Notes](https://github.com/verdaccio/verdaccio/issues/5680).
