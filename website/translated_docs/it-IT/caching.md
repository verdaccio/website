---
id: caching
title: "Strategie di caching"
---

Verdaccio memorizza nella cache di default tutti i pacchetti nella cartella `/storage`. Tuttavia si può decidere di voler seguire una strategia differente. Utilizzando i plugin si potrebbe usare il cloud o qualsiasi tipo di database.

## Scenari di caching

* Build a Node.js project on **Continous Integration** (Bamboo, GitLab, Jenkins, etc) servers is a task that might take several times at a day, thus, the server will download tons of tarballs from the registry every time takes place. Come al solito, i tool di CI puliscono la cache dopo ogni build e il processo ricomincia nuovamente ogni volta. Ciò è uno spreco di banda e riduce il traffico esterno. **È possibile utilizzare Verdaccio per memorizzare nella cache tarball e metadati nella rete interna e per dare un impulso in fase di build.**
* **Latenza e Connettività**, non tutti i paesi godono di una connessione ad alta velocità. Per questo motivo memorizzare nella cache i pacchetti locali nella rete è decisamente comodo. Se si sta viaggiando o si ha una connessione debole, roaming o in paesi con Firewall resistenti che potrebbero incidere sull'esperienza dell'utente (es: corruzione di tarball).
* **Modalità Offline**, tutti i Node Package Manager oggigiorno utilizzano la loro cache interna, ma è comune che progetti differenti possano usare tool differenti, che comprendono file di lock e così via. Quei tool non sono in grado di condividere la cache, l'unica soluzione è centralizzata e si basa su un registro proxy, Verdaccio memorizza nella cache tutti i metadati e i tarball vengono scaricati su richiesta riuscendo a condividerli in tutto il progetto.
* Evitare che qualsiasi registro remoto restituisca improvvisamente l'errore *HTTP 404* per i tarball che erano disponibili in precedenza (conosciuto anche come [left-pad issue](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/)).

# Strategie per build più veloci

> Siamo alla ricerca di ulteriori strategie, condividi la tua esperienza in questo campo

## Evitare Caching tarball

Se si ha a disposizione uno spazio di archiviazione limitato, si dovrebbero evitare tarball di cache, abilitando `cache` false in ciascun uplink si memorizzeranno nella cache esclusivamente file di metadati.

    uplinks:
      npmjs:
        url: https://registry.npmjs.org/
        cache: false
    

## Estensione della Data di scadenza della Cache

Verdaccio di default attende 2 minuti per invalidare i metadati della cache prima di recuperare nuove informazioni dal registro remoto.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    maxage: 30m
```

Incrementando il valore di `maxage` in ciascun `uplink`, i remoti verranno chiesti con minore frequenza. Questa potrebbe essere una strategia valida se non si aggiornano le dipendenze così spesso.

## Utilizzare la memoria invece dell'hardrive

A volte non è un passaggio fondamentale memorizzare nella cache pacchetti, ma piuttosto pacchetti di route da registri differenti e accelerare le fasi di build. Sono disponibili due plugin per evitare del tutto di scrivere su un hardrive fisico utilizzando la memoria.

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

Remember, once the server is restarted the data is being lost, we recomend this setup in cases where you do not need to persist at all.