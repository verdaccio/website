---
id: authentification
title: "Аутентификация"
---

Аутентификация зависит от того [плагина](plugins.md), который вы используете. Так же, есть возможность задать ограничения на пакеты через [доступ к пакетам](packages.md).

Аутентификация клиента выполняется самим клиентским приложением `npm`. Когда вы выполняете логин в приложение:

```bash
npm adduser --registry http://localhost:4873
```

В файле конфигурации `npm`, расположенном в домашней директории пользователя, генерируется токен. Больше информации о `.npmrc` читайте в [официальной документации](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Анонимная публикация

`verdaccio` позволяет включить анонимную публикацию. Для того, чтобы сделать это вам нужно правильно настроить ваш [доступ к пакетам](packages.md).

Например:

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

Как описано в [issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) до `npm@5.3.0`, включая все минорные релизы, **не позволят вам публикацию без токенов**.

## О группах

### Как понимать `$all` и `$anonymous`

Как вы знаете, *Verdaccio* использует `htpasswd` по умолчанию. Этот плагин не реализует методы `allow_access`, `allow_publish` и `allow_unpublish`. И *Verdaccio* будет действовать таким образом:

* Если вы не залогинены (вы - аноним), `$all` and `$anonymous` означают одно и то же.
* If you are logged in, `$anonymous` won't be part of your groups and `$all` will match any logged user. A new group `$authenticated` will be added to the list.

As a takeaway, `$all` **will match all users, independently whether is logged or not**.

**The previous behavior only applies to the default authentication plugin**. If you are using a custom plugin and such plugin implements `allow_access`, `allow_publish` or `allow_unpublish`, the resolution of the access depends on the plugin itself. Verdaccio will only set the default groups.

Let's recap:

* **logged**: `$all`, `$authenticated`, + groups added by the plugin
* **anonymous (logged out)**: `$all` and `$anonymous`.

## Стандартный htpasswd

In order to simplify the setup, `verdaccio` use a plugin based on `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Максимальное количество пользователей, которые могут зарегистрироваться. По умолчанию "+inf".
    # Вы можете установить -1 для отключения регистрации пользователей.
    #max_users: 1000
```

| Свойство  | Тип    | Обязательное | Пример     | Поддержка | Описание                                 |
| --------- | ------ | ------------ | ---------- | --------- | ---------------------------------------- |
| file      | string | Да           | ./htpasswd | все       | файл, содержащий зашифрованные реквизиты |
| max_users | number | Нет          | 1000       | все       | устанавливает ограничение пользователей  |

Для того, чтобы запретить пользователям входить, вы можете установить `max_users: -1`.