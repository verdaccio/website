---
id: authentification
title: "Autenticação"
---

A autenticação está ligada ao [plugin](plugins.md) auth que você está utilizando. As restrições do pacote também são tratadas pelo [Package Access](packages.md).

A autenticação do cliente é tratada pelo próprio cliente do `npm`. Uma vez logado no aplicativo:

```bash
npm adduser --registry http://localhost:4873
```

Um token é gerado no arquivo de configuração `npm` hospedado na pasta inicial do seu usuário. Para mais informações sobre o `.npmrc` leia a [documentação oficial](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Publicação anônima

`verdaccio` permite que você ative a publicação anônima, para conseguir isso você precisará configurar corretamente o [acesso a pacotes](packages.md).

Por exemplo:

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

As is described [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) until `npm@5.3.0` and all minor releases **won't allow you publish without a token**.

## Entendendo Grupos

### O significado de `$all` e `$anonymous`

Como você sabe, *Verdaccio* usa o `htpasswd` por padrão. Esse plugin não implementa os métodos `allow_access`, `allow_publish` e `allow_unpublish`. Assim, o *Verdaccio* irá lidar com isso da seguinte maneira:

* Se você não está logado (você está anônimo), `$all` e `$anonymous` significam exatamente o mesmo.
* Se você estiver logado, `$anonymous` não fará parte de seus grupos e `$all` irá corresponder a qualquer usuário logado. Um novo grupo `$authenticated` será adicionado à lista.

O ponto chave é, `$all` **irá corresponder a todos os usuários, independentemente de estarem logados ou não**.

**O comportamento anterior só se aplica ao plugin de autenticação padrão**. If you are using a custom plugin and such plugin implements `allow_access`, `allow_publish` or `allow_unpublish`, the resolution of the access depends on the plugin itself. Verdaccio will only set the default groups.

Let's recap:

* **logged**: `$all`, `$authenticated`, + groups added by the plugin
* **anonymous (logged out)**: `$all` and `$anonymous`.

## Default htpasswd

In order to simplify the setup, `verdaccio` use a plugin based on `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    #max_users: 1000
```

| Property  | Type   | Obrigatório | Exemplo    | Support | Descrição                                                    |
| --------- | ------ | ----------- | ---------- | ------- | ------------------------------------------------------------ |
| file      | string | Sim         | ./htpasswd | all     | arquivo onde ficam armazenadas as credenciais criptografadas |
| max_users | number | Não         | 1000       | todos   | define o limite de usuários                                  |

No caso de não permitir o login de usuário, você pode definir `max_users: -1`.