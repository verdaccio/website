---
id: sise ifasẹsi
title: "Sise ifasẹsi"
---

Ifasẹsi naa jẹ sisopọ mọ auth [ plugin](plugins.md) ti o n lo. Awọn idena akojọ naa n jẹ ṣiṣakoso nipasẹ [ Iwọlesi ti Akojọ](packages.md).

Ifasẹsi onibara naa n jẹ ṣiṣakoso nipasẹ `npm` onibara funrarẹ. Lọgan ti o ba wọle si ohun elo naa:

```bash
npm adduser --registry http://localhost:4873
```

Aami kan ma jẹ ṣisẹda ninu `npm` faili iṣeto ti igbalejo rẹ wa ninu foda ile olumulo rẹ. Fun ẹkunrẹrẹ alaye nipa `.npmrc` ka [ iwe alasẹ](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Igbejade alailorukọ

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

** ise tele je fun ijerisi aiyipada plugini**. Ti o ban lo plugini eleyi ti o ba ini e mu ti plugini na wan gbese awon `fayegba_igbaniwole`, `fayegba_igbajade` tabi `fayegba_aitigbejade`, ibi ti a paju de si fun igbaniwole da lori plugini na gangan. Verdaccio akan seto awon akojo alaiyipada nikan.

Ejeki a gbeyewo gbogbo oun tati ko:

* **gbawole**: `$all`. `$authenticated` + awon akojo ti a fikun nipase plugini na
* **aidanimo (igbejade): `$all` ati `$anonymous`.</li> </ul> 
    
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