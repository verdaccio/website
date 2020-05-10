---
id: version-4.6.1-installation
title: Installation
original_id: cài đặt
---

Verdaccio is a multiplatform web application. To install it, you need a few basic prerequisites.

#### Những yêu cầu tối thiểu

1. Node higher Node `10.x` (LTS "Carbon") is the minimum supported version.

> After v4.5.0 *Node.js v10* is now the minimum supported version. If you cannot upgrade *Node.js v8*, keep using `v4.4.4`.

2. npm `>=5.x` or, `pnpm` or `yarn`

  > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
3. The web interface supports the `Chrome, Firefox, Edge, and IE11` browsers.

> Verdaccio will support latest Node.js version according the [Node.js Release Working Group](https://github.com/nodejs/Release) recomendations.

<div id="codefund">''</div>

## Cài đặt CLI

`verdaccio` phải được cài đặt theo một trong hai cách:

Using `npm`

```bash
npm install -g verdaccio
```
hoặc sử dụng `yarn`

```bash
yarn global add verdaccio
```

![cài đặt verdaccio](assets/install_verdaccio.gif)


## Cách sử dụng cơ bản

Sau khi cài đặt, bạn chỉ cần thực hiện lệnh CLI:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/4.5.0
```

Để biết thêm thông tin về CLI, vui lòng [ đọc phần cli](cli.md).

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

If you still need a deep explanation, don't miss the at [thedevlife](https://mybiolink.co/thedevlife) tutorial how to publish your own private package using Verdaccio. <iframe width="560" height="315" src="https://www.youtube.com/embed/Co0RwdpEsag?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Hình ảnh Docker

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

`verdaccio` có hình ảnh docker chính thức có thể được sử dụng và trong hầu hết các trường hợp, kể cả sử dụng với cấu hình mặc định. Để biết thêm chi tiết về cách cài đặt hình ảnh chính thức, vui lòng [đọc phần docker](docker.md).

## Cloudron

`verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![Cài đặt](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)

