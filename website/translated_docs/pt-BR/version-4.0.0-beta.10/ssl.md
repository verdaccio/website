---
id: version-4.0.0-beta.10-ssl
title: Configurar SSL
original_id: ssl
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

Você pode encontrar mais informações nos argumentos `key`, `cert`, `ca`, `pfx`, e `passphrase` contidos na [documentação do Node](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

* Execute o `verdaccio` na sua linha de comando.

* Abra o navegador e visite o endereço `https://your.domain.com:port/`

Essas instruções são válidas principalmente para OSX e Linux; no Windows, os caminhos variam, mas os passos são os mesmos.

## Docker

If you are using the Docker image, you have to set the `PROTOCOL` environment variable to `https`, as the `listen` argument is provided in the [Dockerfile](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L43) and thus ignored from your config file.

You can also set the `PORT` environment variable if you are using a port other than `4873`.