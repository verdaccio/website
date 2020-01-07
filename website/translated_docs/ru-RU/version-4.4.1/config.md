---
id: version-4.4.1-configuration
title: Файл конфигурации
original_id: configuration
---

Этот файл является краеугольным камнем verdaccio. В нём вы можете изменить стандартное поведение, включить плагины и расширенные возможности.

Файл конфигурации по умолчанию `config.yaml` будет создан, когда вы самый первый раз запустите `verdaccio`.

<div id="codefund">''</div>

## Конфигурация по умолчанию

The default configuration has support for **scoped** packages and allow any user to access all packages but only **authenticated users to publish**.

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

## Разделы

Следующие разделы пояснят, что каждое свойство означает, и какими дополнительными опциями обладает.

### Хранилище

Is the location of the default storage. **Verdaccio is by default based on local file system**.

```yaml
storage: ./storage
```

### Плагины

Is the location of the plugin directory. Useful for Docker/Kubernetes based deployments.

```yaml
plugins: ./plugins
```

### Аутентификация

Настройка аутентификация делается здесь. По умолчанию аутентификация основана на `htpasswd` и является встроенной. Вы можете изменить это при помощи [плагинов](plugins.md). Читайте об этом в разделе [Аутентификация](auth.md).

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    max_users: 1000
```

### Безопасность

<small>Since: `verdaccio@4.0.0` [#168](https://github.com/verdaccio/verdaccio/pull/168)</small>

Этот блок позволяет кастомизировать авторизацию токенами. Чтобы включить авторизацию по [JWT (json web token)](https://jwt.io/), вам надо добавить блок `jwt` к разделу `api`,  а раздел `web` успользует  `jwt` по умолчанию.

Конфигурация разделена на две части, `api` и `web`. Чтобы использовать JWT в  `api`, его надо прописать там в явном виде, иначе будут использоваться "старые" токены (`aes192`). Для JWT, вы можете кастомизировать свойства токена [signature](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) и [verification](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback), добавивив свои собственные поля.

```
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
```
> Мы настоятельно рекомендем перейти на JWT, так как "старые" токены (`aes192`) устарели и исчезнут в следующих версиях.

### Сервер

Набор свойств, которые позволяют изменить поведение сервера, особенно это касается API (Express.js).

> Вы можете указать HTTP/1.1-серверу keep-alive таймаут в секундах, для входящих соединений. Если вы укажете 0, то сервер будет вести себя аналогично Node.js версии ниже 8.0.0, который не имел keep-alive таймаута. WORKAROUND: С помощью этой конфигурации вы можете обойти баг [#301](https://github.com/verdaccio/verdaccio/issues/301). Установить в 0 в случае 60 - недостаточно.

```yaml
server:
  keepAliveTimeout: 60
```


### Web UI

This property allow you to modify the look and feel of the web UI. For more information about this section read the [web ui page](web.md).

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

### Аплинки

Uplinks is the ability of the system to fetch packages from remote registries when those packages are not available locally. For more information about this section read the [uplinks page](uplinks.md).


```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

### Packages

Packages allow the user to control how the packages are gonna be accessed. For more information about this section read the [packages page](packages.md).


```yaml
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

## Расширенные настройки

### Offline Publish

By default `verdaccio` does not allow to publish when the client is offline, that behavior can be overridden by setting this to *true*.

```yaml
publish:
  allow_offline: false
```


<small>Since: `verdaccio@2.3.6` due [#223](https://github.com/verdaccio/verdaccio/pull/223)</small>

### URL Prefix

```yaml
url_prefix: /verdaccio/
```

> Мы рекомендуем использовать подпапку `/verdaccio/` вместо URI.

### Max Body Size

By default the maximum body size for a JSON document is `10mb`, if you run in errors as `"request entity too large"` you may increase this value.

```yaml
max_body_size: 10mb
```

### Listen Port

`verdaccio` runs by default in the port `4873`. Changing the port can be done via [cli](cli.md) or in the configuration file, the following options are valid.

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

### Прокси

Proxies are special-purpose HTTP servers designed to transfer data from remote servers to local clients.

#### http_proxy и https_proxy

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

### Уведомления

Enabling notifications to third-party tools is fairly easy via web hooks. For more information about this section read the [notifications page](notifications.md).

```yaml
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```


> For more detailed configuration settings, please [check the source code](https://github.com/verdaccio/verdaccio/tree/master/conf).


### Audit

<small>Since: `verdaccio@3.0.0`</small>

`npm audit` is a new command released with [npm 6.x](https://github.com/npm/npm/releases/tag/v6.1.0). Verdaccio includes a built-in middleware plugin to handle this command.

> If you have a new installation it comes by default, otherwise you need to add the following props to your config file

```yaml
middlewares:
  audit:
    enabled: true
```

### Эксперименты

This release includes a new property named `experiments` that can be placed in the `config.yaml` and is completely optional.

We want to be able to ship new things without affecting production environments. This flag allows us to add new features and get feedback from the community that wants to use them.

The features that are under this flag might not be stable or might be removed in future releases.

Here one example:

```yaml
experiments:
  token: false
```

> To disable the experiments warning in the console, you must comment out the whole `experiments` section.
