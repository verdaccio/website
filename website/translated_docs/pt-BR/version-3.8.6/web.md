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

### Configuration

| Property | Type    | Obrigatório | Exemplo                        | Support | Descrição                                                                                                                                            |
| -------- | ------- | ----------- | ------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable   | boolean | Não         | true/false                     | all     | habilitar a interface web                                                                                                                            |
| title    | string  | Não         | Verdaccio                      | all     | Título da página web                                                                                                                                 |
| logo     | string  | Não         | http://my.logo.domain/logo.png | all     | URI onde o logo se encontra                                                                                                                          |
| scope    | string  | Não         | \\@myscope                   | all     | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |