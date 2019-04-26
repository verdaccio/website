---
id: version-3.8.6-contributing
title: Contribuendo a Verdaccio
original_id: contributing
---

Prima di tutto 👏👏 grazie per aver visitato questa pagina, per noi significa che siete disposti a contribuire a `verdaccio` e siamo felici di questo. Saltare dentro a un code base sconosciuto non è facile, ma noi siamo qui per aiutarti.

## Canali di comunicazione

Se desideri fare domande, usiamo due canali per le discussioni:

* [Canale pubblico Discord](http://chat.verdaccio.org/)

## Guida introduttiva

A prima vista verdaccio è un unico repository, ma ci sono molti modi in cui potresti contribuire e una ampia varietà di tecnologie da usare.

### Trovare il proprio posto

Tutti noi abbiamo competenze diverse, quindi, vediamo dove ti potresti sentire a tuo agio.

### Conosco o voglio imparare Node.js

Node.js è la base di `verdaccio`, usiamo librerie come `express`, `commander,``request ` o `async`. Verdaccio è fondamentalmente un'API Rest che crea una comunicazione con i client `npm` compatibili, come `yarn`.

Abbiamo una lunga [lista di plugin](plugins.md) pronti per essere utilizzati e migliorati, ma al tempo stesso [è possibile crearne uno proprio](dev-plugins.md).

### Preferirei lavorare nell'Interfaccia Utente

Recentemente ci siamo spostati su tecnologie moderne come `React` e `element-react`. Siamo ansiosi di vedere nuove idee su come migliorare l'Interfaccia Utente.

### Mi sento più a mio agio a migliorare lo stack

Naturalmente, saremo felici se ci aiutassi a migliorare lo stack, è possibile aggiornare le dipendenze come `eslint`, `stylelint`, `webpack`. Sarebbe di grande aiuto se potessi semplicemente migliorare la configurazione di `webpack`. Ogni suggerimento è molto gradito. Inoltre se avessi esperienza con **Yeoman** potresti aiutarci con il [generatore di verdaccio](https://github.com/verdaccio/generator-verdaccio-plugin).

Qui alcune idee:

* Creare regole comuni di eslint che possano essere usate in tutte le dipendenze o plugin
* Migliorare la distribuzione delle definizioni del tipo di flusso
* Migrare su Webpack 4
* Migliorare l'hot reload con Webpack
* Utilizziamo babel e webpack attraverso tutte le dipendenze, perché non un preset comune?
* Migliorare la distribuzione continuativa dell'integrazione

### Sono bravo nella documentazione

Molti contributori trovano errori di battitura e problemi di grammatica, altra cosa che aiuta a migliorare l'esperienza complessiva per la risoluzione dei problemi.

### Sono un Designer

Abbiamo un frontend del sito <http://www.verdaccio.org/> che sarà felice di vedere le tue idee.

Il nostro sito web è basato su [Docusaurus](https://docusaurus.io/).

### Io sono un DevOps

Abbiamo un'immagine su Docker molto popolare <https://hub.docker.com/r/verdaccio/verdaccio/> che necessita di manutenzione e molto probabilmente di enormi miglioramenti, abbiamo quindi bisogno della vostra conoscenza per il beneficio di tutti gli utenti.

Abbiamo il supporto per **Kubernetes**, **Puppet**, **Ansible** e **Chef** e abbiamo bisogno di aiuto in quei campi, sentitevi liberi di vedere tutti i repository.

### Posso fare traduzioni

Verdaccio mira ad essere multilingue e,per poter raggiungere questa meta **abbiamo l'importante supporto** di [Crowdin](https://crowdin.com) che è un incredibile piattaforma per le traduzioni.

<img src="https://d3n8a8pro7vhmx.cloudfront.net/uridu/pages/144/attachments/original/1485948891/Crowdin.png" width="400px" />

Abbiamo impostato un progetto nel quale è possibile scegliere la tua lingua preferita, se non la trovi richiedila [creando un ticket](https://github.com/verdaccio/verdaccio/issues/new).

[Vai a Crowdin Verdaccio](https://crowdin.com/project/verdaccio)

## Sono pronto a contribuire

Se stai pensando *"ho già visto [i repository](repositories.md) e sono disposto a iniziare subito"* ho buone notizie per te, le troverai nel prossimo step.

Avrai bisogno di imparare a costruire un progetto, [abbiamo preparato una guida proprio per questo](build.md).

Una volta che ti sei divertito con tutti gli script e hai capito come utilizzarli, siamo pronti per andare al passaggio successivo, eseguire l' [**Unit Test**](test.md).

## Elenco completo dei contributori. Vogliamo vedere la tua faccia qui!

<a href="graphs/contributors"><img src="https://opencollective.com/verdaccio/contributors.svg?width=890&button=false" /></a>
