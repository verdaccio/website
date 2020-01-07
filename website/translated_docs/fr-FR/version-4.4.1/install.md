---
id: version-4.4.1-installation
title: Installation
original_id: installation
---

Verdaccio is a multiplatform web application. To install it, you need a few prerequisites.

#### Conditions préalables

1. Nœud supérieur à
    - For version `verdaccio@3.x` Node `v6.12` is the minimum supported version.
    - For version `verdaccio@4.0.0-alpha.x` or `verdaccio@4.x` Node `8.x` (LTS "Carbon") is the minimum supported version.
2. npm `>=5.x` or `yarn`

  > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
3. The web interface supports the `Chrome, Firefox, Edge, and IE11` browsers.

> Verdaccio will support latest Node.js version according the [Node.js Release Working Group](https://github.com/nodejs/Release) recomendations.

<div id="codefund">''</div>

## En cours d'installation du CLI

`verdaccio` doit être installé globalement en utilisant l'une des méthodes suivantes:

En utilisant `npm`

```bash
npm install -g verdaccio
```
ou en utilisant `yarn`

```bash
yarn global add verdaccio
```

![installer verdaccio](assets/install_verdaccio.gif)


## Usage basique

Une fois installé, il vous suffit d’exécuter la commande CLI:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

Pour plus d'information sur CLI, veuillez [lire la section cli](cli.md).

You can set the registry by using the following command.

```bash
npm set registry http://localhost:4873/
```

or you can pass a `--registry` flag when needed.

```bash
npm install --registry http://localhost:4873
```

## Image de docker

`verdaccio` a une image de docker officielle que vous pouvez utiliser, et dans la majorité des cas, la configuration par défaut est assez bonne. Pour plus d’informations sur la façon d’installer l’image officielle, [lisez la section docker](docker.md).

## Cloudron

`verdaccio` est également disponible en application à installer en 1 clic sur [Cloudron](https://cloudron.io)

[![Installer](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)

