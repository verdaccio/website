---
id: version-4.4.1-ssl
title: Configurar SSL
original_id: ssl
---

Siga estas instruções para configurar um certificado SSL que atenda ao registro NPM sobre HTTPS.

<div id="codefund">''</div>

* Atualize a propriedade listen no seu `~/.config/verdaccio/config.yaml`:

````
listen: 'https://your.domain.com/'
````

Depois de atualizar a propriedade listen e tentar executar o verdaccio novamente, ele solicitará certificados.

* Gere seus certificados

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

Você pode encontrar mais informações nos argumentos `key`, `cert`, `ca`, `pfx`, e `passphrase` contidos na [documentação do Node](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

* Execute o `verdaccio` na sua linha de comando.

* Abra o navegador e visite o endereço `https://your.domain.com:port/`

Essas instruções são válidas principalmente para OSX e Linux; no Windows, os caminhos variam, mas os passos são os mesmos.

## Docker
Se você estiver usando a imagem do Docker, você terá que configurar a variável de ambiente `VERDACCIO_PROTOCOL` para `https`, já que o argumento `listen` é fornecido no [Dockerfile](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L43) e, portanto, ignorado do seu arquivo de configuração.

Você também pode definir a variável de ambiente `VERDACCIO_PORT` se estiver usando uma porta diferente de `4873`.
