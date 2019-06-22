---
id: version-3.8.6-webui
title: Web User Interface
original_id: webui
---

<p align="center"><img src="https://github.com/verdaccio/verdaccio/blob/master/assets/gif/verdaccio_big_30.gif?raw=true"></p>

Verdaccio has a web user interface to display only the private packages and can be customisable.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

All access restrictions defined to [protect your packages](protect-your-dependencies.md) will also apply to the Web Interface.

### Iṣeto

| Ohun ini | Iru     | Ti o nilo | Apẹẹrẹ                         | Atilẹyin | Apejuwe                                                                                                                                              |
| -------- | ------- | --------- | ------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable   | boolean | Rara      | true/false                     | gbogbo   | allow to display the web interface                                                                                                                   |
| title    | okun    | Rara      | Verdaccio                      | gbogbo   | HTML head title description                                                                                                                          |
| logo     | okun    | Rara      | http://my.logo.domain/logo.png | gbogbo   | a URI where logo is located                                                                                                                          |
| scope    | okun    | Rara      | \\@myscope                   | gbogbo   | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |