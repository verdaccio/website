---
id: webui
title: "Interface de Usuário da Web"
---

![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

O Verdaccio possui uma interface de usuário da web para exibir apenas os pacotes privados e pode ser personalizável.

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

Todas as restrições de acesso definidas para [proteger seus pacotes](protect-your-dependencies.md) também se aplicam à interface da web.

### Configuração

| Nome          | Tipo       | Obrigatório | Exemplo                                                       | Suporte    | Descrição                                                                                                                |
| ------------- | ---------- | ----------- | ------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| enable        | boolean    | Não         | true/false                                                    | completo   | habilitar a interface web                                                                                                |
| title         | string     | Não         | Verdaccio                                                     | completo   | Título da página web                                                                                                     |
| gravatar      | boolean    | Não         | true                                                          | `>v4`   | Gravatars will be generated under the hood if this property is enabled                                                   |
| sort_packages | [asc,desc] | Não         | asc                                                           | `>v4`   | By default private packages are sorted by ascending                                                                      |
| logo          | string     | Não         | `/local/path/to/my/logo.png` `http://my.logo.domain/logo.png` | completo   | a URI where logo is located (header logo)                                                                                |
| primary_color | string     | Não         | "#4b5e40"                                                     | `>4`    | The primary color to use throughout the UI (header, etc)                                                                 |
| scope         | string     | Não         | @myscope                                                      | `>v3.x` | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header |

> It is recommended the logo size has the following size `40x40` pixels.