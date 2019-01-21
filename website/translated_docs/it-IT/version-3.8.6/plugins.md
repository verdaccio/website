---
id: version-3.8.6-plugins
title: Plugin
original_id: plugin
---
Verdaccio è un'applicazione estensibile. Si può espandere in molti modi, con nuovi metodi di autenticazione, aggiungendo endpoint o utilizzando un archivio personalizzato.

> Se sei interessato a sviluppare il tuo plugin personale, leggi la sezione [sviluppo](dev-plugins.md).

## Utilizzo

### Installazione

```bash
$> npm install --global verdaccio-activedirectory
```

`verdaccio` essendo un fork di sinopia ha compatibilità con le versioni precedenti e con plugin che sono compatibili con `sinopia@1.4.0`. In questo caso l'installazione è la stessa.

    $> npm install --global sinopia-memory
    

### Configurazione

Aprire il file `config.yaml` e aggiornare la sezione `auth` come segue:

La configurazione predefinita appare così, poiché usiamo un plugin `htpasswd` incorporato di default che si può disabilitare commentando le seguenti linee.

### Configurazione del plugin Auth

```yaml
 htpasswd:
    file: ./htpasswd
    #max_users: 1000
```

e sostituendo con (in caso si decida di utilizzare un plugin `ldap`.

```yaml
auth:
  activedirectory:
    url: "ldap://10.0.100.1"
    baseDN: 'dc=sample,dc=local'
    domainSuffix: 'sample.local'
```

#### Plugin Auth multipli

Questo è tecnicamente possibile, prestando importanza all'ordine del plugin, dato che le credenziali verranno risolte in ordine.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    #max_users: 1000
  activedirectory:
    url: "ldap://10.0.100.1"
    baseDN: 'dc=sample,dc=local'
    domainSuffix: 'sample.local'
```

### Configurazione del Plugin Middleware

Questo è un esempio di come si configura un middleware plugin. Tutti i middleware plugin devono essere definiti nel **middlewares** namespace.

```yaml
middlewares:
  audit:
    enabled: true
```

> Si potrebbe seguire il [plugin audit middle](https://github.com/verdaccio/verdaccio-audit) come esempio di base.

### Configurazione del Plugin Store

Questo è un esempio di come si configura un plugin di archiviazione. Tutti i plugin di archiviazione devono essere definiti nello **store** namespace.

```yaml
store:
  memory:
    limit: 1000
```

> Se si definisce uno store personalizzato, la proprietà di **archiviazione** nel file di configurazione verrà ignorata.

## Plugin ereditati

### Plugin di Sinopia

(compatibili con tutte le versioni)

* [sinopia-npm](https://www.npmjs.com/package/sinopia-npm): plugin auth per il supporto di sinopia a un registro npm.
* [sinopia-memory](https://www.npmjs.com/package/sinopia-memory): plugin auth per sinopia che mantiene gli utenti in memoria.
* [sinopia-github-oauth-cli](https://www.npmjs.com/package/sinopia-github-oauth-cli).
* [sinopia-crowd](https://www.npmjs.com/package/sinopia-crowd): plugin auth per sinopia che supporta atlassian crowd.
* [sinopia-activedirectory](https://www.npmjs.com/package/sinopia-activedirectory): Plugin di autenticazione Active Directory per sinopia.
* [sinopia-github-oauth](https://www.npmjs.com/package/sinopia-github-oauth): plugin di autenticazione per sinopia2, che supporta il flusso web di github oauth.
* [sinopia-delegated-auth](https://www.npmjs.com/package/sinopia-delegated-auth): plugin di autenticazione di Sinopia che delega autenticazione ad altro URL HTTP
* [sinopia-altldap](https://www.npmjs.com/package/sinopia-altldap): Alterna il plugin LDAP Auth per Sinopia
* [sinopia-request](https://www.npmjs.com/package/sinopia-request): Un plugin auth semplice e completo con la configurazione per utilizzare un'API esterna.
* [sinopia-htaccess-gpg-email](https://www.npmjs.com/package/sinopia-htaccess-gpg-email): Genera password in formato htaccess, cripta con GPG ed invia attraverso MailGun API agli utenti.
* [sinopia-mongodb](https://www.npmjs.com/package/sinopia-mongodb): Un plugin auth semplice e completo con la configurazione per utilizzare un database mongodb.
* [sinopia-htpasswd](https://www.npmjs.com/package/sinopia-htpasswd): plugin auth per sinopia che supporta il formato htpasswd.
* [sinopia-leveldb](https://www.npmjs.com/package/sinopia-leveldb): plugin auth supportato da leveldb per l'npm privato di sinopia.
* [sinopia-gitlabheres](https://www.npmjs.com/package/sinopia-gitlabheres): plugin di autenticazione Gitlab per sinopia.
* [sinopia-gitlab](https://www.npmjs.com/package/sinopia-gitlab): plugin di autenticazione Gitlab per sinopia
* [sinopia-ldap](https://www.npmjs.com/package/sinopia-ldap): plugin auth LDAP per sinopia.
* [sinopia-github-oauth-env](https://www.npmjs.com/package/sinopia-github-oauth-env) plugin di autenticazione di Sinopia con flusso web github oauth.

> Tutti i plugin di sinopia dovrebbero essere compatibili con tutte le versioni future di verdaccio. Tuttavia, incoraggiamo i contributori a spostarli sull'API attuale di verdaccio e ad utilizzare il prefisso così *verdaccio-xx-name*.

## Plugin di Verdaccio

(compatibile da 2.1.x)

### Plugin di autorizzazione

* [verdaccio-bitbucket](https://github.com/idangozlan/verdaccio-bitbucket): plugin di autenticazione di Bitbucket per verdaccio.
* [verdaccio-bitbucket-server](https://github.com/oeph/verdaccio-bitbucket-server): Plugin di autenticazione Bitbucket Server per verdaccio.
* [verdaccio-ldap](https://www.npmjs.com/package/verdaccio-ldap): LDAP auth plugin per verdaccio.
* [verdaccio-active-directory](https://github.com/nowhammies/verdaccio-activedirectory): Plugin di autenticazione Active Directory per verdaccio
* [verdaccio-gitlab](https://github.com/bufferoverflow/verdaccio-gitlab): utilizza il Token di Accesso Personale di GitLab per autenticare
* [verdaccio-gitlab-ci](https://github.com/lab360-ch/verdaccio-gitlab-ci): Abilitare GitLab CI per l'autenticazione con verdaccio.
* [verdaccio-htpasswd](https://github.com/verdaccio/verdaccio-htpasswd): Auth basato sul file di plugin htpasswd (interno) per verdaccio
* [verdaccio-github-oauth](https://github.com/aroundus-inc/verdaccio-github-oauth): Plugin di autenticazione Github oauth per verdaccio.
* [verdaccio-github-oauth-ui](https://github.com/n4bb12/verdaccio-github-oauth-ui): Plugin GitHub OAuth per il bottone di login di verdaccio.

### Plugin di Middleware

* [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit): plugin verdaccio per il supporto cli di *npm audit* (incorporato) (compatibile da 3.x)

* [verdaccio-profile-api](https://github.com/ahoracek/verdaccio-profile-api): plugin di verdaccio per il supporto cli di *npm profile* e *npm profile set password* per l'autenticazione basata su *verdaccio-htpasswd*

### Plugin di archiviazione

(compatibile da 3.x)

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory) Plugin di archiviazione per ospitare pacchetti in Memoria
* [verdaccio-s3-storage](https://github.com/remitly/verdaccio-s3-storage) Plugin di archiviazione per ospitare pacchetti **Amazon S3**
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud) Plugin di archiviazione per ospitare pacchetti **Google Cloud Storage**

## Avvertenze

> Non tutti questi plugin vengono testati assiduamente, alcuni di essi potrebbero anche non funzionare affatto. In caso si incontri qualsiasi problema, si prega di notificarlo al proprietario del plugin in questione.