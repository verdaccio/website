---
id: version-3.8.6-webui
title: Web User Interface
original_id: webui
---

<p align="center"><img src="https://github.com/verdaccio/verdaccio/blob/master/assets/gif/verdaccio_big_30.gif?raw=true"></p>

Verdaccio poseduje prilagodivi web korisnički interfejs koji prikazuje samo privatne pakete.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

Sve restrikcije koje se odnose na pristup definisane su u okviru  i takođe će se aplicirati i na web interfejs.</p> 

### Konfigurisanje

| Svojstvo | Tip     | Neophodno | Primer                         | Podrška | Opis                                                                                                                                              |
| -------- | ------- | --------- | ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable   | boolean | Ne        | true/false                     | all     | dozvoljava prikaz web interfejsa                                                                                                                  |
| title    | string  | Ne        | Verdaccio                      | all     | opis naslova HTML zaglavlja                                                                                                                       |
| logo     | string  | Ne        | http://my.logo.domain/logo.png | all     | URL na kome se nalazi logo                                                                                                                        |
| scope    | string  | Ne        | \\@myscope                   | all     | Ako koristite registri za specific module scope, precizirajte taj scope kako biste podesili webui instructions header (note: escape @ with \\@) |