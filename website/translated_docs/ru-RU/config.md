---
id: configuration
title: "Файл конфигурации"
---

Этот файл является краеугольным камнем verdaccio. В нём вы можете изменить стандартное поведение, включить плагины и расширенные возможности.

Файл конфигурации по умолчанию `config.yaml` будет создан, когда вы самый первый раз запустите `verdaccio`.

## Конфигурация по умолчанию

Стандартная конфигурация поддерживает **scoped**-пакеты и позволяет любым пользователям получить доступ ко всем пакетам, но только **авторизованные пользователи могут публиковать пакеты**.

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

Местоположение хранилища по умолчанию. **По умолчанию Verdaccio использует локальную файловую систему**.

```yaml
storage: ./storage
```

### Плагины

Местоположения директории с плагинами. Полезно при развёртывании при помощи Docker/Kubernetes.

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

<small>Работает, начиная с <code>verdaccio@4.0.0</code> <a href="https://github.com/verdaccio/verdaccio/pull/168">#168</a></small>

Этот блок позволяет кастомизировать авторизацию токенами. Чтобы включить авторизацию по [JWT (json web token)](https://jwt.io/), вам надо добавить блок `jwt` к разделу `api`, а раздел `web` успользует `jwt` по умолчанию.

Конфигурация разделена на две части, `api` и `web`. Чтобы использовать JWT в `api`, его надо прописать там в явном виде, иначе будут использоваться "старые" токены (`aes192`). Для JWT, вы можете кастомизировать свойства токена [signature](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) и [verification](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback), добавивив свои собственные поля.

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
    

> Мы настоятельно рекомендем перейти на JWT, так как "старые" токены (`aes192`) устарели и исчезнут в следующих версиях.

### Сервер

Набор свойств, которые позволяют изменить поведение сервера, особенно это касается API (Express.js).

> Вы можете указать HTTP/1.1-серверу keep-alive таймаут в секундах, для входящих соединений. Если вы укажете 0, то сервер будет вести себя аналогично Node.js версии ниже 8.0.0, который не имел keep-alive таймаута. WORKAROUND: С помощью этой конфигурации вы можете обойти баг [#301](https://github.com/verdaccio/verdaccio/issues/301). Установить в 0 в случае 60 - недостаточно.

```yaml
server:
  keepAliveTimeout: 60
```

### Веб-интерфейс

Это свойство позволяет модифицировать внешний вид веб UI. Чтобы получить больше информации, почитайте страницу [web ui page](web.md).

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

### Аплинки

Аплинки - это способ получать пакеты из удаленных репозиториев, когда пакетов нет в локальном хранилище. Чтобы получить больше информации, почитайте [страницу аплинков](uplinks.md).

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

### Пакеты

Это свойство позволяет пользователю управлять доступом к пакетам. Чтобы получить больше информации, почитайте страницу [packages page](packages.md).

```yaml
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

## Расширенные настройки

### Публикация в офлайне

По умолчанию, `verdaccio` не разрешает публиковать пакеты, когда клиент в оффлайне, но вы можете разрешить это, установив значение *true* для этой настройки.

```yaml
publish:
  allow_offline: false
```

<small>С версии: <code>verdaccio@2.3.6</code>, благодаря <a href="https://github.com/verdaccio/verdaccio/pull/223">#223</a></small>

### URL префикс

```yaml
url_prefix: /verdaccio/
```

> Мы рекомендуем использовать подпапку `/verdaccio/` вместо URI.

### Максимальный размер сообщения

По умолчанию, максимальный размер JSON-документа ограничен `10mb`, и если вы стали получать ошибки `"request entity too large"`, то вы можете увеличить это значение.

```yaml
max_body_size: 10mb
```

### Порт

По умолчанию, `verdaccio` запущен на порту `4873`. Изменить этот порт можно через [cli](cli.md) или в конфигурационном файле, например так:

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

Чтобы включить `https` в `verdaccio`, достаточно добавить протокол *https://* в секции `listen`. Для получения большей информации, обратитесь на [страницу ssl](ssl.md).

```yaml
https:
    key: ./path/verdaccio-key.pem
    cert: ./path/verdaccio-cert.pem
    ca: ./path/verdaccio-csr.pem
```

### Прокси

Прокси - это специализированные HTTP-сервера, предназначенные для передачи данных от удаленных серверов к локальным клиентам.

#### http_proxy и https_proxy

Если у вас есть прокси в вашей сети, вы модете установить хедер `X-Forwarded-For`, используя следующие свойства.

```yaml
http_proxy: http://something.local/
https_proxy: https://something.local/
```

#### no_proxy

Эта переменная должна содержать список доменов, разделённых запятыми, для которых не нужно использовать прокси.

```yaml
no_proxy: localhost,127.0.0.1
```

### Уведомления

Включить уведомления для сторонных инструментов - довольно легко через web hooks. Для получения большей информации, обратитесь к [странице уведомлений](notifications.md).

```yaml
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```

> Для получения детальной информации по этой настройке, пожалуйста, [обратитесь к исходному коду](https://github.com/verdaccio/verdaccio/tree/master/conf).

### Аудит

<small>С версии: <code>verdaccio@3.0.0</code></small>

`npm audit` - это новая команда, появившаяся в [npm 6.x](https://github.com/npm/npm/releases/tag/v6.1.0). Verdaccio включает в себя middleware-плагин для обеспечения работоспособности ээтой команды.

> Если вы сделали новую установку, у вас это будет по умолчанию, в противном случае нужно добавить эти настройки самому в конфигурационный файл

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