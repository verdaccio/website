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
    

Этот способ вполне годный, но есть несколько минусов:

* Работает **только для scope**
* Учитывается только полное совпадение имени scope, **никаких регулярных выражений**
* Один scope **не может иметь связь с несколькими репозиториями**
* Токены/пароли **должны быть опеределны в ** `.npmrc`.

Полный пример смотрите [здесь](https://stackoverflow.com/questions/54543979/npmrc-multiple-registries-for-the-same-scope/54550940#54550940).

## Связь с репозиторием

Добавить связь с новым репозиторием очень просто. Во-первых, добавьте новый блок в секции `uplinks`. Помните, порядок имеет значение.

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