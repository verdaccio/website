---
id: plugin
title: "Plugin"
---

Verdaccio è un'applicazione estensibile. Si può espandere in molti modi, o con nuovi metodi di autenticazione, aggiungendo endpoint o utilizzando un archivio personalizzato.

There are 4 types of plugins:

* Authentication
* Middleware
* Archiviazione
* UI Theme

> Se sei interessato a sviluppare il tuo plugin personale, leggi la sezione [sviluppo](dev-plugins.md).

## Utilizzo

### Installazione

```bash
$> npm install --global verdaccio-activedirectory
```

`verdaccio` as a sinopia fork it has backward compability with plugins that are compatible with `sinopia@1.4.0`. In such case the installation is the same.

    $> npm install --global sinopia-memory
    

### Configurazione

Aprire il file `config.yaml` e aggiornare la sezione `auth` come segue:

La configurazione predefinita appare così, poiché usiamo un plugin `htpasswd` incorporato di default che si può disabilitare commentando le seguenti linee.

### Authentication Configuration

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

#### Multiple Authentication plugins

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

### Middleware Configuration

This is an example how to set up a middleware plugin. All middleware plugins must be defined in the **middlewares** namespace.

```yaml
middlewares:
  audit:
    enabled: true
```

> Si potrebbe seguire il [plugin audit middle](https://github.com/verdaccio/verdaccio-audit) come esempio di base.

### Storage Configuration

This is an example how to set up a storage plugin. All storage plugins must be defined in the **store** namespace.

```yaml
store:
  memory:
    limit: 1000
```

### Theme Configuration

Verdaccio allows to replace the User Interface with a custom one, we call it **theme**. By default, uses `@verdaccio/ui-theme` that comes built-in, but, you can use something different installing your own plugin.

```bash
<br />$> npm install --global verdaccio-theme-dark

```

> The plugin name prefix must start with `verdaccio-theme`, otherwise the plugin won't load.

You can load only one theme at the time and pass through options if is need it.

```yaml
theme:
  dark:
    option1: foo
    option2: bar
```

## Plugin ereditati

### Plugin di Sinopia

> If you are relying on any sinopia plugin, remember are deprecated and might no work in the future.

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
* [verdaccio-groupnames](https://github.com/deinstapel/verdaccio-groupnames): Plugin to handle dynamic group associations utilizing `$group` syntax. Works best with the ldap plugin.

### Plugin di Middleware

* [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit): plugin verdaccio per il supporto cli di *npm audit* (incorporato) (compatibile da 3.x)

* [verdaccio-profile-api](https://github.com/ahoracek/verdaccio-profile-api): plugin di verdaccio per il supporto cli di *npm profile* e *npm profile set password* per l'autenticazione basata su *verdaccio-htpasswd*

* [verdaccio-https](https://github.com/honzahommer/verdaccio-https) Verdaccio middleware plugin to redirect to https if x-forwarded-proto header is set

### Plugin di archiviazione

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory) Plugin di archiviazione per ospitare pacchetti in Memoria
* [verdaccio-s3-storage](https://github.com/remitly/verdaccio-s3-storage) Plugin di archiviazione per ospitare pacchetti **Amazon S3**
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud) Plugin di archiviazione per ospitare pacchetti **Google Cloud Storage**

## Avvertenze

> Not all these plugins are been tested continuously, some of them might not work at all. Please if you found any issue feel free to notify the owner of each plugin.