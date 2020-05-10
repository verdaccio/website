---
id: version-4.6.1-authentification
title: Autentizace
original_id: autentizace
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions are also handled by the [Package Access](packages.md).

<div id="codefund">''</div>

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

`verdaccio` allows you to enable anonymous publish, to achieve that you will need to set up correctly your [packages access](packages.md).

Např.:

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

As is described [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) until `npm@5.3.0` and all minor releases **won't allow you publish without a token**.

## Principy skupin

### Význam `$all` a `$anonymous`

As you know *Verdaccio* uses the `htpasswd` by default. Tento doplňek neimplementuje metody `allow_access`, `allow_publish` a `allow_unpublish`. Thus, *Verdaccio* will handle that in the following way:

* Pokud nejste přihlášení (jste anonymní), `$all` a `$anonymous` znamenají to samé.
* If you are logged in, `$anonymous` won't be part of your groups and `$all` will match any logged user. A new group `$authenticated` will be added to the list.

As a takeaway, `$all` **will match all users, independently whether is logged or not**.

**The previous behavior only applies to the default authentication plugin**. Pokud používáte vlastní doplněk a tento doplněk implementuje použití `allow_access`, `allow_publish` nebo `allow_unpublish`, řešení přístupu závisí na plugin samotném. Verdaccio nastaví pouze výchozí skupiny.

Rekapitulace:

* **logged**: `$all`, `$authenticated`, + groups added by the plugin
* **anonymous (logged out)**: `$all` and `$anonymous`.

## Default htpasswd

In order to simplify the setup, `verdaccio` uses a plugin based on `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

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

In case you decide to not allow users to sign up, you can set `max_users: -1`.
