---
id: uwierzytelnianie
title: "Uwierzytelnianie"
---
Uwierzytelnianie jest powiązane z auth [wtyczką](plugins.md), której używasz. Ograniczenia dotyczące pakietów są również obsługiwane przez [Dostęp do pakietu](packages.md).

Uwierzytelnianie klienta jest obsługiwane przez samego klienta `npm`. Kiedy już zalogujesz się do aplikacji:

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

## Understanding Groups

//TODO: https://github.com/verdaccio/verdaccio/issues/1120

## Domyślne htpasswd

Aby ułatwić konfigurację, `verdaccio` używa wtyczki bazującej na `htpasswd`. As of version v3.0.x an [external plugin](https://github.com/verdaccio/verdaccio-htpasswd) is used by default. Ten pakiet, w wersji v2.x nadal zawiera wbudowaną wersję tej wtyczki.

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