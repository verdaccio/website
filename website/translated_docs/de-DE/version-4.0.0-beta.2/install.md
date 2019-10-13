---
id: version-4.0.0-beta.2-installation
title: Installation
original_id: installation
---

Verdaccio is a multiplatform web application. To install it, you need a few prerequisites.

#### Voraussetzungen

1. Node größer als 
    - Für `verdaccio@3.x` wird mindestens Node `v6.12` Vorausgesetzt.
    - Für `verdaccio@4.0.0-alpha.x` oder `verdaccio@4.x` wird mindestens Node `8.x` (LTS "Carbon") Vorausgesetzt.
2. npm `>=4.x` oder `yarn` > Wir empfehlen dringendst die neusten Node Package-Manager-Clients zu verwenden `> npm@5.x | yarn@1.x | pnpm@2.x`
3. Doe Weboberfläche unterstützt die Browser `Chrome, Firefox, Edge, und IE11`.

> Verdaccio wird laut [Node.js Release Working Group](https://github.com/nodejs/Release) Empfehlung die neuste Node.js Version unterstützen.

## Installation der CLI

`verdaccio` muss unter Verwendung einer der folgenden Methoden global installiert werden:

Bei Verwendung von `npm`

```bash
npm install -g verdaccio
```

oder für `yarn`

```bash
yarn global add verdaccio
```

![Installation verdaccio](assets/install_verdaccio.gif)

## Grunddlegende Verwendung

Sobald die Installation durchgeführt wurde, muss nur die folgende CLI Anweisung ausgeführt werden:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

Für weitere Informationen über die CLI lesen Sie bitte die [cli Sektion](cli.md).

Mit der folgenden Anweisung können sie das Register festlegen:

```bash
npm set registry http://localhost:4873/
```

Oder Sie können ein `--registry` flag übergeben sofern benötigt.

```bash
npm install --registry http://localhost:4873
```

## Docker Image

`verdaccio` has an official docker image you can use, and in most cases, the default configuration is good enough. For more information about how to install the official image, [read the docker section](docker.md).

## Cloudron

`verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![Install](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)