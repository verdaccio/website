---
authors: juan_picado
title: "What's new in Verdaccio 7"
description: 'Verdaccio 7: staged publishing, two-factor authentication, ownership checks on every change, a new web UI home, pure ESM plugins and async storage, plus what to review before upgrading from 6.x.'
tags: [release, verdaccio]
hide_table_of_contents: true
---

import FilterFlow from '@site/src/components/diagrams/FilterFlow';
import { StagedPublish, TwoFactor } from '@site/src/components/terminal/Examples';

**Verdaccio 7 puts publishing under your control: a version can be staged for review before anyone can install it, accounts and publishes can require a second factor, and ownership checks now cover deprecate, unpublish and dist-tag changes as well.** The web UI gains a home toolbar, a guided first publish and bun support; plugins can be pure ESM and storage plugins can use a promise-based API; the runtime moves to Node.js 24 and Express 5. Your day-to-day install and publish commands stay the same. What changes is how much you can control, and how you extend the registry.

New to Verdaccio? It is a free, open source npm-compatible registry you host yourself to share internal packages, cache public dependencies and test publishes locally. It works with npm, pnpm and Yarn. The [getting-started guide](/docs/installation) covers the basics.

<!--truncate-->

## More control over publishing

### Review a version before it becomes installable

Experimental **staged publishing** lets a pipeline upload a version for a maintainer to review. The package becomes installable only after approval. This adds a review step between producing an artifact and making it available to consumers.

<StagedPublish />

The feature is off by default, behind the `stage` flag, and requires **npm 11.17 or newer**. See the [staged publishing guide](/docs/staged-publishing) for configuration, permissions and the review commands. A version status endpoint reports whether a given version is `published` or `staged`, so a pipeline can wait for the approval before announcing a release.

### Add a second factor to account and publishing flows

Experimental **two-factor authentication** uses time-based one-time passwords from an authenticator app. Depending on the selected mode, it protects account operations and publishing as well as login.

<TwoFactor />

It is also off by default, behind the `tfa` flag. Follow the [two-factor authentication guide](/docs/two-factor-authentication) to check client and storage requirements before enabling it.

Both features are still experimental: test them with your release workflow and share feedback before relying on them in production. Neither changes the default publishing flow unless you opt in.

### Ownership and unpublish checks on every change

With [`publish.check_owners`](/docs/configuration#check-owner) enabled, the ownership check now also covers `npm deprecate`, version unpublish and dist-tag changes, not only publish. Removing a version requires the unpublish permission on its own route; a publish request can no longer act as a removal based on the metadata it carries.

Publishing is also stricter about tarballs: invalid attachment names are rejected before any metadata is saved, and an upload is only recorded once the tarball is fully written. A failed publish no longer leaves a version without a tarball that blocks a corrected publish of the same version.

## A new foundation for plugins

### Load pure ESM plugins

Verdaccio 7 supports **pure ESM plugins**, so plugin authors no longer need a CommonJS wrapper just to load their plugin. This makes it easier to use dependencies that have moved to ESM.

Existing plugins still need to be checked against the new runtime, especially middleware plugins affected by Express 5. The [plugin documentation](/docs/plugins) and [migration guide](/blog/2026/09/27/verdaccio-6-to-7-migration) cover those details.

### Write storage plugins with async functions

The storage API is now **promise-based**, allowing storage plugins to use `async`/`await` instead of callbacks. Existing callback-based plugins can run through a compatibility adapter while their maintainers migrate.

If you maintain a storage plugin, the [callback-to-async migration guide](/dev/plugin-storage-async) walks through the changes. If you use a third-party storage plugin, check its compatibility before upgrading your registry.

## Faster installs with password authentication

Clients that send a username and password on every request made the htpasswd plugin run a bcrypt verification per tarball. Setting `verify_cache_ms` reuses a successful verification for that long, so one install no longer costs one hash check per package. It is off by default; see [authentication](/docs/authentication) for the option.

## Improvements you may already know from 6.x

Several improvements included in Verdaccio 7 have also reached 6.x through backports or shared packages. If you keep your 6.x registry updated, some of these will already look familiar.

### A refreshed web interface

The Web UI includes dark mode, sorting packages by update time, improved scoped-package search, and refreshed login, signup and password screens. Package detail tabs also work better across desktop and mobile layouts.

The home page gains a toolbar to filter packages by name, description or keywords, pick a scope and sort by name or most recent publication. An empty registry shows a step-by-step welcome card with a tab for each package manager listed in `web.pkgManagers`, now including bun. The settings dialog shows how much of each language is translated, untranslated strings fall back to English, and changing a password moves to the signed-in account menu. See the [web configuration](/docs/webui#package-list) for the new options.

The shared `@verdaccio/ui-theme` package lets compatible UI fixes reach both release lines.

### Package filtering and registry notifications

The package filter supports allow and block rules, glob patterns, and excluding deprecated versions. It gives teams control over the packages and versions their registry serves, alongside the existing read and publish permissions.

<FilterFlow />

Notifications cover both **publish and unpublish** events, so your automation can react when a version is added or removed. See [notifications](/docs/notifications) for configuration examples.

### More reliable search and downloads

This release line also includes fixes around scoped-package search, search with legacy storage plugins, and tarball downloads across multiple uplinks. Search requests have rate limits, bounded pagination and batched access checks, and searches forwarded to an uplink keep its configured subpath and authentication headers. Proxy and download fixes improve error handling and cleanup when an upstream request fails.

The [release tracker](https://github.com/verdaccio/verdaccio/issues/5680) records the individual changes and backports if you need to check a particular fix.

## What to review before upgrading

Verdaccio 7 changes the runtime and removes several deprecated interfaces. The main things to check are:

- **Node.js 24 or newer.** Update the runtime used by your deployment.
- **YAML configuration.** JSON and JavaScript configuration files are no longer accepted.
- **Authentication.** Package API requests require Bearer tokens. Old `.npmrc` entries using `_auth` must move to `_authToken`. The login routes still accept Basic, so `npm login`, `yarn npm login` and `pnpm login` keep working for existing users.
- **Server secret.** The server secret must be 32 characters; check it before switching versions.
- **Plugins and embedded servers.** Express 5 changes middleware route syntax, and the programmatic API has changed. Prefer the named `runServer` export when embedding Verdaccio.
- **Removed endpoints.** The legacy `/-/all` search endpoint and star/unstar support are gone.

The [migration guide from Verdaccio 6 to 7](/blog/2026/09/27/verdaccio-6-to-7-migration) explains the symptoms and fixes, including storage compatibility and rollback considerations. Test with a copy of your configuration and storage before changing a working registry.

## Try Verdaccio 7

Verdaccio 7 is the `latest` release on npm. With Node.js 24 or newer:

```bash
pnpm dlx verdaccio
```

Or use npm:

```bash
npx --yes verdaccio
```

These commands use Verdaccio's normal configuration lookup. If you already have a local registry, pass `--config /path/to/test/config.yaml` and point that test configuration at separate storage. Once it is running, open [http://localhost:4873](http://localhost:4873).

For container deployments, follow the [Docker](/docs/docker) or [Helm](/docs/kubernetes) guide. The `verdaccio/verdaccio:7` image is also published as `latest`; pin `verdaccio/verdaccio:6` to stay on the previous line.

If this is your first Verdaccio instance, continue with the [installation guide](/docs/installation) and your package manager's setup instructions: [npm](/docs/setup-npm), [pnpm](/docs/setup-pnpm) or [Yarn](/docs/setup-yarn).

Tell us how the release works with your plugins and publishing workflow in [GitHub Discussions](https://github.com/verdaccio/verdaccio/discussions). Report reproducible problems in [GitHub Issues](https://github.com/verdaccio/verdaccio/issues).

## Thanks

Thanks to everyone who contributed to the Verdaccio 7 release line and the related 6.x backports.

<div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
  <a href="https://github.com/davidus27" title="@davidus27"><img src="https://avatars.githubusercontent.com/u/20754428?v=4&s=96" width="48" height="48" alt="@davidus27" style={{borderRadius: '50%'}} /></a>
  <a href="https://github.com/dianmorales" title="@dianmorales"><img src="https://avatars.githubusercontent.com/u/558740?v=4&s=96" width="48" height="48" alt="@dianmorales" style={{borderRadius: '50%'}} /></a>
  <a href="https://github.com/jotadeveloper" title="@jotadeveloper"><img src="https://avatars.githubusercontent.com/u/116422?v=4&s=96" width="48" height="48" alt="@jotadeveloper" style={{borderRadius: '50%'}} /></a>
  <a href="https://github.com/juanpicado" title="@juanpicado"><img src="https://avatars.githubusercontent.com/u/558752?v=4&s=96" width="48" height="48" alt="@juanpicado" style={{borderRadius: '50%'}} /></a>
  <a href="https://github.com/koliveira15" title="@koliveira15"><img src="https://avatars.githubusercontent.com/u/35852680?v=4&s=96" width="48" height="48" alt="@koliveira15" style={{borderRadius: '50%'}} /></a>
  <a href="https://github.com/mbtools" title="@mbtools"><img src="https://avatars.githubusercontent.com/u/59966492?v=4&s=96" width="48" height="48" alt="@mbtools" style={{borderRadius: '50%'}} /></a>
  <a href="https://github.com/moglerdev" title="@moglerdev"><img src="https://avatars.githubusercontent.com/u/39583780?v=4&s=96" width="48" height="48" alt="@moglerdev" style={{borderRadius: '50%'}} /></a>
  <a href="https://github.com/pranshuchittora" title="@pranshuchittora"><img src="https://avatars.githubusercontent.com/u/32242596?v=4&s=96" width="48" height="48" alt="@pranshuchittora" style={{borderRadius: '50%'}} /></a>
  <a href="https://github.com/ReemX" title="@ReemX"><img src="https://avatars.githubusercontent.com/u/35267832?v=4&s=96" width="48" height="48" alt="@ReemX" style={{borderRadius: '50%'}} /></a>
  <a href="https://github.com/RuneStone0" title="@RuneStone0"><img src="https://avatars.githubusercontent.com/u/6630442?v=4&s=96" width="48" height="48" alt="@RuneStone0" style={{borderRadius: '50%'}} /></a>
  <a href="https://github.com/tmota900" title="@tmota900"><img src="https://avatars.githubusercontent.com/u/48350728?v=4&s=96" width="48" height="48" alt="@tmota900" style={{borderRadius: '50%'}} /></a>
  <a href="https://github.com/vsugrob" title="@vsugrob"><img src="https://avatars.githubusercontent.com/u/1497471?v=4&s=96" width="48" height="48" alt="@vsugrob" style={{borderRadius: '50%'}} /></a>
</div>

You can follow the full release checklist in [Verdaccio 7 Release Notes](https://github.com/verdaccio/verdaccio/issues/5680).

## Support Verdaccio

Verdaccio is maintained by volunteers and funded by its users. If your team relies on it, consider [sponsoring the project on Open Collective](https://opencollective.com/verdaccio): the contributions pay for infrastructure and let maintainers spend time on releases like this one.
