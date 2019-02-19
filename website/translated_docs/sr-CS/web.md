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
| gravatar      | boolean    | No        | true                           | `>v4` | Gravatar-i će biti generisani u pozadini, ako je ovo svojstvo omogućeno                                                                           |
| sort_packages | [asc,desc] | No        | asc                            | `>v4` | Po pravilu, privatni paketi su sortirani po rastućem redosledu                                                                                    |
| logo          | string     | Ne        | http://my.logo.domain/logo.png | all      | URI gde se logo nalazi (logo za header)                                                                                                           |
| scope         | string     | Ne        | \\@myscope                   | all      | Ako koristite registri za specific module scope, precizirajte taj scope kako biste podesili webui instructions header (note: escape @ with \\@) |

> Preporučeno je da logo bude dimenzija `40x40` piksela.