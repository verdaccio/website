---
id: version-3.8.6-webui
title: Web User Interface
original_id: webui
---

<p align="center"><img src="https://github.com/verdaccio/verdaccio/blob/master/assets/gif/verdaccio_big_30.gif?raw=true"></p>

Verdaccio поседује прилагодиви веб кориснички интерфејс који приказује само приватне пакете.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

Све рестрикције које се односе на приступ дефинисане су у оквиру  и такође ће се аплицирати и на веб интерфејс.</p> 

### Конфигурисање

| Својство | Тип     | Неопходно | Пример                         | Подршка | Опис                                                                                                                                              |
| -------- | ------- | --------- | ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable   | boolean | Не        | true/false                     | all     | дозвољава приказ веб интерфејса                                                                                                                   |
| title    | string  | Не        | Verdaccio                      | all     | Опис наслова HTML заглавља                                                                                                                        |
| logo     | string  | Не        | http://my.logo.domain/logo.png | all     | URL на коме се налази лого                                                                                                                        |
| scope    | string  | Не        | \\@myscope                   | all     | Ако користите регистри за specific module scope, прецизирајте тај scope како бисте подесили webui instructions header (note: escape @ with \\@) |