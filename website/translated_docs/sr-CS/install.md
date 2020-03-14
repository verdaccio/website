---
id: instalacija
title: "Instalacija"
---

Verdaccio is a multiplatform web application. To install it, you need a few basic prerequisites.

#### Preduslovi

1. Node higher Node `10.x` (LTS "Carbon") is the minimum supported version.

> After v4.5.0 Node v10 is now the minimum supported version.

1. npm `>=5.x` or, `pnpm` or `yarn` > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
2. The web interface supports the `Chrome, Firefox, Edge, and IE11` browsers.

> Verdaccio will support latest Node.js version according the [Node.js Release Working Group](https://github.com/nodejs/Release) recomendations.

<div id="codefund">''</div>

## Instalacija CLI

`verdaccio` mora biti instaliran globalno, korišćenjem neke od navedenih metoda:

Koristi `npm`

```bash
npm install -g verdaccio
```

ili koristi `yarn`

```bash
yarn global add verdaccio
```

![install verdaccio](assets/install_verdaccio.gif)

## Osnovna upotreba

Jednom kada se instalira, sve što treba je da izvršite CLI komandu:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/4.5.0
```

Za dodatne informacije o CLI molimo Vas [da pročitate cli sekciju](cli.md).

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

If you still need a deep explanation, don't miss the at [thedevlife](https://mybiolink.co/thedevlife) tutorial how to publish your own private package using Verdaccio. <iframe width="560" height="315" src="https://www.youtube.com/embed/Co0RwdpEsag" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## Docker Image

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

`verdaccio` poseduje zvanični docker image koji možete koristiti, a u većini slučajeva, podrazumevana konfiguracija radi sasvim dobro. Za više informacija o tome kako da instalirate official image, [pročitajte docker sekciju](docker.md).

## Cloudron

`verdaccio` je takođe dostupan i kao instalacija u samo jednom kliku, na [Cloudron](https://cloudron.io)

[![Instaliranje](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)