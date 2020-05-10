---
id: sise ifasẹsi
title: "Sise ifasẹsi"
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions are also handled by the [Package Access](packages.md).

<div id="codefund">''</div>

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

#### Igbejade alainidamọ

`verdaccio` allows you to enable anonymous publish, to achieve that you will need to set up correctly your [packages access](packages.md).

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
* Ti o ba wọle, `$anonymous` ko ni jẹ ara awọn ẹgbẹ akojọpọ rẹ ati `$all` ma se asopọ pẹlu eyikeyi olumulo ti o ba ti wọle. Ẹgbẹ akojọpọ tuntun kan `$authenticated` ma jẹ fifikun si akojọ naa.

Bi amulọ, `$all` **ma se asopọ gbogbo awọn olumulo, ni alaigbarale boya o ti wọle tabi ko wọle**.

**Ohun elo ifasẹsi atilẹwa nikan ni iwa iṣaaju yẹn bawi**. Ti o ba n lo ohun elo akanṣe ati ti iru ohun elo bẹ ba n se imuṣiṣẹ `allow_access`, `allow_publish` tabi `allow_unpublish`, awọn ipinnu ti iwọle naa da lori ohun elo naa funrararẹ. Verdaccio ma ṣeto awọn ẹgbẹ akojọpọ atilẹwa nikan.

Jẹ ki a ṣe atungbeyẹwo ni ṣoki:

* **ti wọle**: `$all`, `$authenticated`, + awọn ẹgbẹ akojọpọ ti o jẹ fifikun nipasẹ ohun elo naa
* **alainidamọ (ti jade sita)**: `$all` ati `$anonymous`.

## htpasswd atilẹwa

In order to simplify the setup, `verdaccio` uses a plugin based on `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

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

In case you decide to not allow users to sign up, you can set `max_users: -1`.