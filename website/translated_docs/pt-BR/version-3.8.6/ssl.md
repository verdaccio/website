---
id: version-3.8.6-ssl
title: Configurar SSL
original_id: ssl
---

Follow this instructions to configure a SSL certificate to serve NPM registry under HTTPS.

* Atualize a propriedade listen no seu `~/.config/verdaccio/config.yaml`:

    listen: 'https://your.domain.com/'
    

Once you update the listen and try to run verdaccio again will ask for certificates.

* Gere seus certificados

     $ openssl genrsa -out /Users/user/.config/verdaccio/verdaccio-key.pem 2048
     $ openssl req -new -sha256 -key /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-csr.pem
     $ openssl x509 -req -in /Users/user/.config/verdaccio/verdaccio-csr.pem -signkey /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-cert.pem
     ````
    
    * Edit your config file `/Users/user/.config/verdaccio/config.yaml` and add the following section
    
    

https: key: /Users/user/.config/verdaccio/verdaccio-key.pem cert: /Users/user/.config/verdaccio/verdaccio-cert.pem ca: /Users/user/.config/verdaccio/verdaccio-csr.pem

    <br />Alternatively, if you have a certificate as `server.pfx` format, you can add the following configuration section. The passphrase is optional and only needed, if your certificate is encrypted.
    
    

https: pfx: /Users/user/.config/verdaccio/server.pfx passphrase: 'secret' ````

More info on the `key`, `cert`, `ca`, `pfx` and `passphrase` arguments on the [Node documentation](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

* Execute o `verdaccio` na sua linha de comando.

* Open the browser and load `https://your.domain.com:port/`

This instructions are mostly valid under OSX and Linux, on Windows the paths will vary but, the steps are the same.

## Docker

If you are using the Docker image, you have to set the `PROTOCOL` environment variable to `https` as the `listen` argument is provided on the [Dockerfile](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L43), and thus ignored from your config file.

You can also set the `PORT` environment variable if you are using a different port than `4873`.