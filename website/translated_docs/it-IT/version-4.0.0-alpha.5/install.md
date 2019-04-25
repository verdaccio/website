---
id: version-4.0.0-alpha.5-installation
title: Installazione
original_id: installazione
---

Verdaccio è un'applicazione web multipiattaforma. Per installarlo, sono necessari alcuni prerequisiti.

#### Prerequisiti

1. Nodo maggiore di 
    - For version `verdaccio@3.x` Node `v6.12` is the minimum supported version.
    - For version `verdaccio@4.0.0-alpha.x` or `verdaccio@4.x` Node `8.x` (LTS "Carbon") is the minimum supported version.
2. npm `>=4.x` or `yarn` > We highly recommend use the latest Node Package Managers clients `> npm@5.x | yarn@1.x | pnpm@2.x`
3. The web interface supports the `Chrome, Firefox, Edge, and IE11` browsers.

> Verdaccio will support latest Node.js version according the [Node.js Release Working Group](https://github.com/nodejs/Release) recomendations.

## Installazione di CLI

`verdaccio` deve essere installato globalmente utilizzando uno dei seguenti metodi:

Usando `npm`

```bash
npm install -g verdaccio
```

o usando `yarn`

```bash
yarn global add verdaccio
```

![installare verdaccio](assets/install_verdaccio.gif)

## Utilizzo di base

Una volta che è stato installato, è necessario solamente eseguire il comando CLI:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

Per ulteriori informazioni riguardo a CLI, si prega di [leggere la sezione cli](cli.md).

## Immagine Docker

`verdaccio` ha un'immagine docker ufficiale disponibile da utilizzare, ed in molti casi, la configurazione predefinita è sufficientemente buona. Per ulteriori informazioni su come installare l'immagine ufficiale, [leggere la sezione docker](docker.md).

## Cloudron

`verdaccio` è anche disponibile come applicazione da installare in 1 click su [Cloudron](https://cloudron.io)

[![Installazione](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)