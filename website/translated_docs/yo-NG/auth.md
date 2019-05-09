---
id: sise ijerisi
title: "Sise ijerisi"
---

A so sise ijerisi mo auth [ plugin](plugins.md) ta n mulo. an seto awon ihamo ti pali nipa ti [ Agbawole Pali](packages.md).

Eto ijerisi ti olubara lan kapa e nipa `npm` ti olubara fun ra ra e. Logan to ba te wole lori ero na:

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

As is described [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) until `npm@5.3.0` and all minor releases **won't allow you publish without a token**.

## Imo oye awon Akojo

### Itunmo ti `$all` ati `$anonymous`

Bu a se mo *Verdaccio* nlo awon `htpasswd` ni aiyipada. Plugini na ko gbe se awon ona no `fayefun_igbawole`,`fayegba_igbejade` ati `fayegba_ako ti gbejade`. Ni eleyi, *Verdaccio* yio kapa re ni awon ona yi:

* Ti o ba ti se agbawole (ako da o mo), `$all` ati `<code>$anonymous` tunmo si ikan kanna.
* Ti o ba ti se agbawole, `$anonymous` koni je ara akojonre at `$all` yio jo mo olumulo yio wu to ba je to ba se agbawole. Akojo titun kan `$authenticated` a je afikun si atojo na.

Bi amu rele, `$all` ** yio jomo gbogbo awon olumulo, leyokokan yalanwon se agbewole tabi won ko se**.

** ise tele je fun ijerisi aiyipada plugini**. If you are using a custom plugin and such plugin implements `allow_access`, `allow_publish` or `allow_unpublish`, the resolution of the access depends on the plugin itself. Verdaccio will only set the default groups.

Let's recap:

* **logged**: `$all`, `$authenticated`, + groups added by the plugin
* **anonymous (logged out)**: `$all` and `$anonymous`.

## Default htpasswd

In order to simplify the setup, `verdaccio` use a plugin based on `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

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