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

### Configuration

| Propriedade   | Tipo       | Obrigatório | Exemplo                        | Suporte  | Descrição                                                                                                                                            |
| ------------- | ---------- | ----------- | ------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable        | boolean    | Não         | true/false                     | completo | habilitar a interface web                                                                                                                            |
| title         | string     | Não         | Verdaccio                      | completo | Título da página web                                                                                                                                 |
| gravatar      | boolean    | Não         | true                           | `>v4` | Gravatars will be generated under the hood if this property is enabled                                                                               |
| sort_packages | [asc,desc] | Não         | asc                            | `>v4` | Gravatars will be generated under the hood if this property is enabled                                                                               |
| logo          | string     | Não         | http://my.logo.domain/logo.png | completo | a URI where logo is located (header logo)                                                                                                            |
| scope         | string     | Não         | \\@myscope                   | completo | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |

> It is recommended the logo size has the following size `40x40` pixels.