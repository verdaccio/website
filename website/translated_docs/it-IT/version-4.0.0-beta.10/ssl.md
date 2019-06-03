---
id: version-4.0.0-beta.10-ssl
title: Configurare i Certificati SSL
original_id: ssl
---

Seguire queste istruzioni per configurare un certificato SSL che serva al registro NPM su HTTPS.

* Aggiornare la proprietà listen in `~/.config/verdaccio/config.yaml`:

    listen: 'https://your.domain.com/'
    

Una volta aggiornata la proprietà listen e provato ad avviare verdaccio di nuovo, chiederà i certificati.

* Generare i certificati

     $ openssl genrsa -out /Users/user/.config/verdaccio/verdaccio-key.pem 2048
     $ openssl req -new -sha256 -key /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-csr.pem
     $ openssl x509 -req -in /Users/user/.config/verdaccio/verdaccio-csr.pem -signkey /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-cert.pem
     ````
    
    * Modificare il file di configurazione `/Users/user/.config/verdaccio/config.yaml` e aggiungere la seguente sezione:
    
    

https: key: /Users/user/.config/verdaccio/verdaccio-key.pem cert: /Users/user/.config/verdaccio/verdaccio-cert.pem ca: /Users/user/.config/verdaccio/verdaccio-csr.pem

    <br />Alternatively, if you have a certificate with the `server.pfx` format, you can add the following configuration section: (The passphrase is optional and only needed if your certificate is encrypted.)
    
    

https: pfx: /Users/user/.config/verdaccio/server.pfx passphrase: 'secret' ````

You can find more info on the `key`, `cert`, `ca`, `pfx`, and `passphrase` arguments in the [Node documentation](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

* Eseguire `verdaccio` nella linea di comando.

* Open the browser and visit `https://your.domain.com:port/`

These instructions are mostly valid under OSX and Linux; on Windows the paths will vary, but the steps are the same.

## Docker

If you are using the Docker image, you have to set the `PROTOCOL` environment variable to `https`, as the `listen` argument is provided in the [Dockerfile](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L43) and thus ignored from your config file.

You can also set the `PORT` environment variable if you are using a port other than `4873`.