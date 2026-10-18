---
authors: juan_picado
title: "What's new in Verdaccio 7"
description: 'Explore Verdaccio 7: ESM plugins, async storage, experimental staged publishing and two-factor authentication, plus what to review before upgrading from 6.x.'
tags: [release, verdaccio]
hide_table_of_contents: false
---

import FilterFlow from '@site/src/components/diagrams/FilterFlow';
import { StagedPublish, TwoFactor } from '@site/src/components/terminal/Examples';

**Verdaccio 7 brings pure ESM plugin support, a promise-based storage API, and experimental staged publishing and two-factor authentication.** It also moves to Node.js 24 and Express 5. If you already run Verdaccio, your day-to-day install and publish workflow stays familiar; the biggest changes are in how you extend the registry and control publishing.

New to Verdaccio? It is a free, open source npm-compatible registry you host yourself to share internal packages, cache public dependencies and test publishes locally. It works with npm, pnpm and Yarn. The [getting-started guide](/docs/installation) covers the basics.

<!--truncate-->

:::info Release status
Verdaccio 7 is currently a **prerelease**, available as `verdaccio@next-7`, and requires **Node.js 24 or newer**. The unqualified `verdaccio` package still installs stable 6.x. See [Try Verdaccio 7](#try-verdaccio-7) below for the preview commands.
:::

## More control over publishing

### Review a version before it becomes installable

Experimental **staged publishing** lets a pipeline upload a version for a maintainer to review. The package becomes installable only after approval. This adds a review step between producing an artifact and making it available to consumers.

<StagedPublish />

The feature is off by default, behind the `stage` flag, and requires **npm 11.17 or newer**. See the [staged publishing guide](/docs/staged-publishing) for configuration, permissions and the review commands.

### Add a second factor to account and publishing flows

Experimental **two-factor authentication** uses time-based one-time passwords from an authenticator app. Depending on the selected mode, it protects account operations and publishing as well as login.

<TwoFactor />

It is also off by default, behind the `tfa` flag. Follow the [two-factor authentication guide](/docs/two-factor-authentication) to check client and storage requirements before enabling it.

Both features are still experimental: test them with your release workflow and share feedback before relying on them in production. Neither changes the default publishing flow unless you opt in.

## A new foundation for plugins

### Load pure ESM plugins

Verdaccio 7 supports **pure ESM plugins**, so plugin authors no longer need a CommonJS wrapper just to load their plugin. This makes it easier to use dependencies that have moved to ESM.

Existing plugins still need to be checked against the new runtime, especially middleware plugins affected by Express 5. The [plugin documentation](/docs/plugins) and [migration guide](/blog/2026/09/27/verdaccio-6-to-7-migration) cover those details.

### Write storage plugins with async functions

The storage API is now **promise-based**, allowing storage plugins to use `async`/`await` instead of callbacks. Existing callback-based plugins can run through a compatibility adapter while their maintainers migrate.

If you maintain a storage plugin, the [callback-to-async migration guide](/dev/plugin-storage-async) walks through the changes. If you use a third-party storage plugin, check its compatibility before upgrading your registry.

## Improvements you may already know from 6.x

Several improvements included in Verdaccio 7 have also reached 6.x through backports or shared packages. If you keep your 6.x registry updated, some of these will already look familiar.

### A refreshed web interface

The Web UI includes dark mode, sorting packages by update time, improved scoped-package search, and refreshed login, signup and password screens. Package detail tabs also work better across desktop and mobile layouts.

The shared `@verdaccio/ui-theme` package lets compatible UI fixes reach both release lines.

### Package filtering and registry notifications

The package filter supports allow and block rules, glob patterns, and excluding deprecated versions. It gives teams control over the packages and versions their registry serves, alongside the existing read and publish permissions.

<FilterFlow />

Notifications cover both **publish and unpublish** events, so your automation can react when a version is added or removed. See [notifications](/docs/notifications) for configuration examples.

### More reliable search and downloads

This release line also includes fixes around scoped-package search, search with legacy storage plugins, and tarball downloads across multiple uplinks. Search requests have rate limits, bounded pagination and batched access checks. Proxy and download fixes improve error handling and cleanup when an upstream request fails.

The [release tracker](https://github.com/verdaccio/verdaccio/issues/5680) records the individual changes and backports if you need to check a particular fix.

## What to review before upgrading

Verdaccio 7 changes the runtime and removes several deprecated interfaces. The main things to check are:

- **Node.js 24 or newer.** Update the runtime used by your deployment.
- **YAML configuration.** JSON and JavaScript configuration files are no longer accepted.
- **Authentication.** Package API requests require Bearer tokens. Old `.npmrc` entries using `_auth` must move to `_authToken`; the CLI login routes retain a controlled Basic-auth exception.
- **Storage and server secret.** Check legacy Sinopia database names and the requirement for a 32-character server secret before switching versions.
- **Plugins and embedded servers.** Express 5 changes middleware route syntax, and the programmatic API has changed. Prefer the named `runServer` export when embedding Verdaccio.
- **Removed endpoints.** The legacy `/-/all` search endpoint and star/unstar support are gone.

The [migration guide from Verdaccio 6 to 7](/blog/2026/09/27/verdaccio-6-to-7-migration) explains the symptoms and fixes, including storage compatibility and rollback considerations. Test with a copy of your configuration and storage before changing a working registry.

## Try Verdaccio 7

With Node.js 24 or newer, select the preview explicitly:

```bash
pnpm dlx verdaccio@next-7
```

Or use npm:

```bash
npx --yes verdaccio@next-7
```

These commands use Verdaccio's normal configuration lookup. If you already have a local registry, pass `--config /path/to/test/config.yaml` and point that test configuration at separate storage. Once it is running, open [http://localhost:4873](http://localhost:4873).

For container deployments, follow the [Docker](/docs/docker) or [Helm](/docs/kubernetes) guide and choose the 7.x preview image deliberately; the default stable image follows a different release line.

If this is your first Verdaccio instance, continue with the [installation guide](/docs/installation) and your package manager's setup instructions: [npm](/docs/setup-npm), [pnpm](/docs/setup-pnpm) or [Yarn](/docs/setup-yarn).

Tell us how the preview works with your plugins and publishing workflow in [GitHub Discussions](https://github.com/verdaccio/verdaccio/discussions). Report reproducible problems in [GitHub Issues](https://github.com/verdaccio/verdaccio/issues).

## Thanks

Thanks to everyone who contributed to the Verdaccio 7 release line and the related 6.x backports, including [@davidus27](https://github.com/davidus27), [@dianmorales](https://github.com/dianmorales), [@jotadeveloper](https://github.com/jotadeveloper), [@juanpicado](https://github.com/juanpicado), [@koliveira15](https://github.com/koliveira15), [@mbtools](https://github.com/mbtools), [@moglerdev](https://github.com/moglerdev), [@pranshuchittora](https://github.com/pranshuchittora), [@tmota900](https://github.com/tmota900), and [@vsugrob](https://github.com/vsugrob).

You can follow the full release checklist in [Verdaccio 7 Release Notes](https://github.com/verdaccio/verdaccio/issues/5680).
