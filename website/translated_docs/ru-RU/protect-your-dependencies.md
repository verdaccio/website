---
id: protect-your-dependencies
title: "Защита пакетов"
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

В этой конфигурации, мы разрешили группам **admin** и **teamA** *публикацию* и группам **teamA** **teamB** **teamC** *доступ* к этим пакетам.

### Use case: teamD пробует получить доступ к пакету

Итак, если я залогинен как **teamD**, у меня не должно быть доступа к пакетам, удовлетворяющем паттерну `my-company-*`.

```bash
➜ npm whoami
teamD
```

У меня нет доступа к этим пакетам и, так же, они не должны быть видны через веб-интерфейс для пользователя **teamD**. Если я попытаюсь усчтановить этот пакет, произойдет следующее.

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
[1/4] 
error An unexpected error occurred: "http://localhost:5555/webpack-1: unregistered users are not allowed to access package my-company-core".
```