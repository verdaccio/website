---
id: authentification
title: "Аутентификация"
---
Аутентификация зависит от того [плагина](plugins.md), который вы используете. The package restrictions also is handled by the [Package Access](packages.md).

Аутентификация клиента обрабатывается самим клиентом `npm`. В тот момент, когда вы выполняете вход в приложение:

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

## Understanding Groups

//TODO: https://github.com/verdaccio/verdaccio/issues/1120

## Стандартный htpasswd

Для того, чтобы упростить настройку, `verdaccio` использует плагин работающий с `htpasswd`. As of version v3.0.x an [external plugin](https://github.com/verdaccio/verdaccio-htpasswd) is used by default. Но версия v2.x содержит встроенную версию данного плагина.

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