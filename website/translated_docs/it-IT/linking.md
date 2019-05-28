---
id: linking-remote-registry
title: "Collegare un Registro Remoto"
---

Verdaccio è un proxy e di default [collega](uplinks.md) il registro pubblico.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

È possibile collegare più registri: il documento seguente guiderà attraverso alcune utili configurazioni.

## Utilizzo dell'Associazione di Scope

L'unica maniera per accedere a più registri utilizzando il `.npmrc` è la funzione scope come segue:

    // .npmrc
    registry=https://registry.npmjs.org
    @mycompany:registry=http://localhost:4873
    

Questo approccio è valido, tuttavia presenta diversi svantaggi:

* **Funziona esclusivamente con scope**
* Lo scope deve coincidere, **non sono permesse Espressioni Regolari**
* One scope **cannot fetch from multiple registries**
* Token e password **devono essere definiti all'interno di** `.npmrc` e registrati nel repository.

Vedi un esempio completo [qui](https://stackoverflow.com/questions/54543979/npmrc-multiple-registries-for-the-same-scope/54550940#54550940).

## Collegare un Registro

Collegare un registro è abbastanza semplice. Per primo, definire una sezione nuova nella sezione degli `uplinks`. Notare, l'ordine qui è irrilevante.

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

Verdaccio supporta registri multipli nel campo `proxy`. The request will be resolved with the first in the list; if that fails, it will try with the next in the list and so on.

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