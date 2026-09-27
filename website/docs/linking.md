---
id: linking-remote-registry
title: 'Linking a Remote Registry'
description: 'Link Verdaccio to another registry so it proxies and caches packages it does not host itself.'
---

Verdaccio is a proxy and by default [links](uplinks.md) the public registry.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

You can link multiple registries, the following document will drive you through some helpful configurations.

## Using Associating Scope {#using-associating-scope}

The unique way to access multiple registries using the `.npmrc` is the scope feature as follows:

```
// .npmrc
registry=https://registry.npmjs.org
@mycompany:registry=http://localhost:4873
```

This approach is valid, but comes with several disadvantages:

- It **only works with scopes**
- Scope must match, **no Regular Expressions are allowed**
- One scope **cannot fetch from multiple registries**
- Tokens/passwords **must be defined within** `.npmrc` and checked in into the repo.

A complete `.npmrc` for one private scope alongside the public registry looks like this:

```ini title=".npmrc"
registry=https://registry.npmjs.org/
@mycompany:registry=http://localhost:4873/
//localhost:4873/:_authToken=${VERDACCIO_TOKEN}
always-auth=true
```

Everything unscoped resolves from npmjs, and `@mycompany/*` resolves from Verdaccio.
Reading the token from the environment keeps it out of the repository — npm expands
`${VERDACCIO_TOKEN}` when it reads the file.

The alternative, and usually the better one, is to point the client at **only** Verdaccio
and let it proxy npmjs for you with an [uplink](uplinks.md): one registry to configure, one
place to apply [access rules](packages.md), and a cache of everything you install.

## Linking a Registry {#linking-a-registry}

Linking a registry is fairly simple. First, define a new section in the `uplinks` section. Note, the order here is irrelevant.

```yaml
  uplinks:
    private:
      url: https://private.registry.net/npm

    ... [truncated] ...

  'webpack':
    access: $all
    publish: $authenticated
    proxy: private

```

Add a `proxy` section to define the selected registry you want to proxy.

## Linking Multiple Registries {#linking-multiple-registries}

```yaml
  uplinks:
    server1:
      url: https://server1.registry.net/npm
    server2:
      url: https://server2.registry.net/npm

    ... [truncated] ...

  'webpack':
    access: $all
    publish: $authenticated
    proxy: server1 server2
```

Verdaccio supports multiple registries on the `proxy` field. The request will be resolved with the first in the list; if that
fails, it will try with the next in the list and so on.

## Offline Registry {#offline-registry}

Having a full Offline Registry is completely possible. If you don't want any connectivity with external remotes you
can do the following.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
uplinks:
packages:
  '@my-company/*':
    access: $all
    publish: none
  '@*/*':
    access: $all
    publish: $authenticated
  '**':
    access: $all
    publish: $authenticated
```

Remove all `proxy` fields within each section of `packages`. The registry will become full offline.
