---
id: version-4.4.1-server-configuration
title: Server Configuration
original_id: server-configuration
---

Ovo je najbazičnija konfiguracija za linux server ali nam se čini važnim da dokumentujemo i podelimo sa Vama sve korake kako bi verdaccio stalno radio na serveru. Biće Vam potrebne root (ili sudo) dozvole za navedeno.

<div id="codefund">''</div>

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

Trebalo bi da makar jednom pokrenete verdaccio kako biste generisali config fajl i onda upišete kreiranog admin korisnika. Možete koristiti navedenu komandu kako biste pokrenuli verdaccio:

```bash
$ forever start `which verdaccio`
```

Možete pogledati dokumentaciju za više informacija o tome kako da koristite paket forever.

## Preživljavanje resetovanja servera
Možete zajedno koristiti `crontab` i `forever` kako biste pokrenuli verdaccio posle ponovnog pokretanja servera (reboot). Kada ste prijavljeni kao verdaccio korisnik, uradite sledeće:

```bash
$ crontab -e
```

Možda ćete dobiti opciju da izaberete editor. Odaberite svoj omiljeni i nastavite. Dodajte navedeni unos u fajl:

```
@reboot /usr/bin/forever start /usr/lib/node_modules/verdaccio/bin/verdaccio
```

Lokacije se mogu razlikovati u zavisnosti od Vaših podešavanja servera (setup). Ako želite da saznate gde se nalaze Vaši fajlovi, možete koristiti komandu 'which':

```bash
$ which forever
$ which verdaccio
```

## Korišćenje systemd
Umesto `forever` možete koristiti `systemd` za pokretanje verdaccio-a i njegov dalji rad. Verdaccio instalacija ima systemd jedinice, potrebno je samo da ih kopirate:
```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```
Ova jedinica podrazumeva da imate konfiguraciju u `/etc/verdaccio/config.yaml` i čuva podatke u `/var/lib/verdaccio`, tako da Vam ostaje ili da pomerite svoje fajlove ili da modifikujete samu jedinicu.
