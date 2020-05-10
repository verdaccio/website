---
id: version-4.6.1-authentification
title: Sise ifasẹsi
original_id: sise ifasẹsi
---

Ifasẹsi naa jẹ siso mọ ohun elo asomọ [ohun elo asomọ](plugins.md) auth ti o n lo. The package restrictions are also handled by the [Package Access](packages.md).

<div id="codefund">''</div>

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

`verdaccio` allows you to enable anonymous publish, to achieve that you will need to set up correctly your [packages access](packages.md).

Fun apẹẹrẹ:

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

As is described [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) until `npm@5.3.0` and all minor releases **won't allow you publish without a token**.

## Nini oye Awọn ẹgbẹ akojọpọ

### Itunmọ `$all` ati `$anonymous`

As you know *Verdaccio* uses the `htpasswd` by default. Ohun elo yẹn ko ṣe amuṣiṣẹ awọn ọna naa `allow_access`, `allow_publish` and `allow_unpublish`. Thus, *Verdaccio* will handle that in the following way:

* Ti o ko ba wọle (o jẹ alainidamọ), `$all` ati `$anonymous` tumọ si nkankan na.
* Ti o ba wọle, `$anonymous` ko ni jẹ ara awọn ẹgbẹ akojọpọ rẹ atipe `$all` ma se asopọ pẹlu eyikeyi olumulo ti o ba ti wọle. Ẹgbẹ akojọpọ tuntun kan `$authenticated` ma jẹ fifikun si akojọ naa.

As a takeaway, `$all` **will match all users, independently whether is logged or not**.

**The previous behavior only applies to the default authentication plugin**. Ti o ba n lo ohun elo akanṣe ati ti iru ohun elo bẹ ba n se imuṣiṣẹ `allow_access`, `allow_publish` tabi `allow_unpublish`, awọn ipinnu ti iwọle naa da lori ohun elo naa funrararẹ. Verdaccio ma ṣeto awọn ẹgbẹ akojọpọ atilẹwa nikan.

Jẹ ki a ṣe atungbeyẹwo ni ṣoki:

* **logged**: `$all`, `$authenticated`, + groups added by the plugin
* **anonymous (logged out)**: `$all` and `$anonymous`.

## htpasswd atilẹwa

In order to simplify the setup, `verdaccio` uses a plugin based on `htpasswd`. Lati ẹya v3.0.x ohun elo `verdaccio-htpasswd` naa n jẹ lilo ni atilẹwa.

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

In case you decide to not allow users to sign up, you can set `max_users: -1`.
