---
id: setup-yarn
title: 'yarn'
---

# yarn {#yarn}

#### `yarn` classic (1.x) {#yarn-classic-1x}

> Be aware npm configurations are valid on the classic version

The classic version is able to regonize the `.npmrc` file, but also provides their own configuration file named `.yarnrc`.

To set up a registry, create a file and define a registry.

```
// .yarnrc
registry "http://localhost:4873"
```

By using this version you should enable `always-auth` in your configuration running:

```
npm config set always-auth true
```

`yarn@1.x` does not send the authorization header on `yarn install` if your packages requires authentication, by enabling `always-auth` will force yarn do it on each request.

#### `yarn` modern (>=2.x) {#yarn-modern-2x}

> Yarn modern does not recognize `--registry` or `.npmrc` file anymore.

For defining a registry you must use the `.yarnrc.yml` located in the root of your project or global configuration.

When you publish a package the `npmRegistryServer` must be used. Keep in mind the `publishConfig.registry` in the `package.json` will override this configuration.

```yaml
// .yarnrc.yml
npmRegistryServer: "http://localhost:4873"

unsafeHttpWhitelist:
  - localhost
```

> `unsafeHttpWhitelist` is only need it if you don't use `https` with a valid certificate.

Using scopes is also possible and more segmented, you can define a token peer scope if is required.

```
npmRegistries:
  "https://registry.myverdaccio.org":
    npmAlwaysAuth: true
    npmAuthToken: <TOKEN>
npmScopes:
  my-company:
    npmRegistryServer: https://registry.myverdaccio.org
    npmPublishRegistry: https://registry.myverdaccio.org
```

for logging via CLi use:

```
yarn npm login --scope my-company
```

## Extra registry commands {#yarn-plugin-npm}

Yarn 4 ships a smaller set of registry commands than npm. There is no
`yarn npm ping`, no `yarn npm unpublish`, no `yarn npm deprecate` and no
`yarn npm star`, and `yarn npm login` only speaks the web flow.

[`verdaccio/yarn-plugin-npm`](https://github.com/verdaccio/yarn-plugin-npm) is a
set of Yarn 4 plugins that add them. They are maintained by the Verdaccio team
and work against any npm-compatible registry, not only Verdaccio.

### Installing {#yarn-plugin-npm-install}

The quickest way is the importer, which downloads a plugin and registers it in
your `.yarnrc.yml`:

```bash
yarn dlx @verdaccio/yarn-import npm-ping
yarn dlx @verdaccio/yarn-import npm-login
yarn dlx @verdaccio/yarn-import npm-unpublish
yarn dlx @verdaccio/yarn-import npm-deprecate
yarn dlx @verdaccio/yarn-import npm-star
```

Pin a version by appending it: `yarn dlx @verdaccio/yarn-import npm-ping 0.0.1`.

Check what is installed with `yarn plugin list`.

Requires Yarn **4.x** and Node.js **>= 24**.

### What each one adds {#yarn-plugin-npm-commands}

| Plugin | Commands |
| --- | --- |
| `npm-ping` | `yarn npm ping` |
| `npm-login` | `yarn npm login` with a legacy flow |
| `npm-unpublish` | `yarn npm unpublish` |
| `npm-deprecate` | `yarn npm deprecate` |
| `npm-star` | `yarn npm star`, `yarn npm unstar` |

All of them accept `--registry <url>`, `--scope <scope>` and `--json`.

```bash
yarn npm ping --registry http://localhost:4873
yarn npm unpublish my-package@1.0.0
yarn npm unpublish my-package --force            # every version
yarn npm deprecate my-package@"<2.0.0" "Upgrade to v2"
yarn npm deprecate my-package@1.0.0 ""           # un-deprecate
yarn npm star lodash
```

### Logging in to a self-hosted registry {#yarn-plugin-npm-login}

The built-in `yarn npm login` assumes the web flow, which is the source of the
long-standing friction listed under [known issues](#known-issues). The
`npm-login` plugin adds `--auth-type`, so you can ask for the legacy
username/password exchange that a self-hosted Verdaccio understands:

```bash
yarn npm login --auth-type=legacy --registry http://localhost:4873
```

`--auth-type=auto` is the default and tries the web flow first, falling back to
legacy on `404`/`501`. For CI, pass the credentials directly instead of being
prompted:

```bash
yarn npm login --auth-type=legacy \
  --user "$NPM_USER" --password "$NPM_PASS" --email "$NPM_EMAIL"
```

Note the legacy flow creates users on registries that accept CouchDB user
documents; logging in as an existing user only works when the registry exposes
revision metadata without Basic authentication.

## Two-factor authentication {#two-factor}

:::info Depends on the registry
This only applies when the operator has enabled the `tfa`
[feature flag](configuration#experiments) on the Verdaccio side. It is an
experimental flag, off by default, and available from **7.x** — see
[two-factor authentication](two-factor-authentication).

Nothing is configured on the Yarn side.
:::

When the registry has it enabled and your account is enrolled, Yarn handles the
one-time password on its own and prompts for it:

```bash
yarn npm publish
# Provide a one-time password from your authenticator app.
# One-time password: ‹
```

The `unpublish` and `deprecate` plugins above also take `--otp <code>` for
non-interactive use.

Enrolling still has to be done with npm — `npm profile enable-2fa` — since Yarn
has no equivalent command.

## Staged publishing {#staged-publishing}

:::note Not available in Yarn
[Staged publishing](staged-publishing) is driven by `npm stage`, which is an npm
command with no Yarn equivalent. Even with the `stage`
[feature flag](configuration#experiments) enabled on the registry, a Yarn-based
workflow cannot stage or approve versions — the registry endpoints are there,
but no Yarn command calls them.

Publishing normally with `yarn npm publish` keeps working as usual, and is not
affected by the flag.
:::

## Troubleshooting {#troubleshooting}

### Known issues

- `yarn npm login` issues, read [verdaccio#1737](https://github.com/verdaccio/verdaccio/issues/1737) or [yarn-berry#1848](https://github.com/yarnpkg/berry/pull/1848).
- `yarn npm publish` does not send README, read [verdaccio#1905](https://github.com/verdaccio/verdaccio/issues/1905) or [yarn-berry#1702](https://github.com/yarnpkg/berry/issues/1702).
