---
id: packages
title: "Permissões dos Pacotes"
---

É uma série de restrições que permitem ou restringem o acesso ao armazenamento local com base em critérios específicos.

As restrições de segurança permanecem dependentes do plugin em uso, por padrão o `verdaccio` usa o [htpasswd plugin](https://github.com/verdaccio/verdaccio-htpasswd). Se você usar um plugin diferente, o comportamento poderá ser diferente. O plugin padrão não suporta `allow_access` e `allow_publish` por si só, ele usa um fallback interno caso o plugin não esteja pronto para isso.

Para mais informações sobre permissões visite a [seção de autenticação no wiki](auth.md).

### Utilização

```yalm
packages:
  # scoped packages
  '@scope/*':
    access: $all
    publish: $all
    proxy: server2

  'private-*':
    access: $all
    publish: $all
    proxy: uplink1

  '**':
    # permite a todos os usuários (incluindo os não autentificados) a ler e
    # publicar todos os pacotes
    access: $all
    publish: $all
```

se nenhum for especificado, o padrão permanece

```yaml
packages:
  '**':
    access: $all
    publish: $authenticated
```

A lista de grupos internos gerenciados pelo `verdaccio` são:

```js
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous'
```

Todos os usuários recebem todos esses grupos de permissões, independentemente de serem anônimos ou não, mais os grupos fornecidos pelo plugin, no caso de `htpasswd` retornar o nome de usuário como um grupo. Por exemplo, se você estiver logado como `npmUser`, a lista de grupos será.

```js
// groups without '$' are going to be deprecated eventually
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous', 'npmUser'
```

Se você quiser proteger um grupo de pacotes específicos dentro do seu grupo, você deve fazer algo semelhante a isso. Vamos usar um `Regex` que cubra todos os pacotes `npmuser-` prefixados. Recomendamos usar um prefixo para seus pacotes, assim será mais fácil protegê-los.

```yaml
packages:
  'npmuser-*':
    access: npmuser
    publish: npmuser
```

Reinicie o `verdaccio` e no seu console tente instalar o `npmuser-core`.

```bash
$ npm install npmuser-core
npm install npmuser-core
npm ERR! code E403
npm ERR! 403 Forbidden: npmuser-core@latest

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/user/.npm/_logs/2017-07-02T12_20_14_834Z-debug.log
```

Você pode alterar o atual comportamento usando uma autenticação de plugin diferente. O `verdaccio` apenas verifica se o usuário que tentou acessar ou publicar um pacote específico pertence ao grupo correto.

#### Definir vários grupos

Definir vários grupos de acesso é bastante fácil, basta defini-los com um espaço em branco entre eles.

```yaml
  'company-*':
    access: admin internal
    publish: admin
    proxy: server1
  'supersecret-*':
    access: secret super-secret-area ultra-secret-area
    publish: secret ultra-secret-area
    proxy: server1
```

#### Bloqueando o acesso ao conjunto de pacotes

Se você quiser bloquear o acesso/publicação para um grupo específico de pacotes. Apenas não defina `access` e `publish`.

```yaml
packages:
  'old-*':
  '**':
    access: $all
    publish: $authenticated
```

#### Bloqueando a transmissão de um conjunto de pacotes específicos

Você pode querer bloquear um ou vários pacotes de buscar nos repositórios remotos, mas ao mesmo tempo, permitir que outros acessem *uplinks* diferentes.

Vamos ver o seguinte exemplo:

```yaml
packages:
  'jquery':
    access: $all
    publish: $all
  'my-company-*':
    access: $all
    publish: $authenticated
  '@my-local-scope/*':
    access: $all
    publish: $authenticated
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

Vamos descrever o que queremos com o exemplo acima:

* Eu quero hospedar minha própria dependência `jquery`, mas eu preciso evitar o proxy.
* I want all dependencies that match with `my-company-*` but I need to avoid proxying them.
* I want all dependencies that are in the `my-local-scope` scope but I need to avoid proxying them.
* I want proxying for all the rest of the dependencies.

Be **aware that the order of your packages definitions is important and always use double wilcard**. Because if you do not include it `verdaccio` will include it for you and the way that your dependencies are resolved will be affected.

#### Unpublishing Packages

The property `publish` handle permissions for `npm publish` and `npm unpublish`. But, if you want to be more specific, you can use the property `unpublish` in your package access section, for instance:

```yalm
packages:
  'jquery':
    access: $all
    publish: $all
    unpublish: root
  'my-company-*':
    access: $all
    publish: $authenticated
    unpublish: 
  '@my-local-scope/*':
    access: $all
    publish: $authenticated
    # unpublish: property commented out
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

In the previous example, the behaviour would be described:

* all users can publish the `jquery` package, but only the user `root` would be able to unpublish any version.
* only authenticated users can publish `my-company-*` packages, but **nobody would be allowed to unpublish them**.
* If `unpublish` is commented out, the access will be granted or denied by the `publish` definition.

### Configuração

You can define mutiple `packages` and each of them must have an unique `Regex`. The syntax is based on [minimatch glob expressions](https://github.com/isaacs/minimatch).

| Propriedade | Tipo   | Obrigatório | Exemplo        | Suporte        | Descrição                                                                 |
| ----------- | ------ | ----------- | -------------- | -------------- | ------------------------------------------------------------------------- |
| access      | string | Não         | $all           | completo       | define groups allowed to access the package                               |
| publish     | string | Não         | $authenticated | completo       | define groups allowed to publish                                          |
| proxy       | string | Não         | npmjs          | completo       | limit look ups for specific uplink                                        |
| storage     | string | Não         | string         | `/some-folder` | it creates a subfolder whithin the storage folder for each package access |

> We higlight that we recommend to not use **allow_access**/**allow_publish** and **proxy_access** anymore, those are deprecated and will soon be removed, please use the short version of each of those (**access**/**publish**/**proxy**).

If you want more information about how to use the **storage** property, please refer to this [comment](https://github.com/verdaccio/verdaccio/issues/1383#issuecomment-509933674).