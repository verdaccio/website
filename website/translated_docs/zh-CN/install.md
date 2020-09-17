---
id: installation
title: "安装"
---

Verdaccio 是一个跨平台的 Web 应用程序。在安装之前，您需要确保系统环境已满足以下基本条件。

## Prerequisites

1. **Node.js** `v8.x (LTS "Carbon")` or higher.

2. Your favorite Node Package Manager `npm`, `pnpm` or `yarn`.

> We highly recommend to use the latest versions of Node Package Manager clients `> npm@6.x | yarn@1.x | pnpm@4.x`

1. A modern web browser to run the web interface. We actually support `Chrome, Firefox, Edge, and IE11`.

> Verdaccio 将根据 [Node. js 发布工作组](https://github.com/nodejs/Release) 的推荐支持最新的 Node. js 版本。

## Installing the CLI

`Verdaccio` must be installed globally using either of the following methods:

使用 `npm`

```bash
npm install -g verdaccio
```

或使用 `yarn`

```bash
yarn global add verdaccio
```

![安装verdaccio](assets/install_verdaccio.gif)

## Basic Usage

一旦安装后，您只需要执行命令：

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/4.5.0
```

更多关于CLI的详细信息，请[阅读cli章节](cli.md)。

你可以通过以下命令来设置npm从哪个源下载

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

If you'd like a broader explanation, don't miss the tutorial created by [thedevlife](https://mybiolink.co/thedevlife) on how to Create Your Own Private NPM Package using Verdaccio. <iframe width="560" height="315" src="https://www.youtube.com/embed/Co0RwdpEsag?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## Docker Image

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

`Verdaccio` has an official docker image you can use, and in most cases, the default configuration is good enough. 更多关于如何安装官方镜像的详细信息，请[阅读docker章节](docker.md)。

## Cloudron

`Verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![安装](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)