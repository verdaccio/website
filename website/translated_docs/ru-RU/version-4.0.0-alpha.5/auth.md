---
id: version-4.0.0-alpha.5-authentification
title: Аутентификация
original_id: authentification
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

The client authentification is handled by `npm` client itself. Once you login to the application:

```bash
npm adduser --registry http://localhost:4873
```

Токен генерируется в файле конфигурации `npm`, расположенном в домашней директории пользователя. Больше информации о `.npmrc` читайте в [официальной документации](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Анонимная публицация

`verdaccio` позволяет включить анонимную публикацию. Для того, чтобы сделать это вам нужно правильно настроить ваш [доступ к пакетам](packages.md).

Например:

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

Как описано в [issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) до `npm@5.3.0`, включая все минорные релизы, **не позволят вам публикацию без токенов**.

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

## Стандартный htpasswd

Для того, чтобы упростить настройку, `verdaccio` использует плагин работающий с `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    #max_users: 1000
```

| Свойство  | Тип    | Обязательное | Пример     | Поддержка | Описание                                 |
| --------- | ------ | ------------ | ---------- | --------- | ---------------------------------------- |
| file      | string | Да           | ./htpasswd | все       | файл, содержащий зашифрованные реквизиты |
| max_users | number | Нет          | 1000       | все       | устанавливает ограничение пользователей  |

Для того, чтобы запретить пользователям входить, вы можете установить `max_users: -1`.