---
id: version-4.4.1-ssl
title: Ṣeto Awọn iwe ẹri SSL
original_id: ssl
---

Tẹle awọn itọsọna wọnyi lati seto iwe ẹri SSL kan lati ṣiṣẹ bi ibiiforukọsilẹ NPM kan lori HTTPS.

<div id="codefund">''</div>

* Ṣe imudojuiwọn ohun elo itẹtisi ni `~/.config/verdaccio/config.yaml` rẹ:

````
listen: 'https://your.domain.com/'
````

Lọgan ti o ti se imudojuiwọn ohun elo itẹtisi ati gbigbiyanju lati ṣe imuṣiṣẹ verdaccio lẹẹkansi, yoo beere fun awọn iwe ẹri.

* Pilẹṣẹ awọn iwe ẹri rẹ

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

O le ri alaye diẹ sii lori awọn ariyanjiyan `key`, `cert`, `ca`, `pfx`, ati `passphrase` ni [Iwe akọsilẹ Oju ipade](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

* Se imusisẹ `verdaccio` ninu ila aṣẹ rẹ.

* Ṣii ẹrọ aṣàwákiri ayelujara ki o si ṣabẹwo si `https://your.domain.com:port/`

Awọn itọsọna wọnyi ma n saba fẹsẹmulẹ labẹ OSX ati Linux; lori Windows awọn ọna naa yoo yatọ, ṣugbọn awọn igbesẹ naa jẹ bakanna.

## Docker
Ti o ba n lo aworan Docker, o ni lati ṣeto iyipada ayika `VERDACCIO_PROTOCOL` si `https`, gẹgẹ bi ariyanjiyan `listen` se jẹ pipese ninu [Dockerfile](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L43) naa ati pe o foju fo ti inu faili iṣeto rẹ.

O tun le ṣeto iyipada ayika `VERDACCIO_PORT` ti o ba nlo ibudo miiran to yatọ si `4873`.
