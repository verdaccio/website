---
id: version-4.0.0-alpha.4-webui
title: Web User Interface
original_id: webui
---
![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccio has a web user interface to display only the private packages and can be customisable.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  gravatar: true | false
  scope: @scope
  sort_packages: asc | desc
```

All access restrictions defined to [protect your packages](protect-your-dependencies.md) will also apply to the Web Interface.

### Konfiguracja

| Właściwość    | Typ         | Wymagane | Przykład                       | Wsparcie  | Opis                                                                                                                                                 |
| ------------- | ----------- | -------- | ------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable        | boolean     | Nie      | true/false                     | wszystkie | allow to display the web interface                                                                                                                   |
| title         | ciąg znaków | Nie      | Verdaccio                      | wszystkie | HTML head title description                                                                                                                          |
| gravatar      | boolean     | Nie      | true                           | `>v4`  | Gravatars will be generated under the hood if this property is enabled                                                                               |
| sort_packages | [asc,desc]  | Nie      | asc                            | `>v4`  | Gravatars will be generated under the hood if this property is enabled                                                                               |
| logo          | ciąg znaków | Nie      | http://my.logo.domain/logo.png | wszystkie | a URI where logo is located (header logo)                                                                                                            |
| scope         | ciąg znaków | Nie      | \\@myscope                   | wszystkie | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |

> It is recommended the logo size has the following size `40x40` pixels.