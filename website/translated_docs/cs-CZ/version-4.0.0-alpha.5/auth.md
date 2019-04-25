---
id: version-4.0.0-alpha.5-authentification
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

As is described [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) until `npm@5.3.0` and all minor releases **won't allow you publish without a token**.

## Principy skupin

### Význam `$all` a `$anonymous`

Jak víte, *Verdaccio* používá ve výchozím nastavení `htpasswd`. Tento doplňek neimplementuje metody `allow_access`, `allow_publish` a `allow_unpublish`. Tím pádem bude *Verdaccio* řešit tyto případy následujícím způsobem:

* Pokud nejste přihlášení (jste anonymní), `$all` a `$anonymous` znamenají to samé.
* If you are logged in, `$anonymous` won't be part of your groups and `$all` will match any logged user. A new group `$authenticated` will be added to the list.

Nastavení `$all` **bude odpovídat všem uživatelům, přihlášeným i nepřihlášeným**.

**Výše popsané chování se vztahuje pouze na výchozí doplněk pro ověřovaní**. Pokud používáte vlastní doplněk a tento doplněk implementuje použití `allow_access`, `allow_publish` nebo `allow_unpublish`, řešení přístupu závisí na plugin samotném. Verdaccio nastaví pouze výchozí skupiny.

Rekapitulace:

* **logged**: `$all`, `$authenticated`, + skupiny přidané doplňkem
* **anonymous (odhlášený)**: `$all` a `$anonymous`.

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

| Vlastnost | Typ     | Požadované | Příklad    | Podpora | Popis                                               |
| --------- | ------- | ---------- | ---------- | ------- | --------------------------------------------------- |
| file      | řetězec | Ano        | ./htpasswd | všechny | soubor, který obsahuje šifrované přihlašovací údaje |
| max_users | číslo   | Ne         | 1000       | všechny | nastavit limit uživatelů                            |

In case to decide do not allow user to login, you can set `max_users: -1`.