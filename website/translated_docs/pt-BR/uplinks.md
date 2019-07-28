---
id: uplinks
title: "Uplinks"
---

Um *uplink* é um link com um registro externo que fornece acesso a pacotes externos.

![Uplinks](https://user-images.githubusercontent.com/558752/52976233-fb0e3980-33c8-11e9-8eea-5415e6018144.png)

### Utilização

```yaml
uplinks:
  npmjs:
   url: https://registry.npmjs.org/
  server2:
    url: http://mirror.local.net/
    timeout: 100ms
  server3:
    url: http://mirror2.local.net:9000/
  baduplink:
    url: http://localhost:55666/
```

### Configuração

Você pode definir vários uplinks e cada um deles deve ter um nome exclusivo (chave). Eles podem ter as seguintes propriedades:

| Propriedade  | Tipo    | Obrigatório | Exemplo                                 | Suporte  | Descrição                                                                                                                  | Padrão     |
| ------------ | ------- | ----------- | --------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- | ---------- |
| url          | string  | Sim         | https://registry.npmjs.org/             | completo | A url do registro                                                                                                          | npmjs      |
| ca           | string  | Não         | ~./ssl/client.crt'                      | completo | Local do certificado SSL                                                                                                   | No default |
| timeout      | string  | Não         | 100ms                                   | completo | define novo tempo limite para o pedido                                                                                     | 30s        |
| maxage       | string  | Não         | 10m                                     | completo | o limite de tempo para o cache ser válido                                                                                  | 2m         |
| fail_timeout | string  | Não         | 10m                                     | completo | define o tempo máximo quando uma solicitação se torna uma falha                                                            | 5m         |
| max_fails    | número  | Não         | 2                                       | completo | limit maximun failure request                                                                                              | 2          |
| cache        | boolean | Não         | [true,false]                            | >= 2.1   | cache all remote tarballs in storage                                                                                       | true       |
| auth         | list    | Não         | [see below](uplinks.md#auth-property)   | >= 2.5   | assigns the header 'Authorization' [more info](http://blog.npmjs.org/post/118393368555/deploying-with-npm-private-modules) | disabled   |
| headers      | list    | Não         | authorization: "Bearer SecretJWToken==" | completo | list of custom headers for the uplink                                                                                      | disabled   |
| strict_ssl   | boolean | Não         | [true,false]                            | >= 3.0   | If true, requires SSL certificates be valid.                                                                               | true       |

#### Auth property

The `auth` property allows you to use an auth token with an uplink. Using the default environment variable:

```yaml
uplinks:
  private:
    url: https://private-registry.domain.com/registry
    auth:
      type: bearer
      token_env: true # defaults to `process.env['NPM_TOKEN']`
```

or via a specified environment variable:

```yaml
uplinks:
  private:
    url: https://private-registry.domain.com/registry
    auth:
      type: bearer
      token_env: FOO_TOKEN
```

`token_env: FOO_TOKEN`internally will use `process.env['FOO_TOKEN']`

or by directly specifying a token:

```yaml
uplinks:
  private:
    url: https://private-registry.domain.com/registry
    auth:
      type: bearer
      token: "token"
```

> Note: `token` has priority over `token_env`

### You Must know

* Uplinks must be registries compatible with the `npm` endpoints. Eg: *verdaccio*, `sinopia@1.4.0`, *npmjs registry*, *yarn registry*, *JFrog*, *Nexus* and more.
* Setting `cache` to false will help to save space in your hard drive. This will avoid store `tarballs` but [it will keep metadata in folders](https://github.com/verdaccio/verdaccio/issues/391).
* Exceed with multiple uplinks might slow down the lookup of your packages due for each request a npm client does, verdaccio does 1 call for each uplink.
* The (timeout, maxage and fail_timeout) format follow the [NGINX measurement units](http://nginx.org/en/docs/syntax.html)