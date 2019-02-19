---
id: конфигурисање
title: "Фајл за конфигурисање"
---
Овај фајл је основа verdaccio-a. У оквиру њега, можете вршити измене задатих подешавања, можете активирати plugin-е и спољашње ресурсе (features).

Фајл "default configuration file" се креира приликом првог покретања `verdaccio-а`.

## Подразумеване поставке (Default Configuration)

Подразумеване поставке подржавају **scoped** пакете за све кориснике, али само **ауторизованим корисницима омогућавају да публикују**.

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

## Секције

Секција у наставку даје објашњења за свако својство и опцију.

### Меморија за складиштење

Је локација на којој се врши складиштење података. **Verdaccio је иницијално подешен као local file system**.

```yaml
storage: ./storage
```

### Plugins

Је локација plugin директоријума. Ово је корисно за deployment базиран на Docker/Kubernetes.

```yaml
plugins: ./plugins
```

### Authentification

Овде се врши подешавање (set up). Подразумевана auth је базирана на `htpasswd` и већ је уграђена. Можете извршити модификације начина рада (behaviour) путем [plugin-a](plugins.md). За више информација о овој секцији, прочитајте [auth страну](auth.md).

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    max_users: 1000
```

### Сигурност

<small>Почевши од верзије: <code>verdaccio@4.0.0</code> параграф <a href="https://github.com/verdaccio/verdaccio/pull/168">#168</a></small>

Сигурносни блок Вам омогућава да прилагодите потпис за токен (token signature). Како бисте [JWT (json web token) учинили активним ](https://jwt.io/) нови потпис који требате за додавање блока `jwt` у `api` секцију, `web` по правилу користи `jwt`.

Конфигурација је подељена у две секције, `api` и `web`. Како бисте користили JWT у `api`, морате га дефинисати, у супротном ће користити наслеђени потпис за токен (legacy token signature) (`aes192`). За JWT можете прилагодити [потпис](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) и токен [верификацију](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) уписивањем параметара по својој жељи.

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
    

> Јако Вам препоручујемо да се пребаците на JWT пошто је legacy signature (`aes192`) застарео и неће га бити у новијим верзијама.

### Сервер

Скуп својстава за мењање понашања сервер апликације, посебно API-ја (Express.js).

> Можете задати да HTTP/1.1 сервер одржава време после којег се буди за долазне конекције. Ако задате вредност 0, http сервер ће се понашати слично као Node.js верзије старије од 8.0.0, које нису имале уграђену функцију: keep-alive timeout. ЗАОБИЛАЖЕЊЕ: Датим конфигурисањем, можете заобићи следећи проблем: https://github.com/verdaccio/verdaccio/issues/301. Поставите на вредност 0 у случају да 60 није довољно.

```yaml
server:
  keepAliveTimeout: 60
```

### Web UI (кориснички интерфејс)

Ово својство Вам омогућава да модификујете изглед корисничког интерфејса. За више информација о овој секцији, прочитајте [web ui страницу](web.md).

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

### Uplinks

Uplinks пружају могућност систему да хвата (fetch) пакете из удаљених регистрија ако ти пакети нису локално доступни. За више информација о овој секцији прочитајте на [uplinks страници](uplinks.md).

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

### Пакети

Пакети (packages) дају могућност корисницима да контролишу како ће се приступати пакетима. За више детаља о овој секцији, прочитајте [страницу "пакети"/ packages](packages.md).

```yaml
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

## Напредна подешавања

### Публиковање offline

Према задатим подешавањима, `verdaccio` не дозвољава публиковање онда када је клијент offline. Такав начин рада (behavior), може да се промени ако се параметри из примера подесе на *true*.

```yaml
publish:
  allow_offline: false
```

<small>Почевши од верзије: <code>verdaccio@2.3.6</code> члан (due) <a href="https://github.com/verdaccio/verdaccio/pull/223">#223</a></small>

### URL Префикс

```yaml
url_prefix: https://dev.company.local/verdaccio/
```

Почевши од верзије: `verdaccio@2.3.6` члан [#197](https://github.com/verdaccio/verdaccio/pull/197)

### Максимална величина body секције документа

Према задатим подешавањима, максимална величина за body JSON документа је `10mb`. Ако добијете грешку `"request entity too large"` могли бисте да повећате ову вредност.

```yaml
max_body_size: 10mb
```

### Listen Порт

`verdaccio` према "фабричким подешавањима" ради на порту `4873`. Измена порта се може обавити преко [cli](cli.md) или директно у фајлу за конфигурисање, при чему су следеће опције валидне.

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

Како бисте омогућили `https` у `verdaccio` довољно је да подесите `listen` flag са протоколом *https://*. Више детаља можете наћи на [ssl страници](ssl.md).

```yaml
https:
    key: ./path/verdaccio-key.pem
    cert: ./path/verdaccio-cert.pem
    ca: ./path/verdaccio-csr.pem
```

### Proxy

Proxies су HTTP сервери посебне намене дизајнирани да преносе податке од удаљених сервера до локалних клијената.

#### http_proxy i https_proxy

Ако имате proxy у својој мрежи, можете подесити `X-Forwarded-For` header користећи следеће уносе за својствa (properties).

```yaml
http_proxy: http://something.local/
https_proxy: https://something.local/
```

#### no_proxy

Ова варијабла би требало да садржи comma-separated (поља одвојена запетом) листу екстензија домена за коју proxy не би требало да се користи.

```yaml
no_proxy: localhost,127.0.0.1
```

### Нотификације

Дозвољавање нотификација за алате направљене од стране трећих лица је релативно једноставно уз помоћ web hooks технике. За више информација о овој теми, прочитајте [страницу "notifications"](notifications.md).

```yaml
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```

> За детаљније опције подешавања, молимо Вас да [погледате source code](https://github.com/verdaccio/verdaccio/tree/master/conf).

### Audit (ревизија)

<small>Почевши од верзије: <code>verdaccio@3.0.0</code></small>

`npm audit` је нова команда која је уведена у [npm 6.x](https://github.com/npm/npm/releases/tag/v6.1.0). Verdaccio, а која укључује уграђени middleware plugin којим је могуће извршити дату команду.

> Ако имате нову инсталацију, све је већ укључено у оквиру ње. У супротном, треба да додате наведене додатке (props) у Ваш config фајл

```yaml
middlewares:
  audit:
    enabled: true
```