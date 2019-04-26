---
id: version-3.8.6-installation
title: Instalacja
original_id: installation
---

Verdaccio is a multiplatform web application. To install it, you need a few prerequisites.

#### Wymagania

1. Node higher than 
    - For version `verdaccio@2.x` Node `v4.6.1` is the minimum supported version.
    - For version `verdaccio@latest` Node `6.12.0` is the minimum supported version.
2. npm `>=3.x` or `yarn`
3. Interfejs sieci web obsługujący przeglądarki `Chrome, Firefox, Edge i IE9`.

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

![install verdaccio](/svg/install_verdaccio.gif)

## Podstawowe użycie

Po jego zainstalowaniu, trzeba tylko wywołać komendę CLI:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.1
```

Aby uzyskać więcej informacji o CLI, zapoznaj się z [sekcją cli](cli.md).

## Docker Image

`verdaccio` ma oficjalny obraz docker, z którego można korzystać, i w większości przypadków domyślna konfiguracja jest wystarczająco dobra. Aby uzyskać więcej informacji na temat instalowania oficjalnego obrazu, [przeczytaj sekcję docker](docker.md).

## Cloudron

`verdaccio` jest również dostępna jako instalacja za pomocą jednego kliknięcia na [Cloudron](https://cloudron.io)

[![Install](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)