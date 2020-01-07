---
id: version-4.4.1-authentification
title: Autenticação
original_id: authentification
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

<div id="codefund">''</div>

The client authentification is handled by `npm` client itself. Once you login to the application:

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

As you know *Verdaccio* uses the `htpasswd` by default. Esse plugin não implementa os métodos `allow_access`, `allow_publish` e `allow_unpublish`. Thus, *Verdaccio* will handle that in the following way:

* Se você não está logado (você está anônimo), `$all` e `$anonymous` significam exatamente o mesmo.
* If you are logged in, `$anonymous` won't be part of your groups and `$all` will match any logged user. A new group `$authenticated` will be added to the list.

As a takeaway, `$all` **will match all users, independently whether is logged or not**.

**The previous behavior only applies to the default authentication plugin**. Se você estiver usando um plugin personalizado e os implementos de plugin `allow_access`, `allow_publish` ou `allow_unpublish`, a resolução do acesso depende do próprio plugin. Verdaccio só irá definir os grupos padrão.

Vamos recapitular:

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

| Propriedade | Tipo   | Obrigatório | Exemplo    | Suporte  | Descrição                                         |
| ----------- | ------ | ----------- | ---------- | -------- | ------------------------------------------------- |
| file        | string | Sim         | ./htpasswd | completo | arquivo que hospeda as credenciais criptografadas |
| max_users   | número | Não         | 1000       | completo | define o limite de usuários                       |

No caso de não permitir o login de usuário, você pode definir `max_users: -1`.
