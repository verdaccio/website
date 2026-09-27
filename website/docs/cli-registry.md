---
id: cli-registry
title: 'Using a private registry'
description: 'Point npm, pnpm or yarn at Verdaccio: the four steps every setup needs, and where each client keeps its configuration.'
---

Pointing a client at Verdaccio is the same four steps everywhere — point it at the registry,
authenticate, publish, and keep the lockfile from undoing it. What changes is which file
holds the setting and what the commands are called.

## Per client {#per-client}

**Start here.** Each page covers registry configuration, authentication, publishing,
two-factor and the problems specific to that client:

- **[pnpm](setup-pnpm.md)** — including the release-age gate that hides packages you have
  just published
- **[npm](setup-npm.md)** — including `npm login` behaviour across versions and mixed
  registries in a lockfile
- **[yarn](setup-yarn.md)** — classic and modern, plus the plugins that add the registry
  commands Yarn 4 does not ship
- **[deno](setup-deno.md)** and **[bun](setup-bun.md)**

## The short version {#cheatsheet}

The same settings side by side, if you already know what you are looking for:

<div style={{overflowX: 'auto'}}>

|                          | **pnpm**                                   | **npm**                                | **Yarn 4**                              |
| ------------------------ | ------------------------------------------ | -------------------------------------- | --------------------------------------- |
| Configuration file       | `.npmrc`                                   | `.npmrc`                               | `.yarnrc.yml`                           |
| Registry for everything  | `registry=<url>`                           | `registry=<url>`                       | `npmRegistryServer: <url>`              |
| Registry for one scope   | `@scope:registry=<url>`                    | `@scope:registry=<url>`                | `npmScopes:` → `npmRegistryServer`      |
| Authentication           | `//host/:_authToken=<token>`               | `//host/:_authToken=<token>`           | `npmAuthToken` under `npmRegistries:`   |
| Log in                   | `pnpm login --registry <url>`              | `npm login --registry <url>`           | `yarn npm login --auth-type=legacy`     |
| Publish                  | `pnpm publish --registry <url>`            | `npm publish --registry <url>`         | `yarn npm publish`                      |
| One-off, no config       | `pnpm install --registry <url>`            | `npm install --registry <url>`         | not supported — use the config          |

</div>

Deno and bun read `.npmrc` too; see [deno](setup-deno.md) and [bun](setup-bun.md).

Yarn 4's `yarn npm login` assumes the browser-based flow, which a self-hosted registry does
not serve unless the `webLogin` flag is on — hence `--auth-type=legacy` above. Yarn 4 also
ships fewer registry commands than npm; the [yarn page](setup-yarn.md#yarn-plugin-npm) covers
the plugins that add the missing ones.

## Which approach to pick {#which-approach}

**Route only your scope**, and leave everything else on npmjs:

```ini title=".npmrc"
registry=https://registry.npmjs.org/
@my-company:registry=http://localhost:4873/
```

This is the safer default for a team. Public packages are unaffected, and if the registry is
down nobody is blocked from installing `lodash`. The trade-off is that you get no caching of
public packages and no single place to apply [access rules](packages.md).

**Route everything through Verdaccio**, letting it proxy npmjs with an
[uplink](uplinks.md):

```ini title=".npmrc"
registry=http://localhost:4873/
```

One registry to configure, one place to enforce policy, and a cache of everything your team
installs — which also keeps builds working when npmjs is unreachable. The trade-off is that
the registry is now on the critical path of every install.

**Per command**, for a one-off check, with `--registry`. It does not persist, and it does not
carry over to a `publish` you run afterwards.

## Stop a private package reaching npmjs {#publish-config}

Worth doing whichever approach you chose, because it does not depend on anyone's `.npmrc`:

```json title="package.json"
{
  "publishConfig": {
    "registry": "http://localhost:4873/"
  }
}
```

A publish now goes to that registry regardless of local configuration. For the stronger
version of this — making the package unpublishable anywhere else — see
[protecting packages](protect-your-dependencies.md).
