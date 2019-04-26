---
id: version-3.8.6-ssl
title: Nastavení SSL certifikátu
original_id: ssl
---

Následujte tyto instrukce k nastavení SSL certifikátu při použití NPM registru pod HTTPS.

* Aktualizujte vlastnost `listen` ve vašem `~/.config/verdaccio/config.yaml`:

    listen: 'https://your.domain.com/'
    

Jakmile aktualizujete `listen` a pokusíte se spustit Verdaccio znovu, Verdaccio odešle žádost o certifikáty.

* Vygenerovat certifikáty

     $ openssl genrsa -out /Users/user/.config/verdaccio/verdaccio-key.pem 2048
     $ openssl req -new -sha256 -key /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-csr.pem
     $ openssl x509 -req -in /Users/user/.config/verdaccio/verdaccio-csr.pem -signkey /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-cert.pem
     ````
    
    * Upravte svůj configurační soubor `/Users/user/.config/verdaccio/config.yaml` a přidejte následující sekce
    
    

https: key: /Users/user/.config/verdaccio/verdaccio-key.pem cert: /Users/user/.config/verdaccio/verdaccio-cert.pem ca: /Users/user/.config/verdaccio/verdaccio-csr.pem

    <br />Alternatively, if you have a certificate as `server.pfx` format, you can add the following configuration section. The passphrase is optional and only needed, if your certificate is encrypted.
    
    

https: pfx: /Users/user/.config/verdaccio/server.pfx passphrase: 'secret' ````

Více informací o `key`, `cert`, `ca`, `pfx` a `passphrase` argumentech na [dokumentace Node](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

* Spusťte `verdaccio` ve své příkazové rádce.

* Otevřete prohlížeč a načtěte `https://vase.domena.com:port/`

Tyto instrukce jsou pro OSX a Linux, u Windows se mohou cesty lišit, ale postup je stejný.

## Docker

Pokud používáte Docker obraz, musíte nastavit proměnnou prostředí `PROTOCOL` na hodnotu `https`, protože argument `listen` je k dispozici na adrese [Dockerfile](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L43), a tedy ignorován z konfiguračního souboru.

Proměnnou prostředí `POR ` můžete také nastavit, pokud používáte jiný port než `4873`.