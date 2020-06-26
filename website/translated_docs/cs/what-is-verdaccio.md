---
id: co-je-verdaccio
title: "Co je Verdaccio?"
---

Verdaccio je **jednoduchý soukromý npm proxy registr** založená na **Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

<div id="codefund">''</div>

## Co je registr

* A repository for packages that implements the **CommonJS Compliant Package Registry specification** for reading package info
* Provide an API compatible with npm clients **(yarn/npm/pnpm)**
* Follow the semantic Versioning compatible **(semver)**

    $> verdaccio
    

![registr](assets/verdaccio_server.gif)

## Pužívání Verdaccia

Using verdaccio with any node package manager client is quite straightforward.

![registr](assets/npm_install.gif)

You can use a custom registry either setting globally for all your projects

    npm set registry http://localhost:4873
    

nebo jako argument `--registry` v příkazové řádce v nmp (mírně odlišné v yarn)

    npm install lodash --registry http://localhost:4873
    

## Soukromí

Všechny balíčky které publikujete jsou soukromé a dostupné pouze na základě Vaší konfigurace.

## Proxy

Verdaccio ukládá do mezipaměti veškeré závislosti podle poptávky a zrychluje tím instalaci na lokálních a soukromých sítích.

## Verdaccio ve zkratce

### Cover your Projects with a Multi purpose Lightweight Node.js Registry

This talk is about Verdaccio, an open-source, multi-purpose, lightweight proxy, and private registry. It explains all the benefits and good practices about how to run a registry that will make your projects look awesome, could be used for hosting a registry, emulate real testing environments or improve your developer workflow. <iframe width="560" height="315" src="https://www.youtube.com/embed/oVCjDWeehAQ?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

<div id="codefund">''</div>

* Webová aplikace založená na Node.js
* Soukromý npm registr
* Je to místní síťová proxy
* It's a Pluggable application
* Jednoduchá na instalaci a použití
* Nabízíme podporu pro Docker a Kubernetes
* 100% kompatibilní s yarn, npm a pnpm
* Byl **forked** z `sinopia@1.4.0` a je 100% **zpětně kompatibilní**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.