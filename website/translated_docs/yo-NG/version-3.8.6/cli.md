---
id: version-3.8.6-cli
title: Irinṣẹ Ila aṣẹ
original_id: cli
---

CLI ti verdaccio naa jẹ irinṣẹ bibẹẹrẹ ohun elo rẹ.

## Awọn aṣẹ

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Aṣẹ                | Atilẹwa                        | Apẹẹrẹ         | Apejuwe         |
| ------------------ | ------------------------------ | -------------- | --------------- |
| --listen \ **-l** | 4873                           | -p 7000        | ibudo http      |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | faili iṣeto naa |

## Aaye faili iṣeto atilẹwa

Lati sawari itọsọna ile, a gbẹkẹle **$XDG_DATA_HOME** gẹgẹbi aṣayan akọkọ ati ayika Windows ti a n wa fun [iyipada ayika ti APPDATA](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Aaye ibi ipamọ atilẹwa

A lo iyipada ayika **$XDG_DATA_HOME** gẹgẹbi atilẹwa lati sawari ibi ipamọ nipasẹ atilẹwa eyiti [o yẹ ki o jẹ ikanna](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) bii ti $HOME/.local/share. Ti o ba n lo ibi ipamọ akanṣe kan, aaye yii ko ṣe pataki.

## Aaye faili ibi ipamọ data atilẹwa

Aaye faili ibi ipamọ data atilẹwa wa ninu aaye ibi ipamọ. Bibẹrẹ pẹlu ẹya 4.0.0, orukọ faili ibi ipamọ data yoo jẹ **.verdaccio-db.json** fun ifisori ẹrọ tuntun ti Verdaccio. Nigbati isagbega olupese Verdaccio kan to ti wa tẹlẹ ba n waye, orukọ faili naa yoo si ma jẹ **.sinopia-db.json**.