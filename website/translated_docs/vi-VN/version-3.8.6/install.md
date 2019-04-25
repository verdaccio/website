---
id: version-3.8.6-installation
title: Installation
original_id: cài đặt
---

Verdaccio is a multiplatform web application. To install it, you need a few prerequisites.

#### Những yêu cầu tối thiểu

1. Phiên bản Node. js 
    - Đối với phiên bản `verdaccio@2.x` tối thiểu bạn phải dùng Node `v4.6.1`.
    - Đối với phiên bản `verdaccio@latest`, tối thiểu bạn phải dùng `6.12.0`.
2. npm `>=3.x` or `yarn`
3. Các giao diện hỗ trợ web bao gồm các trình duyệt như `Chrome, Firefox, Edge và IE9`.

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

![cài đặt verdaccio](/svg/install_verdaccio.gif)

## Cách sử dụng cơ bản

Sau khi cài đặt, bạn chỉ cần thực hiện lệnh CLI:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.1
```

Để biết thêm thông tin về CLI, vui lòng [ đọc phần cli](cli.md).

## Hình ảnh Docker

`verdaccio` có hình ảnh docker chính thức có thể được sử dụng và trong hầu hết các trường hợp, kể cả sử dụng với cấu hình mặc định. Để biết thêm chi tiết về cách cài đặt hình ảnh chính thức, vui lòng [đọc phần docker](docker.md).

## Cloudron

`verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![Cài đặt](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)