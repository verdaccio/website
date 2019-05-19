---
id: version-4.0.0-alpha.5-authentification
title: Sise ifasẹsi
original_id: sise ifasẹsi
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

The client authentification is handled by `npm` client itself. Once you login to the application:

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

As is described [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) until `npm@5.3.0` and all minor releases **won't allow you publish without a token**.

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

| Ohun ini  | Iru   | Ti o nilo | Apẹẹrẹ     | Atilẹyin | Apejuwe                               |
| --------- | ----- | --------- | ---------- | -------- | ------------------------------------- |
| faili     | okun  | Bẹẹni     | ./htpasswd | gbogbo   | faili to gbalejo awọn iwe ẹri alaroko |
| max_users | nọmba | Rara      | 1000       | gbogbo   | ṣeto gbedeke iye awọn olumulo         |

In case to decide do not allow user to login, you can set `max_users: -1`.