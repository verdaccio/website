---
id: what-is-verdaccio
title: "Cos'è Verdaccio?"
---

Verdaccio è un **registro proxy npm leggero e privato** scritto in **Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## What's a registry?

* A registry is a repository for packages, that implements the **CommonJS Compliant Package Registry specification** for reading package's information.
* Provide a compatible API with npm clients **(yarn/npm/pnpm)**.
* Semantic Versioning compatible **(semver)**.

    $> verdaccio
    

![registry](assets/verdaccio_server.gif)

## Utilizzo di Verdaccio

Using Verdaccio with any Node.js package manager client is quite straightforward.

![registry](assets/npm_install.gif)

You can use a custom registry either by setting it globally for all your projects

    npm set registry http://localhost:4873
    

or by using it in command line as an argument `--registry` in npm (slightly different in yarn)

    npm install lodash --registry http://localhost:4873
    

    yarn config set registry http:///localhost:4873
    

## Privato

Tutti i pacchetti che pubblichi sono privati e accessibili soltanto in base alla tua configurazione.

## Proxy

Verdaccio cache all dependencies on demand and speed up installations in local or private networks.

## Verdaccio in pillole

### Cover your projects with a multi purpose lightweight Node.js registry

This talk is about Verdaccio, an open-source, multi-purpose, lightweight proxy, and private registry. In it Juan Picado explains the benefits and good practices when running a private registry that will make your projects look awesome. Verdaccio could also be used for hosting a registry, emulate real testing environments or improve your developer workflow. <iframe width="560" height="315" src="https://www.youtube.com/embed/oVCjDWeehAQ?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

* È un'applicazione web basata su Node.js
* È un registro npm privato
* È un proxy di rete locale
* È un'applicazione estensibile
* It's fairly easy to install and to use
* Offriamo supporto Docker e Kubernetes
* È 100% compatibile con yarn, npm e pnpm
* È un **fork** basato su `sinopia@1.4.0` e 100% **retrocompatible**.
* Il nome Verdaccio viene da **Una tonalità di verde, popolare nell'Italia tardo medievale usata per gli affreschi**.