---
id: installation
title: "Installation"
---

Verdaccio es una aplicación multi plataforma. Para instalarlo, necesitas unos requerimientos básicos.

## Prerequisites

1. **Node.js** `v8.x (LTS "Carbon")` o mayor.

2. Tu manejador de paquetes favorito `npm`, `pnpm` or `yarn` (classic y berry).

> Se recomienda usar las ultimas versiones de los manejadores de paquetes `> npm@6.x | yarn@1.x | | yarn@2.x | pnpm@5.x`

1. Un explorador moderno para ejecutar la interfaz web. Actualmente soporta `Chrome, Firefox, Edge, and IE11`.

> Verdaccio soporta las ultimas versiones de Node.js de acuerdo a las recomendaciones del[Node.js Release Working Group](https://github.com/nodejs/Release).

### Introducción rapida

Aprende los primeros pasos antes de empezar, como instalar, donde esta el archivo de configuración y mas cosas. <iframe width="560" height="315" src="https://www.youtube.com/embed/P_hxy7W-IL4?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## Instalando el CLI

`Verdaccio` debe instalarse globalmente o usando los siguientes metodos:

Usando `npm`

```bash
npm install -g verdaccio
```

o usando `yarn`

```bash
yarn global add verdaccio
```

o usando `pnpm`

```bash
pnpm install -g verdaccio
```

![install verdaccio](assets/install_verdaccio.gif)

## Basic Usage

Once it has been installed, you only need to execute the CLI command:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/4.8.1
```

For more information about the CLI, please [read the cli section](cli.md).

You can set the registry by using the following command.

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

If you'd like a broader explanation, don't miss the tutorial created by [thedevlife](https://mybiolink.co/thedevlife) on how to Create Your Own Private NPM Package using Verdaccio. <iframe width="560" height="315" src="https://www.youtube.com/embed/Co0RwdpEsag?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## Docker Image

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

`Verdaccio` has an official docker image you can use, and in most cases, the default configuration is good enough. For more information about how to install the official image, [read the docker section](docker.md).

## Cloudron

`Verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![Instalación](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)