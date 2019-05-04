---
id: authentification
title: "Autenticazione"
---

L'autenticazione è legata al [plugin](plugins.md) di autenticazione che si utilizza. Anche le restrizioni di pacchetto sono gestite dall'[Accesso al Pacchetto](packages.md).

L'autenticazione del client viene gestita dal `npm` client stesso. Una volta che si effettua il login all'applicazione:

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

## Comprensione dei Gruppi

### Il significato di `$all` e `$anonymous`

Come è noto *Verdaccio* utilizza l'`htpasswd` di default. Quel plugin non implementa i metodi `allow_access`, `allow_publish` e `allow_unpublish`. Quindi, *Verdaccio* lo gestirà nella seguente maniera:

* Se non si è loggati (si è anonimi), `$all` e `$anonymous` significano esattamente la stessa cosa.
* Se si è loggati, `$anonymous` non sarà parte del gruppo e `$all` coinciderà con ogni utente loggato. Un nuovo gruppo `$authenticated` verrà aggiunto all'elenco.

Il concetto chiave è che `$all` **coinciderà con tutti gli utenti, indipendentemente dal fatto che siano loggati o meno**.

**Il comportamento precedente si applica esclusivamente al plugin di autenticazione predefinito**. Se si sta utilizzando un plugin personalizzato e tale plugin implementa `allow_access`, `allow_publish` o `allow_unpublish`, la risoluzione dell'accesso dipende dal plugin stesso. Verdaccio imposterà esclusivamente i gruppi predefiniti.

Ricapitolando:

* **loggati**: `$all`, `$authenticated`, + gruppi aggiunti dal plugin
* **anonimi (non loggati)**: `$all` e `$anonymous`.

## Impostazione predefinita htpasswd

Per semplificare la configurazione, `verdaccio` utilizza un plugin basato su `htpasswd`. A partire dalla versione v3.0.x il plugin `verdaccio-htpasswd` viene utilizzato di default.

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