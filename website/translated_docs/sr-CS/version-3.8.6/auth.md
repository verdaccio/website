---
id: version-3.8.6-authentification
title: Autentifikacija
original_id: autentifikacija
---
The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

The client authentification is handled by `npm` client itself. Once you login to the application:

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

Kao što je opisano, [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) sve dok `npm@5.3.0` i sve verzije ne budu usaglašene **neće Vam biti omogućeno da publikujete bez tokena**. Ipak, `yarn` nema ta ograničenja.

## Podrazumevana htpasswd

Kako bi se pojednostavio setup, `verdaccio` koristi plugin baziran na `htpasswd`. Od verzije v3.0.x [eksterni plugin](https://github.com/verdaccio/verdaccio-htpasswd) se koristi kao podrazumevan. Verzija v2.x i dalje sadrži ugrađenu verziju ovog plugin-a.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    #max_users: 1000
```

| Svojstvo  | Tip    | Neophodno | Primer     | Podrška | Opis                                   |
| --------- | ------ | --------- | ---------- | ------- | -------------------------------------- |
| file      | string | Da        | ./htpasswd | all     | file koji sadrži šifrovane credentials |
| max_users | number | Ne        | 1000       | all     | podešava maksimalni broj korisnika     |

Ako se odlučite na to da ne dozvolite korisnicima da se prijave, možete podesiti `max_users: -1`.