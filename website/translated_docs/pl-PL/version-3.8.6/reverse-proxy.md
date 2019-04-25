---
id: version-3.8.6-reverse-proxy
title: Ustawienie Odwrotnego Proxy
original_id: odwrotne proxy
---

## Apache

Apache i mod_proxy nie powinny dekodować/kodować ukośników i pozostawić je takimi, jakimi są:

    <VirtualHost *:80>
      AllowEncodedSlashes NoDecode
      ProxyPass /npm http://127.0.0.1:4873 nocanon
      ProxyPassReverse /npm http://127.0.0.1:4873
    </VirtualHost>
    

### Konfiguracja z SSL

config.yaml

```yaml
url_prefix: https://npm.your.domain.com
```

Konfiguracja wirtualnego serwera Apache

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
    

## Uruchom za odwrotnym proxy z inną domeną i portem

Jeśli uruchomisz verdaccio za odwrotnym proxy, możesz zauważyć, że cały plik zasobów służył jako relatywna ścieżka, np. `http://127.0.0.1:4873/-/static`

Aby rozwiązać ten problem, należy wysłać realną domenę i port do verdaccio z nagłówkiem `Host`

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

> Note: There is a Slash after install path (`https://your-domain:port/verdaccio/`)!