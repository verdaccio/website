---
id: co-je-verdaccio
title: "Co je Verdaccio?"
---
Verdaccio je **jednoduchý soukromý npm proxy registr** založená na **Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

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
    

or by command line as argument `--registry` in npm (slightly different in yarn)

    npm install lodash --registry http://localhost:4873
    

## Soukromí

Všechny balíčky které publikujete jsou soukromé a dostupné pouze na základě Vaší konfigurace.

## Proxy

Verdaccio cache all dependencies by demand and speed up installations in local or private networks.

## Verdaccio ve zkratce

* Webová aplikace založená na Node.js
* Soukromý npm registr
* It's a local network proxy
* It's a Pluggable application
* Jednoduchá na instalaci a použití
* Nabízíme podporu pro Docker a Kubernetes
* 100% kompatibilní s yarn, npm a pnpm
* It was **forked** based on `sinopia@1.4.0` and 100% **backward compatible**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.