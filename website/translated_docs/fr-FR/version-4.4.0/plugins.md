---
id: version-4.4.0-plugins
title: Plugins
original_id: plugins
---

Verdaccio is an plugabble aplication. It can be extended in many ways, either new authentication methods, adding endpoints or using a custom storage.

There are 4 types of plugins:

* Authentication
* Middleware
* Stockage
* UI Theme

> Si vous souhaitez développer votre plugin personnel, lisez la section [development](dev-plugins.md).

## Utilisation

### Installation

```bash
$> npm install --global verdaccio-activedirectory
```

`verdaccio` as a sinopia fork it has backward compability with plugins that are compatible with `sinopia@1.4.0`. In such case the installation is the same.

```
$> npm install --global sinopia-memory
```

### Configuration

Ouvrez le fichier `>config.yaml` et mettez à jour la section `auth` comme suit :

La configuration par défaut ressemble à ceci, car nous utilisons un plugin intégré `htpasswd` qui peut être désactivé en commentant les lignes suivantes.


### Authentication Configuration

```yaml
 htpasswd:
    file: ./htpasswd
    #max_users: 1000
```

et en les remplaçant par (si vous décidez d'utiliser un plugin `ldap`.

```yaml
auth:
  activedirectory:
    url: "ldap://10.0.100.1"
    baseDN: 'dc=sample,dc=local'
    domainSuffix: 'sample.local'
```

#### Multiple Authentication plugins

Ceci est techniquement possible, en accordant de l'importance à l'ordre du plugin, car les informations d'identification seront résolues dans l'ordre.

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

> Vous pouvez suivre le [audit middle plugin](https://github.com/verdaccio/verdaccio-audit) comme exemple de base.

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

$> npm install --global verdaccio-theme-dark

```

> The plugin name prefix must start with `verdaccio-theme`, otherwise the plugin won't load.


You can load only one theme at the time and pass through options if is need it.

```yaml
theme:
  dark:
    option1: foo
    option2: bar
```

## Plugins hérités

### Sinopia Plugins

> If you are relying on any sinopia plugin, remember are deprecated and might no work in the future.

* [sinopia-npm](https://www.npmjs.com/package/sinopia-npm): plugin d'authentification pour la prise en charge de sinopia avec un journal npm.
* [sinopia-memory](https://www.npmjs.com/package/sinopia-memory): plugin d'authentification pour sinopia qui se souvient des utilisateurs.
* [sinopia-github-oauth-cli](https://www.npmjs.com/package/sinopia-github-oauth-cli).
* [ sinopia-crowd ](https://www.npmjs.com/package/sinopia-crowd): plugin d'authentification pour sinopia qui prend en charge le public atlassien.
* [sinopia-activedirectory](https://www.npmjs.com/package/sinopia-activedirectory): plugin d'authentification Ative Directory pour sinopia.
* [sinopia-github-oauth](https://www.npmjs.com/package/sinopia-github-oauth): plugin d'authentification pour sinopia2, prenant en charge le flux web github oauth.
* [sinopia-delegated-auth](https://www.npmjs.com/package/sinopia-delegated-auth): plugin d’authentification Sinopia qui délègue l’authentification vers une autre URL HTTP
* [sinopia-altldap](https://www.npmjs.com/package/sinopia-altldap): plugin remplaçant LDAP Auth pour Sinopia
* [sinopia-request](https://www.npmjs.com/package/sinopia-request): un facile auth-plugin, entier, avec configuration pour utiliser une API externe.
* [sinopia-htaccess-gpg-mail](https://www.npmjs.com/package/sinopia-htaccess-gpg-email): générer le mot de passe au format htaccess, chiffrer avec GPG et envoyer via l’API MailGun pour les utilisateurs.
* [sinopia-mongodb](https://www.npmjs.com/package/sinopia-mongodb): un facile auth-plugin, entier, avec configuration pour utiliser une base de données mongodb.
* [ sinopia-crowd ](https://www.npmjs.com/package/sinopia-htpasswd): plugin d'authentification pour sinopia qui prend en charge le format htpasswd.
* [sinopia-leveldb](https://www.npmjs.com/package/sinopia-leveldb): plugin auth pris en charge par leveldb pour la synchronisation privée npm.
* [sinopia-gitlabheres](https://www.npmjs.com/package/sinopia-gitlabheres): plugin d'authentification Gitlab pour sinopia.
* [sinopia-gitlab](https://www.npmjs.com/package/sinopia-gitlab): plugin d'authentification Gitlab pour sinopia
* [sinopia-ldap](https://www.npmjs.com/package/sinopia-ldap): plugin d'authentification LDAP pour sinopia.
* [sinopia-github-oauth-env](https://www.npmjs.com/package/sinopia-github-oauth-env) plugin d'authentification pour Sinopia avec une interface Web github oauth.

> Tous les plugins de Sinopia devraient être compatibles avec toutes les futures versions de Verdaccio. Anyhow, we encourage contributors to migrate them to the modern verdaccio API and using the prefix as *verdaccio-xx-name*.

## Plugins de Verdaccio

### Plugins d'Autorisation

* [verdaccio-bitbucket](https://github.com/idangozlan/verdaccio-bitbucket): plugin d'authentification Bitbucket pour verdaccio.
* [verdaccio-bitbucket-server](https://github.com/oeph/verdaccio-bitbucket-server): plugin d'authentification du serveur Bitbucket pour verdaccio.
* [verdaccio-ldap](https://www.npmjs.com/package/verdaccio-ldap): plugin d'authentification LDAP pour verdaccio.
* [verdaccio-active-directory](https://github.com/nowhammies/verdaccio-activedirectory): plugin d'authentifiation Active Directory pour verdaccio
* [verdaccio-gitlab](https://github.com/bufferoverflow/verdaccio-gitlab): utilisez les Jetons d'Accès Personnel GitLab pour votre authentification
* [verdaccio-gitlab-ci](https://github.com/lab360-ch/verdaccio-gitlab-ci): permettre à GitLab CI d'authentifier contre verdaccio.
* [verdaccio-htpasswd](https://github.com/verdaccio/verdaccio-htpasswd): authentification basée sur le plugin du fichier htpasswd (built-in) pour verdaccio
* [verdaccio-github-oauth](https://github.com/aroundus-inc/verdaccio-github-oauth): plugin d'authentification Github oauth pour verdaccio.
* [verdaccio-github-oauth-ui](https://github.com/n4bb12/verdaccio-github-oauth-ui): plugin de Github OAuth pour le boutton de connexion de verdaccio.
* [verdaccio-groupnames](https://github.com/deinstapel/verdaccio-groupnames): Plugin to handle dynamic group associations utilizing `$group` syntax. Works best with the ldap plugin.

### Plugins Middleware

* [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit): verdaccio plugin for *npm audit* cli support (built-in) (compatible since 3.x)

* [verdaccio-profile-api](https://github.com/ahoracek/verdaccio-profile-api): verdacci plugin for *npm profile* cli support and *npm profile set password* for *verdaccio-htpasswd* based authentificaton

* [verdaccio-https](https://github.com/honzahommer/verdaccio-https) Verdaccio middleware plugin to redirect to https if x-forwarded-proto header is set

### Plugins de stockage

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory) Des plugins de stockage pour héberger des paquets en mémoire
* [verdaccio-s3-storage](https://github.com/remitly/verdaccio-s3-storage) Storage plugin to host packages **Amazon S3**
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud) Storage plugin to host packages **Google Cloud Storage**
* [verdaccio-minio](https://github.com/barolab/verdaccio-minio) A verdaccio plugin for storing data in Minio

## Avertissements

> Not all these plugins are been tested continuously, some of them might not work at all. Please if you found any issue feel free to notify the owner of each plugin.
