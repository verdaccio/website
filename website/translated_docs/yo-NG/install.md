---
id: installation
title: "Ifi sori ẹrọ"
---

Verdaccio is a multiplatform web application. To install it, you need a few basic prerequisites.

#### Awọn ohun inilo iṣaaju

1. Node higher Node `10.x` (LTS "Carbon") is the minimum supported version.

> After v4.5.0 *Node.js v10* is now the minimum supported version. If you cannot upgrade *Node.js v8*, keep using `v4.4.4`.

1. npm `>=5.x` or, `pnpm` or `yarn` > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
2. Intafeesi wẹẹbu naa n ṣe atilẹyin fun awọn ẹrọ aṣàwákiri ayelujara `Chrome, Firefox, Edge, ati IE11`.

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

![fi verdaccio sori ẹrọ](assets/install_verdaccio.gif)

## Ilo Ipilẹ

Lọgan to ti jẹ fifi sori ẹrọ, iwọ kan nilo lati ṣe abayọri aṣẹ CLI naa:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/4.5.0
```

Fun alaye siwaju sii nipa CLI naa, jọwọ [ka abala cli naa](cli.md).

O le ṣeto ibi iforukọsilẹ nipa lilo aṣẹ wọnyi.

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

If you still need a deep explanation, don't miss the at [thedevlife](https://mybiolink.co/thedevlife) tutorial how to publish your own private package using Verdaccio. <iframe width="560" height="315" src="https://www.youtube.com/embed/Co0RwdpEsag" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## Aworan Docker

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

`verdaccio` ni aworan docker ti o le lo, atipe ni ọpọlọpọ igba, iṣeto atilẹwa naa ti dara to. Fun alaye siwaju sii nipa bi o ṣe le fi aworan naa sori ẹrọ, [ka abala docker naa](docker.md).

## Cloudron

`verdaccio` tun wa gẹgẹbi ifisori ẹrọ olontẹ-ẹẹkan lori [Cloudron](https://cloudron.io)

[![Fi sori ẹrọ](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)