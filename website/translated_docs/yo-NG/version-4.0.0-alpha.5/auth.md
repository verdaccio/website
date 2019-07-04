---
id: version-4.0.0-alpha.5-authentification
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

Bi apejuwe rẹ ti ṣe jẹ ṣiṣe [lori ọrọ #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) titi `npm@5.3.0` atipe gbogbo awọn ifilọlẹ kekere **koni fayegba ọ lati se atẹjade laisi aami kankan**.

## Nini oye Awọn ẹgbẹ akojọpọ

### Itunmọ `$all` ati `$anonymous`

Bi o se mọ *Verdaccio* n lo `htpasswd` ni atilẹwa. Ohun elo yẹn ko ṣe amuṣiṣẹ awọn ọna naa `allow_access`, `allow_publish` and `allow_unpublish`. Nitorina, *Verdaccio* ma mojuto iyẹn ni ọna wọnyi:

* Ti o ko ba wọle (o jẹ alainidamọ), `$all` ati `$anonymous` tumọ si nkankan na.
* If you are logged in, `$anonymous` won't be part of your groups and `$all` will match any logged user. A new group `$authenticated` will be added to the list.

Bi amulọ, `$all` **ma se asopọ gbogbo awọn olumulo, ni alaigbarale boya o ti wọle tabi ko wọle**.

**Ohun elo ifasẹsi atilẹwa nikan ni iwa iṣaaju yẹn bawi**. Ti o ba n lo ohun elo akanṣe ati ti iru ohun elo bẹ ba n se imuṣiṣẹ `allow_access`, `allow_publish` tabi `allow_unpublish`, awọn ipinnu ti iwọle naa da lori ohun elo naa funrararẹ. Verdaccio ma ṣeto awọn ẹgbẹ akojọpọ atilẹwa nikan.

Jẹ ki a ṣe atungbeyẹwo ni ṣoki:

* **ti wọle**: `$all`, `$authenticated`, + awọn ẹgbẹ akojọpọ ti o jẹ fifikun nipasẹ ohun elo naa
* **alainidamọ (ti jade sita)**: `$all` ati `$anonymous`.

## htpasswd atilẹwa

Lati le tubọ mu iṣeto naa rọrun, `verdaccio` n lo ohun elo asomọ kan to da lori `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Iye awọn olumulo to pọju ti aaye wa fun lati forukọsilẹ, n pada si "+inf".
    # O le ṣeto eyi si -1 lati yọ iforukọsilẹ kuro.
    #max_users: 1000
```

| Ohun ini  | Iru   | Ti o nilo | Apẹẹrẹ     | Atilẹyin | Apejuwe                               |
| --------- | ----- | --------- | ---------- | -------- | ------------------------------------- |
| faili     | okun  | Bẹẹni     | ./htpasswd | gbogbo   | faili to gbalejo awọn iwe ẹri alaroko |
| max_users | nọmba | Rara      | 1000       | gbogbo   | ṣeto gbedeke iye awọn olumulo         |

Toba sẹlẹ pe o pinnu lati ma fayegba olumulo lati wọle, o le ṣeto `max_users: -1`.