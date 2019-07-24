---
id: version-3.8.6-installation
title: Instalação
original_id: installation
---

Verdaccio is a multiplatform web application. To install it, you need a few prerequisites.

#### Pré-requisitos

1. Node, acima da versão 
    - For version `verdaccio@2.x` Node `v4.6.1` is the minimum supported version.
    - For version `verdaccio@latest` Node `6.12.0` is the minimum supported version.
2. npm `>=3.x` or `yarn`
3. The web interface supports the `Chrome, Firefox, Edge, and IE9` browsers.

## Instação

O `verdaccio` deve ser instalado globalmente usando um dos métodos a seguir:

Usando `npm`

```bash
npm install -g verdaccio
```

ou usando `yarn`

```bash
yarn global add verdaccio
```

![install verdaccio](/svg/install_verdaccio.gif)

## Como Usar

Uma vez instalado, você só precisa executar o comando da CLI:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.1
```

Para mais informações sobre a CLI, por favor [leia a seção sobre a cli](cli.md).

## Imagem do Docker

`verdaccio` has an official docker image you can use, and in most cases, the default configuration is good enough. For more information about how to install the official image, [read the docker section](docker.md).

## Cloudron

`verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![Instalação](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)