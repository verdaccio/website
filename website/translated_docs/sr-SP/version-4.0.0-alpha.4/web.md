---
id: version-4.0.0-alpha.4-webui
title: Web User Interface
original_id: webui
---
![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccio поседује прилагодиви веб кориснички интерфејс који приказује само приватне пакете.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  gravatar: true | false
  scope: @scope
  sort_packages: asc | desc
```

Све рестрикције које се односе на приступ дефинисане су у оквиру  и такође ће се аплицирати и на веб интерфејс.</p> 

### Конфигурисање

| Својство      | Тип        | Неопходно | Пример                         | Подршка  | Опис                                                                                                                                              |
| ------------- | ---------- | --------- | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable        | boolean    | Не        | true/false                     | all      | дозвољава приказ веб интерфејса                                                                                                                   |
| title         | string     | Не        | Verdaccio                      | all      | Опис наслова HTML заглавља                                                                                                                        |
| gravatar      | boolean    | Не        | true                           | `>v4` | Gravatars will be generated under the hood if this property is enabled                                                                            |
| sort_packages | [asc,desc] | Не        | asc                            | `>v4` | Gravatars will be generated under the hood if this property is enabled                                                                            |
| logo          | string     | Не        | http://my.logo.domain/logo.png | all      | a URI where logo is located (header logo)                                                                                                         |
| scope         | string     | Не        | \\@myscope                   | all      | Ако користите регистри за specific module scope, прецизирајте тај scope како бисте подесили webui instructions header (note: escape @ with \\@) |

> It is recommended the logo size has the following size `40x40` pixels.