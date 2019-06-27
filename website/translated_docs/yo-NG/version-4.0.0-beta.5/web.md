---
id: version-4.0.0-beta.5-webui
title: Intafeesi Olumulo ti Ayelujara
original_id: webui
---

![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccio ni intafeesi olumulo ayelujara kan lati safihan awọn akopọ aladani naa nikan atipe o le jẹ sise ni akanṣe.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  primary_color: "#4b5e40"
  gravatar: true | false
  scope: \@scope
  sort_packages: asc | desc
```

Gbogbo awọn idena wiwọle ti o jẹ siseto[dabobo awọn akopọ rẹ](protect-your-dependencies.md) naa yoo jẹ sisamulo si Intafeesi Ayelujara naa.

### Iṣeto

| Ohun ini      | Iru        | Ti o nilo | Apẹẹrẹ                                                      | Atilẹyin   | Apejuwe                                                                                                                                              |
| ------------- | ---------- | --------- | ----------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| muṣiṣẹ        | boolean    | Rara      | otitọ/irọ                                                   | gbogbo     | gba lati ṣafihan intafeesi ayelujara naa                                                                                                             |
| akọle         | okun       | Rara      | Verdaccio                                                   | gbogbo     | Apejuwe akọle akori HTML                                                                                                                             |
| gravatar      | boolean    | Rara      | otitọ                                                       | `>v4`   | Gravatars yoo jẹ pipilẹṣẹ labẹ ibori ti o ba jẹ pe ohun-ini yii wa ni imusisẹ                                                                        |
| sort_packages | [asc,desc] | Rara      | asc                                                         | `>v4`   | Nipa atilẹwa awọn akopọ aladani ti jẹ siseto lẹsẹsẹ ni ọna igasoke                                                                                   |
| logo          | okun       | Rara      | /local/path/to/my/logo.png  
http://my.logo.domain/logo.png | gbogbo     | uRI kan nibi ti aami idanimọ wa (akọle aami idanimọ)                                                                                                 |
| primary_color | okun       | Rara      | "#4b5e40"                                                   | `>4`    | Awọ akọkọ lati lo jakejado UI naa(akọle, abbl)                                                                                                       |
| scope         | okun       | Rara      | \\@myscope                                                | `>v3.x` | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |

> O jẹ igbaniyanju pe ki iwọn aami idanimọ ni iwọn wọnyii `40x40` pixels.