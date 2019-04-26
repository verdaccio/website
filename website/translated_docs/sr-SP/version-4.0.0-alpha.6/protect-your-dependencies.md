---
id: version-4.0.0-alpha.6-protect-your-dependencies
title: Protecting packages
original_id: protect-your-dependencies
---

`verdaccio` allows you protect publish, to achieve that you will need to set up correctly your [packages access](packages).

### Конфигурисање пакета

Погледајмо наведена подешавања као пример. Потребно је да подесите dependencies које имају префикс у виду `my-company-*` и треба да их заштитите од анонимних или других пријављених корисника који су без одговарајућих овлашћења (credentials).

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

Са наведеном конфигурацијом дозвољавамо групама **admin** и **teamA** да *публикују*, а групама **teamA** **teamB** и **teamC** *приступ* до тих dependencies.

### Пример из праксе: teamD покушава да приступи некој dependency

Значи, ако сам пријављен као **teamD**. Не би требало да имам приступ свим dependencies koje se podudaraju sa `my-company-*` paternom.

```bash
➜ npm whoami
teamD
```

Нећу имати приступ до таквих dependencies и нећу бити видљив преко веба за корисника из **teamD**. Ако покушам да приступим, десиће се следеће.

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