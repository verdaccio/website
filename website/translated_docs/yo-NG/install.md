---
id: installation
title: "Installation"
---

Verdaccio jẹ ohun elo ayelujara ti ọlọpọ pilatifọọmu. Lati fi sori ẹrọ, o nilo awọn nkan pataki diẹ ṣaaju.

#### Awọn ohun inilo iṣaaju

1. Oju ipade ti o ga ju 
    - Fun ẹya `verdaccio@3.x` Oju ipade `v6.12` jẹ ẹya ti o kere julọ ti atilẹyin wa fun.
    - Fun ẹya `verdaccio@4.0.0-alpha.x` tabi `verdaccio@4.x` Oju ipade `8.x` (LTS "Carbon") jẹ ẹya ti o kere julọ ti atilẹyin wa fun.
2. npm `>=4.x` tabi `yarn` > A ṣe igbaniyanju to ga lati lo Awọn Olusakoso Akopọ Oju ipade awọn onibara to tuntun julọ `> npm@5.x | yarn@1.x | pnpm@2.x`
3. Intafeesi wẹẹbu naa n ṣe atilẹyin fun awọn ẹrọ aṣàwákiri ayelujara `Chrome, Firefox, Edge, ati IE11`.

> Verdaccio ma se atilẹyin fun ẹya Node.js to tuntun julọ ni ibamu si awọn igbaniyanju [Node.js Release Working Group](https://github.com/nodejs/Release).

<div id="codefund">''</div>

## Fifi CLI naa sori ẹrọ

`verdaccio` gbọdọ jẹ fifi sori ẹrọ lagbaye nipa lilo boya ọkan ninu awọn ọna wọnyi:

Lilo `npm`

```bash
npm install -g verdaccio
```

tabi lilo `yarn`

```bash
yarn global add verdaccio
```

![install verdaccio](assets/install_verdaccio.gif)

## Ilo Ipilẹ

Once it has been installed, you only need to execute the CLI command:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

For more information about the CLI, please [read the cli section](cli.md).

You can set the registry by using the following command.

```bash
npm set registry http://localhost:4873/
```

or you can pass a `--registry` flag when needed.

```bash
npm install --registry http://localhost:4873
```

## Docker Image

`verdaccio` has an official docker image you can use, and in most cases, the default configuration is good enough. For more information about how to install the official image, [read the docker section](docker.md).

## Cloudron

`verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![Fi sori ẹrọ](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)