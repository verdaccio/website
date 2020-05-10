---
id: version-4.6.1-what-is-verdaccio
title: Ki ni verdaccio?
original_id: ki-ni-verdaccio
---

Verdaccio is a **lightweight private npm proxy registry** built in **Node.js**
<iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>
<div id="codefund">''</div>

## Kini n jẹ ibi iforukọsilẹ

* A repository for packages that implements the **CommonJS Compliant Package Registry specification** for reading package info
* Provide an API compatible with npm clients **(yarn/npm/pnpm)**
* Follow the semantic Versioning compatible **(semver)**

```
$> verdaccio
```

![ibi iforukọsilẹ](assets/verdaccio_server.gif)

## Lilo Verdaccio

Lilo verdaccio pẹlu eyikeyi onibara alakoso akopọ oju ipade jẹ ohun to rọrun.

![ibi iforukọsilẹ](assets/npm_install.gif)

O le lo iforukọsilẹ alakanṣe nipa siseto agbaye fun gbogbo awọn iṣẹ rẹ

```
npm set registry http://localhost:4873
```

tabi nipa ila aṣẹ gẹgẹbi ariyanjiyan `--registry` ni npm (o yatọ diẹ ni yarn)

```
npm install lodash --registry http://localhost:4873
```

## Ikọkọ

Gbogbo awọn akopọ ti o ṣe atẹjade rẹ jẹ ikọkọ atipe o se wọle si nikan ni dida lori iṣeto rẹ.

## Aṣoju ikọkọ

Verdaccio n fi gbogbo awọn igbarale si apo iranti nipasẹ ibeere ati mu ki awọn fifi sori ẹrọ yara si ni awọn nẹtiwọki ibilẹ tabi ti ikọkọ.

## Verdaccio ni soki

* O jẹ ohun elo ayelujara ti o da lori Node.js
* O jẹ ibi iforukọsilẹ npm ti ikọkọ kan
* O jẹ aṣoju ikọkọ nẹtiwọki ibilẹ kan
* O jẹ ohun elo alaasomọ kan
* O rọrun lati fi sori ẹrọ ati lati lo
* A pese atilẹyin Docker ati Kubernetes
* O ni ibamu 100% pẹlu yarn, npm ati pnpm
* It was **forked** based on `sinopia@1.4.0` and 100% **backward compatible**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.
