---
id: installation
title: "安装"
---

Verdaccio 是一个跨平台的 Web 应用程序。在安装前，你需要满足一些基础的最低要求。

## 最低要求

1. **Node.js** `v8.x（长期支持版“Carbon”）` 或更高版本。

2. 你喜爱的Node包管理器 `npm`、`pnpm` 或 `yarn`（classic 以及 berry）。

> 我们强烈推荐使用最新版本的Node包管理器 `> npm@6.x | yarn@1.x | | yarn@2.x | pnpm@5.x`

1. 一个现代Web浏览器用于使用网页界面，我们实际上支持 `Chrome, Firefox, Edge, and IE11`。

> Verdaccio 会根据 [Node. js 发布工作组](https://github.com/nodejs/Release) 的推荐以支持最新的 Node. js 版本。

### 快速介绍

在开始之前学习基础：如何安装、配置文件的位置在哪里等等。 <iframe width="560" height="315" src="https://www.youtube.com/embed/P_hxy7W-IL4?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## 安装命令行界面（CLI）

> 在生产环境中使用Verdaccio前，请先阅读并了解 [最佳实践](best-practices.md)。

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

![安装 Verdaccio](assets/install_verdaccio.gif)

## 基本用法

一旦安装完成后，你只需要执行命令行界面（CLI）命令：

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/4.8.1
```

更多关于命令行界面（CLI）的信息，请[阅读命令行界面（CLI）章节](cli.md)。

你可以通过以下命令设置NPM源

```bash
npm set registry http://localhost:4873/
```

你可以在需要时带上参数 `--registry`

```bash
npm install --registry http://localhost:4873
```

在你的 `.npmrc` 中设置一个 `registry` 属性

```bash
//.npmrc
registry=http://localhost:4873
```

或在你的 `package.json` 中设置 `publishConfig`

```json
{
  "publishConfig": {
    "registry": "http://localhost:4873"
  }
}
```

## 创建属于你自己的私有NPM包教程

如果你想要更详细的介绍，不要错过 [thedevlife](https://mybiolink.co/thedevlife) 编写的关于如何使用 Verdaccio 创建你自己的私有NPM包的教程。 <iframe width="560" height="315" src="https://www.youtube.com/embed/Co0RwdpEsag?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## Docker 镜像

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

`Verdaccio` 提供可运行的官方 docker 镜像，在大多数情况下，默认配置已经足够了。 更多有关如何安装官方镜像的信息，请[阅读 docker 章节](docker.md)。

## Cloudron

`Verdaccio` 也可以使用 [Cloudron](https://cloudron.io) 一键安装

[![安装](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)