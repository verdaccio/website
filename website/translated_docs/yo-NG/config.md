---
id: iṣeto
title: "Faili Iṣeto"
---

This file is the cornerstone of Verdaccio where you can modify the default behaviour, enable plugins and extend features.

Faili iṣeto atilẹwa kan `config.yaml` jẹ ṣiṣẹda ni igba akọkọ ti o ba ṣe amulo `verdaccio`.

## Iṣeto Atilẹwa

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
  "@*/*":
    access: $all
    publish: $authenticated
    proxy: npmjs
  "**":
    proxy: npmjs
logs:
  - { type: stdout, format: pretty, level: http }
```

## Awọn abala

The following sections explain what each property means and their different options.

### Ibi ipamọ

Ni aaye ibi ipamọ atilẹwa. **Verdaccio ni atilẹwa da lori eto faili ibilẹ**.

```yaml
storage: ./storage
```

### Awọn ohun elo

Is the location of the plugin directory. Useful for Docker/Kubernetes-based deployments.

```yaml
plugins: ./plugins
```

### Ifasẹsi

The authentication setup is done here. The default auth is based on `htpasswd` and is built in. You can modify this behaviour via [plugins](plugins.md). For more information about this section read the [auth page](auth.md).

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    max_users: 1000
```

### Aabo

<small>Niwọn: <code>verdaccio@4.0.0</code> <a href="https://github.com/verdaccio/verdaccio/pull/168">#168</a></small>

Bulọọku aabo fayegba ọ lati ṣe aami ibuwọlu naa ni akanṣe. To enable a new [JWT (JSON Web Tokens)](https://jwt.io/) signature you need to add the block `jwt` to the `api` section; `web` uses `jwt` by default.

Iṣeto naa jẹ pinpin si abala meji, `api` ati `web`. To use JWT on `api` it has to be defined, otherwise the legacy token signature (`aes192`) will be used. For JWT you might want to customize the [signature](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) and the token [verification](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) with your own properties.

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
    

> A ṣe igbaniyanju to ga lati ko lọ si JWT niwọnti ibuwọlu ijogun (`aes192`) ti wa ni iparun ati pe o ma farasin ni awọn ẹya ọjọ iwaju.

### Olupese

Awọn eto ohun elo lati ṣe ayipada iwa ti ohun elo olupese naa, paapaa API (Express.js).

> O le ṣe olupese HTTP / 1.1 ni pato pe ki o ma ṣe itọju iwalaye akoko idawọduro ni iṣẹju aaya fun awọn isopọ ti o n wọle. Iye kan ti o jẹ 0 n mu ki olupese http ma huwa to jẹmọ ti awọn ẹya Node.js ṣiwaju si 8.0.0, eyi ti ko ni itọju iwalaye akoko idawọduro. ỌNA ABAYỌ: Nipasẹ iṣeto ti a fun ọ o le ri ọgbọn da si awọn iṣoro yii https://github.com/verdaccio/verdaccio/issues/301. Ṣeto rẹ si 0 nitori ti 60 ko ba to.

```yaml
server:
  keepAliveTimeout: 60
```

### UI Ayelujara

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

### Awọn akopọ

This section allows you to control how packages are accessed. For more information about this section read the [packages page](packages.md).

```yaml
packages:
  "@*/*":
    access: $all
    publish: $authenticated
    proxy: npmjs
```

## Iṣeto Giga

### Atẹjade Alaisilorila

By default `verdaccio` does not allow you to publish packages when the client is offline. This can be can be overridden by setting this value to *true*.

```yaml
publish:
  allow_offline: false
```

<small>Niwọn: <code>verdaccio@2.3.6</code> nitori <a href="https://github.com/verdaccio/verdaccio/pull/223">#223</a></small>

### Ibẹrẹ URL

The prefix is intended to be used when the server runs behinds the proxy, check the **reverse proxy setup** page for more details.

```yaml
url_prefix: /verdaccio/
```

> Verdaccio 5 has an improved prefix behaviour, [check here details](https://verdaccio.org/blog/2021/04/14/verdaccio-5-migration-guide#url_prefix-improved-behavior).

### Iwọn Ara to Pọju

By default the maximum body size for a JSON document is `10mb`, if you run into errors that state `"request entity too large"` you may increase this value.

```yaml
max_body_size: 10mb
```

### Ibudo Itẹtisi

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

### Aṣoju ikọkọ

Proxies are special-purpose HTTP servers designed to transfer data from remote servers to local clients.

#### http_proxy ati https_proxy

If you have a proxy in your network you can set a `X-Forwarded-For` header using the following properties:

```yaml
http_proxy: http://something.local/
https_proxy: https://something.local/
```

#### no_proxy

This variable should contain a comma-separated list of domain extensions that the proxy should not be used for.

```yaml
no_proxy: localhost,127.0.0.1
```

### Awọn ifitonileti

Enabling notifications to third-party tools is fairly easy via webhooks. For more information about this section read the [notifications page](notifications.md).

```yaml
notify:
  method: POST
  headers: [{ "Content-Type": "application/json" }]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```

> Fun alaye awọn eto iṣeto siwaju sii, jọwọ [ṣayẹwo koodu orisun naa](https://github.com/verdaccio/verdaccio/tree/master/conf).

### Ayẹwo

<small>Since: <code>verdaccio@3.0.0</code></small>

`npm audit` is a new command released with [npm 6.x](https://github.com/npm/npm/releases/tag/v6.1.0). Verdaccio includes a built-in middleware plugin to handle this command.

> Ti o ba sẹsẹ fi sori ẹrọ o ma n ba wa ni atilẹwa, bibẹkọ o nilo lati se afikun awọn atilẹyin wọnyi sinu faili iṣeto rẹ

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