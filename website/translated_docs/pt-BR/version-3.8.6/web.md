---
id: version-3.8.6-webui
title: Interface de Usuário da Web
original_id: webui
---

<p align="center"><img src="https://github.com/verdaccio/verdaccio/blob/master/assets/gif/verdaccio_big_30.gif?raw=true"></p>

O Verdaccio possui uma interface de usuário da web para exibir apenas os pacotes privados e pode ser personalizável.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

Todas as restrições de acesso definidas para [proteger seus pacotes](protect-your-dependencies.md) também se aplicam à interface da web.

### Configuração

| Propriedade | Tipo    | Obrigatório | Exemplo                        | Suporte  | Descrição                                                                                                                                            |
| ----------- | ------- | ----------- | ------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable      | boolean | Não         | true/false                     | completo | habilitar a interface web                                                                                                                            |
| title       | string  | Não         | Verdaccio                      | completo | Título da página web                                                                                                                                 |
| logo        | string  | Não         | http://my.logo.domain/logo.png | completo | URI onde o logo se encontra                                                                                                                          |
| scope       | string  | Não         | \\@myscope                   | completo | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |