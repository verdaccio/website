---
id: installation
title: "Installation"
---

Verdaccio is a multiplatform web application. To install it, you need a few basic prerequisites.

#### Voraussetzungen

1. Node higher Node `10.x` (LTS "Carbon") is the minimum supported version.

> After v4.5.0 Node v10 is now the minimum supported version.

1. npm `>=5.x` or, `pnpm` or `yarn` > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
2. Doe Weboberfläche unterstützt die Browser `Chrome, Firefox, Edge, und IE11`.

> Verdaccio wird laut [Node.js Release Working Group](https://github.com/nodejs/Release) Empfehlung die neuste Node.js Version unterstützen.

<div id="codefund">''</div>

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
warn --- http address - http://localhost:4873/ - verdaccio/4.5.0
```

Für weitere Informationen über die CLI lesen Sie bitte die [cli Sektion](cli.md).

Mit der folgenden Anweisung können sie das Register festlegen:

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

If you still need a deep explanation, don't miss the at [thedevlife](https://mybiolink.co/thedevlife) tutorial how to publish your own private package using Verdaccio. <iframe width="560" height="315" src="https://www.youtube.com/embed/Co0RwdpEsag" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## Docker Image

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

`verdaccio` has an official docker image you can use, and in most cases, the default configuration is good enough. For more information about how to install the official image, [read the docker section](docker.md).

## Cloudron

`verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![Install](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)