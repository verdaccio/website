---
id: version-4.0.0-alpha.5-authentification
title: Аутентификация
original_id: authentification
---

Аутентикация привязана к [плагину](plugins.md) который вы используете. Также пакет по ограничению доступа управляется [Пакетом Доступа](packages.md).

Аутентикация клиента управляется самим `npm` клиентом. Как только вы войдете в приложение:

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

В общем, `$all` **означает всех пользователей, независимо от того, залогинены они или нет**.

**Все описанное выше - только про плагин аутентификации по умолчанию**. Если вы используете кастомный плагин и этот плагин реализует `allow_access`, `allow_publish` или `allow_unpublish`, то разрешения будут зависет от этого вашего плагина. Verdaccio установит только группы по умолчанию.

Отметим еще раз:

* **залогиненные**: `$all`, `$authenticated`, + группы, добавленные плагином
* **анонимы (не залогиненные)**: `$all` и `$anonymous`.

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

| Свойство  | Тип    | Обязательное | Пример     | Поддержка | Описание                                      |
| --------- | ------ | ------------ | ---------- | --------- | --------------------------------------------- |
| file      | string | Да           | ./htpasswd | все       | файл, содержащий зашифрованные учетные данные |
| max_users | number | Нет          | 1000       | все       | ограничение на количество пользователей       |

Для того, чтобы запретить пользователям входить, вы можете установить `max_users: -1`.