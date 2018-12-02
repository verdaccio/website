---
id: version-3.8.6-server-configuration
title: Server Configuration
original_id: server-configuration
---
Ovo je najbazičnija konfiguracija za linux server ali nam se čini važnim da dokumentujemo i podelimo sa Vama sve korake kako bi verdaccio stalno radio na serveru. Biće Vam potrebne root (ili sudo) dozvole za navedeno.

## Pokretanje, kao zaseban korisnik

Najpre kreirajte verdaccio korisnika:

```bash
$ sudo adduser --system --gecos 'Verdaccio NPM mirror' --group --home /var/lib/verdaccio verdaccio
```

U slučaju da nemate postojećeg korisnika potrebno je da ga dodate, `adduser`:

```bash
$ sudo useradd --system --comment 'Verdaccio NPM mirror' --create-home --home-dir /var/lib/verdaccio --shell /sbin/nologin verdaccio
```

Zatim kreirate shell kao verdaccio korisnik, putem sledeće komande:

```bash
$ sudo su -s /bin/bash verdaccio
$ cd
```

Komanda `cd` Vas šalje u home direktorijum verdaccio korisnika. Proverite da li ste makar jednom pokrenuli verdaccio kako biste generisali config fajl. I zatim ga podesite ga prema svojim potrebama.

## Listening na svim adresama

Ako želite da osluškujete (listen to) svaku eksternu adresu, podesite listen direktivu na:

```yaml
# možete podesiti listen address (ili port)
listen: 0.0.0.0:4873
```

Ako imate pokrenut verdaccio u Amazon EC2 instanci, [moraćete da podesite listen u change your config file](https://github.com/verdaccio/verdaccio/issues/314#issuecomment-327852203) kao što je prikazano u navedenom primeru.

> Želite da konfigurišete Apache ili nginx? Pogledajte [Reverse Proxy Setup](reverse-proxy.md)

## Kako da verdaccio radi neprekidno

Možete da koristite node package zvani ['forever'](https://github.com/nodejitsu/forever) kako biste imali verdaccio koji će neprekidno raditi.

Prvo instalirajte `forever` globalno:

```bash
$ sudo npm install -g forever
```

Make sure you've run verdaccio at least once to generate the config file and write down the created admin user. You can then use the following command to start verdaccio:

```bash
$ forever start `which verdaccio`
```

Možete pogledati dokumentaciju za više informacija o tome kako da koristite paket forever.

## Preživljavanje resetovanja servera

You can use `crontab` and `forever` together to start verdaccio after a server reboot. When you're logged in as the verdaccio user do the following:

```bash
$ crontab -e
```

This might ask you to choose an editor. Pick your favorite and proceed. Add the following entry to the file:

    @reboot /usr/bin/forever start /usr/lib/node_modules/verdaccio/bin/verdaccio
    

The locations may vary depending on your server setup. If you want to know where your files are you can use the 'which' command:

```bash
$ which forever
$ which verdaccio
```

## Korišćenje systemd

Instead of `forever` you can use `systemd` for starting verdaccio and keeping it running. Verdaccio installation has systemd unit, you only need to copy it:

```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```

Ova jedinica podrazumeva da imate konfiguraciju u `/etc/verdaccio/config.yaml` i čuva podatke u `/var/lib/verdaccio`, tako da Vam ostaje ili da pomerite svoje fajlove ili da modifikujete samu jedinicu.