---
id: version-3.8.6-webui
title: Intafeesi Olumulo ti Ayelujara
original_id: webui
---

<p align="center"><img src="https://github.com/verdaccio/verdaccio/blob/master/assets/gif/verdaccio_big_30.gif?raw=true"></p>

Verdaccio ni intafeesi olumulo ayelujara kan lati safihan awọn akopọ aladani naa nikan atipe o le jẹ sise ni akanṣe.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

Gbogbo awọn idena wiwọle ti o jẹ siseto[dabobo awọn akopọ rẹ](protect-your-dependencies.md) naa yoo jẹ sisamulo si Intafeesi Ayelujara naa.

### Iṣeto

| Ohun ini | Iru     | Ti o nilo | Apẹẹrẹ                         | Atilẹyin | Apejuwe                                                                                                                                      |
| -------- | ------- | --------- | ------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| muṣiṣẹ   | boolean | Rara      | otitọ/irọ                      | gbogbo   | gba lati ṣafihan intafeesi ayelujara naa                                                                                                     |
| akọle    | okun    | Rara      | Verdaccio                      | gbogbo   | Apejuwe akọle akori HTML                                                                                                                     |
| logo     | okun    | Rara      | http://my.logo.domain/logo.png | gbogbo   | URI kan nibi ti aami idanimọ wa                                                                                                              |
| scope    | okun    | Rara      | \\@myscope                   | gbogbo   | Ti o ba n lo iforukọsilẹ yii fun scope modulu kan ni pato, yan scope naa lati ṣeto rẹ ninu akọle itọnisọna webui (note: escape @ with \\@) |