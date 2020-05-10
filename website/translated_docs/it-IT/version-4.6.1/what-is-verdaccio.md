---
id: version-4.6.1-what-is-verdaccio
title: Cos'è Verdaccio?
original_id: what-is-verdaccio
---

Verdaccio is a **lightweight private npm proxy registry** built in **Node.js**
<iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>
<div id="codefund">''</div>

## Cos'è un registro

* A repository for packages that implements the **CommonJS Compliant Package Registry specification** for reading package info
* Provide an API compatible with npm clients **(yarn/npm/pnpm)**
* Follow the semantic Versioning compatible **(semver)**

```
$> verdaccio
```

![registry](assets/verdaccio_server.gif)

## Utilizzo di Verdaccio

L'uso di verdaccio con qualsiasi gestore del pacchetto di nodi dei client è molto semplice.

![registry](assets/npm_install.gif)

È possibile utilizzare un registro personalizzato oppure settarlo in generale per tutti i tuoi progetti

```
npm set registry http://localhost:4873
```

o da riga di comando come argomento `--registry` in npm (leggermente diverso in yarn)

```
npm install lodash --registry http://localhost:4873
```

## Privato

Tutti i pacchetti che pubblichi sono privati e accessibili soltanto in base alla tua configurazione.

## Proxy

Verdaccio memorizza tutte le dipendenze su richiesta e velocizza le installazioni in locale o su reti private.

## Verdaccio in pillole

* È un'applicazione web basata su Node.js
* È un registro npm privato
* È un proxy di rete locale
* È un'applicazione estensibile
* È discretamente facile da installare e da usare
* Offriamo supporto Docker e Kubernetes
* È 100% compatibile con yarn, npm e pnpm
* It was **forked** based on `sinopia@1.4.0` and 100% **backward compatible**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.
