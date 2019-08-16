---
id: version-4.0.0-beta.10-webui
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
  primary_color: "#4b5e40"
  gravatar: true | false
  scope: "@scope"
  sort_packages: asc | desc
```

All access restrictions defined to [protect your packages](protect-your-dependencies.md) will also apply to the Web Interface.

### Configuration

| Property      | Type       | Required | Beispiel                                                      | Support    | Beschreibung                                                                                                                                         |
| ------------- | ---------- | -------- | ------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable        | boolean    | Nein     | true/false                                                    | all        | allow to display the web interface                                                                                                                   |
| title         | string     | Nein     | Verdaccio                                                     | all        | HTML head title description                                                                                                                          |
| gravatar      | boolean    | Nein     | true                                                          | `>v4`   | Gravatars will be generated under the hood if this property is enabled                                                                               |
| sort_packages | [asc,desc] | Nein     | asc                                                           | `>v4`   | By default private packages are sorted by ascending                                                                                                  |
| logo          | string     | Nein     | `/local/path/to/my/logo.png` `http://my.logo.domain/logo.png` | all        | a URI where logo is located (header logo)                                                                                                            |
| primary_color | string     | Nein     | "#4b5e40"                                                     | `>4`    | The primary color to use throughout the UI (header, etc)                                                                                             |
| scope         | string     | Nein     | \\@myscope                                                  | `>v3.x` | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |

> It is recommended the logo size has the following size `40x40` pixels.