---
id: konfiguracja
title: "Plik konfiguracyjny"
---

This file is the cornerstone of Verdaccio where you can modify the default behaviour, enable plugins and extend features.

A default configuration file `config.yaml` is created the very first time you run `verdaccio`.

## Podstawowa konfiguracja

The default configuration has support for **scoped** packages and allows any user to **access** all packages, but only authenticated users to **publish**.

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

## Sekcje

The following sections explain what each property means and their different options.

### Magazyn danych

Jest lokalizacją domyślnego magazynu danych. **Verdaccio domyślnie jest oparte o lokalny system plików**.

```yaml
storage: ./storage
```

### Wtyczki

Is the location of the plugin directory. Useful for Docker/Kubernetes-based deployments.

```yaml
plugins: ./plugins
```

### Authentication

The authentication setup is done here. The default auth is based on `htpasswd` and is built in. You can modify this behaviour via [plugins](plugins.md). For more information about this section read the [auth page](auth.md).

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    max_users: 1000
```

### Security

<small>Since: <code>verdaccio@4.0.0</code> <a href="https://github.com/verdaccio/verdaccio/pull/168">#168</a></small>

Blok zabezpieczeń umożliwia dostosowanie podpisu tokena. To enable a new [JWT (JSON Web Tokens)](https://jwt.io/) signature you need to add the block `jwt` to the `api` section; `web` uses `jwt` by default.

Konfiguracja jest podzielona na dwie sekcje: `api` i `web`. To use JWT on `api` it has to be defined, otherwise the legacy token signature (`aes192`) will be used. For JWT you might want to customize the [signature](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) and the token [verification](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) with your own properties.

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
    

> Zdecydowanie zalecamy przejście do JWT, ponieważ starszy podpis (`aes192`) jest przestarzały i zniknie w przyszłych wersjach.

### Server

A set of properties to modify the behavior of the server application, specifically the API (Express.js).

> You can specify HTTP/1.1 server keep alive timeout in seconds for incomming connections. A value of 0 makes the http server behave similarly to Node.js versions prior to 8.0.0, which did not have a keep-alive timeout. WORKAROUND: Through given configuration you can workaround following issue https://github.com/verdaccio/verdaccio/issues/301. Set to 0 in case 60 is not enough.

```yaml
server:
  keepAliveTimeout: 60
```

### Web UI

This property allow you to modify the look and feel of the web UI. For more information about this section read the [web UI page](web.md).

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

### Uplinks

Uplinks add the ability to fetch packages from remote registries when those packages are not available locally. For more information about this section read the [uplinks page](uplinks.md).

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

### Pakiety

This section allows you to control how packages are accessed. For more information about this section read the [packages page](packages.md).

```yaml
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

## Ustawienia zaawansowane

### Publikowanie w trybie offline

By default `verdaccio` does not allow you to publish packages when the client is offline. This can be can be overridden by setting this value to *true*.

```yaml
publish:
  allow_offline: false
```

<small>Since: <code>verdaccio@2.3.6</code> due <a href="https://github.com/verdaccio/verdaccio/pull/223">#223</a></small>

### URL Prefix

```yaml
url_prefix: /verdaccio/
```

> We recommend use a subdirectory `/verdaccio/` instead a URI.

### Max Body Size

By default the maximum body size for a JSON document is `10mb`, if you run into errors that state `"request entity too large"` you may increase this value.

```yaml
max_body_size: 10mb
```

### Listen Port

`verdaccio` runs by default on the port `4873`. Changing the port can be done via [CLI](cli.md) or in the configuration file. The following options are valid:

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

To enable `https` in `verdaccio` it's enough to set the `listen` flag with the protocol *https://*. For more information about this section read the [SSL page](ssl.md).

```yaml
https:
    key: ./path/verdaccio-key.pem
    cert: ./path/verdaccio-cert.pem
    ca: ./path/verdaccio-csr.pem
```

### Proxy

Proxy to specjalne serwery HTTP stworzone do transferu danych z serwerów zdalnych do klientów lokalnych.

#### http_proxy i https_proxy

If you have a proxy in your network you can set a `X-Forwarded-For` header using the following properties:

```yaml
http_proxy: http://something.local/
https_proxy: https://something.local/
```

#### brak_proxy

This variable should contain a comma-separated list of domain extensions that the proxy should not be used for.

```yaml
no_proxy: localhost,127.0.0.1
```

### Powiadomienia

Enabling notifications to third-party tools is fairly easy via webhooks. For more information about this section read the [notifications page](notifications.md).

```yaml
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```

> Bardziej szczegółowe ustawienia konfiguracji znajdziesz w [check the source code](https://github.com/verdaccio/verdaccio/tree/master/conf).

### Audit

<small>Since: <code>verdaccio@3.0.0</code></small>

`npm audit` is a new command released with [npm 6.x](https://github.com/npm/npm/releases/tag/v6.1.0). Verdaccio includes a built-in middleware plugin to handle this command.

> Jeśli instalujesz aplikację od nowa, to posiada ona ustawienia domyślnie, w przeciwnym razie musisz dodać następujące właściwości do Twojego pliku konfiguracyjnego

```yaml
middlewares:
  audit:
    enabled: true
```

### Experiments

This release includes a new property named `experiments` that can be placed in the `config.yaml` and is completely optional.

We want to be able to ship new things without affecting production environments. This flag allows us to add new features and get feedback from the community who decides to use them.

The features under this flag might not be stable or might be removed in future releases.

Here is one example:

```yaml
experiments:
  token: false
```

> To disable the experiments warning in the console, you must comment out the whole `experiments` section.