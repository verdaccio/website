---
id: server-configuration
title: "Configurazione del server"
---
Questa è principalmente la documentazione della configurazione di base per il server di linux ma credo sia importante documentare e condividere i passi che ho seguito per avviare permanentemente verdaccio sul mio server. Serviranno le autorizzazioni di root (o sudo) per quello che segue.

## Gestire come utente separato

Come prima cosa creare l'utente verdaccio:

```bash
$ sudo adduser --system --gecos 'Verdaccio NPM mirror' --group --home /var/lib/verdaccio verdaccio
```

O, nel caso in cui non si abbia `adduser`:

```bash
$ sudo useradd --system --comment 'Verdaccio NPM mirror' --create-home --home-dir /var/lib/verdaccio --shell /sbin/nologin verdaccio
```

Creare una shell come utente di verdaccio utilizzando il seguente comando:

```bash
$ sudo su -s /bin/bash verdaccio
$ cd
```

Il comando `cd` manda alla cartella home dell'utente verdaccio. Assicurarsi di eseguire verdaccio almeno una volta per generare il file di configurazione. Modificarlo a seconda delle proprie esigenze.

## Ascolto di tutti gli indirizzi

Se si desidera ascoltare ogni indirizzo esterno, impostare la direttiva listen nella configurazione su:

```yaml
# è possibile specificare l'indirizzo di listen (o semplicemente una porta)
listen: 0.0.0.0:4873
```

Se si sta eseguendo verdaccio in un'istanza di Amazon EC2, [ sarà necessario impostare il listen nel cambiare il file di configurazione](https://github.com/verdaccio/verdaccio/issues/314#issuecomment-327852203) come viene descritto sopra.

> Bisogno di configurare Apache o nginx? Controllare la [Configurazione Inversa del Proxy](reverse-proxy.md)

## Mantenere verdaccio in funzione

È possibile utilizzare il pacchetto di nodi chiamato ['forever'](https://github.com/nodejitsu/forever) per mantenere verdaccio in esecuzione continuamente.

Innanzitutto installare `forever` globalmente:

```bash
$ sudo npm install -g forever
```

Assicurarsi di aver eseguito verdaccio almeno una volta per generare il file di configurazione ed annotare l'utente amministratore creato. Successivamente può essere usato il seguente comando per avviare verdaccio:

```bash
$ forever start `which verdaccio`
```

Per ulteriori informazioni su come utilizzare forever consultare la documentazione.

## Durata dei riavvi del server

Si possono utilizzare `crontab` e `forever` contemporaneamente per avviare verdaccio in seguito ad una reinizializzazione del server. Quando si è loggati come utenti verdaccio, effettuare le seguenti operazioni:

```bash
$ crontab -e
```

Questo potrebbe richiedere di scegliere un editor. Selezionare il preferito e procedere. Aggiungere la seguente annotazione al file:

    @reboot /usr/bin/forever start /usr/lib/node_modules/verdaccio/bin/verdaccio
    

I percorsi potrebbero variare a seconda della configurazione del server. Se si desidera sapere dove si trovano i file, è possibile utilizzare il comando 'which':

```bash
$ which forever
$ which verdaccio
```

## Utilizzo di systemd

È possibile utilizzare `systemd` invece di `forever` per avviare verdaccio e mantenerlo in esecuzione. L'installazione di Verdaccio possiede l'unità systemd, è necessario solamente copiarla:

```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```

Questa unità presuppone che la configurazione sia in `/etc/verdaccio/config.yaml` e l'archiviazione dei dati in `/var/lib/verdaccio`, quindi spostare i file in quelle posizioni o modificare l'unità.