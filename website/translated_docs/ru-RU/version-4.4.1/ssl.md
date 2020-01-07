---
id: version-4.4.1-ssl
title: Настройка SSL-сертификатов
original_id: ssl
---

Следуйте этой инструкции по конфигурации SSL сертификатов, чтобы получить репозиторий с HTTPS.

<div id="codefund">''</div>

* Обновите свойство `listen` в вашем `~/.config/verdaccio/config.yaml`:

````
listen: 'https://your.domain.com/'
````

Когда вы обновите свойство listen и попытаетесь запустить verdaccio снова, он запросит сертификаты.

* Сгенерируйте ваши сертификаты

````
 $ openssl genrsa -out /Users/user/.config/verdaccio/verdaccio-key.pem 2048
 $ openssl req -new -sha256 -key /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-csr.pem
 $ openssl x509 -req -in /Users/user/.config/verdaccio/verdaccio-csr.pem -signkey /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-cert.pem
 ````

* Edit your config file `/Users/user/.config/verdaccio/config.yaml` and add the following section:

````
https:
    key: /Users/user/.config/verdaccio/verdaccio-key.pem
    cert: /Users/user/.config/verdaccio/verdaccio-cert.pem
    ca: /Users/user/.config/verdaccio/verdaccio-csr.pem
````

Alternatively, if you have a certificate with the `server.pfx` format, you can add the following configuration section: (The passphrase is optional and only needed if your certificate is encrypted.)

````
https:
  pfx: /Users/user/.config/verdaccio/server.pfx
  passphrase: 'secret'
````

Больше информации про аргументы `key`, `cert`, `ca`, `pfx` и `passphrase` вы найдете в [Node documentation](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

* Запустите `verdaccio` в командной строке.

* Откройте браузер и загрузите `https://your.domain.com:port/`

Инструкция выше писалась для OSX и Linux, на Windows пути немного отличаются, но шаги - те же самые.

## Docker
Если вы используете Docker-образ, вам нужно установить переменную окружения `VERDACCIO_PROTOCOL` в значение `https`, так как свойство `listen` придёт из файла [Dockerfile](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L43) и будет проигнорировано в вашем конфигурационном файле.

Так же, вы можете установить переменную окружения `VERDACCIO_PORT`, если используете порт, отличный от `4873`.
