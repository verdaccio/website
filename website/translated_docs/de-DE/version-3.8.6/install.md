---
id: version-3.8.6-installation
title: Installation
original_id: installation
---

Verdaccio is a multiplatform web application. To install it, you need a few prerequisites.

#### Voraussetzungen

1. Node größer als 
    - For version `verdaccio@2.x` Node `v4.6.1` is the minimum supported version.
    - For version `verdaccio@latest` Node `6.12.0` is the minimum supported version.
2. npm `>=3.x` or `yarn`
3. The web interface supports the `Chrome, Firefox, Edge, and IE9` browsers.

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

![Installation verdaccio](/svg/install_verdaccio.gif)

## Grunddlegende Verwendung

Sobald die Installation durchgeführt wurde, muss nur die folgende CLI Anweisung ausgeführt werden:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.1
```

Für weitere Informationen über die CLI lesen Sie bitte die [cli Sektion](cli.md).

## Docker Image

`verdaccio` has an official docker image you can use, and in most cases, the default configuration is good enough. For more information about how to install the official image, [read the docker section](docker.md).

## Cloudron

`verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![Install](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)