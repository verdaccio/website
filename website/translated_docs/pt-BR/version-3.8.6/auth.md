---
id: version-3.8.6-authentification
title: Autenticação
original_id: authentification
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

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

As is described [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) until `npm@5.3.0` and all minor releases **won't allow you publish without a token**. However `yarn` has not such limitation.

## Default htpasswd

In order to simplify the setup, `verdaccio` use a plugin based on `htpasswd`. As of version v3.0.x an [external plugin](https://github.com/verdaccio/verdaccio-htpasswd) is used by default. The v2.x version of this package still contains the built-in version of this plugin.

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