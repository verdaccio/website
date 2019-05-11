---
id: version-4.0.0-alpha.5-linking-remote-registry
title: Связь с удалённым репозиторием
original_id: linking-remote-registry
---

Verdaccio - это прокси, и по умолчанию у него есть [связь](uplinks.md) с публичным репозиторием.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

You can link multiples registries, the following document will drive you throught some helpful configurations.

## Using Asociating Scope

Единственный способ для доступа к нескольким репозиториям, использующийся в `.npmrc`, это разделение по scope, например:

    // .npmrc
    registry=htts://registry.npmjs.org
    @mycompany:registry=http://localhost:4873
    

This approache is valid, but comes with several dissadventages:

* Работает **только для scope**
* Учитывается только полное совпадение имени scope, **никаких регулярных выражений**
* Один scope **не может иметь связь с несколькими репозиториями**
* Токены/пароли **должны быть опеределны в ** `.npmrc`.

Полный пример смотрите [здесь](https://stackoverflow.com/questions/54543979/npmrc-multiple-registries-for-the-same-scope/54550940#54550940).

## Связь с репозиторием

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

Во-вторых, добавьте строчку `proxy`, чтобы определить, какой репозиторий вы хотите использовать.

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

## Оффлайновый репозиторий

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

Remote all `proxy` fields within each section of `packages`. Реестр станет полностью оффлайновым.