---
id: šta-je-verdaccio
title: "Šta je Verdaccio?"
---

Verdaccio je **lightweight private npm proxy registry** ugrađen u **Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## What's a registry?

* A registry is a repository for packages, that implements the **CommonJS Compliant Package Registry specification** for reading package's information.
* Provide a compatible API with npm clients **(yarn/npm/pnpm)**.
* Semantic Versioning compatible **(semver)**.

    $> verdaccio
    

![registry](assets/verdaccio_server.gif)

## Korišćenje Verdaccio-a

Using Verdaccio with any Node.js package manager client is quite straightforward.

![registry](assets/npm_install.gif)

You can use a custom registry either by setting it globally for all your projects

    npm set registry http://localhost:4873
    

or by using it in command line as an argument `--registry` in npm (slightly different in yarn)

    npm install lodash --registry http://localhost:4873
    

    yarn config set registry http:///localhost:4873
    

## Private

Svi paketi koje publikujete su podešeni kao privatni i dostupni su samo ako su tako konfigurisani.

## Proxy

Verdaccio cache all dependencies on demand and speed up installations in local or private networks.

## Verdaccio u kratkim crtama

### Cover your projects with a multi purpose lightweight Node.js registry

This talk is about Verdaccio, an open-source, multi-purpose, lightweight proxy, and private registry. In it Juan Picado explains the benefits and good practices when running a private registry that will make your projects look awesome. Verdaccio could also be used for hosting a registry, emulate real testing environments or improve your developer workflow. <iframe width="560" height="315" src="https://www.youtube.com/embed/oVCjDWeehAQ?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

* To je web app bazirana na Node.js
* To je privatni npm registry
* To je lokalni network proxy
* To je aplikacija koja podržava plugine
* It's fairly easy to install and to use
* Nudimo Docker i Kubernetes podršku
* 100% Komparibilan sa yarn, npm i pnpm
* Nakon što je **forkovan** na bazi `sinopia@1.4.0` ostvaruje100% **kompatibilnost unazad**.
* Ime Verdaccio označava **zelenu boju koja se koristila za italijansko freskoslikarstvo kasnog srednjeg veka**.