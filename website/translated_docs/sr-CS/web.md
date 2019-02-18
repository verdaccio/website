---
id: webui
title: "Web User Interface"
---


<p align="center"><img src="https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png"></p>

Verdaccio poseduje prilagodivi web korisnički interfejs koji prikazuje samo privatne pakete.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  gravatar: true | false
  scope: @scope
```

Sve restrikcije koje se odnose na pristup definisane su u okviru  i takođe će se aplicirati i na web interfejs.</p> 

### Konfigurisanje

| Svojstvo | Tip     | Neophodno | Primer                         | Podrška | Opis                                                                                                                                              |
| -------- | ------- | --------- | ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable   | boolean | No        | true/false                     | all     | dozvoljava prikaz web interfejsa                                                                                                                  |
| title    | string  | No        | Verdaccio                      | all     | opis naslova HTML zaglavlja                                                                                                                       |
| gravatar | boolean | No        | true                           | all     | Gravatars will be generated under the hood if this property is enabled                                                                            |
| logo     | string  | No        | http://my.logo.domain/logo.png | all     | URL na kome se nalazi logo                                                                                                                        |
| scope    | string  | Ne        | \\@myscope                   | all     | Ako koristite registri za specific module scope, precizirajte taj scope kako biste podesili webui instructions header (note: escape @ with \\@) |