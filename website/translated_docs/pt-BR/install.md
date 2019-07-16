---
id: installation
title: "Instalação"
---

Verdaccio é uma aplicação web multiplataforma. Para instalá-lo, você precisa de alguns pré-requisitos.

#### Pré-requisitos

1. Node, acima da versão 
    - Para a versão `verdaccio@3.x`, o Node `v6.12` é a versão mínima suportada.
    - Para as versões `verdaccio@4.0.0-alpha.x` ou `verdaccio@4.x`, o Node `8.x` (LTS "Carbon") é a versão mínima suportada.
2. npm `>=4.x` or `yarn` > We highly recommend use the latest Node Package Managers clients `> npm@5.x | yarn@1.x | pnpm@2.x`
3. The web interface supports the `Chrome, Firefox, Edge, and IE11` browsers.

> Verdaccio will support latest Node.js version according the [Node.js Release Working Group](https://github.com/nodejs/Release) recomendations.

<div id="codefund">''</div>

## Instação

`verdaccio` must be installed globaly using either of the following methods:

Usando `npm`

```bash
npm install -g verdaccio
```

ou usando `yarn`

```bash
yarn global add verdaccio
```

![install verdaccio](assets/install_verdaccio.gif)

## Como Usar

Once it has been installed, you only need to execute the CLI command:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

For more information about the CLI, please [read the cli section](cli.md).

You can set the registry by using the following command.

```bash
npm set registry http://localhost:4873/
```

or you can pass a `--registry` flag when needed.

```bash
npm install --registry http://localhost:4873
```

## Imagem do Docker

`verdaccio` has an official docker image you can use, and in most cases, the default configuration is good enough. For more information about how to install the official image, [read the docker section](docker.md).

## Cloudron

`verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![Install](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)