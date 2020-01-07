---
id: cài đặt
title: "Installation"
---

Verdaccio là một ứng dụng web đa nền tảng. Bạn cần phải có một số điều kiện bắt buộc trước khi cài đặt.

#### Những yêu cầu tối thiểu

1. Phiên bản Node. js 
    - For version `verdaccio@3.x` Node `v6.12` is the minimum supported version.
    - For version `verdaccio@4.0.0-alpha.x` or `verdaccio@4.x` Node `8.x` (LTS "Carbon") is the minimum supported version.
2. npm `>=5.x` or `yarn` > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
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
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

Để biết thêm thông tin về CLI, vui lòng [ đọc phần cli](cli.md).

You can set the registry by using the following command.

```bash
npm set registry http://localhost:4873/
```

or you can pass a `--registry` flag when needed.

```bash
npm install --registry http://localhost:4873
```

## Hình ảnh Docker

`verdaccio` có hình ảnh docker chính thức có thể được sử dụng và trong hầu hết các trường hợp, kể cả sử dụng với cấu hình mặc định. Để biết thêm chi tiết về cách cài đặt hình ảnh chính thức, vui lòng [đọc phần docker](docker.md).

## Cloudron

`verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![Cài đặt](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)