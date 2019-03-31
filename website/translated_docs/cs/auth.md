---
id: autentizace
title: "Autentizace"
---
The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

The client authentification is handled by `npm` client itself. Once you login to the application:

```bash
npm adduser --registry http://localhost:4873
```

A token is generated in the `npm` configuration file hosted in your user home folder. Pro více informací o `.npmrc` si přečtěte [oficiální dokumentaci](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Anonymous publish

`verdaccio`allows you to enable anonymous publish, to achieve that you will need to set up correctly your [packages access](packages.md).

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

Jak víte, *Verdaccio* používá ve výchozím nastavení `htpasswd`. That plugin does not implement the methods `allow_access`, `allow_publish` and `allow_unpublish`. Thus, *Verdaccio* will handle that in the following way:

* If you are not logged in (you are anonymous), `$all` and `$anonymous` means exactly the same.
* If you are logged in, `$anonymous` won't be part of your groups and `$all` will match any logged user. A new group `$authenticated` will be added to the list.

Nastavení `$all` **bude odpovídat všem uživatelům, přihlášeným i nepřihlášeným**.

**The previous behavior only applies to the default authentication plugin**. If you are using a custom plugin and such plugin implements `allow_access`, `allow_publish` or `allow_unpublish`, the resolution of the access depends on the plugin itself. Verdaccio will only set the default groups.

Rekapitulace:

* **logged**: `$all`, `$authenticated`, + skupiny přidané doplňkem
* **anonymous (odhlášený)**: `$all` a `$anonymous`.

## Default htpasswd

Pro zjednodušení instalace, `verdaccio` používá doplněk založený na `htpasswd`. Od verze v3.0.x je používán `verdaccio-htpasswd` jako výchozí doplněk.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maximální množství uživatelů, kteří se mohou registrovat, výchozí nastaveno na "+inf".
    # Můžete nastavit -1 pro zablokování registrací.
    #max_users: 1000
```

| Vlastnost | Typ     | Požadované | Příklad    | Podpora | Popis                                               |
| --------- | ------- | ---------- | ---------- | ------- | --------------------------------------------------- |
| file      | řetězec | Ano        | ./htpasswd | všechny | soubor, který obsahuje šifrované přihlašovací údaje |
| max_users | číslo   | Ne         | 1000       | všechny | nastavit limit uživatelů                            |

In case to decide do not allow user to login, you can set `max_users: -1`.