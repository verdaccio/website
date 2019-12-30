---
id: installation
title: "Installazione"
---

Verdaccio è un'applicazione web multi piattaforma. Per la sua installazione sono necessari pochi prerequisiti.

#### Prerequisiti

1. Nodo maggiore di 
    - Per la versione `verdaccio@3.x` Node `v6.12.` è la versione minima supportata.
    - Per la versione `verdaccio@4.0.0-alpha.x` o `verdaccio@4.x` Node `8.x` (LTS "Carbon") è la versione minima supportata.
2. npm `>=5.x` or `yarn` > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
3. L'interfaccia web supporta i browser `Chrome, Firefox, Edge, e IE11`.

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
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

Per ulteriori informazioni riguardo a CLI, si prega di [leggere la sezione cli](cli.md).

È possibile impostare il registro utilizzando il comando seguente.

```bash
npm set registry http://localhost:4873/
```

o si può passare un `--registry` flag quando necessario.

```bash
npm install --registry http://localhost:4873
```

## Immagine Docker

`verdaccio` ha un'immagine docker ufficiale disponibile da utilizzare, ed in molti casi, la configurazione predefinita è sufficientemente buona. Per ulteriori informazioni su come installare l'immagine ufficiale, [leggere la sezione docker](docker.md).

## Cloudron

`verdaccio` è anche disponibile come applicazione da installare in 1 click su [Cloudron](https://cloudron.io)

[![Installazione](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)