---
id: version-4.0.0-alpha.5-linking-remote-registry
title: Linking a Remote Registry
original_id: linking-remote-registry
---

Verdaccio is a proxy and by default [links](uplinks.md) the public registry.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

You can link multiples registries, the following document will drive you throught some helpful configurations.

## Using Asociating Scope

The unique way to access multiple registries using the `.npmrc` is the scope feature as follows:

    // .npmrc
    registry=htts://registry.npmjs.org
    @mycompany:registry=http://localhost:4873
    

This approache is valid, but comes with several dissadventages:

* It **only works with scopes**
* Scope must match, **no Regular Expressions are allowed**
* One scope **cannot fetch from multiple registries**
* Tokens/passwords **must be defined within** `.npmrc` and checked in into the repo.

See a full example [here](https://stackoverflow.com/questions/54543979/npmrc-multiple-registries-for-the-same-scope/54550940#54550940).

## Linking a Registry

Link a registry is fairly simple, first, define a new section in the `uplinks` section, note the order here is irrelevant.

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

## Linking Multiples Registry

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

Verdaccio supports multiples registries on the `proxy` field, the request will be resolved with the first in the list, if fails, it will try with the next in the list and so on.

## Offline Registry

Having a full Offline Registry is completely possible, if you don't want any connectivity with external remotes you can do the following.

```yaml
<br />auth:
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

Remote all `proxy` fields within each section of `packages`. The registry will became full offline.