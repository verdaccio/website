---
id: cli-registry
title: "Using a private registry"
---

Setting up a private registry can be achieved in few ways, let's review all of them, this formula might be different based on the package manager you are using.

### npm (5.x, 6.x)

To set the registry in the `.npmrc` file use the following:

```bash
npm set registry http://localhost:4873/
```

If you want one single use `--registry` after the required command.

```bash
npm install --registry http://localhost:4873
```

Write it yourself by defining in your `.npmrc` a `registry` field.

```bash
//.npmrc
registry=http://localhost:4873
```

Or a `publishConfig` in your `package.json`

```json
{
  "publishConfig": {
    "registry": "http://localhost:4873"
  }
}
```

> By using the `publishConfig` the previous two options would be ignored, only use this option if you want to ensure the package is not being published anywhere else.

If you are using either `npm@5.4.x` or `npm@5.5.x`, there are [known issues with tokens](https://github.com/verdaccio/verdaccio/issues/509#issuecomment-359193762), please upgrade to either `6.x` or downgrade to `npm@5.3.0`.

### yarn

#### Yarn (1.x)

The classic version is able to regonize the `.npmrc` file, but also provides their own configuration file named `.yarnrc`. To setup a registry you

```
// .yarnrc
registry "http://localhost:4873"
```

By using this version you should enable `always-auth` in your configuration running:

```
npm config set always-auth true
```

`yarn@1.x` does not send the authorization header on `yarn install` if your packages requires authentication, by enabling `always-auth` will force yarn do it on each request.

#### Yarn Berry (>=2.x)

> Yarn berry does not recognize `--registry` or `.npmrc` file anymore.

For defining a registry you must use the `.yarnrc.yml` located in the root of your project or global configuration.

When you publish a package the ``must be used, keep on mind the`publishConfig.registry`in the`package.json` will override this configuration.

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

### pnpm

> This includes 4.x and 5.x series.

`pnpm` recognize by default the configuration at `.npmrc` and also the `--registry` value, there is no difference in the implementation.
