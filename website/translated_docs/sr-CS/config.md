---
id: konfigurisanje
title: "Fajl za konfigurisanje"
---
Ovaj fajl je osnova verdaccio-a. U okviru njega, možete vršiti izmene zadatih podešavanja, možete aktivirati plugin-e i spoljašnje resurse (features).

Fajl "default configuration file" se kreira prilikom prvog pokretanja `verdaccio-a`.

## Podrazumevane postavke (Default Configuration)

Podrazumevane postavke podržavaju **scoped** pakete za sve korisnike, ali samo **autorizovanim korisnicima omogućavaju da publikuju**.

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

## Sekcije

Sekcija u nastavku daje objašnjenja za svako svojstvo i opciju.

### Memorija za skladištenje

Je lokacija na kojoj se vrši skladištenje podataka. **Verdaccio je inicijalno podešen kao local file system**.

```yaml
storage: ./storage
```

### Plugins

Je lokacija plugin directorijuma. Ovo je korisno za deployment baziran na Docker/Kubernetes.

```yaml
plugins: ./plugins
```

### Autentifikacija

Ovde se vrši podešavanje (set up). Podrazumevana auth je bazirana na `htpasswd` i već je ugrađena. Možete izvršiti modifikacije načina rada (behaviour) putem [plugin-a](plugins.md). Za više informacija o ovoj sekciji pročitajte [auth stranu](auth.md).

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    max_users: 1000
```

### Sigurnost

<small>Počevši od verzije: <code>verdaccio@4.0.0</code> paragraf <a href="https://github.com/verdaccio/verdaccio/pull/168">#168</a></small>

Sigurnosni blok Vam omogućava da prilagodite potpis za token (token signature). Kako biste [JWT (json web token) učlnili aktivnim ](https://jwt.io/) novi potpis koji trebate za dodavanje bloka `jwt` u `api` sekciju, `web` po pravilu koristi `jwt`.

Konfiguracija je podeljena u dve sekcije, `api` i `web`. Kako biste koristili JWT u `api`, morate ga definisati, u suprotnom će koristiti nasleđeni potpis za token (legacy token signature) (`aes192`). Za JWT možete prilagoditi [potpis](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) i token [verifikaciju](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) upisivanjem parametara po svojoj želji.

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
    

> Jako Vam preporučujemo da se prebacite na JWT pošto je legacy signature (`aes192`) zastareo i neće ga biti u novijim verzijama.

### Web UI (korisnički interfejs)

Ovo svojstvo Vam omogućava da modifikujete izgled korisničkog interfejsa. Za više informacija o ovoj sekciji pročitajte [stranicu web ui](web.md).

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

### Uplinks

Uplinks pružaju mogućnost sistemu da hvata (fetch) pakete iz udaljenih registrija ako ti paketi nisu lokalno dostupni. Za više informacija o ovoj sekciji pročitajte na [uplinks stranici](uplinks.md).

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

### Paketi

Paketi (packages) daju mogućnost korisnicima da kontrolišu kako će se pristupati paketima. Za više detalja o ovoj sekciji, pročitajte [packages stranicu](packages.md).

```yaml
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

## Napredna podešavanja

### Publikovanje offline

Prema zadatim podešavanjima, `verdaccio` ne dozvoljava publikovanje onda kada je klijent offline. Takav način rada (behavior), može da se promeni ako se parametri iz primera podese na *true*.

```yaml
publish:
  allow_offline: false
```

<small>Počevši od verzije: <code>verdaccio@2.3.6</code> član (due) <a href="https://github.com/verdaccio/verdaccio/pull/223">#223</a></small>

### URL Prefix

```yaml
url_prefix: https://dev.company.local/verdaccio/
```

Počevši od verzije: `verdaccio@2.3.6` član [#197](https://github.com/verdaccio/verdaccio/pull/197)

### Maksimalna veličina body sekcije dokumenta

Prema zadatim podešavanjima, maksimalna veličina za body JSON dokumenta je `10mb`. Ako dobijete grešku `"request entity too large"` mogli biste da povećate ovu vrednost.

```yaml
max_body_size: 10mb
```

### Listen Port

`verdaccio` runs by default in the port `4873`. Changing the port can be done via [cli](cli.md) or in the configuration file, the following options are valid.

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

To enable `https` in `verdaccio` it's enough to set the `listen` flag with the protocol *https://*. For more information about this section read the [ssl page](ssl.md).

```yaml
https:
    key: ./path/verdaccio-key.pem
    cert: ./path/verdaccio-cert.pem
    ca: ./path/verdaccio-csr.pem
```

### Proxy

Proxies are special-purpose HTTP servers designed to transfer data from remote servers to local clients.

#### http_proxy i https_proxy

If you have a proxy in your network you can set a `X-Forwarded-For` header using the following properties.

```yaml
http_proxy: http://something.local/
https_proxy: https://something.local/
```

#### no_proxy

This variable should contain a comma-separated list of domain extensions proxy should not be used for.

```yaml
no_proxy: localhost,127.0.0.1
```

### Notifikacije

Enabling notifications to third-party tools is fairly easy via web hooks. For more information about this section read the [notifications page](notifications.md).

```yaml
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```

> For more detailed configuration settings, please [check the source code](https://github.com/verdaccio/verdaccio/tree/master/conf).

### Audit

<small>Since: <code>verdaccio@3.0.0</code></small>

`npm audit` is a new command released with [npm 6.x](https://github.com/npm/npm/releases/tag/v6.1.0). Verdaccio includes a built-in middleware plugin to handle this command.

> If you have a new installation it comes by default, otherwise you need to add the following props to your config file

```yaml
middlewares:
  audit:
    enabled: true
```