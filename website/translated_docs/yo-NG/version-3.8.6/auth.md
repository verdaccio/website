---
id: version-3.8.6-authentification
title: Sise ijerisi
original_id: sise ijerisi
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

The client authentification is handled by `npm` client itself. Once you login to the application:

```bash
npm aropoolumulo --iforukosile http://localhost:4873
```

A wa tokini kan ninu `npm` iseto apo ti a seda ni apo ile olumulo. Fun alaye lekunrere nisoa `.npmrc` ka [ iwe ijoba ](https://docs.npmjs.com/files/npmrc)l.

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Igbajade alailoruko

`verdaccio`nfayegba fun enikeni lati se igbejade alailoruko, lati se eleyi wa nilo lati se agbekale pipe ti[awon apo igbaniwole](packages.md).

Bi apeere:

```yaml
  'ile-ise mi-*':
     igbaniwole: $anonymous
    igbejade: $anonymous
    asoju: npmjs
```

As is described [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) until `npm@5.3.0` and all minor releases **won't allow you publish without a token**. However `yarn` has not such limitation.

## Default htpasswd

In order to simplify the setup, `verdaccio` use a plugin based on `htpasswd`. As of version v3.0.x an [external plugin](https://github.com/verdaccio/verdaccio-htpasswd) is used by default. The v2.x version of this package still contains the built-in version of this plugin.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    #max_users: 1000
```

| Property  | Type   | Required | Example    | Support | Description                              |
| --------- | ------ | -------- | ---------- | ------- | ---------------------------------------- |
| file      | string | Yes      | ./htpasswd | all     | file that host the encrypted credentials |
| max_users | number | No       | 1000       | all     | set limit of users                       |

In case to decide do not allow user to login, you can set `max_users: -1`.