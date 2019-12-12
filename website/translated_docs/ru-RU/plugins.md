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
* [sinopia-htaccess-gpg-email](https://www.npmjs.com/package/sinopia-htaccess-gpg-email): Генерирует пароль в формате htaccess, шифрует с помощью GPG и посылает его пользователям через MailGun API.
* [sinopia-mongodb](https://www.npmjs.com/package/sinopia-mongodb): плагин аутентификации, использует mongodb.
* [sinopia-htpasswd](https://www.npmjs.com/package/sinopia-htpasswd): плагин аутентификации для sinopia, поддерживает формат htpasswd.
* [sinopia-leveldb](https://www.npmjs.com/package/sinopia-leveldb): плагин аутентификации для sinopia, использует leveldb.
* [sinopia-gitlabheres](https://www.npmjs.com/package/sinopia-gitlabheres): плагин аутентификации для sinopia, использует Gitlab.
* [sinopia-gitlab](https://www.npmjs.com/package/sinopia-gitlab): плагин аутентификации для sinopia, использует Gitlab
* [sinopia-ldap](https://www.npmjs.com/package/sinopia-ldap): плагин аутентификации для sinopia, использует LDAP.
* [sinopia-github-oauth-env](https://www.npmjs.com/package/sinopia-github-oauth-env) плагин аутентификации для sinopia, использует github oauth web flow.

> Все плагины sinopia совместимы со всеми будущими версиями verdaccio. Тем не менее, мы очень хотели бы, чтобы контрибьюторы мигрировали на современный verdaccio API и использовали префикс *verdaccio-xx-name*.

## Плагины Verdaccio

### Плагины аутентификации

* [verdaccio-bitbucket](https://github.com/idangozlan/verdaccio-bitbucket): аутентификационный плагин для использования Bitbucket.
* [verdaccio-bitbucket-server](https://github.com/oeph/verdaccio-bitbucket-server): аутентификационный плагин для использования Bitbucket Server.
* [verdaccio-ldap](https://www.npmjs.com/package/verdaccio-ldap):аутентификационный плагин для использования LDAP.
* [verdaccio-active-directory](https://github.com/nowhammies/verdaccio-activedirectory): аутентификационный плагин для использования Active Directory
* [verdaccio-gitlab](https://github.com/bufferoverflow/verdaccio-gitlab): аутентификационный плагин для использования GitLab Personal Access Token
* [verdaccio-gitlab-ci](https://github.com/lab360-ch/verdaccio-gitlab-ci): аутентификационный плагин для использования GitLab CI.
* [verdaccio-htpasswd](https://github.com/verdaccio/verdaccio-htpasswd): аутентификационный плагин для использования файла htpasswd (встроенный)
* [verdaccio-github-oauth](https://github.com/aroundus-inc/verdaccio-github-oauth): аутентификационный плагин для использования Github oauth.
* [verdaccio-github-oauth-ui](https://github.com/n4bb12/verdaccio-github-oauth-ui): аутентификационный плагин для использования GitHub OAuth plugin.
* [verdaccio-groupnames](https://github.com/deinstapel/verdaccio-groupnames): Плагин для работы с группами с помощью синтаксиса `$group`. Лучше всего работает с плагином ldap.

### Плагины Middleware

* [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit): плагин для поддержки команды *npm audit* (встроенный) (начиная с версии 3.x)

* [verdaccio-profile-api](https://github.com/ahoracek/verdaccio-profile-api): плагин для команд *npm profile* и *npm profile set password* для аутентификации через *verdaccio-htpasswd*

* [verdaccio-https](https://github.com/honzahommer/verdaccio-https) Verdaccio middleware-плагин для редиректа на https если установлен хэдер x-forwarded-proto

### Плагины хранилища

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory) плагин хранилища для хранения пакетов в памяти
* [verdaccio-s3-storage](https://github.com/remitly/verdaccio-s3-storage) плагин хранилища для хранения пакетов в **Amazon S3**
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud) плагин хранилища для хранения пакетов в **Google Cloud Storage**
* [verdaccio-minio](https://github.com/barolab/verdaccio-minio) A verdaccio plugin for storing data in Minio

## Предостережение

> Не все плагины были протестированы в рамках непрерывной интеграции, и некоторые могут вообще не работать. Если вы нашли баг, пожалуйста, известите владельца плагина.