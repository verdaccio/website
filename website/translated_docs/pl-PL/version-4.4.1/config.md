---
id: version-4.4.1-configuration
title: Plik konfiguracyjny
original_id: konfiguracja
---

Plik ten jest podstawą verdaccio, ponieważ to w nim możesz modyfikować domyślne zachowanie aplikacji, rozszerzać jej funkcje oraz włączać wtyczki.

A default configuration file `config.yaml` is created the very first time you run `verdaccio`.

<div id="codefund">''</div>

## Podstawowa konfiguracja

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

## Sekcje

Poniższe sekcje wyjaśniają, co oznacza każda właściwość i różne opcje.

### Magazyn danych

Is the location of the default storage. **Verdaccio is by default based on local file system**.

```yaml
storage: ./storage
```

### Wtyczki

Is the location of the plugin directory. Useful for Docker/Kubernetes based deployments.

```yaml
plugins: ./plugins
```

### Uwierzytelnianie

Uwierzytelnianie jest wykonywane tutaj, podstawowe uwierzytelnianie jest oparte o `htpasswd` i jest wbudowane w aplikację. Możesz modyfikować jego zachowanie poprzez [wtyczki](plugins.md). Więcej informacji o tej sekcji znajdziesz na [stronie dotyczącej uwierzytelniania](auth.md).

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    max_users: 1000
```

### Security

<small>Since: `verdaccio@4.0.0` [#168](https://github.com/verdaccio/verdaccio/pull/168)</small>

Blok zabezpieczeń umożliwia dostosowanie podpisu tokena. Aby włączyć [JWT (json web token)](https://jwt.io/) nowy podpis, należy dodać blok `jwt` do sekcji `api`, `web` używa domyślnie `jwt`.

Konfiguracja jest podzielona na dwie sekcje: `api` i `web`. Aby użyć JWT w `api`, należy go zdefiniować, w przeciwnym razie użyje podpisu starszego tokena (`aes192`). For JWT you might customize the [signature](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) and the token [verification](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) with your own properties.

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
> Zdecydowanie zalecamy przejście do JWT, ponieważ starszy podpis (`aes192`) jest przestarzały i zniknie w przyszłych wersjach.

### Server

A set of properties to modify the behavior of the server application, specifically the API (Express.js).

> You can specify HTTP/1.1 server keep alive timeout in seconds for incomming connections. A value of 0 makes the http server behave similarly to Node.js versions prior to 8.0.0, which did not have a keep-alive timeout. WORKAROUND: Through given configuration you can workaround following issue https://github.com/verdaccio/verdaccio/issues/301. Set to 0 in case 60 is not enough.

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

### Uplinks

Uplinks to zdolność systemu do pobierania pakietów ze zdalnych rejestrów, gdy pakiety te nie są dostępne lokalnie. Więcej informacji na temat tej sekcji można znaleźć na [stronie uplinks](uplinks.md).


```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

### Pakiety

Packages allow the user to control how the packages are gonna be accessed. For more information about this section read the [packages page](packages.md).


```yaml
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

## Ustawienia zaawansowane

### Publikowanie w trybie offline

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

> We recommend use a subdirectory `/verdaccio/` instead a URI.

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

To enable `https` in `verdaccio` it's enough to set the `listen` flag with the protocol *https://*. Więcej informacji o tej sekcji znajdziesz na [ssl page](ssl.md).


```yaml
https:
    key: ./path/verdaccio-key.pem
    cert: ./path/verdaccio-cert.pem
    ca: ./path/verdaccio-csr.pem
```

### Proxy

Proxy to specjalne serwery HTTP stworzone do transferu danych z serwerów zdalnych do klientów lokalnych.

#### http_proxy i https_proxy

Jeśli posiadasz serwer proxy w swojej sieci możesz ustawić nagłówek `X-Forwarded-For` używając następujących właściwości.

```yaml
http_proxy: http://something.local/
https_proxy: https://something.local/
```

#### brak_proxy

Ta zmienna powinna posiadać listę domen oddzieloną przecinkami, dla których proxy nie powinno być używane.

```yaml
no_proxy: localhost,127.0.0.1
```

### Powiadomienia

Enabling notifications to third-party tools is fairly easy via web hooks. For more information about this section read the [notifications page](notifications.md).

```yaml
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```


> Bardziej szczegółowe ustawienia konfiguracji znajdziesz w [check the source code](https://github.com/verdaccio/verdaccio/tree/master/conf).


### Audit

<small>Since: `verdaccio@3.0.0`</small>

`npm audit` is a new command released with [npm 6.x](https://github.com/npm/npm/releases/tag/v6.1.0). Verdaccio includes a built-in middleware plugin to handle this command.

> Jeśli instalujesz aplikację od nowa, to posiada ona ustawienia domyślnie, w przeciwnym razie musisz dodać następujące właściwości do Twojego pliku konfiguracyjnego

```yaml
middlewares:
  audit:
    enabled: true
```

### Experiments

This release includes a new property named `experiments` that can be placed in the `config.yaml` and is completely optional.

We want to be able to ship new things without affecting production environments. This flag allows us to add new features and get feedback from the community that wants to use them.

The features that are under this flag might not be stable or might be removed in future releases.

Here one example:

```yaml
experiments:
  token: false
```

> To disable the experiments warning in the console, you must comment out the whole `experiments` section.
