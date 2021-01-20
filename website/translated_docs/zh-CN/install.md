---
id: installation
title: "安装"
---

Verdaccio 是一个跨平台的 Web 应用程序。在安装之前，您需要确保系统环境已满足以下基本条件。

## 最低要求

1. **Node.js** `v8.x （长期支持版“Carbon”）` 或更高版本.

2. 你喜爱的Node包管理器 `npm`、`pnpm` 或 `yarn`（classic 以及 berry）。

> 我们强烈推荐使用最新版本的Node包管理器 `> npm@6.x | yarn@1.x | | yarn@2.x | pnpm@4.x`

1. 一个现代Web浏览器用于使用网页界面，我们实际上支持 `Chrome, Firefox, Edge, and IE11`。

> Verdaccio 会根据 [Node. js 发布工作组](https://github.com/nodejs/Release) 的推荐以支持最新的 Node. js 版本。

## 安装命令行界面（CLI）

`Verdaccio` 必须通过以下任意方式安装到全局环境：

使用 `npm`

```bash
npm install -g verdaccio
```

或使用 `yarn`

```bash
yarn global add verdaccio
```

或使用 `pnpm`

```bash
pnpm install -g verdaccio
```

![install verdaccio](assets/install_verdaccio.gif)

## 基本用法

一旦安装完成后，你只需要执行命令行命令：

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/4.8.1
```

For more information about the CLI, please [read the cli section](cli.md).

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

如果你想要更详细的介绍，不要错过 thedevlife 写的关于如何使用Verdaccio创建你自己的私有NPM包的教程。 <iframe width="560" height="315" src="https://www.youtube.com/embed/Co0RwdpEsag?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## Docker Image

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

`Verdaccio` has an official docker image you can use, and in most cases, the default configuration is good enough. For more information about how to install the official image, [read the docker section](docker.md).

## Cloudron

`Verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![安装](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)