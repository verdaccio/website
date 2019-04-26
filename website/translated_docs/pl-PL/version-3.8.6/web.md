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

### Konfiguracja

| Właściwość | Typ         | Wymagane | Przykład                       | Wsparcie  | Opis                                                                                                                                                 |
| ---------- | ----------- | -------- | ------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable     | boolean     | Nie      | true/false                     | wszystkie | allow to display the web interface                                                                                                                   |
| title      | ciąg znaków | Nie      | Verdaccio                      | wszystkie | HTML head title description                                                                                                                          |
| logo       | ciąg znaków | Nie      | http://my.logo.domain/logo.png | wszystkie | a URI where logo is located                                                                                                                          |
| scope      | ciąg znaków | Nie      | \\@myscope                   | wszystkie | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |