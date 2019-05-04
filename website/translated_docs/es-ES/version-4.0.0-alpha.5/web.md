---
id: version-4.0.0-alpha.5-webui
title: Interfaz Web de Usuario
original_id: webui
---

![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccio ofrece un interfaz web de usuario para mostrar solo los paquetes privados y puede ser personalizable.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  gravatar: true | false
  scope: @scope
  sort_packages: asc | desc
```

Todo los accesos restringidos definidos para [proteger paquetes](protect-your-dependencies.md) también aplican al interfaz web.

### Configuración

| Propiedad     | Tipo       | Requerido | Ejemplo                        | Soporte    | Descripción                                                                                                                         |
| ------------- | ---------- | --------- | ------------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| enable        | boolean    | No        | true/false                     | all        | habilita la interfaz web                                                                                                            |
| title         | string     | No        | Verdaccio                      | all        | El título de la interfaz web                                                                                                        |
| gravatar      | boolean    | No        | true                           | `>v4`   | Gravatars will be generated under the hood if this property is enabled                                                              |
| sort_packages | [asc,desc] | No        | asc                            | `>v4`   | By default private packages are sorted by ascending                                                                                 |
| logo          | string     | No        | http://my.logo.domain/logo.png | all        | a URI where logo is located (header logo)                                                                                           |
| scope         | string     | No        | \\@myscope                   | `>v3.x` | Si estas usando el registro por un scope specifico, define el @scope en el encabezado de la interfaz web (note: escapa @ con \\@) |

> It is recommended the logo size has the following size `40x40` pixels.