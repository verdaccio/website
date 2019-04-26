---
id: version-3.8.6-ssl
title: Подешавање SSL Сертификата
original_id: ssl
---

Пратите инструкције како да конфигуришете SSL сертификат који служи у NPM регистрију под HTTPS.

* Ажурирајте својство listen у свом `~/.config/verdaccio/config.yaml`:

    listen: 'https://your.domain.com/'
    

Једном када ажурирате listen и пробате поново да покренете verdaccio, питаће Вас за сертификате.

* Генеришите своје сертификате

     $ openssl genrsa -out /Users/user/.config/verdaccio/verdaccio-key.pem 2048
     $ openssl req -new -sha256 -key /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-csr.pem
     $ openssl x509 -req -in /Users/user/.config/verdaccio/verdaccio-csr.pem -signkey /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-cert.pem
     ````
    
    * Edit your config file `/Users/user/.config/verdaccio/config.yaml` and add the following section
    
    

https: key: /Users/user/.config/verdaccio/verdaccio-key.pem cert: /Users/user/.config/verdaccio/verdaccio-cert.pem ca: /Users/user/.config/verdaccio/verdaccio-csr.pem

    <br />Друга опција, ако имате сертификат у`server.pfx` формата, можете додати наведену секцију за конфигурацију. Лозинка (passphrase) је опциона, и неопходна само ако је Ваш сертификат кодиран (encrypted).
    
    

https: pfx: /Users/user/.config/verdaccio/server.pfx passphrase: 'secret' ````

Више информација о `key`, `cert`, `ca`, `pfx` и `passphrase` аргументима у [Node документацији](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

* Покренике `verdaccio` у свом command line-у.

* Отворите претраживач и учитајте `https://your.domain.com:port/`

Инструкције важе углавном за OSX и Linux, док ће на Windows-у путање (paths) бити различите, али у суштини, кораци су исти.

## Docker

Ако користите Docker image, потребно је да подесите `PROTOCOL` environment варијаблу на `https` пошто је `listen` аргумент обезбеђен као [Dockerfile](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L43), и стога игнорисан од стране config фајла.

Такође можете да подесите `PORT` environment варијаблу ако користите различит порт од `4873`.