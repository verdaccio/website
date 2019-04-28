---
id: installation
title: "Установка"
---

Verdaccio — мультиплатформенное веб-приложение. Чтобы его установить, вам нужно обеспечить выполнение нескольких требований.

#### Требования

1. Версия Node 
    - Для `verdaccio@3.x`, минимальная поддерживаемая версия - это Node `v6.12`.
    - Для `verdaccio@4.0.0-alpha.x` или `verdaccio@4.x`, минимальная поддерживаемая версия - это Node `8.x` (LTS "Carbon").
2. npm `>=4.x` or `yarn` > Рекомендуется использовать последние версии пакетных менеджеров `> npm@5.x | yarn@1.x | pnpm@2.x`
3. Веб-интерфейс поддерживает браузеры `Chrome, Firefox, Edge, и IE11`.

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

После того как установка завершится, всё, что вам нужно, это выполнить команду:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

Больше информации об инструментах командной строки [читайте в этом разделе](cli.md).

Вы можете задать репозиторий следующей командой.

```bash
npm set registry http://localhost:4873/
```

то же самое можно сделать флагом `--registry` при запуске.

```bash
npm install --registry http://localhost:4873
```

## Docker образ

`verdaccio` имеет официальный образ Docker, который вы можете использовать, и в большенстве случаем стандартная конфигурация отлично работает. Больше информации о том как установить официальный образ [читайте в этом разделе](docker.md).

## Cloudron

`verdaccio` так же доступен для устновку в один клик с [Cloudron](https://cloudron.io)

[![Установка](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)