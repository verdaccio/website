---
id: version-3.8.6-authentification
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

Как описано в [issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) до `npm@5.3.0`, включая все минорные релизы, **не позволят вам публикацию без токенов**. Однако `yarn` не имеет таких ограничений.

## Стандартный htpasswd

Для того, чтобы упростить настройку, `verdaccio` использует плагин работающий с `htpasswd`. Начиная с версии v3.0.x [внешний плагин](https://github.com/verdaccio/verdaccio-htpasswd) используется по умолчанию. Но версия v2.x содержит встроенную версию данного плагина.

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