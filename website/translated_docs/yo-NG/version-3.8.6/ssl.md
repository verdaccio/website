---
id: version-3.8.6-ssl
title: Ṣeto Awọn iwe ẹri SSL
original_id: ssl
---

Tẹle awọn itọsọna wọnyi lati seto iwe ẹri SSL kan lati ṣiṣẹ bi ibi iforukọsilẹ NPM kan labẹ HTTPS.

* Ṣe imudojuiwọn ohun elo itẹtisi ni `~/.config/verdaccio/config.yaml` rẹ:

    listen: 'https://your.domain.com/'
    

Lọgan ti o ti se imudojuiwọn ohun elo itẹtisi ti o si gbiyanju lati ṣe imuṣiṣẹ verdaccio lẹẹkansi yoo beere fun awọn iwe ẹri.

* Pilẹṣẹ awọn iwe ẹri rẹ

     $ openssl genrsa -out /Users/user/.config/verdaccio/verdaccio-key.pem 2048
     $ openssl req -new -sha256 -key /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-csr.pem
     $ openssl x509 -req -in /Users/user/.config/verdaccio/verdaccio-csr.pem -signkey /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-cert.pem
     ````
    
    * Ṣatunkọ faili iṣeto rẹ `/Users/user/.config/verdaccio/config.yaml` ki o si se afikun abala wọnyi
    
    

https: key: /Users/user/.config/verdaccio/verdaccio-key.pem cert: /Users/user/.config/verdaccio/verdaccio-cert.pem ca: /Users/user/.config/verdaccio/verdaccio-csr.pem

    <br />Ni ọna miiran, ti o ba ni iwe ẹri pẹlu ilana ti `server.pfx`, o le se afikun awọn abala iṣeto wọnyii. Gbolohun irekọja naa kii se dandan ati pe o ma jẹ ni nilo nikan, to ba jẹ pe iwe ẹri rẹ jẹ alaroko.
    
    

https: pfx: /Users/user/.config/verdaccio/server.pfx passphrase: 'secret' ````

Alaye diẹ sii lori awọn ariyanjiyan `key`, `cert`, `ca`, `pfx`, ati `passphrase` lori [Iwe akọsilẹ oju ipade](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

* Se imusisẹ `verdaccio` ninu ila aṣẹ rẹ.

* Ṣii ẹrọ aṣàwákiri ayelujara ki o si ṣabẹwo si `https://your.domain.com:port/`

Awọn itọsọna wọnyi ma n saba fẹsẹmulẹ labẹ OSX ati Linux, lori Windows awọn ọna naa yoo yatọ, ṣugbọn awọn igbesẹ naa jẹ bakanna.

## Docker

If you are using the Docker image, you have to set the `PROTOCOL` environment variable to `https` as the `listen` argument is provided on the [Dockerfile](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L43), and thus ignored from your config file.

You can also set the `PORT` environment variable if you are using a different port than `4873`.