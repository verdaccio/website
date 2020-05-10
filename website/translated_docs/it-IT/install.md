---
id: installation
title: "Installazione"
---

Verdaccio is a multiplatform web application. To install it, you need a few basic prerequisites.

#### Prerequisiti

1. Node higher Node `10.x` (LTS "Carbon") is the minimum supported version.

> After v4.5.0 *Node.js v10* is now the minimum supported version. If you cannot upgrade *Node.js v8*, keep using `v4.4.4`.

1. npm `>=5.x` or, `pnpm` or `yarn` > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
2. L'interfaccia web supporta i browser `Chrome, Firefox, Edge, e IE11`.

> Verdaccio supporterà l'ultima versione di Node.js secondo le raccomandazioni del [Node.js Release Working Group](https://github.com/nodejs/Release).

<div id="codefund">''</div>

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
warn --- http address - http://localhost:4873/ - verdaccio/4.5.0
```

Per ulteriori informazioni riguardo a CLI, si prega di [leggere la sezione cli](cli.md).

È possibile impostare il registro utilizzando il comando seguente.

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

## Immagine Docker

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

`verdaccio` ha un'immagine docker ufficiale disponibile da utilizzare, ed in molti casi, la configurazione predefinita è sufficientemente buona. Per ulteriori informazioni su come installare l'immagine ufficiale, [leggere la sezione docker](docker.md).

## Cloudron

`verdaccio` è anche disponibile come applicazione da installare in 1 click su [Cloudron](https://cloudron.io)

[![Installazione](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)