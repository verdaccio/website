---
id: setup-pnpm
title: 'pnpm'
description: 'Point pnpm at Verdaccio: registry, scopes, authentication and publishing, and where pnpm differs from npm.'
---

pnpm reads the same `.npmrc` files as npm, in the same order — project, then user, then global
— so most npm instructions apply unchanged. What follows is the short path, and then the
places where pnpm behaves differently and npm's answer will not help you.

:::warning pnpm 11 hides packages published in the last day
Since **pnpm 11**, `minimumReleaseAge` defaults to **1440 minutes — one day**. pnpm will not
install a version published more recently than that, so a package you just pushed to
Verdaccio looks as if it does not exist:

```
No matching version found for @my-company/widget@^1.0.0
```

It is a supply-chain precaution and it is worth keeping for public packages, but it catches
everyone who publishes to their own registry and installs it straight away — in CI end-to-end
jobs especially. [How to exclude your own scope, or switch it off](#minimum-release-age).
:::

## Point pnpm at the registry {#registry}

For **one project**, which is what you usually want, write it next to `package.json`:

```ini title=".npmrc"
registry=http://localhost:4873/
```

Or let pnpm write it for you:

```bash
pnpm config set registry http://localhost:4873/ --location=project
```

For **every project on the machine**, drop `--location=project` and pnpm writes to your user
configuration instead. Check what is in effect at any point with:

```bash
pnpm config get registry
```

### Only your own packages {#scoped}

Sending everything through Verdaccio is fine when it proxies npmjs, but you can also route a
single scope and leave the rest alone:

```ini title=".npmrc"
registry=https://registry.npmjs.org/
@my-company:registry=http://localhost:4873/
```

Now `@my-company/*` resolves from Verdaccio and everything else from npmjs. This is the
safer default for a team registry: nothing changes for public packages, and a Verdaccio
outage does not stop an install of `lodash`.

### One command only {#one-off}

```bash
pnpm install --registry http://localhost:4873/
```

Useful for a quick check, but it does **not** persist, and it does not apply to a
`pnpm publish` you run afterwards.

## Authenticate {#auth}

```bash
pnpm login --registry http://localhost:4873/
```

For a scoped registry, name the scope so the token is stored against the right one:

```bash
pnpm login --scope=@my-company --registry http://localhost:4873/
```

The token lands in your user `.npmrc` as a host-scoped entry:

```ini
//localhost:4873/:_authToken=<token>
```

In CI, do not run `login` at all — write that line directly, with the token from a secret:

```bash
echo "//localhost:4873/:_authToken=${VERDACCIO_TOKEN}" >> .npmrc
```

:::caution `_auth` stops working on Verdaccio 7
Older recipes put a base64 `user:password` in `_auth`. That makes npm send an
`Authorization: Basic` header, and **Verdaccio 7 no longer accepts incoming Basic
authentication** — only Bearer tokens. The same `.npmrc` that publishes fine against **6.x**
fails against **7.x** with:

```
npm error code E401
npm error Unable to authenticate, your authentication token seems to be invalid.
```

Which is misleading: the credentials are correct, the _scheme_ is not accepted. Use
`_authToken`, which sends a Bearer token and works on both lines.

Note also that npm itself rejects a bare `_auth` in a project `.npmrc`
(`ERR_INVALID_AUTH`) — it has to be host-scoped, `//localhost:4873/:_auth=…`, the same shape
as `_authToken`.
:::

## Publish {#publish}

```bash
pnpm publish --registry http://localhost:4873/
```

Two pnpm-specific notes:

- pnpm runs the **`prepublishOnly` and `prepack` scripts** and publishes from a temporary
  directory. If your package is built from source, that is what you want.
- In a workspace, `pnpm publish -r` publishes every package whose version is not yet on the
  registry, which pairs well with a throwaway Verdaccio for
  [end-to-end testing](e2e.md).

To make sure a private package can never reach npmjs by accident, pin the registry in
`package.json` — it beats any `.npmrc`:

```json
{
  "publishConfig": {
    "registry": "http://localhost:4873/"
  }
}
```

## Where pnpm differs from npm {#differences}

### Newly published versions can be invisible {#minimum-release-age}

This is the one that will confuse you, because nothing is broken:

```
No matching version found for @my-company/widget@^1.0.0
```

pnpm can refuse versions that are **too new**, as a supply-chain precaution, and **pnpm 11
turns this on by default with a one-day delay**. A package you published seconds ago does not
exist as far as the install is concerned.

Check whether it is in effect:

```bash
pnpm config get minimumReleaseAge   # minutes; 1440 is one day
```

Keep the protection for third-party packages and exclude your own scope:

```yaml title="pnpm-workspace.yaml"
minimumReleaseAge: 1440
minimumReleaseAgeExclude:
  - '@my-company/*'
```

Or switch it off entirely, which is what a throwaway CI registry wants:

```bash
pnpm config set minimumReleaseAge 0 --location=project
```

There is **no command-line flag** for this — `--minimum-release-age` is not an option, and
the `npm_config_minimum_release_age` environment variable is ignored. It has to go through
the configuration.

### Settings live in two files {#config-files}

Registry and authentication stay in `.npmrc`, the same as npm. pnpm's **own** settings —
`minimumReleaseAge`, hoisting, the store location — live in `pnpm-workspace.yaml` at the root
of the workspace.

You do not have to remember which is which: `pnpm config set <key> --location=project` routes
each key to the right file. Setting `registry` writes `.npmrc`; setting `minimumReleaseAge`
writes `pnpm-workspace.yaml`, creating it if needed.

### The lockfile records the registry {#lockfile}

`pnpm-lock.yaml` stores the resolved URL of every package. A lockfile produced against
npmjs and then installed against Verdaccio, or the other way round, can resolve to hosts you
did not intend. When you change registries for real, delete the lockfile and reinstall.

## Troubleshooting {#troubleshooting}

Most problems are shared with npm, and the [npm troubleshooting
list](setup-npm.md#troubleshooting) covers them — SSL certificates, mixed registries in a
lockfile, and login failures.

The pnpm-specific one is almost always the [release-age gate](#minimum-release-age) above.
