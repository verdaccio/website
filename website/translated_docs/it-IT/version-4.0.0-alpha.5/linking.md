---
id: version-4.0.0-alpha.5-linking-remote-registry
title: Collegare un Registro Remoto
original_id: linking-remote-registry
---

Verdaccio è un proxy e di default [collega](uplinks.md) il registro pubblico.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

You can link multiples registries, the following document will drive you throught some helpful configurations.

## Using Asociating Scope

L'unica maniera per accedere a registri multipli utilizzando il `.npmrc` è la funzione scope come segue:

    // .npmrc
    registry=htts://registry.npmjs.org
    @mycompany:registry=http://localhost:4873
    

This approache is valid, but comes with several dissadventages:

* **Funziona esclusivamente con scope**
* Lo scope deve coincidere, **non sono permesse Espressioni Regolari**
* Uno scope **non può raccogliere da registri multipli**
* Token e password **devono essere definiti all'interno di** `.npmrc` e registrati nel repository.

Vedi un esempio completo [qui](https://stackoverflow.com/questions/54543979/npmrc-multiple-registries-for-the-same-scope/54550940#54550940).

## Collegare un Registro

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

Aggiungere una sezione `proxy` per definire il registro selezionato che si desidera utilizzare come proxy.

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

## Registro Offline

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

Remote all `proxy` fields within each section of `packages`. Il registro diventerà completamente offline.