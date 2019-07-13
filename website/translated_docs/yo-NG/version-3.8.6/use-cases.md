---
id: version-3.8.6-use-cases
title: Awọn apẹẹrẹ Ilo
original_id: awọn apẹẹrẹ-ilo
---

## Lilo awọn akopọ ikọkọ

O se afikun awọn olumulo ati ki o ṣakoso irufẹ awọn olumulo ti o le wọle si irufẹ awọn akopọ.

Igbaniyanju wa wipe ki o seto iṣaaju kan fun awọn akojọ ikọkọ rẹ, fun apẹẹrẹ "local", nitoriki gbogbo awọn ohun ikọkọ rẹ le dabi iru eyi: `local-foo`. Ni ọna yii o le ya awọn akopọ gbogbogbo sọtọ gedegede kuro ni ti awọn ti ikọkọ.

## Lilo awọn akopọ gbogbogbo lati npmjs.org

Ti ko ba si awọn akopọ kan ninu ibi ipamọ, olupese yoo gbiyanju lati sawari rẹ lati npmjs.org. Ti npmjs.org ko ba ṣiṣẹ, o ma n pese awọn akopọ lati apo iranti ni idibọn wipe ko si awọn akopọ miiran. Verdaccio ma gba ohun ti o nilo nikan (= ti awọn onibara beere fun), ati pe alaye yii ma wa ni apo iranti, nitori ti onibara ba beere nkan kanna ni ẹlẹkeji, o le jẹ pipese lai beere lọwọ npmjs.org fun un.

Apẹẹrẹ: ti o ba se ibeere fun express@3.0.1 pẹlu aseyọri lati ọdọ olupese yi lẹẹkan, o ma ni anfani lati ṣe eyi lẹẹkansi (pẹlu gbogbo awọn agbẹkẹle rẹ) nigbakugba ati nigbati npmjs.org ko ba ṣiṣẹ gan. Ṣugbọn ka sọpe express@3.0.0 ko ni jẹ gbigba lati ayelujara titi ti ẹnikan yoo fi nilo rẹ gangan. Atipe ti npmjs.org ko ba si lori ila, olupese yii yoo sọ pe express@3.0.1 (= ohun ti o wa ni apo iranti nikan) nikan ni o jẹ titẹjade, ko kin se nkan miiran.

## Fagbara bori awọn akopọ gbogbogbo

Ti o ba fẹ lo diẹ ninu awọn akopọ ti gbangba ti ẹya to ti ni ayipada `foo`, o le ṣe atẹjade rẹ si olupese ibilẹ rẹ, nitorina nigbati iru `npm install foo` rẹ, o ma gbero fifi ti iwọ sori ẹrọ.

Awọn aṣayan meji lo wa nibi:

1. O fẹ ṣẹda fork to daduro ati ki o da imuṣiṣẹpọ pẹlu ẹya ti gbogbogbo duro.
    
    Ti o ba fẹ ṣe eyi, o yẹ ki o ṣe ayipada faili iṣeto rẹ ki verdaccio ma ṣe le ma beere awọn ibeere nipa akopọ yii si npmjs mọ rara. Se afikun iwọle to daduro fun akopọ yi si *config.yaml* ki o si yọ `npmjs` kuro ninu akojọ `proxy` ki o wa tun olupese bẹrẹ.
    
    Nigbati o ba ṣe atẹjade akopọ rẹ ni ibilẹ, o yẹ ki o bẹrẹ pẹlu ẹya okun ti o ga ju eyi ti o wa tẹlẹ lọ, nitori ko ma ba tako akopọ to ti wa ninu apo iranti tẹlẹ.

2. O fẹ lati lo ẹya ti ara rẹ fun igba diẹ, ṣugbọn pada si ti gbogbogbo ni kete ti o ba ti wa ni imudojuiwọn.
    
    Lati le yago fun awọn atako ti ẹya, o yẹ ki o lo afikun ipari ti iṣaaju agbejade to jẹ akanṣe ti awẹ ẹya tokan. Fun apẹẹrẹ, ti akopọ gbogbogbo ba jẹ ẹya 0.1.2, o le sagbega si 0.1.3-my-temp-fix. This way your package will be used until its original maintainer updates his public package to 0.1.3.