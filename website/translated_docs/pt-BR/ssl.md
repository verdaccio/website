---
id: ssl
title: "Configurar SSL"
---

Siga estas instruções para configurar um certificado SSL que atenda ao registro NPM sobre HTTPS.

* Atualize a propriedade listen no seu `~/.config/verdaccio/config.yaml`:

    listen: 'https://your.domain.com/'
    

Depois de atualizar a propriedade listen e tentar executar o verdaccio novamente, ele solicitará certificados.

* Gere seus certificados

     $ openssl genrsa -out /Users/user/.config/verdaccio/verdaccio-key.pem 2048
     $ openssl req -new -sha256 -key /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-csr.pem
     $ openssl x509 -req -in /Users/user/.config/verdaccio/verdaccio-csr.pem -signkey /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-cert.pem
     ````
    
    * Edite o seu arquivo config `/Users/user/.config/verdaccio/config.yaml` e adicione a seguinte seção:
    
    

https: key: /Users/user/.config/verdaccio/verdaccio-key.pem cert: /Users/user/.config/verdaccio/verdaccio-cert.pem ca: /Users/user/.config/verdaccio/verdaccio-csr.pem

    <br />Como alternativa, se você tiver um certificado no formato `server.pfx`, você poderá adicionar a seguinte seção de configuração: (A senha é opcional e necessária apenas se o certificado for criptografado.)
    
    

https: pfx: /Users/user/.config/verdaccio/server.pfx passphrase: 'secret' ````

You can find more info on the `key`, `cert`, `ca`, `pfx`, and `passphrase` arguments in the [Node documentation](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

* Run `verdaccio` in your command line.

* Open the browser and visit `https://your.domain.com:port/`

These instructions are mostly valid under OSX and Linux; on Windows the paths will vary, but the steps are the same.

## Docker

If you are using the Docker image, you have to set the `VERDACCIO_PROTOCOL` environment variable to `https`, as the `listen` argument is provided in the [Dockerfile](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L43) and thus ignored from your config file.

You can also set the `VERDACCIO_PORT` environment variable if you are using a port other than `4873`.