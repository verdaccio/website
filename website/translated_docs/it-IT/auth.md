---
id: autenticazione
title: "Authentification"
---

L'autenticazione è legata al [plugin](plugins.md) di autenticazione che si utilizza. Anche le restrizioni di pacchetto sono gestite dal [pacchetto accesso](packages.md).

L'autenticazione del client viene gestito dal `npm` client stesso. Una volta che si effettua il login all'applicazione:

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

Come è descritto [nel caso #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) fino al `npm@5.3.0` e in tutte le versioni minori **non vi sarà permesso pubblicare senza un token **.

## Understanding Groups

### The meaning of `$all` and `$anonymous`

As you know *Verdaccio* uses the `htpasswd` by default. That plugin does not implement the methods `allow_access`, `allow_publish` and `allow_unpublish`. Thus, *Verdaccio* will handle that in the following way:

* If you are not logged in (you are anonymous), `$all` and `$anonymous` means exactly the same.
* If you are logged in, `$anonymous` won't be part of your groups and `$all` will match any logged user. A new group `$authenticated` will be added to the list.

As a takeaway, `$all` **will match all users, independently whether is logged or not**.

**The previous behavior only applies to the default authentication plugin**. If you are using a custom plugin and such plugin implements `allow_access`, `allow_publish` or `allow_unpublish`, the resolution of the access depends on the plugin itself. Verdaccio will only set the default groups.

Let's recap:

* **logged**: `$all`, `$authenticated`, + groups added by the plugin
* **anonymous (logged out)**: `$all` and `$anonymous`.

## Impostazione predefinita htpasswd

In order to simplify the setup, `verdaccio` use a plugin based on `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

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