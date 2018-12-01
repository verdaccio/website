---
id: server-configuration
title: "Server Configuration"
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

Komanda `cd` šalje Vas do home direktorijuma verdaccio korisnika. Postarajte se da pokrenete verdaccio barem jednom kako biste generisali config fajl. Modifikujte ga prema svojim potrebama.

## Listening na svim adresama

Ako želite da osluškujete (listen to) svaku eksternu adresu, podesite listen direktivu na:

```yaml
# možete podesiti listen address (ili port)
listen: 0.0.0.0:4873
```

Ako imate pokrenut verdaccio u Amazon EC2 instanci, [moraćete da podesite listen u change your config file](https://github.com/verdaccio/verdaccio/issues/314#issuecomment-327852203) kao što je prikazano u navedenom primeru.

> Konfigurisanje Apache-a ili nginx? Molimo Vas da pogledate [Reverse Proxy Setup](reverse-proxy.md)

## Kako da verdaccio radi neprekidno

You can use node package called ['forever'](https://github.com/nodejitsu/forever) to keep verdaccio running all the time.

First install `forever` globally:

```bash
$ sudo npm install -g forever
```

Make sure you've run verdaccio at least once to generate the config file and write down the created admin user. You can then use the following command to start verdaccio:

```bash
$ forever start `which verdaccio`
```

You can check the documentation for more information on how to use forever.

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

## Using systemd

Instead of `forever` you can use `systemd` for starting verdaccio and keeping it running. Verdaccio installation has systemd unit, you only need to copy it:

```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```

This unit assumes you have configuration in `/etc/verdaccio/config.yaml` and store data in `/var/lib/verdaccio`, so either move your files to those locations or edit the unit.