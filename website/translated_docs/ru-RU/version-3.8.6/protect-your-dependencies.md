---
id: version-3.8.6-protect-your-dependencies
title: Защита пакетов
original_id: protect-your-dependencies
---

`verdaccio` allows you protect publish, to achieve that you will need to set up correctly your [packages acces](packages).

### Конфигурирование доступа к пакетам

Рассмотрим пример. У вас есть набор пакетов с префиксом `my-company-*` и вам нужно ограничить к доступ к ним, для анонимных пользователей, или для аутентифицированных пользователей без нужных прав.

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

В этой конфигурации, мы разрешили группам **admin** и **teamA** *публикацию* и группам **teamA** **teamB** **teamC** *доступ* к этим пакетам.

### Use case: teamD пробует получить доступ к пакету

So, if I am logged as **teamD**. I shouldn't be able to access all dependencies that match with `my-company-*` pattern.

```bash
➜ npm whoami
teamD
```

I won't have access to such dependencies and also won't be visible via web for user **teamD**. If I try to access the following will happen.

```bash
➜ npm install my-company-core
npm ERR! code E403
npm ERR! 403 Forbidden: webpack-1@latest
```

или, если использовать `yarn`

```bash
➜ yarn add my-company-core
yarn add v0.24.6
info No lockfile found.
[1/4] 🔍  Resolving packages...
error An unexpected error occurred: "http://localhost:5555/webpack-1: unregistered users are not allowed to access package my-company-core".
```