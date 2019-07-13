---
id: version-4.0.0-alpha.4-kini-verdaccio
title: Ki ni verdaccio?
original_id: ki-ni-verdaccio
---

Verdaccio jẹ **ibi iforukọsilẹ aṣoju ikọkọ npm aladani fifuyẹ** to jẹ kikọ ni **Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## Kini n jẹ ibi iforukọsilẹ

* Ibi ipamọ kan fun awọn akopọ ti o n ṣe imuṣiṣẹ **alaye CommonJS Compliant Package Registry** fun kika alaye akopọ
* Pese API kan to ni ibamu pẹlu awọn onibara npm **(yarn/npm/pnpm)**
* Tẹle itumọ ọrọ ti o n se ẹya to ni ibaramu **(semver)**

    $> verdaccio
    

![ibi iforukọsilẹ](assets/verdaccio_server.gif)

## Lilo Verdaccio

Lilo verdaccio pẹlu eyikeyi onibara alakoso akopọ oju ipade jẹ ohun to rọrun.

![ibi iforukọsilẹ](assets/npm_install.gif)

O le lo iforukọsilẹ alakanṣe nipa siseto agbaye fun gbogbo awọn iṣẹ rẹ

    npm set registry http://localhost:4873
    

tabi nipa ila aṣẹ gẹgẹbi ariyanjiyan `--registry` ni npm (o yatọ diẹ ni yarn)

    npm install lodash --registry http://localhost:4873
    

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
* O jẹ **fifayọ** dida lori `sinopia@1.4.0` ati 100% **ibasisẹpọ ẹlẹyin**.
* Verdaccio tumọ si **Awọ ewe ti o gbajumọ ni aaye atijọ ni Italy fun aworan fresco**.