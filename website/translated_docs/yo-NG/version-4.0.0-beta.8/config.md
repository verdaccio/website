---
id: version-4.0.0-beta.8-iṣeto
title: Faili Iṣeto
original_id: iṣeto
---

Faili yii ni pataki igun ti verdaccio nibi ti o ti le se aiyipada iwa atilẹwa naa, ṣe imuṣiṣẹ awọn ohun elo ati awọn ẹya ara to jẹ afikun.

Faili iṣeto atilẹwa kan `config.yaml` jẹ ṣiṣẹda ni igba akọkọ ti o ba ṣe amulo `verdaccio`.

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

Ni aaye ti ibi ipamọ atilẹwa. **Verdaccio ni atilẹwa da lori eto faili ibilẹ**.

```yaml
storage: ./storage
```

### Awọn ohun elo

Ni aaye ti ọna ohun elo naa. O wulo fun awọn iṣamulo to da lori Docker/Kubernetes.

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

<small>Niwọn: <code>verdaccio@4.0.0</code> <a href="https://github.com/verdaccio/verdaccio/pull/168">#168</a></small>

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

> O le ṣe olupese HTTP / 1.1 ni pato pe ki o ma ṣe itọju iwalaye akoko idawọduro ni iṣẹju aaya fun awọn isopọ ti o n wọle. Iye kan ti o jẹ 0 n mu ki olupese http ma huwa to jẹmọ ti awọn ẹya Node.js ṣiwaju si 8.0.0, eyi ti ko ni itọju iwalaye akoko idawọduro. ỌNA ABAYỌ: Nipasẹ iṣeto ti a fun ọ o le ri ọgbọn da si awọn iṣoro yii https://github.com/verdaccio/verdaccio/issues/301. Ṣeto rẹ si 0 nitori ti 60 ko ba to.

```yaml
server:
  keepAliveTimeout: 60
```

### UI Ayelujara

Ohun ini yii gba ọ laaye lati se ayipada si ifihan ati irisi UI ayelujara. Fun alaye siwaju sii nipa abala yii ka [oju ewe ui ayelujara](web.md).

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

### Uplinks

Uplinks ni agbara eto naa lati sawari awọn akopọ lati awọn ibi iforukọsilẹ ọlọna jijin nigbati awọn akopọ naa ko ba si ni agbegbe. Fun alaye siwaju sii nipa abala yii ka [oju ewe uplinks](uplinks.md).

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

### Awọn akopọ

Awọn akopọ fayegba olumulo naa lati ṣakoso bi wiwọle si ori akopọ naa se ma maa waye. Fun alaye siwaju sii nipa abala yii ka [oju ewe awọn akopọ](packages.md).

```yaml
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

## Iṣeto Giga

### Atẹjade Alaisilorila

Nipa atilẹwa `verdaccio` ko kin fayegba sise atẹjade nigbati onibara ko ba si lori ila, ihuwasi naa le se bori nipasẹ siseto eyi si *true*.

```yaml
publish:
  allow_offline: false
```

<small>Niwọn: <code>verdaccio@2.3.6</code> nitori <a href="https://github.com/verdaccio/verdaccio/pull/223">#223</a></small>

### Ibẹrẹ URL

```yaml
url_prefix: /verdaccio/
```

> A ṣe igbaniyanju pe ki o lo ipin-ọna kan `/verdaccio/` dipo URI kan.

### Iwọn Ara to Pọju

Nipa atilẹwa iwọn ara to pọju fun iwe akọsilẹ JSON jẹ `10mb`, ti o ba salabapade awọn aṣiṣe bi `"request entity too large"` o le se alekun iye yii.

```yaml
max_body_size: 10mb
```

### Ibudo Itẹtisi

`verdaccio` n ṣiṣẹ ni atilẹwa ni ibudo `4873` naa. Yiyi ibudo naa pada le ṣee ṣe nipasẹ [cli](cli.md) tabi ninu faili iṣeto naa, awọn aṣayan wọnyi fẹsẹmulẹ.

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

Lati mu `https` ṣiṣẹ ninu `verdaccio` o to lati ṣeto asia `listen` pẹlu Ilana *https://*. Fun alaye siwaju sii nipa abala yii ka [oju ewe ssl](ssl.md).

```yaml
https:
    key: ./path/verdaccio-key.pem
    cert: ./path/verdaccio-cert.pem
    ca: ./path/verdaccio-csr.pem
```

### Aṣoju ikọkọ

Awọn aṣoju ikọkọ jẹ awọn olupese HTTP oniṣẹ-pataki ti o jẹ didalara lati gbe data kuro lati awọn olupese ọlọna jinjin lọ si awọn onibara agbegbe.

#### http_proxy ati https_proxy

Ti o ba ni aṣoju ikọkọ kan ninu nẹtiwọki rẹ o le ṣeto akọle `X-Forwarded-For` kan nipa lilo awọn ohun ini wọnyi.

```yaml
http_proxy: http://something.local/
https_proxy: https://something.local/
```

#### no_proxy

Alayipada yii yẹ ki o ni awọn akojọpọ awọn afikun ibudo ti o jẹ yiya sọtọ pẹlu aami idanuduro diẹ ti aṣoju ikọkọ ko gbọdọ jẹ lilo fun.

```yaml
no_proxy: localhost,127.0.0.1
```

### Awọn ifitonileti

Ṣiṣe imuṣiṣẹ awọn ifitonileti si awọn irinṣẹ alagata jẹ irọrun nipasẹ awọn aaye ikọ ayelujara. Fun alaye siwaju sii nipa abala yii ka [oju ewe awọn ifitonileti](notifications.md).

```yaml
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```

> Fun alaye awọn eto iṣeto siwaju sii, jọwọ [ṣayẹwo koodu orisun naa](https://github.com/verdaccio/verdaccio/tree/master/conf).

### Ayẹwo

<small>Lati: <code>verdaccio@3.0.0</code></small>

`ayẹwo npm` jẹ aṣẹ titun kan ti o jẹ gbigbejade pẹlu [npm 6.x](https://github.com/npm/npm/releases/tag/v6.1.0). Verdaccio wa pẹlu ohun elo middleware ti o jẹ kikọ sinu rẹ lati sakoso aṣẹ yii.

> Ti o ba sẹsẹ fi sori ẹrọ o ma n ba wa ni atilẹwa, bibẹkọ o nilo lati se afikun awọn atilẹyin wọnyi sinu faili iṣeto rẹ

```yaml
middlewares:
  audit:
    enabled: true
```