---
id: linking-remote-registry
title: "Связь с удалённым репозиторием"
---

Verdaccio - это прокси, и по умолчанию у него есть [связь](uplinks.md) с публичным репозиторием.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

У вас может быть связь с несколькими репозиториями, и в этом документе вы найдете несколько полезных конфигураций.

## Используем scope

Единственный способ для доступа к нескольким репозиториям, использующийся в `.npmrc`, это разделение по scope, например:

    // .npmrc
    registry=https://registry.npmjs.org
    @mycompany:registry=http://localhost:4873
    

This approach is valid, but comes with several disadvantages:

* It **only works with scopes**
* Scope must match, **no Regular Expressions are allowed**
* One scope **cannot fetch from multiple registries**
* Tokens/passwords **must be defined within** `.npmrc` and checked in into the repo.

See a full example [here](https://stackoverflow.com/questions/54543979/npmrc-multiple-registries-for-the-same-scope/54550940#54550940).

## Linking a Registry

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

## Linking Multiple Registries

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

Verdaccio supports multiple registries on the `proxy` field. The request will be resolved with the first in the list; if that fails, it will try with the next in the list and so on.

## Offline Registry

Having a full Offline Registry is completely possible. If you don't want any connectivity with external remotes you can do the following.

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

Remove all `proxy` fields within each section of `packages`. The registry will became full offline.