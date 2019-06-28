---
id: version-3.8.6-authentification
title: Sise ifasẹsi
original_id: sise ifasẹsi
---

Ifasẹsi naa jẹ siso mọ ohun elo asomọ [ohun elo asomọ](plugins.md) auth ti o n lo. Awọn idena akopọ naa tun n jẹ mimojuto nipasẹ awọn [Iwọlesi Akopọ](packages.md).

Ifasẹsi onibara n jẹ mimojuto nipasẹ onibara `npm` funra rẹ. Lọgan ti o ba ti wọle si ohun elo naa:

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

#### Igbejade alainidamọ

`verdaccio``verdaccio`gba ọ laaye lati ṣe imuṣiṣẹ igbejade alainidamọ, lati ni aṣeyọri pẹlu iyẹn o ma nilo lati seto [Iwọlesi ti Akojọ](packages.md) rẹ daradara.

Fun apẹẹrẹ:

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

Bi apejuwe rẹ ti ṣe jẹ ṣiṣe [lori ọrọ #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) titi `npm@5.3.0` atipe gbogbo awọn ifilọlẹ kekere **koni fayegba ọ lati se atẹjade laisi aami kankan**. Amọ sa `yarn` ko ni iru opin yẹn.

## htpasswd atilẹwa

Lati le tubọ mu iṣeto naa rọrun, `verdaccio` n lo ohun elo asomọ kan to da lori `htpasswd`. As of version v3.0.x an [external plugin](https://github.com/verdaccio/verdaccio-htpasswd) is used by default. The v2.x version of this package still contains the built-in version of this plugin.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    #max_users: 1000
```

| Ohun ini  | Iru   | Ti o nilo | Apẹẹrẹ     | Atilẹyin | Apejuwe                               |
| --------- | ----- | --------- | ---------- | -------- | ------------------------------------- |
| faili     | okun  | Bẹẹni     | ./htpasswd | gbogbo   | faili to gbalejo awọn iwe ẹri alaroko |
| max_users | nọmba | Rara      | 1000       | gbogbo   | ṣeto gbedeke iye awọn olumulo         |

In case to decide do not allow user to login, you can set `max_users: -1`.