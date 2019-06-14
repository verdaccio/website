---
id: version-4.0.2-reverse-proxy
title: Настройка reverse proxy
original_id: reverse-proxy
---

Using a reverse proxy is a common practice. The following configurations are the most recommended and used ones.

# Apache

Apache и `mod_proxy` **не должны кодировать/декодировать слэши**, то есть нужно просто ничего не делать (со слэшами):

    <VirtualHost *:80>
      AllowEncodedSlashes NoDecode
      ProxyPass /npm http://127.0.0.1:4873 nocanon
      ProxyPassReverse /npm http://127.0.0.1:4873
    </VirtualHost>
    

### Конфигурация с SSL

Конфигурация виртуального сервера Apache

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
    

# Nginx

Конфигурация ниже - это конфигурация из примеров для `docker`, которую можно протестировать в [репозитории примеров для Docker](https://github.com/verdaccio/docker-examples/tree/master/reverse_proxy/nginx).

    upstream verdaccio_v4 {
        server verdaccio_relative_path_v4:4873;
        keepalive 8;
    }
    
    upstream verdaccio_v4_root {
        server verdaccio_relative_path_v4_root:8000;
        keepalive 8;
    }
    
    upstream verdaccio_v3 {
        server verdaccio_relative_path_latest_v3:7771;
        keepalive 8;
    }
    
    server {
        listen 80 default_server;
        access_log /var/log/nginx/verdaccio.log;
        charset utf-8;
    
        location / {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $host;
          proxy_set_header X-NginX-Proxy true;
          proxy_pass http://verdaccio_v4_root;
          proxy_redirect off;
        }
    
        location ~ ^/verdaccio/(.*)$ {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $host;
          proxy_set_header X-NginX-Proxy true;
          proxy_pass http://verdaccio_v4/$1;
          proxy_redirect off;
        }
    
        location ~ ^/verdacciov3/(.*)$ {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $host;
          proxy_set_header X-NginX-Proxy true;
    
          proxy_pass http://verdaccio_v3/$1;
          proxy_redirect off;
        }
    }
    

## Пример для SSL

    server {
        listen 80;
        return 302 https://$host$request_uri;
    }
    
    server {
        listen 443 ssl http2;
        server_name localhost;
    
        ssl_certificate     /etc/nginx/cert.crt;
        ssl_certificate_key /etc/nginx/cert.key;
    
        ssl on;
        ssl_session_cache  builtin:1000  shared:SSL:10m;
        ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
        ssl_prefer_server_ciphers on;
    
        location / {
            proxy_set_header    Host $host;
            proxy_set_header    X-Real-IP $remote_addr;
            proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header    X-Forwarded-Proto $scheme;
            proxy_pass          http://verdaccio_v4_root;
            proxy_read_timeout  600;
            proxy_redirect off;
        }
    
        location ~ ^/verdaccio/(.*)$ {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
            proxy_set_header X-NginX-Proxy true;
            proxy_pass http://verdaccio_v4_root/$1;
            proxy_redirect off;
        }
    }
    

## Run behind reverse proxy with different domain and port

### Префикс

Если вы испольузете данные домен-порт только для Verdaccio, вам не нужен определять `url_prefix`, а в противном случе, нам нужна следующая строчка в `config.yaml`.

```yaml
url_prefix: /sub_directory/
```

If you run verdaccio behind reverse proxy, you may noticed all resource file served as relaticve path, like `http://127.0.0.1:4873/-/static`

Чтобы решить эту проблему, **вам нужно послать реальный домен и порт для verdaccio с помощью хедера `Host` **

Nginx configure should look like this:

```nginx
location / {
    proxy_pass http://127.0.0.1:4873/;
    proxy_set_header Host            $host:$server_port;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

В этом случае, `url_prefix` **НЕ НУЖНО** использовать конфигурации verdaccio

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

> Примечание: Слэш после пути - обязателен (`https://your-domain:port/verdaccio/`)!