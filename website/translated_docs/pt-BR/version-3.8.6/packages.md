---
id: version-3.8.6-packages
title: Permissões dos Pacotes
original_id: pacotes
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

The list of valid groups according the default plugins are

```js
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous'
```

Todos os usuários recebem todos esses grupos de permissões, independentemente de serem anônimos ou não, mais os grupos fornecidos pelo plugin, no caso de `htpasswd` retornar o nome de usuário como um grupo. Por exemplo, se você estiver logado como `npmUser`, a lista de grupos será.

```js
// groups without '$' are going to be deprecated eventually
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous', 'npmUser'
```

Se você quiser proteger um grupo de pacotes específicos dentro do seu grupo, você deve fazer algo semelhante a isso. Vamos usar um `Regex` que cubra todos os pacotes `npmuser-` prefixados. We recomend using a prefix for your packages, in that way it will be easier to protect them.

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

If you want to block the acccess/publish to a specific group of packages. Just do not define `access` and `publish`.

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
* Eu quero todas as dependências que combinam com `my-company-*`, mas eu preciso que os pacotes não se realizem via proxy.
* Eu quero todas as dependências que estão no escopo `my-local-scope`, mas eu preciso que os pacotes não se realizem via proxy.
* Eu quero que o resto das dependências se realizem via proxy.

Esteja **ciente de que a ordem das suas definições de pacotes é importante e use sempre wildcard duplo **. Porque se você não incluir o `verdaccio` irá incluí-lo para você e o modo como suas dependências serão resolvidas será afetado.

### Configuração

You can define mutiple `packages` and each of them must have an unique `Regex`. The syntax is based on [minimatch glob expressions](https://github.com/isaacs/minimatch).

| Propriedade | Tipo    | Obrigatório | Exemplo        | Suporte  | Descrição                                              |
| ----------- | ------- | ----------- | -------------- | -------- | ------------------------------------------------------ |
| access      | string  | Não         | $all           | completo | define os grupos com permissão para acessar os pacotes |
| publish     | string  | Não         | $authenticated | completo | define os grupos permitidos a publicar                 |
| proxy       | string  | Não         | npmjs          | completo | limita a busca a um uplink específico                  |
| storage     | boolean | Não         | [true,false]   | completo | TODO                                                   |

> Salientamos a recomendação de não usar mais **allow_access**/**allow_publish** e **proxy_access**, eles estão obsoletos e serão removidos em breve. Use a versão curta de cada um deles (**access**/**publish**/**proxy**).