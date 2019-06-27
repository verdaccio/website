---
id: version-4.0.0-alpha.4-configuration
title: Faili Iṣeto
original_id: iṣeto
---

Faili yii ni pataki igun ti verdaccio nibi ti o ti le se aiyipada iwa atilẹwa naa, ṣe imuṣiṣẹ awọn ohun elo ati awọn ẹya ara to jẹ afikun.

A default configuration file is created the very first time you run `verdaccio`.

## Iṣeto Atilẹwa

Iṣeto atilẹwa naa ni atilẹyin fun **scoped** awọn akopọ ati fayegba eyikeyi olumulo lati wọle si gbogbo awọn akopọ ṣugbọn nikan jẹki **awọn olumulo ti o ni ifasẹsi lati se atẹjade**.

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

## Awọn abala

Awọn abala wọnyi ṣe alaye nipa nkan ti ohun ini kọọkan tumọ si ati awọn aṣaayan oriṣiriṣi.

### Ibi ipamọ

Is the location of the default storage. **Verdaccio is by default based on local file system**.

```yaml
storage: ./storage
```

### Awọn ohun elo

Is the location of the plugin directory. Useful for Docker/Kubernetes based deployments.

```yaml
plugins: ./plugins
```

### Sise ifasẹsi

Ibi ni iṣeto sise ifasẹsi ti ma n waye, ifasẹsi atilẹwa da lori `htpasswd` atipe o jẹ kikọ sinu rẹ. O le se ayipada iwa yi nipasẹ [plugins](plugins.md). Fun alaye siwaju sii nipa abala yii ka [oju ewe ifasẹsi](auth.md).

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    max_users: 1000
```

### Aabo

<small>Since: <code>verdaccio@4.0.0</code> due <a href="https://github.com/verdaccio/verdaccio/pull/168">#168</a></small>

Bulọọku aabo fayegba ọ lati ṣe aami ibuwọlu naa ni akanṣe. Lati ṣe imuṣiṣẹ ibuwọlu tuntun [JWT (json web token)](https://jwt.io/) o nilo lati se afikun bulọọku `jwt` si abala `api`, `web` n lo `jwt` ni atilẹwa.

Iṣeto naa jẹ pinpin si abala meji, `api` ati `web`. Lati lo JWT lori `api`, o nilo lati leto, bibẹkọ o ma lo ibuwọlu aami ijogun (`aes192`). Fun JWT o le ṣe [ibuwọlu](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) naa ni akanṣe ati [idaniloju](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) aami naa pẹlu awọn dukia ara rẹ.

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

> O le ṣe olupese HTTP / 1.1 ni pato pe ki o ma ṣe itọju iwalaye akoko idawọduro ni iṣẹju aaya fun awọn isopọ ti o n wọle. Iye kan ti o jẹ 0 n mu ki olupese http ma huwa to jẹmọ ti awọn ẹya Node.js ṣiwaju si 8.0.0, eyi ti ko ni itọju iwalaye akoko idawọduro. ỌNA ABAYỌ: Nipasẹ iṣeto ti a fun ọ o le ri ọgbọn da si awọn iṣoro yii https://github.com/verdaccio/verdaccio/issues/301. Set to 0 in case 60 is not enought.

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

## Iṣeto Giga

### Offline Publish

By default `verdaccio` does not allow to publish when the client is offline, that behavior can be overridden by setting this to *true*.

```yaml
publish:
  allow_offline: false
```

<small>Since: <code>verdaccio@2.3.6</code> due <a href="https://github.com/verdaccio/verdaccio/pull/223">#223</a></small>

### URL Prefix

```yaml
url_prefix: https://dev.company.local/verdaccio/
```

Since: `verdaccio@2.3.6` due [#197](https://github.com/verdaccio/verdaccio/pull/197)

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

### Aṣoju ikọkọ

Proxies are special-purpose HTTP servers designed to transfer data from remote servers to local clients.

#### http_proxy ati https_proxy

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

### Awọn ifitonileti

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

<small>Since: <code>verdaccio@3.0.0</code></small>

`npm audit` is a new command released with [npm 6.x](https://github.com/npm/npm/releases/tag/v6.1.0). Verdaccio includes a built-in middleware plugin to handle this command.

> If you have a new installation it comes by default, otherwise you need to add the following props to your config file

```yaml
middlewares:
  audit:
    enabled: true
```