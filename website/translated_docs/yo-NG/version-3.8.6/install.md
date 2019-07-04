---
id: version-3.8.6-installation
title: Ifi sori ẹrọ
original_id: installation
---

Verdaccio jẹ ohun elo ayelujara ti ọlọpọ pilatifọọmu. Lati fi sori ẹrọ, o nilo awọn nkan pataki diẹ ṣaaju.

#### Awọn ohun inilo iṣaaju

1. Oju ipade ti o ga ju 
    - Fun ẹya `verdaccio@2.x` Oju ipade `v4.6.1` jẹ ẹya ti o kere julọ ti atilẹyin wa fun.
    - Fun ẹya `verdaccio@latest` Oju ipade `6.12.0` jẹ ẹya ti o kere julọ ti atilẹyin wa fun.
2. npm `>=3.x` tabi `yarn`
3. Intafeesi wẹẹbu naa n ṣe atilẹyin fun awọn ẹrọ aṣàwákiri ayelujara `Chrome, Firefox, Edge, and IE9`.

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

![fi verdaccio sori ẹrọ](/svg/install_verdaccio.gif)

## Ilo Ipilẹ

Lọgan to ti jẹ fifi sori ẹrọ, iwọ kan nilo lati ṣe abayọri aṣẹ CLI naa:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.1
```

Fun alaye siwaju sii nipa CLI naa, jọwọ [ka abala cli naa](cli.md).

## Aworan Docker

`verdaccio` has an official docker image you can use, and in most cases, the default configuration is good enough. For more information about how to install the official image, [read the docker section](docker.md).

## Cloudron

`verdaccio` is also available as a 1-click install on [Cloudron](https://cloudron.io)

[![Fi sori ẹrọ](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)