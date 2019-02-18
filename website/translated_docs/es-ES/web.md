---
id: webui
title: "Web User Interface"
---


<p align="center"><img src="https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png"></p>

Verdaccio ofrece un interfaz web de usuario para mostrar solo los paquetes privados y puede ser personalizable.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  gravatar: true | false
  scope: @scope
```

Todo los accesos restringidos definidos para [proteger paquetes](protect-your-dependencies.md) también aplican al interfaz web.

### Configuración

| Propiedad | Tipo    | Requerido | Ejemplo                        | Soporte | Descripcion                                                                                                                         |
| --------- | ------- | --------- | ------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| enable    | boolean | No        | true/false                     | all     | habilita la interfaz web                                                                                                            |
| title     | string  | No        | Verdaccio                      | all     | El título de la interfaz web                                                                                                        |
| gravatar  | boolean | No        | true                           | all     | Gravatars will be generated under the hood if this property is enabled                                                              |
| logo      | string  | No        | http://my.logo.domain/logo.png | all     | el URI donde el logo esta localizado                                                                                                |
| scope     | string  | No        | \\@myscope                   | all     | Si estas usando el registro por un scope specifico, define el @scope en el encabezado de la interfaz web (note: escapa @ con \\@) |