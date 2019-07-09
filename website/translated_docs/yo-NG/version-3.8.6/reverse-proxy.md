---
id: version-3.8.6-aṣoju ikọkọ-alayipada
title: Iseto Aṣoju ikọkọ-Alayipada
original_id: aṣoju ikọkọ-alayipada
---

## Apache

Apache ati mod_proxy ko yẹ ko tumọ koodu/di koodu awọn slash ki o si fi wọn silẹ bi wọn se wa:

    <VirtualHost *:80>
      AllowEncodedSlashes NoDecode
      ProxyPass /npm http://127.0.0.1:4873 nocanon
      ProxyPassReverse /npm http://127.0.0.1:4873
    </VirtualHost>
    

### Iṣeto pẹlu SSL

config.yaml

```yaml
url_prefix: https://npm.your.domain.com
```

Iṣeto olupese aifojuri ti Apache

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
    

## Ṣe imuṣiṣẹ aṣoju ikọkọ alayipada ẹlẹhin pẹlu ibugbe ati ibudo to yatọ

Ti o ba ṣe imuṣiṣẹ aṣoju ikọkọ alayipada ẹlẹhin verdaccio, o le kiyesi pe gbogbo faili ohun elo ṣiṣẹ bi ọna relaticve, bi `http://127.0.0.1:4873/-/static`

Lati yanju ọrọ yii, o yẹ ki o fi ogidi ibugbe ati ibudo ransẹ si verdaccio pẹlu akọle `Host`

Iṣeto Nginx yẹ ki o ri bi eyi:

```nginx
location / {
    proxy_pass http://127.0.0.1:4873/;
    proxy_set_header Host            $host:$server_port;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Fun ọrọ eyi, `url_prefix` ko GBỌDỌ wa leto ninu iṣeto verdaccio

* * *

tabi ifi ẹka-ọna kan sori ẹrọ:

```nginx
location ~ ^/verdaccio/(.*)$ {
    proxy_pass http://127.0.0.1:4873/$1;
    proxy_set_header Host            $host:$server_port;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Fun ọrọ eyi, `url_prefix` yẹ ko jẹ siseto si `/verdaccio/`

> Akiyesi: Slash kan n bẹ lẹhin ọna fifisori ẹrọ (`https://your-domain:port/verdaccio/`)!