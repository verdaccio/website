---
id: installation
title: "Instalacja"
---

Verdaccio jest wieloplatformową aplikacją internetową. Aby ją zainstalować, musisz spełnić kilka wymagań.

#### Wymagania

1. Node higher than 
    - For version `verdaccio@3.x` Node `v6.12` is the minimum supported version.
    - For version `verdaccio@4.0.0-alpha.x` or `verdaccio@4.x` Node `8.x` (LTS "Carbon") is the minimum supported version.
2. npm `>=5.x` or `yarn` > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
3. The web interface supports the `Chrome, Firefox, Edge, and IE11` browsers.

> Verdaccio will support latest Node.js version according the [Node.js Release Working Group](https://github.com/nodejs/Release) recomendations.

<div id="codefund">''</div>

## Instalacja CLI

`verdaccio` musi być zainstalowany globalnie używając dowolnej z poniższych metod:

Za pomocą `npm`

```bash
npm install -g verdaccio
```

lub za pomocą `yarn`

```bash
yarn global add verdaccio
```

![install verdaccio](assets/install_verdaccio.gif)

## Podstawowe użycie

Po jego zainstalowaniu, trzeba tylko wywołać komendę CLI:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

Aby uzyskać więcej informacji o CLI, zapoznaj się z [sekcją cli](cli.md).

You can set the registry by using the following command.

```bash
npm set registry http://localhost:4873/
```

or you can pass a `--registry` flag when needed.

```bash
npm install --registry http://localhost:4873
```

## Docker Image

`verdaccio` ma oficjalny obraz docker, z którego można korzystać, i w większości przypadków domyślna konfiguracja jest wystarczająco dobra. Aby uzyskać więcej informacji na temat instalowania oficjalnego obrazu, [przeczytaj sekcję docker](docker.md).

## Cloudron

`verdaccio` jest również dostępna jako instalacja za pomocą jednego kliknięcia na [Cloudron](https://cloudron.io)

[![Install](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)