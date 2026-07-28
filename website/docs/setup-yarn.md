---
id: setup-yarn
title: 'yarn'
---

# yarn {#yarn}

We recommend Yarn 4 or higher for modern projects.

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

```yaml title=".yarnrc.yml"
npmRegistryServer: 'http://localhost:4873'

unsafeHttpWhitelist:
  - localhost
```

> `unsafeHttpWhitelist` is only need it if you don't use `https` with a valid certificate.

Using scopes is also possible and more segmented, you can define a token peer scope if is required.

```yaml title=".yarnrc.yml"
npmRegistryServer: 'https://registry.npmjs.org'

npmRegistries:
  'https://registry.myverdaccio.org':
    npmAlwaysAuth: true
    npmAuthToken: <TOKEN>
npmScopes:
  my-company:
    npmRegistryServer: https://registry.myverdaccio.org
    npmPublishRegistry: https://registry.myverdaccio.org
```

With this configuration, unscoped packages continue resolving from the public registry, while `@my-company/*` packages resolve and publish through Verdaccio.

### Minimum release age with a private scope {#minimum-release-age}

Yarn 4.12 and newer can delay newly published package versions with `npmMinimalAgeGate`. If your private scope publishes internal packages that must be available immediately, add the scope to `npmPreapprovedPackages`.

```yaml title=".yarnrc.yml"
npmRegistryServer: 'https://registry.npmjs.org'

npmMinimalAgeGate: '1d'
npmPreapprovedPackages:
  - '@my-company/*'

npmRegistries:
  'https://registry.myverdaccio.org':
    npmAlwaysAuth: true
    npmAuthToken: <TOKEN>
npmScopes:
  my-company:
    npmRegistryServer: https://registry.myverdaccio.org
    npmPublishRegistry: https://registry.myverdaccio.org
```

Packages matching `npmPreapprovedPackages` bypass Yarn package gates, but still use the registry configured for their scope.

See also [Yarn security: `npmMinimalAgeGate`](https://yarnpkg.com/features/security).

For logging via CLI use:

```
yarn npm login --scope my-company
```

### Verdaccio npm commands plugin for Yarn 4 {#verdaccio-yarn-plugin-npm}

Yarn 4 does not include every npm registry command by default. Verdaccio maintains Yarn plugins for npm registry commands such as `yarn npm ping`, `yarn npm login`, `yarn npm deprecate`, `yarn npm unpublish`, `yarn npm star`, and `yarn npm unstar`.

To add Verdaccio-compatible `yarn npm login` support, import the login plugin:

```bash
yarn dlx @verdaccio/yarn-import npm-login
```

Then log in to Verdaccio with the legacy auth flow:

```bash
yarn npm login --auth-type=legacy --registry http://localhost:4873
```

For a scoped registry, use the scope configured in `.yarnrc.yml`:

```bash
yarn npm login --scope my-company
```

See the plugin README for the full command list: [verdaccio/yarn-plugin-npm](https://github.com/verdaccio/yarn-plugin-npm).

## Troubleshooting {#troubleshooting}

### Known issues

- `yarn npm login` issues, read [verdaccio#1737](https://github.com/verdaccio/verdaccio/issues/1737) or [yarn-berry#1848](https://github.com/yarnpkg/berry/pull/1848).
- `yarn npm publish` does not send README, read [verdaccio#1905](https://github.com/verdaccio/verdaccio/issues/1905) or [yarn-berry#1702](https://github.com/yarnpkg/berry/issues/1702).
