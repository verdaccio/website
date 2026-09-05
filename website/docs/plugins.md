---
id: plugins
title: 'Plugins'
---

Verdaccio is a pluggable application. It can be extended in many ways, either new authentication methods, adding endpoints or using a custom storage.

There are 5 types of plugins:

- [Authentication](plugin-auth.md)
- [Middleware](plugin-middleware.md)
- [Storage](plugin-storage.md)
- [Theme UI](plugin-theme.md)
- [Filters](plugin-filter.md)

## Usage {#usage}

### Installation {#installation}

```bash
$> npm install --global verdaccio-activedirectory
```

### Configuration {#configuration}

Open the `config.yaml` file and update the `auth` section as follows:

The default configuration looks like this, due we use a build-in `htpasswd` plugin by default that you can disable just commenting out the following lines.

### Naming convention {#naming-convention}

Plugins must be named with the following convention:

- `verdaccio-xxx`

The prefix can be changed with [`server.pluginPrefix`](configuration#plugin-prefix).

Scoped plugins are supported, for example:

```yaml
auth:
  '@my-org/auth-awesome-plugin':
    foo: some value
    bar: another value
store:
  '@my-org/store-awesome-plugin':
    foo: some value
    bar: another value
middleware:
  '@my-org/middleware-awesome-plugin':
    foo: some value
    bar: another value
```

### Authentication Configuration {#authentication-configuration}

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # max_users: 1000
```

and replacing them with (in case you decide to use a `ldap` plugin.

```yaml
auth:
  activedirectory:
    url: 'ldap://10.0.100.1'
    baseDN: 'dc=sample,dc=local'
    domainSuffix: 'sample.local'
```

#### Multiple Authentication plugins {#multiple-authentication-plugins}

This is technically possible, making the plugin order important, as the credentials will be resolved in order.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    #max_users: 1000
  activedirectory:
    url: 'ldap://10.0.100.1'
    baseDN: 'dc=sample,dc=local'
    domainSuffix: 'sample.local'
```

### Middleware Configuration {#middleware-configuration}

Example how to set up a middleware plugin. All middleware plugins must be defined in the **middlewares** namespace.

```yaml
middlewares:
  audit:
    enabled: true
```

> You might follow the [audit middle plugin](https://github.com/verdaccio/verdaccio-audit) as base example.

### Storage Configuration {#storage-configuration}

:::caution

If the `store` property is defined in the `config.yaml` file, the `storage` property is being ignored.

:::

Example how to set up a storage plugin. All storage plugins must be defined in the **store** namespace.

```yaml
store:
  memory:
    limit: 1000
```

### Theme Configuration {#theme-configuration}

```bash
npm install --global verdaccio-theme-dark
```

You can load only one theme at a time and pass through options if you need it.

```yaml
theme:
  dark:
    option1: foo
    option2: bar
```

### Filter Configuration (Experimental) {#filter-configuration}

A real example from [npm i -g verdaccio-plugin-secfilter](https://github.com/Ansile/verdaccio-plugin-secfilter) filter plugin.

```yaml
filters:
  plugin-secfilter:
    block:
      - scope: @evil # block all packages in scope
      - package: semvver # block a malicious package
      - package: @coolauthor/stolen
        versions: '>2.0.1' # block some malicious versions of previously ok package
                           # uses https://www.npmjs.com/package/semver syntax
```

