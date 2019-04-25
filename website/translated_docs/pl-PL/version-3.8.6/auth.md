---
id: version-3.8.6-authentification
title: Uwierzytelnianie
original_id: uwierzytelnianie
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

The client authentification is handled by `npm` client itself. Once you login to the application:

```bash
npm adduser --registry http://localhost:4873
```

Token jest generowany w pliku konfiguracyjnym `npm` znajdującym się w folderze domowym Twojego użytkownika. Aby uzyskać więcej informacji o `.npmrc` przeczytaj [oficjalną dokumentację](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Anonimowa publikacja

`verdaccio`umożliwia włączenie anonimowego publikowania, aby to osiągnąć, musisz poprawnie ustawić swój [dostęp do pakietów](packages.md).

Eg:

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

Zgodnie z opisem [w sprawie #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) aż do `npm@5.3.0` i wszystkie drobne wersje **nie pozwolą ci publikować bez tokenu**. Jednakże `yarn` nie posiada takich ograniczeń.

## Domyślne htpasswd

Aby ułatwić konfigurację, `verdaccio` używa wtyczki bazującej na `htpasswd`. Począwszy od wersji v3.0.x domyślnie używana jest [zewnętrzna wtyczka](https://github.com/verdaccio/verdaccio-htpasswd). Ten pakiet, w wersji v2.x nadal zawiera wbudowaną wersję tej wtyczki.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    #max_users: 1000
```

| Właściwość | Typ         | Wymagane | Przykład   | Wsparcie  | Opis                                              |
| ---------- | ----------- | -------- | ---------- | --------- | ------------------------------------------------- |
| plik       | ciąg znaków | Tak      | ./htpasswd | wszystkie | plik, który udostępnia zaszyfrowane poświadczenia |
| max_users  | numer       | Nie      | 1000       | wszystkie | ustaw limit użytkowników                          |

W przypadku, gdy będziesz chciał wyłączyć możliwość zalogowania się, ustaw `max_users: -1`.