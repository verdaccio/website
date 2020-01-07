---
id: version-4.4.1-authentification
title: Autentifikacija
original_id: autentifikacija
---

Autentifikacija je vezana za auth [plugin](plugins.md) koji koristite. Restrikcije koje se odnose na paket se mogu podesiti (handle) preko [Package Access](packages.md).

<div id="codefund">''</div>

Autentifikacija klijenta se obavlja (handle) preko samog `npm` klijenta. Nakon što se prijavite u aplikaciju:

```bash
npm adduser --registry http://localhost:4873
```

Token se generiše u fajlu za konfiguraciju `npm`, koji se nalazi u home folder-u korisnika. Kako biste saznali više o `.npmrc` pročitajte [zvaničnu dokumentaciju](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Anonimno publikovanje

`verdaccio` Vam omogućava da pružite mogućnost anonimnog publikovanja. Kako biste uspeli u tome, potrebno je da podesite [packages access](packages.md).

Primer:

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

As is described [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) until `npm@5.3.0` and all minor releases **won't allow you publish without a token**.

## Understanding Groups

### The meaning of `$all` and `$anonymous`

As you know *Verdaccio* uses the `htpasswd` by default. That plugin does not implement the methods `allow_access`, `allow_publish` and `allow_unpublish`. Thus, *Verdaccio* will handle that in the following way:

* If you are not logged in (you are anonymous), `$all` and `$anonymous` means exactly the same.
* If you are logged in, `$anonymous` won't be part of your groups and `$all` will match any logged user. A new group `$authenticated` will be added to the list.

As a takeaway, `$all` **will match all users, independently whether is logged or not**.

**The previous behavior only applies to the default authentication plugin**. If you are using a custom plugin and such plugin implements `allow_access`, `allow_publish` or `allow_unpublish`, the resolution of the access depends on the plugin itself. Verdaccio will only set the default groups.

Let's recap:

* **logged**: `$all`, `$authenticated`, + groups added by the plugin
* **anonymous (logged out)**: `$all` and `$anonymous`.

## Podrazumevana htpasswd

Kako bi se pojednostavio setup, `verdaccio` koristi plugin baziran na `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maksimalni broj korisnika koji mogu da se registruju, fabrički je podešeno na beskonačno "+inf".
    # Ako hoćete da onemogućite registraciju, podesite ovo na -1.
    #max_users: 1000
```

| Svojstvo  | Tip    | Neophodno | Primer     | Podrška | Opis                                   |
| --------- | ------ | --------- | ---------- | ------- | -------------------------------------- |
| file      | string | Da        | ./htpasswd | all     | file koji sadrži šifrovane credentials |
| max_users | number | Ne        | 1000       | all     | podešava maksimalni broj korisnika     |

Ako se odlučite na to da ne dozvolite korisnicima da se prijave, možete podesiti `max_users: -1`.
