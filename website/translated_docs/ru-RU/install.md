---
id: installation
title: "Установка"
---

Verdaccio is a multiplatform web application. To install it, you need a few basic prerequisites.

#### Требования

1. Node higher Node `10.x` (LTS "Carbon") is the minimum supported version.

> After v4.5.0 *Node.js v10* is now the minimum supported version. If you cannot upgrade *Node.js v8*, keep using `v4.4.4`.

1. npm `>=5.x` or, `pnpm` or `yarn` > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
2. Веб-интерфейс поддерживает браузеры `Chrome, Firefox, Edge, и IE11`.

> Verdaccio будет поддерживать последние версии Node.js version в соответствии с рекомендациями [Node.js Release Working Group](https://github.com/nodejs/Release).

<div id="codefund">''</div>

## Установка инструмента командной строки

`verdaccio` должен быть установлен глобально, использовав один из следующих путей:

С помощью `npm`

```bash
npm install -g verdaccio
```

или с помощью `yarn`

```bash
yarn global add verdaccio
```

![установка verdaccio](assets/install_verdaccio.gif)

## Запуск

После того как установка завершится, вам нужно запустить единственную команду:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/4.5.0
```

Больше информации об инструментах командной строки [читайте в этом разделе](cli.md).

Вы можете задать адрес репозитория следующей командой.

```bash
npm set registry http://localhost:4873/
```

you can pass a `--registry` flag when needed.

```bash
npm install --registry http://localhost:4873
```

define in your `.npmrc` a `registry` field.

```bash
//.npmrc
registry=http://localhost:4873
```

Or a `publishConfig` in your `package.json`

```json
{
  "publishConfig": {
    "registry": "http://localhost:4873"
  }
}
```

## Create Your Own Private NPM Package Tutorial

If you still need a deep explanation, don't miss the at [thedevlife](https://mybiolink.co/thedevlife) tutorial how to publish your own private package using Verdaccio. <iframe width="560" height="315" src="https://www.youtube.com/embed/Co0RwdpEsag?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## Docker образ

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

`verdaccio` имеет официальный образ Docker, который вы можете использовать, и в большенстве случаем стандартная конфигурация отлично работает. Больше информации о том как установить официальный образ [читайте в этом разделе](docker.md).

## Cloudron

`verdaccio` так же доступен для устновку в один клик с [Cloudron](https://cloudron.io)

[![Установка](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)