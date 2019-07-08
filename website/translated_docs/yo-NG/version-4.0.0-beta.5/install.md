---
id: version-4.0.0-beta.5-installation
title: Ifi sori ẹrọ
original_id: installation
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

![fi verdaccio sori ẹrọ](assets/install_verdaccio.gif)

## Ilo Ipilẹ

Lọgan to ti jẹ fifi sori ẹrọ, iwọ kan nilo lati ṣe abayọri aṣẹ CLI naa:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

Fun alaye siwaju sii nipa CLI naa, jọwọ [ka abala cli naa](cli.md).

O le ṣeto ibi iforukọsilẹ nipa lilo aṣẹ wọnyi.

```bash
npm set registry http://localhost:4873/
```

tabi o le gbe asia `--ibi iforukọsilẹ` kọja nigba ti o nilo.

```bash
npm install --registry http://localhost:4873
```

## Aworan Docker

`verdaccio` ni aworan docker ti o le lo, atipe ni ọpọlọpọ igba, iṣeto atilẹwa naa ti dara to. Fun alaye siwaju sii nipa bi o ṣe le fi aworan naa sori ẹrọ, [ka abala docker naa](docker.md).

## Cloudron

`verdaccio` tun wa gẹgẹbi ifisori ẹrọ olontẹ-ẹẹkan lori [Cloudron](https://cloudron.io)

[![Fi sori ẹrọ](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)