---
id: installation
title: "Установка"
---

Verdaccio — мультиплатформенное веб-приложение. Чтобы его установить, вам потребуется обеспечить некоторые условия.

#### Требования

1. Node выше чем 
    - For version `verdaccio@3.x` Node `v6.12` is the minimum supported version.
    - For version `verdaccio@4.0.0-alpha.x` or `verdaccio@4.x` Node `8.x` (LTS "Carbon") is the minimum supported version.
2. npm `>=4.x` or `yarn` > We highly recommend use the latest Node Package Managers clients `> npm@5.x | yarn@1.x | pnpm@2.x`
3. The web interface supports the `Chrome, Firefox, Edge, and IE11` browsers.

> Verdaccio will support latest Node.js version according the [Node.js Release Working Group](https://github.com/nodejs/Release) recomendations.

<div id="codefund">''</div>

## Установка инструмента командной строки

`verdaccio` должен быть установлено глобально используя один из следующих способов:

С использованием `npm`

```bash
npm install -g verdaccio
```

или с использованием `yarn`

```bash
yarn global add verdaccio
```

![установка verdaccio](assets/install_verdaccio.gif)

## Запуск

После того как установка завершится, всё что вам нужно, это выполнить команду:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

Больше информации об инструментах командной строки [читайте в этом разделе](cli.md).

You can set the registry by using the following command.

```bash
npm set registry http://localhost:4873/
```

or you can pass a `--registry` flag when needed.

```bash
npm install --registry http://localhost:4873
```

## Docker образ

`verdaccio` имеет официальный образ Docker, который вы можете использовать, и в большенстве случаем стандартная конфигурация отлично работает. Больше информации о том как установить официальный образ [читайте в этом разделе](docker.md).

## Cloudron

`verdaccio` так же доступен для устновку в один клик с [Cloudron](https://cloudron.io)

[![Установка](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)