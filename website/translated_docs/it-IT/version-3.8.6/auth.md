---
id: version-3.8.6-authentification
title: Autenticazione
original_id: autenticazione
---
The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

The client authentification is handled by `npm` client itself. Once you login to the application:

```bash
npm adduser --registry http://localhost:4873
```

Un token viene generato nel file di configurazione `npm` ospitato nella cartella home dell'utente. Per ulteriori informazioni su `.npmrc` leggere la [documentazione ufficiale](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Pubblicazione anonima

`verdaccio` permette di attivare la pubblicazione anonima, per riuscirci sarà necessario impostare correttamente [l'accesso ai pacchetti](packages.md).

Ad esempio:

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

Come è descritto [nel caso #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) fino al `npm@5.3.0` e in tutte le versioni minori **non vi sarà permesso pubblicare senza un token **. Tuttavia `yarn` non ha tale limitazione.

## Impostazione predefinita htpasswd

Al fine di semplificare l'installazione, `verdaccio` utilizza un plugin basato su `htpasswd`. A partire dalla versione v3.0.x un [plugin esterno](https://github.com/verdaccio/verdaccio-htpasswd) viene utilizzato come impostazione predefinita. La versione v2.x di questo pacchetto contiene ancora la versione incorporata di questo plugin.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    #max_users: 1000
```

| Proprietà | Tipo    | Richiesto | Esempio      | Supporto | Descrizione                                    |
| --------- | ------- | --------- | ------------ | -------- | ---------------------------------------------- |
| file      | stringa | Sì        | . / htpasswd | tutti    | file che ospitano le credenziali crittografate |
| max_users | numero  | No        | 1000         | tutti    | imposta limite di utenti                       |

Nel caso si decida di non consentire all'utente di accedere, è possibile impostare `max_users: -1`.