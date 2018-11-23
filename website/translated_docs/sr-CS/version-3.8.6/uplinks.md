---
id: version-3.8.6-uplinks
title: Uplinks
original_id: uplinks
---
*uplink* je link koji sadrži external registry koji omogućava pristup do external packages.

![Uplinks](/img/uplinks.png)

### Korišćenje

```yaml
uplinks:
  npmjs:
   url: https://registry.npmjs.org/
  server2:
    url: http://mirror.local.net/
    timeout: 100ms
  server3:
    url: http://mirror2.local.net:9000/
  baduplink:
    url: http://localhost:55666/
```

### Konfigurisanje

You can define mutiple uplinks and each of them must have an unique name (key). They can have two properties:

| Svojstvo     | Tip     | Neophodno | Primer                                 | Podrška | Opis                                                                                                                               | Podrazumevano     |
| ------------ | ------- | --------- | -------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| url          | string  | Da        | https://registry.npmjs.org/            | all     | Url registry-a                                                                                                                     | npmjs             |
| ca           | string  | Ne        | ~./ssl/client.crt'                     | all     | Put do SSL sertifikata                                                                                                             | Nema ništa zadato |
| timeout      | string  | Ne        | 100ms                                  | all     | podesite novi timeout za request                                                                                                   | 30s               |
| maxage       | string  | Ne        | 10m                                    | all     | limitira maksimalni broj neuspelih zahteva                                                                                         | 2m                |
| fail_timeout | string  | Ne        | 10m                                    | all     | definiše maksimalno vreme nakon kojeg zahtev postaje neuspešan                                                                     | 5m                |
| max_fails    | number  | Ne        | 2                                      | all     | limitira maksimalni broj neuspelih zahteva                                                                                         | 2                 |
| cache        | boolean | Ne        | [true,false]                           | >= 2.1  | keširanje svih tarballs iz storage-a                                                                                               | true              |
| auth         | list    | Ne        | [vidi ispod](uplinks.md#auth-property) | >= 2.5  | dodeljuje zaglavlje 'Authorization' [više informacija](http://blog.npmjs.org/post/118393368555/deploying-with-npm-private-modules) | onemogućeno       |
| headers      | list    | Ne        | autorizacija: "Bearer SecretJWToken==" | all     | lista korisničkih, prilagođenih zaglavlja za uplink                                                                                | onemogućeno       |
| strict_ssl   | boolean | Ne        | [true,false]                           | > = 3.0 | If true, zahteva da SSL certifikat bude validan.                                                                                   | true              |

#### Auth property

The `auth` property allows you to use an auth token with an uplink. Using the default environment variable:

```yaml
uplinks:
  private:
    url: https://private-registry.domain.com/registry
    auth:
      type: bearer
      token_env: true # defaults to `process.env['NPM_TOKEN']`   
```

ili preko definisane environment variable:

```yaml
uplinks:
  private:
    url: https://private-registry.domain.com/registry
    auth:
      type: bearer
      token_env: FOO_TOKEN
```

`token_env: FOO_TOKEN`za internu upotrebu koristi `process.env['FOO_TOKEN']`

ili je direktno definisano tokenom:

```yaml
uplinks:
  private:
    url: https://private-registry.domain.com/registry
    auth:
      type: bearer
      token: "token"
```

> Napomena: `token` ima prioritet nad `token_env`

### Valjalo bi znati

* Uplinks must be registries compatible with the `npm` endpoints. Eg: *verdaccio*, `sinopia@1.4.0`, *npmjs registry*, *yarn registry*, *JFrog*, *Nexus* and more.
* Setting `cache` to false will help to save space in your hard drive. This will avoid store `tarballs` but [it will keep metadata in folders](https://github.com/verdaccio/verdaccio/issues/391).
* Exceed with multiple uplinks might slow down the lookup of your packages due for each request a npm client does, verdaccio does 1 call for each uplink.
* The (timeout, maxage and fail_timeout) format follow the [NGINX measurement units](http://nginx.org/en/docs/syntax.html)