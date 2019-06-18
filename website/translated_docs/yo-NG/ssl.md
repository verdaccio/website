---
id: ssl
title: "Ṣeto Awọn iwe ẹri SSL"
---

Tẹle awọn itọsọna wọnyi lati seto iwe ẹri SSL kan lati ṣiṣẹ bi ibiiforukọsilẹ NPM kan lori HTTPS.

* Ṣe imudojuiwọn ohun elo itẹtisi ni `~/.config/verdaccio/config.yaml` rẹ:

    listen: 'https://your.domain.com/'
    

Lọgan ti o ti se imudojuiwọn ohun elo itẹtisi ati gbigbiyanju lati ṣe imuṣiṣẹ verdaccio lẹẹkansi, yoo beere fun awọn iwe ẹri.

* Pilẹṣẹ awọn iwe ẹri rẹ

     $ openssl genrsa -out /Users/user/.config/verdaccio/verdaccio-key.pem 2048
     $ openssl req -new -sha256 -key /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-csr.pem
     $ openssl x509 -req -in /Users/user/.config/verdaccio/verdaccio-csr.pem -signkey /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-cert.pem
     ````
    
    * Ṣatunkọ faili iṣeto rẹ `/Users/user/.config/verdaccio/config.yaml` ki o si se afikun abala wọnyi:
    
    

https: key: /Users/user/.config/verdaccio/verdaccio-key.pem cert: /Users/user/.config/verdaccio/verdaccio-cert.pem ca: /Users/user/.config/verdaccio/verdaccio-csr.pem

    <br />Alternatively, if you have a certificate with the `server.pfx` format, you can add the following configuration section: (The passphrase is optional and only needed if your certificate is encrypted.)
    
    

https: pfx: /Users/user/.config/verdaccio/server.pfx passphrase: 'secret' ````

You can find more info on the `key`, `cert`, `ca`, `pfx`, and `passphrase` arguments in the [Node documentation](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

* Run `verdaccio` in your command line.

* Open the browser and visit `https://your.domain.com:port/`

These instructions are mostly valid under OSX and Linux; on Windows the paths will vary, but the steps are the same.

## Docker

If you are using the Docker image, you have to set the `VERDACCIO_PROTOCOL` environment variable to `https`, as the `listen` argument is provided in the [Dockerfile](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L43) and thus ignored from your config file.

You can also set the `VERDACCIO_PORT` environment variable if you are using a port other than `4873`.