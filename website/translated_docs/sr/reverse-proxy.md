---
id: reverse-proxy
title: "Reverse Proxy Setup"
---

## Apache

Apache и mod_proxy не треба да decode/encode slashes, тако да је најбоље да оставите подешавања таква каква су:

    <VirtualHost *:80>
      AllowEncodedSlashes NoDecode
      ProxyPass /npm http://127.0.0.1:4873 nocanon
      ProxyPassReverse /npm http://127.0.0.1:4873
    </VirtualHost>
    

### Конфигурисање са SSL

config.yaml

```yaml
url_prefix: https://npm.your.domain.com
```

Конфигурација Apache виртуал сервера

        apacheconfig
        <IfModule mod_ssl.c>
        <VirtualHost *:443>
            ServerName npm.your.domain.com
            SSLEngine on
            SSLCertificateFile      /etc/letsencrypt/live/npm.your.domain.com/fullchain.pem
            SSLCertificateKeyFile   /etc/letsencrypt/live/npm.your.domain.com/privkey.pem
            SSLProxyEngine          On
            ProxyRequests           Off
            ProxyPreserveHost       On
            AllowEncodedSlashes     NoDecode
            ProxyPass               /       http://127.0.0.1:4873 nocanon
            ProxyPassReverse        /       http://127.0.0.1:4873
        </VirtualHost>
        </IfModule>
    

## Nginx

    server {
      listen 80 default_server;
      location / {
        proxy_pass              http://127.0.0.1:4873/;
        proxy_set_header        Host $host;
      }
    }
    

## Покрените behind reverse proxy са различитим доменом и портом

Ако покренете verdaccio behind reverse proxy, можда ћете приметити све resource фајлове сервиране као relaticve path, на пример `http://127.0.0.1:4873/-/static`

Како бисте решили наведени проблем, требало би да пошаљете real domain и port до verdaccio-а са `Host` header-ом

Nginx конфигурисање би требало да изгледа овако:

```nginx
location / {
    proxy_pass http://127.0.0.1:4873/;
    proxy_set_header Host            $host:$server_port;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

У овом случају, `url_prefix` НЕ треба да подешава verdaccio config

* * *

или, инсталација под-директоријума:

```nginx
location ~ ^/verdaccio/(.*)$ {
    proxy_pass http://127.0.0.1:4873/$1;
    proxy_set_header Host            $host:$server_port;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

У овом случају, `url_prefix` треба подесити на `/verdaccio/`

> Напомена: Постоји Slash после путање за инсталацију (`https://your-domain:port/verdaccio/`)!