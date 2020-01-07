---
id: version-4.4.1-caching
title: Strategie di caching
original_id: caching
---

Verdaccio di default memorizza nella cache tutti i pacchetti nella cartella `/storage`. Tuttavia si può decidere di voler seguire una strategia differente. Utilizzando i plugin si potrebbe usare il cloud o qualsiasi tipo di database.

<div id="codefund">''</div>

## Scenari di caching

* Build a Node.js project on **Continous Integration** (Bamboo, GitLab, Jenkins, etc) servers is a task that might take several times at a day, thus, the server will download tons of tarballs from the registry every time takes place.  Come al solito, i tool di CI puliscono la cache dopo ogni build e il processo ricomincia nuovamente ogni volta. Ciò è uno spreco di banda e riduce il traffico esterno. **You can use Verdaccio for caching tarballs and metadata in our internal network and give a boost in your build time.**
* **Latency and Connectivity**, not all countries enjoy a high-speed connection. Per questo motivo memorizzare i pacchetti nella cache localmente nella propria rete è decisamente comodo. Se si sta viaggiando o si ha una connessione debole, roaming o in paesi con Firewall resistenti che potrebbero incidere sull'esperienza dell'utente (es: corruzione di tarball).
* **Offline Mode**, all Node Package Managers nowadays uses their own internal cache, but it common that different projects might use different tools, which implies lock files and so on. Quei tool non sono in grado di condividere la cache, l'unica soluzione è centralizzata e si basa su un registro proxy, Verdaccio memorizza nella cache tutti i metadati e i tarball vengono scaricati su richiesta riuscendo a condividerli in tutto il progetto.
* Avoid that any remote registry suddenly returns *HTTP 404* error for tarballs were previously available a.k.a ([left-pad issue](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/)).


# Strategie per build più veloci

> Siamo alla ricerca di ulteriori strategie, condividi la tua esperienza in questo campo

## Evitare il Caching di tarball

Se si ha a disposizione uno spazio di archiviazione limitato, si dovrebbe evitare di memorizzare nella cache tarball; abilitando false su `cache` in ciascun uplink si memorizzeranno nella cache esclusivamente file di metadati.

```
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    cache: false
```

## Estensione della Data di Scadenza della Cache

 Verdaccio di default attende 2 minuti per invalidare i metadati della cache prima di recuperare nuove informazioni dal registro remoto.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    maxage: 30m
```

Incrementando il valore di `maxage` in ciascun `uplink`, i remoti verranno interrogati con minore frequenza. Questa potrebbe essere una strategia valida in caso non si aggiornino le dipendenze così spesso.


## Utilizzare la memoria invece dell'hardrive

A volte non è un passaggio fondamentale memorizzare nella cache pacchetti, quanto memorizzare pacchetti di route da registri differenti e accelerare le fasi di build. Sono disponibili due plugin per evitare del tutto di scrivere su un hard drive fisico utilizzando la memoria.

```bash
  npm install -g verdaccio-auth-memory
  npm install -g verdaccio-memory
```

La configurazione appare come questa

```yaml
auth:
  auth-memory:
    users:
      foo:
        name: test
        password: test
store:
  memory:
    limit: 1000
```

Ricorda, una volta che il server viene riavviato i dati vengono persi, raccomandiamo questa configurazione in casi in cui non sia necessario che continui a funzionare.
