---
id: version-4.4.1-authentification
title: Autenticazione
original_id: authentification
---

L'autenticazione è legata all'auth [plugin](plugins.md) che si sta utilizzando. Anche le restrizioni di pacchetto vengono gestite dal [Package Access](packages.md).

<div id="codefund">''</div>

L'autenticazione del client viene gestita dal client del `npm` stesso. Una volta che si effettua il login all'applicazione:

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

As is described [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) until `npm@5.3.0` and all minor releases **won't allow you publish without a token**.

## Comprensione dei Gruppi

### Il significato di `$all` e `$anonymous`

As you know *Verdaccio* uses the `htpasswd` by default. Quel plugin non implementa i metodi `allow_access`, `allow_publish` e `allow_unpublish`. Thus, *Verdaccio* will handle that in the following way:

* Se non si è loggati (si è anonimi), `$all` e `$anonymous` significano esattamente la stessa cosa.
* Se si è loggati, `$anonymous` non sarà parte dei gruppi e `$all` coinciderà con qualsiasi utente loggato. Un nuovo gruppo `$authenticated` verrà aggiunto all'elenco.

As a takeaway, `$all` **will match all users, independently whether is logged or not**.

**The previous behavior only applies to the default authentication plugin**. Se si sta utilizzando un plugin personalizzato e tale plugin implementa `allow_access`, `allow_publish` o `allow_unpublish`, la risoluzione dell'accesso dipende dal plugin stesso. Verdaccio imposterà esclusivamente i gruppi predefiniti.

Ricapitolando:

* **logged**: `$all`, `$authenticated`, + groups added by the plugin
* **anonymous (logged out)**: `$all` and `$anonymous`.

## Impostazione predefinita htpasswd

Al fine di semplificare l'installazione, `verdaccio` utilizza un plugin basato su `htpasswd`. A partire dalla versione v3.0.x il plugin `verdaccio-htpasswd` viene utilizzato di default.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Numero massimo di utenti ammessi alla registrazione, il valore predefinito è "+inf".
    # Si può impostare su -1 per disabilitare la registrazione.
    #max_users: 1000
```

| Proprietà | Tipo    | Richiesto | Esempio      | Supporto | Descrizione                                  |
| --------- | ------- | --------- | ------------ | -------- | -------------------------------------------- |
| file      | stringa | Sì        | . / htpasswd | tutti    | file che ospita le credenziali crittografate |
| max_users | numero  | No        | 1000         | tutti    | imposta limite di utenti                     |

Nel caso si decida di non consentire all'utente di accedere, è possibile impostare `max_users: -1`.
