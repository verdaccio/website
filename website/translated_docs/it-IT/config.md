---
id: configuration
title: "File di configurazione"
---

Questo file è il fondamento di verdaccio nel quale è possibile modificare il comportamento predefinito, attivare i plugin ed estendere le funzionalità.

La prima volta in assoluto che si esegue `verdaccio` viene creato un file di configurazione `config.yaml` predefinito.

<div id="codefund">''</div>

## Configurazione Predefinita

La configurazione predefinita dispone del supporto per pacchetti ** scoped** e permette a qualsiasi utente di accedere a tutti i pacchetti ma solo **agli utenti autenticati di pubblicare**.

```yaml
storage: ./storage
auth:
  htpasswd:
    file: ./htpasswd
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
  '**':
    proxy: npmjs
logs:
  - {type: stdout, format: pretty, level: http}
```

## Sezioni

Le sezioni seguenti spiegano cosa significa ogni proprietà e le diverse opzioni possibili.

### Archiviazione

È il percorso di archiviazione predefinito. **Verdaccio è di default basato sul file locale di sistema**.

```yaml
storage: ./storage
```

### Plugin

È il percorso della directory dei plugin. Utile per distribuzioni basate su Docker/Kubernetes.

```yaml
plugins: ./plugins
```

### Autenticazione

L'impostazione dell'autenticazione viene fatta qui, l'autenticazione predefinita è basata su `htpasswd` ed è incorporata. È possibile modificare questa condotta tramite [plugin](plugins.md). Per ulteriori informazioni su questa sezione leggere la [ pagina dell'autenticazione](auth.md).

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    max_users: 1000
```

### Sicurezza

<small>A partire da: <code>verdaccio@4.0.0</code> <a href="https://github.com/verdaccio/verdaccio/pull/168">#168</a></small>

Il blocco di sicurezza consente di personalizzare la firma del token. Per abilitare la nuova firma di [JWT (json web token)](https://jwt.io/) è necessario aggiungere il blocco `jwt` alla sezione `api`, `web` utilizza di default `jwt`.

La configurazione è divisa in due sezioni, `api` e `web`. Per utilizzare JWT sull'`api`, è necessario definirlo, altrimenti si utilizzerà la firma del token ereditato (`aes192`). Per JWT è possibile personalizzare [la firma](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) e la [verifica](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) del token con le proprie configurazioni.

    security:
      api:
        legacy: true
        jwt:
          sign:
            expiresIn: 29d
          verify:
            someProp: [value]
       web:
         sign:
           expiresIn: 7d # 7 days by default
         verify:
            someProp: [value]
    

> Consigliamo caldamente di migrare su JWT poiché la firma ereditata (`aes192`) è deprecata e non sarà presente nelle versioni future.

### Server

Un insieme di proprietà per modificare il comportamento dell'applicazione del server, specificamente l'API (Express.js).

> È possibile specificare il timeout del server HTTP/1.1 keep alive in secondi per le connessioni entranti. Un valore pari a 0 rende il comportamento del server http simile a quello delle versioni di Node.js precedenti alla 8.0.0, le quali non avevano un timeout keep-alive. WORKAROUND: Tramite la configurazione specificata è possibile risolvere i seguenti problemi https://github.com/verdaccio/verdaccio/issues/301. Impostare su 0 in caso 60 non sia sufficiente.

```yaml
server:
  keepAliveTimeout: 60
```

### Interfaccia Utente Web

Questa proprietà consente di modificare le caratteristiche dell'interfaccia utente web. Per ulteriori informazioni su questa sezione leggere la [pagina dell'interfaccia utente web](web.md).

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

### Uplink

Uplink è la capacità del sistema di recuperare i pacchetti da registri remoti quando quei pacchetti non sono disponibili localmente. Per ulteriori informazioni su questa sezione leggere la [ pagina degli uplink](uplinks.md).

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

### Pacchetti

La funzione "Pacchetti" consente all'utente di controllare come i pacchetti vengono resi accessibili. Per ulteriori informazioni su questa sezione leggere la [pagina dei pacchetti](packages.md).

```yaml
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

## Impostazioni Avanzate

### Pubblicazione Non in Linea

Per impostazione predefinita `verdaccio` non consente di pubblicare quando il client è offline, questa condotta può essere modificata impostandola su *true*.

```yaml
publish:
  allow_offline: false
```

<small>A partire da: <code>verdaccio@2.3.6</code> paragrafo <a href="https://github.com/verdaccio/verdaccio/pull/223">#223</a></small>

### Prefisso URL

```yaml
url_prefix: /verdaccio/
```

> Raccomandiamo l'utilizzo di una sottodirectory `verdaccio` al posto di un URI.

### Dimensione Massima del Corpo

Per impostazione predefinita la dimensione massima del corpo per un documento JSON è di `10mb`, se si incontrano errori come `"request entity too large"` si può aumentare questo valore.

```yaml
max_body_size: 10mb
```

### Porta in ascolto

`verdaccio` viene eseguito per impostazione predefinita nella porta `4873`. È possibile cambiare la porta tramite [cli](cli.md) o nel file di configurazione, le seguenti opzioni sono valide.

```yaml
listen:
# - localhost:4873            # default value
# - http://localhost:4873     # same thing
# - 0.0.0.0:4873              # listen on all addresses (INADDR_ANY)
# - https://example.org:4873  # if you want to use https
# - "[::1]:4873"                # ipv6
# - unix:/tmp/verdaccio.sock    # unix socket
```

### HTTPS

Per abilitare `https` in `verdaccio` è sufficiente impostare il `listen` flag con il protocollo *https://*. Per ulteriori informazioni su questa sezione leggere la [ pagina del ssl](ssl.md).

```yaml
https:
    key: ./path/verdaccio-key.pem
    cert: ./path/verdaccio-cert.pem
    ca: ./path/verdaccio-csr.pem
```

### Proxy

I proxy sono speciali Server HTTP progettati per trasferire dati da server remoti a client locali.

#### http_proxy and https_proxy

Se si ha un proxy nella propria rete è possibile impostare un'intestazione di `X-Forwarded-For` utilizzando le seguenti proprietà.

```yaml
http_proxy: http://something.local/
https_proxy: https://something.local/
```

#### no_proxy

Questa variabile deve contenere un elenco di estensioni di dominio separate da virgole per cui il proxy non deve essere utilizzato.

```yaml
no_proxy: localhost,127.0.0.1
```

### Notifiche

Abilitare le notifiche di strumenti di terze parti tramite web hook è abbastanza facile. Per ulteriori informazioni su questa sezione leggere la [pagina delle notifiche](notifications.md).

```yaml
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```

> Per impostazioni di configurazione più dettagliate, si prega di [controllare il codice sorgente](https://github.com/verdaccio/verdaccio/tree/master/conf).

### Audit

<small>A partire da: <code>verdaccio@3.0.0</code></small>

`npm audit` è un nuovo comando rilasciato con [npm 6.x](https://github.com/npm/npm/releases/tag/v6.1.0). Verdaccio include un plugin di middleware incorporato per gestire questo comando.

> Se si dispone di una nuova installazione viene fornito di default, altrimenti è necessario aggiungere le seguenti proprietà al file di configurazione

```yaml
middlewares:
  audit:
    enabled: true
```

### Esperimenti

This release includes a new property named `experiments` that can be placed in the `config.yaml` and is completely optional.

We want to be able to ship new things without affecting production environments. This flag allows us to add new features and get feedback from the community that wants to use them.

The features that are under this flag might not be stable or might be removed in future releases.

Un esempio:

```yaml
experiments:
  token: false
```

> To disable the experiments warning in the console, you must comment out the whole `experiments` section.