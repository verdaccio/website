---
id: webui
title: "Interface de Usuário da Web"
---

![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

<div id="codefund">''</div>

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

### Internationalization

*Since v4.5.0*, there are translations available

```yaml
i18n:
  web: en-US  
```

> ⚠️ Only the languages in this [list](https://github.com/verdaccio/ui/tree/master/i18n/translations) are available, feel free to contribute with more. The default one is es-US

### Configuração

| Nome          | Tipo       | Obrigatório | Exemplo                                                       | Suporte       | Descrição                                                                                                                                         |
| ------------- | ---------- | ----------- | ------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable        | boolean    | Não         | true/false                                                    | completo      | habilitar a interface web                                                                                                                         |
| title         | string     | Não         | Verdaccio                                                     | completo      | Título da página web                                                                                                                              |
| gravatar      | boolean    | Não         | true                                                          | `>v4`      | Se esta propriedade estiver habilitada, gravatars serão gerados internamente                                                                      |
| sort_packages | [asc,desc] | Não         | asc                                                           | `>v4`      | Por padrão pacotes privados são classificados em ordem crescente                                                                                  |
| logo          | string     | Não         | `/local/path/to/my/logo.png` `http://my.logo.domain/logo.png` | completo      | a URI onde o logotipo está localizado (logotipo do cabeçalho)                                                                                     |
| primary_color | string     | Não         | "#4b5e40"                                                     | `>4`       | A cor principal a ser usada em toda a interface do usuário (cabeçalho, etc)                                                                       |
| scope         | string     | Não         | @myscope                                                      | `>v3.x`    | Se você estiver usando esse registro para um escopo de módulo específico, especifique esse escopo para defini-lo no cabeçalho de instruções webui |
| darkMode      | boolean    | Não         | false                                                         | `>=v4.5.2` | This mode is an special theme for those want to live in the dark side                                                                             |

> Recomenda-se que o tamanho do logotipo tenha o seguinte tamanho `40x40` pixels.
> 
> The `darMode` can be enbled via UI and is persisted in the local storage, furthermore, also void `primary_color` and dark cannot be customized.