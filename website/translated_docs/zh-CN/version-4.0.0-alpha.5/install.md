---
id: version-4.0.0-alpha.5-installation
title: 安装
original_id: installation
---
Verdaccio is a multiplatform web application. To install it, you need a few prerequisites.

#### 最低要求:

1. Node.js 版本 
    - For version `verdaccio@3.x` Node `v6.12` is the minimum supported version.
    - For version `verdaccio@4.0.0-alpha.x` or `verdaccio@4.x` Node `8.x` (LTS "Carbon") is the minimum supported version.
2. npm `>=4.x` or `yarn` > We highly recommend use the latest Node Package Managers clients `> npm@5.x | yarn@1.x | pnpm@2.x`
3. The web interface supports the `Chrome, Firefox, Edge, and IE11` browsers.

> Verdaccio will support latest Node.js version according the [Node.js Release Working Group](https://github.com/nodejs/Release) recomendations.

## 安装CLI

`verdaccio` 需要使用以下两种方法之一安装到全局环境：

使用 `npm`

```bash
npm install -g verdaccio
```

或使用 `yarn`

```bash
yarn global add verdaccio
```

![安装verdaccio](assets/install_verdaccio.gif)

## 基本使用

一旦安装后，您只需要执行命令：

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

更多关于CLI的详细信息，请[阅读cli章节](cli.md)。

## Docker 镜像

`verdaccio` 有官方 docker 镜像可以使用，在大多数情况下，默认配置已经足够了。 更多关于如何安装官方镜像的详细信息，请[阅读docker章节](docker.md)。

## Cloudron

`verdaccio` 可以使用 [Cloudron](https://cloudron.io) 一键安装

[![安装](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)