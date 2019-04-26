---
id: version-3.8.6-authentification
title: Autentizace
original_id: autentizace
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

The client authentification is handled by `npm` client itself. Once you login to the application:

```bash
npm adduser --registry http://localhost:4873
```

Token je vygenerovaný v konfiguračním souboru `npm` hostovaném ve Vaší domovské složce uživatele. Pro více informací o `.npmrc` si přečtěte [oficiální dokumentaci](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Anonymní publikování

`Verdaccio` Vám umožňuje nastavit anonymní publikování. Abyste toho dosáhli, budete muset správně nastavit svůj [přístup k balíčkům](packages.md).

Např.:

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
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

| Vlastnost | Typ     | Požadované | Příklad    | Podpora | Popis                                               |
| --------- | ------- | ---------- | ---------- | ------- | --------------------------------------------------- |
| file      | řetězec | Ano        | ./htpasswd | všechny | soubor, který obsahuje šifrované přihlašovací údaje |
| max_users | číslo   | Ne         | 1000       | všechny | nastavit limit uživatelů                            |

In case to decide do not allow user to login, you can set `max_users: -1`.