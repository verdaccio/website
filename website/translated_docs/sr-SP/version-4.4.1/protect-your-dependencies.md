---
id: version-4.4.1-protect-your-dependencies
title: Protecting packages
original_id: protect-your-dependencies
---

`verdaccio` allows you protect publish, to achieve that you will need to set up correctly your [packages access](packages).

<div id="codefund">''</div>

### Конфигурисање пакета

Погледајмо наведена подешавања као пример. Потребно је да подесите dependencies које имају префикс у виду `my-company-*` и треба да их заштитите од анонимних или других пријављених корисника који су без одговарајућих овлашћења (credentials).

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

With this configuration, basically we allow to groups **admin** and **teamA** to *publish* and **teamA**   **teamB** **teamC** *access* to such dependencies.

### Пример из праксе: teamD покушава да приступи некој dependency

So, if I am logged as **teamD**. Не би требало да имам приступ свим dependencies koje se podudaraju sa `my-company-*` paternom.

```bash
➜ npm whoami
teamD
```
I won't have access to such dependencies and also won't be visible via web for user **teamD**. Ако покушам да приступим, десиће се следеће.

```bash
➜ npm install my-company-core
npm ERR! code E403
npm ERR! 403 Forbidden: webpack-1@latest
```
или са `yarn`

```bash
➜ yarn add my-company-core
yarn add v0.24.6
info No lockfile found.
[1/4] 🔍  Resolving packages...
error An unexpected error occurred: "http://localhost:5555/webpack-1: unregistered users are not allowed to access package my-company-core".
```
