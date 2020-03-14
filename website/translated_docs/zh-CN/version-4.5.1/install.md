---
id: version-4.5.1-installation
title: 安装
original_id: installation
---

Verdaccio is a multiplatform web application. To install it, you need a few basic prerequisites.

#### 最低要求:

1. Node higher Node `10.x` (LTS "Carbon") is the minimum supported version.

> After v4.5.0 Node v10 is now the minimum supported version.

2. npm `>=5.x` or, `pnpm` or `yarn`

  > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
3. Web 界面支持 `Chrome, Firefox, Edge, 和 IE11` 浏览器。

> Verdaccio 将根据 [Node. js 发布工作组](https://github.com/nodejs/Release) 的推荐支持最新的 Node. js 版本。

<div id="codefund">''</div>

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

## 创建你自己的私有NPM包教程

If you still need a deep explanation, don't miss the at [thedevlife](https://mybiolink.co/thedevlife) tutorial how to publish your own private package using Verdaccio.  <iframe width="560" height="315" src="https://www.youtube.com/embed/Co0RwdpEsag" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Docker 镜像

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

`verdaccio` 有官方 docker 镜像可以使用，在大多数情况下，默认配置已经足够了。 更多关于如何安装官方镜像的详细信息，请[阅读docker章节](docker.md)。

## Cloudron

`verdaccio` 可以使用 [Cloudron](https://cloudron.io) 一键安装

[![安装](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)

