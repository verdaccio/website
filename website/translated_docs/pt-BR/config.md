---
id: configuration
title: "Arquivo de Configuração"
---

Este arquivo é a peça chave do verdaccio, onde você pode modificar o comportamento padrão, habilitar plugins e estender recursos.

Um arquivo de configuração padrão `config.yaml` é criado na primeira vez que você executa `verdaccio`.

## Configuração Padrão

A configuração padrão tem suporte para pacotes **com escopo (scoped)** e permite que qualquer usuário acesse todos os pacotes, mas somente que os **usuários autenticados publiquem**.

```yaml
storage: ./storage
auth:
  htpasswd:
    file: ./htpasswd
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
  '**':
    proxy: npmjs
logs:
  - {type: stdout, format: pretty, level: http}
```

## Seções

As seções a seguir explicam o que cada propriedade significa e as diferentes opções.

### Armazenamento

É a localização do armazenamento padrão. **Por padrão o Verdaccio está baseado no arquivo de sistema local **.

```yaml
storage: ./storage
```

### Plugins

É a localização do diretório de plugins. Útil para implementações baseadas em Docker/Kubernetes.

```yaml
plugins: ./plugins
```

### Autenticação

A configuração de autenticação é feita aqui, por padrão é baseada em `htpasswd` e é embutida. Você pode modificar este comportamento via [plugins](plugins.md). Para maiores informações sobre esta seção, leia a [página sobre autenticação](auth.md).

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    max_users: 1000
```

### Segurança

<small>A partir de: <code>verdaccio@4.0.0</code> <a href="https://github.com/verdaccio/verdaccio/pull/168">#168</a></small>

O bloco de segurança permite personalizar o token de assinatura. Para habilitar a nova assinatura do [JWT (json web token)](https://jwt.io/) é necessário adicionar o bloco `jwt` à seção `api`, `web` usa `jwt` por padrão.

A configuração é separada em duas seções, `api` e `web`. Para usar o JWT na `api` você precisará defini-lo, caso contrário, você usará a assinatura de token herdada (`aes192`). Para o JWT, você pode personalizar a [assinatura](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) e a [verificação](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) do token com suas próprias propriedades.

    security:
      api:
        legacy: true
        jwt:
          sign:
            expiresIn: 29d
          verify:
            someProp: [value]
       web:
         sign:
           expiresIn: 7d # 7 days by default
         verify:
            someProp: [value]
    

> É altamente recomendável migrar para o JWT, pois a assinatura herdada (`aes192`) está obsoleta e desaparecerá em versões futuras.

### Server

Um conjunto de propriedades para alterar o comportamento do aplicativo do servidor, especificamente a API (Express.js).

> Você pode especificar o tempo limite de espera do servidor HTTP/1.1 em segundos para conexões de entrada. Um valor 0 faz com que o servidor http se comporte de maneira semelhante às versões do Node.js anteriores a 8.0.0, que não tinham um tempo limite de atividade. SOLUÇÃO ALTERNATIVA: Através da configuração fornecida, você pode solucionar o seguinte problema https://github.com/verdaccio/verdaccio/issues/301. Defina como 0 caso 60 não seja suficiente.

```yaml
server:
  keepAliveTimeout: 60
```

### Web UI

Esta propriedade permite que você modifique a aparência da interface do usuário da web. Para mais informações sobre esta seção, leia a [página sobre web ui](web.md).

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

### Uplinks

Uplinks is the ability of the system to fetch packages from remote registries when those packages are not available locally. For more information about this section read the [uplinks page](uplinks.md).

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

### Packages

Pacotes permitem que o usuário controle como os pacotes serão acessados. Para mais informações sobre esta seção, leia a [página sobre pacotes](packages.md).

```yaml
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

## Configurações Avançadas

### Offline Publish

By default `verdaccio` does not allow to publish when the client is offline, that behavior can be overridden by setting this to *true*.

```yaml
publish:
  allow_offline: false
```

<small>Since: <code>verdaccio@2.3.6</code> due <a href="https://github.com/verdaccio/verdaccio/pull/223">#223</a></small>

### URL Prefix

```yaml
url_prefix: /verdaccio/
```

> Recomendamos usar um subdiretório `/verdaccio/` em vez de um URI.

### Max Body Size

By default the maximum body size for a JSON document is `10mb`, if you run in errors as `"request entity too large"` you may increase this value.

```yaml
max_body_size: 10mb
```

### Listen Port

O `verdaccio` é executado por padrão na porta `4873`. A alteração da porta pode ser feita via [cli](cli.md) ou no arquivo de configuração, as seguintes opções são válidas.

```yaml
listen:
# - localhost:4873            # default value
# - http://localhost:4873     # same thing
# - 0.0.0.0:4873              # listen on all addresses (INADDR_ANY)
# - https://example.org:4873  # if you want to use https
# - "[::1]:4873"                # ipv6
# - unix:/tmp/verdaccio.sock    # unix socket
```

### HTTPS

To enable `https` in `verdaccio` it's enough to set the `listen` flag with the protocol *https://*. For more information about this section read the [ssl page](ssl.md).

```yaml
https:
    key: ./path/verdaccio-key.pem
    cert: ./path/verdaccio-cert.pem
    ca: ./path/verdaccio-csr.pem
```

### Proxy

Proxies are special-purpose HTTP servers designed to transfer data from remote servers to local clients.

#### http_proxy e https_proxy

If you have a proxy in your network you can set a `X-Forwarded-For` header using the following properties.

```yaml
http_proxy: http://something.local/
https_proxy: https://something.local/
```

#### no_proxy

This variable should contain a comma-separated list of domain extensions proxy should not be used for.

```yaml
no_proxy: localhost,127.0.0.1
```

### Notificações

Habilitar notificações para ferramentas de terceiros é bastante fácil através de web hooks. Para mais informações sobre esta seção, leia a [página sobre notificações](notifications.md).

```yaml
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```

> For more detailed configuration settings, please [check the source code](https://github.com/verdaccio/verdaccio/tree/master/conf).

### Audit

<small>Since: <code>verdaccio@3.0.0</code></small>

`npm audit` é um novo comando lançado com a [npm 6.x](https://github.com/npm/npm/releases/tag/v6.1.0). Verdaccio inclui um plugin de middleware integrado para lidar com este comando.

> If you have a new installation it comes by default, otherwise you need to add the following props to your config file

```yaml
middlewares:
  audit:
    enabled: true
```