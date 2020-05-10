---
id: authentification
title: "Аутентификация"
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions are also handled by the [Package Access](packages.md).

<div id="codefund">''</div>

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

`verdaccio` allows you to enable anonymous publish, to achieve that you will need to set up correctly your [packages access](packages.md).

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
* Если вы залогинены, `$anonymous` не будет в списке ваших групп, а `$all` будет у любого залогиненого пользователя. Так же, в список добавится новая группа `$authenticated`.

В общем, `$all` **означает всех пользователей, независимо от того, залогинены они или нет**.

**Все описанное выше - только про плагин аутентификации по умолчанию**. Если вы используете кастомный плагин и этот плагин реализует `allow_access`, `allow_publish` или `allow_unpublish`, то разрешения будут зависет от этого вашего плагина. Verdaccio установит только группы по умолчанию.

Отметим еще раз:

* **залогиненные**: `$all`, `$authenticated`, + группы, добавленные плагином
* **анонимы (не залогиненные)**: `$all` и `$anonymous`.

## Стандартный htpasswd

In order to simplify the setup, `verdaccio` uses a plugin based on `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Максимальное количество пользователей, которые могут зарегистрироваться. По умолчанию "+inf".
    # Вы можете установить -1 для отключения регистрации пользователей.
    #max_users: 1000
```

| Свойство  | Тип    | Обязательное | Пример     | Поддержка | Описание                                      |
| --------- | ------ | ------------ | ---------- | --------- | --------------------------------------------- |
| file      | string | Да           | ./htpasswd | все       | файл, содержащий зашифрованные учетные данные |
| max_users | number | Нет          | 1000       | все       | ограничение на количество пользователей       |

In case you decide to not allow users to sign up, you can set `max_users: -1`.