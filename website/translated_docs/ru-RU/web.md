---
id: webui
title: "Web User Interface"
---

![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccio has a web user interface to display only the private packages and can be customisable.

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

All access restrictions defined to [protect your packages](protect-your-dependencies.md) will also apply to the Web Interface.

### Configuration

| Свойство      | Тип        | Обязательное | Пример                                                      | Поддержка  | Описание                                                                                                                                             |
| ------------- | ---------- | ------------ | ----------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable        | boolean    | Нет          | true/false                                                  | все        | allow to display the web interface                                                                                                                   |
| title         | string     | Нет          | Verdaccio                                                   | все        | HTML head title description                                                                                                                          |
| gravatar      | boolean    | Нет          | true                                                        | `>v4`   | Gravatars will be generated under the hood if this property is enabled                                                                               |
| sort_packages | [asc,desc] | Нет          | asc                                                         | `>v4`   | By default private packages are sorted by ascending                                                                                                  |
| logo          | string     | Нет          | /local/path/to/my/logo.png  
http://my.logo.domain/logo.png | все        | a URI where logo is located (header logo)                                                                                                            |
| primary_color | string     | Нет          | "#4b5e40"                                                   | `>4`    | The primary color to use throughout the UI (header, etc)                                                                                             |
| scope         | string     | Нет          | \\@myscope                                                | `>v3.x` | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |

> It is recommended the logo size has the following size `40x40` pixels.