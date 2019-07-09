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
    

## Ṣe imuṣiṣẹ ẹlẹhin aṣoju ikọkọ alayipada pẹlu ibugbe ati ibudo to yatọ

If you run verdaccio behind reverse proxy, you may noticed all resource file served as relaticve path, like `http://127.0.0.1:4873/-/static`

To resolve this issue, you should send real domain and port to verdaccio with `Host` header

Nginx configure should look like this:

```nginx
location / {
    proxy_pass http://127.0.0.1:4873/;
    proxy_set_header Host            $host:$server_port;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

For this case, `url_prefix` should NOT set in verdaccio config

* * *

or a sub-directory installation:

```nginx
location ~ ^/verdaccio/(.*)$ {
    proxy_pass http://127.0.0.1:4873/$1;
    proxy_set_header Host            $host:$server_port;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

For this case, `url_prefix` should set to `/verdaccio/`

> Akiyesi: Slash kan n bẹ lẹhin ọna fifisori ẹrọ (`https://your-domain:port/verdaccio/`)!