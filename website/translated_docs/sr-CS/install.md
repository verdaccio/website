---
id: instalacija
title: "Instalacija"
---

Verdaccio je multi-platformna web aplikacija. Da biste je instalirali, potrebno je da ispunite nekoliko preduslova.

#### Preduslovi

1. Node viši od 
    - For version `verdaccio@3.x` Node `v6.12` is the minimum supported version.
    - For version `verdaccio@4.0.0-alpha.x` or `verdaccio@4.x` Node `8.x` (LTS "Carbon") is the minimum supported version.
2. npm `>=5.x` or `yarn` > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
3. The web interface supports the `Chrome, Firefox, Edge, and IE11` browsers.

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
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

Za dodatne informacije o CLI molimo Vas [da pročitate cli sekciju](cli.md).

You can set the registry by using the following command.

```bash
npm set registry http://localhost:4873/
```

or you can pass a `--registry` flag when needed.

```bash
npm install --registry http://localhost:4873
```

## Docker Image

`verdaccio` poseduje zvanični docker image koji možete koristiti, a u većini slučajeva, podrazumevana konfiguracija radi sasvim dobro. Za više informacija o tome kako da instalirate official image, [pročitajte docker sekciju](docker.md).

## Cloudron

`verdaccio` je takođe dostupan i kao instalacija u samo jednom kliku, na [Cloudron](https://cloudron.io)

[![Instaliranje](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)