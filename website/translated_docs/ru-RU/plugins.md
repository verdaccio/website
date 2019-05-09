---
id: plugins
title: "Плагины"
---

Verdaccio поддерживает плагины. Плагины позволяют расширить функциональность Verdaccio разными способами - добавить методы аутентификации, добавить эндпоинты или создать своё хранилище.

Есть 4 типа плагинов:

* Аутентификация
* Middleware
* Хранилище
* UI тема

> Если вам нужно разработать свой плагин, почитайте секцию [разработка](dev-plugins.md).

## Использование

### Установка

```bash
$> npm install --global verdaccio-activedirectory
```

`verdaccio`, как форк sinopia, совместим с плагинами для `sinopia@1.4.0`. Установка таких плагинов - аналогична.

    $> npm install --global sinopia-memory
    

### Конфигурация

Откройте файл `config.yaml` и измените секцию `auth` так, как указано ниже:

Дефолтная конфигурация выглядит так, потому что мы, по умолчанию, используем встроенный плагин `htpasswd`, который вы можете отключить, просто закомментировав строчку.

### Конфигурирование аутентификации

```yaml
 htpasswd:
    file: ./htpasswd
    #max_users: 1000
```

заменяем на (в случае, когда вы решили использовать плагин `ldap`.

```yaml
auth:
  activedirectory:
    url: "ldap://10.0.100.1"
    baseDN: 'dc=sample,dc=local'
    domainSuffix: 'sample.local'
```

#### Несколько плагинов аутентификации

Это технически возможно, но плагины надо расположить а правильном порядке, так как проверка кредов будет производиться по очереди.

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

### Конфигурирование middleware

Это пример того, как надо настраивать middleware-плагин. Все middleware-плагины должны быть определены в секции **middlewares**.

```yaml
middlewares:
  audit:
    enabled: true
```

> В качестве примера, можно посмотреть на [middleware-плагин для audit](https://github.com/verdaccio/verdaccio-audit).

### Конфигрирование хранилища

Это пример того, как нужно настраивать плагин хранилища. Все плагины хранилища должны быть определены в секции **store**.

```yaml
store:
  memory:
    limit: 1000
```

### Конфигурирование UI темы

Verdaccio позволяет заменить веб-интерфейс, и мы называем это **UI темой**. По умолчанию, используется `@verdaccio/ui-theme`, который включен в поставку, но вы можете использовать что-нибудь другое, установив свой плагин.

```bash
<br />$> npm install --global verdaccio-theme-dark

```

> Имя плагина должно начинаться с `verdaccio-theme`, иначе плагин не будет загружен.

Вы можете загрузить только одну тему. Так же, можно передать параметры в тему.

```yaml
theme:
  dark:
    option1: foo
    option2: bar
```

## Устаревшие плагины

### Плагины Sinopia

> Если вы используете плагин sinopia, помните, что все они - deprecated и могут перестать работать в будущем.

* [sinopia-npm](https://www.npmjs.com/package/sinopia-npm): плагин аутентификации для sinopia, поддерживающий репозиторий npm.
* [sinopia-memory](https://www.npmjs.com/package/sinopia-memory): плагин аутентификации для sinopia, который хранит пользователей в памяти.
* [sinopia-github-oauth-cli](https://www.npmjs.com/package/sinopia-github-oauth-cli).
* [sinopia-crowd](https://www.npmjs.com/package/sinopia-crowd): плагин аутентификации для sinopia, для поддержки atlassian crowd.
* [sinopia-activedirectory](https://www.npmjs.com/package/sinopia-activedirectory): плагин аутентификации для sinopia, для поддержки Active Directory.
* [sinopia-github-oauth](https://www.npmjs.com/package/sinopia-github-oauth): плагин аутентификации для sinopia2, для поддержки github oauth web flow.
* [sinopia-delegated-auth](https://www.npmjs.com/package/sinopia-delegated-auth): плагин аутентификации для sinopia, который делегирует аутентификацию по другому HTTP URL
* [sinopia-altldap](https://www.npmjs.com/package/sinopia-altldap): альтернативный плагин аутентификации для sinopia, для поддержки LDAP
* [sinopia-request](https://www.npmjs.com/package/sinopia-request): плагин аутентификации для аутентификации через внешнее API.
* [sinopia-htaccess-gpg-email](https://www.npmjs.com/package/sinopia-htaccess-gpg-email): Generate password in htaccess format, encrypt with GPG and send via MailGun API to users.
* [sinopia-mongodb](https://www.npmjs.com/package/sinopia-mongodb): An easy and fully auth-plugin with configuration to use a mongodb database.
* [sinopia-htpasswd](https://www.npmjs.com/package/sinopia-htpasswd): auth plugin for sinopia supporting htpasswd format.
* [sinopia-leveldb](https://www.npmjs.com/package/sinopia-leveldb): a leveldb backed auth plugin for sinopia private npm.
* [sinopia-gitlabheres](https://www.npmjs.com/package/sinopia-gitlabheres): Gitlab authentication plugin for sinopia.
* [sinopia-gitlab](https://www.npmjs.com/package/sinopia-gitlab): Gitlab authentication plugin for sinopia
* [sinopia-ldap](https://www.npmjs.com/package/sinopia-ldap): LDAP auth plugin for sinopia.
* [sinopia-github-oauth-env](https://www.npmjs.com/package/sinopia-github-oauth-env) Sinopia authentication plugin with github oauth web flow.

> All sinopia plugins should be compatible with all future verdaccio versions. Anyhow, we encourage contributors to migrate them to the modern verdaccio API and using the prefix as *verdaccio-xx-name*.

## Verdaccio Plugins

### Authorization Plugins

* [verdaccio-bitbucket](https://github.com/idangozlan/verdaccio-bitbucket): Bitbucket authentication plugin for verdaccio.
* [verdaccio-bitbucket-server](https://github.com/oeph/verdaccio-bitbucket-server): Bitbucket Server authentication plugin for verdaccio.
* [verdaccio-ldap](https://www.npmjs.com/package/verdaccio-ldap): LDAP auth plugin for verdaccio.
* [verdaccio-active-directory](https://github.com/nowhammies/verdaccio-activedirectory): Active Directory authentication plugin for verdaccio
* [verdaccio-gitlab](https://github.com/bufferoverflow/verdaccio-gitlab): use GitLab Personal Access Token to authenticate
* [verdaccio-gitlab-ci](https://github.com/lab360-ch/verdaccio-gitlab-ci): Enable GitLab CI to authenticate against verdaccio.
* [verdaccio-htpasswd](https://github.com/verdaccio/verdaccio-htpasswd): Auth based on htpasswd file plugin (built-in) for verdaccio
* [verdaccio-github-oauth](https://github.com/aroundus-inc/verdaccio-github-oauth): Github oauth authentication plugin for verdaccio.
* [verdaccio-github-oauth-ui](https://github.com/n4bb12/verdaccio-github-oauth-ui): GitHub OAuth plugin for the verdaccio login button.

### Middleware Plugins

* [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit): verdaccio plugin for *npm audit* cli support (built-in) (compatible since 3.x)

* [verdaccio-profile-api](https://github.com/ahoracek/verdaccio-profile-api): verdacci plugin for *npm profile* cli support and *npm profile set password* for *verdaccio-htpasswd* based authentificaton

### Storage Plugins

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory) Storage plugin to host packages in Memory
* [verdaccio-s3-storage](https://github.com/remitly/verdaccio-s3-storage) Storage plugin to host packages **Amazon S3**
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud) Storage plugin to host packages **Google Cloud Storage**

## Caveats

> Not all these plugins are been tested continuously, some of them might not work at all. Please if you found any issue feel free to notify the owner of each plugin.