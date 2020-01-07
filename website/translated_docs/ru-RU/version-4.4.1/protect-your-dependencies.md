---
id: version-4.4.1-protect-your-dependencies
title: Защита пакетов
original_id: protect-your-dependencies
---

`verdaccio` позволяет ограничить права на публикацию, с тем, чтобы достичь правильного распределения [прав на пакеты](packages).

<div id="codefund">''</div>

### Конфигурирование доступа к пакетам

Рассмотрим пример. У вас есть набор пакетов с префиксом `my-company-*` и вам нужно ограничить к доступ к ним, для анонимных пользователей, или для аутентифицированных пользователей без нужных прав.

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

With this configuration, basically we allow to groups **admin** and **teamA** to *publish* and **teamA**   **teamB** **teamC** *access* to such dependencies.

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
