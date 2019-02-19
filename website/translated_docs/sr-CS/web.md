---
id: webui
title: "Web User Interface"
---
![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccio poseduje prilagodivi web korisnički interfejs koji prikazuje samo privatne pakete.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  gravatar: true | false
  scope: @scope
  sort_packages: asc | desc
```

Sve restrikcije koje se odnose na pristup definisane su u okviru  i takođe će se aplicirati i na web interfejs.</p> 

### Konfigurisanje

| Svojstvo      | Tip        | Neophodno | Primer                         | Podrška  | Opis                                                                                                                                              |
| ------------- | ---------- | --------- | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable        | boolean    | No        | true/false                     | all      | dozvoljava prikaz web interfejsa                                                                                                                  |
| title         | string     | No        | Verdaccio                      | all      | opis naslova HTML zaglavlja                                                                                                                       |
| gravatar      | boolean    | No        | true                           | `>v4` | Gravatars will be generated under the hood if this property is enabled                                                                            |
| sort_packages | [asc,desc] | No        | asc                            | `>v4` | Gravatars will be generated under the hood if this property is enabled                                                                            |
| logo          | string     | Ne        | http://my.logo.domain/logo.png | all      | a URI where logo is located (header logo)                                                                                                         |
| scope         | string     | Ne        | \\@myscope                   | all      | Ako koristite registri za specific module scope, precizirajte taj scope kako biste podesili webui instructions header (note: escape @ with \\@) |

> It is recommended the logo size has the following size `40x40` pixels.