---
id: co-je-verdaccio
title: "Co je Verdaccio?"
---

Verdaccio je **jednoduchý soukromý npm proxy registr** založená na **Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## What's a registry?

* A registry is a repository for packages, that implements the **CommonJS Compliant Package Registry specification** for reading package's information.
* Provide a compatible API with npm clients **(yarn/npm/pnpm)**.
* Semantic Versioning compatible **(semver)**.

    $> verdaccio
    

![registr](assets/verdaccio_server.gif)

## Pužívání Verdaccia

Using Verdaccio with any Node.js package manager client is quite straightforward.

![registr](assets/npm_install.gif)

You can use a custom registry either by setting it globally for all your projects

    npm set registry http://localhost:4873
    

or by using it in command line as an argument `--registry` in npm (slightly different in yarn)

    npm install lodash --registry http://localhost:4873
    

    yarn config set registry http:///localhost:4873
    

## Soukromí

Všechny balíčky které publikujete jsou soukromé a dostupné pouze na základě Vaší konfigurace.

## Proxy

Verdaccio cache all dependencies on demand and speed up installations in local or private networks.

## Verdaccio ve zkratce

### Cover your projects with a multi purpose lightweight Node.js registry

This talk is about Verdaccio, an open-source, multi-purpose, lightweight proxy, and private registry. In it Juan Picado explains the benefits and good practices when running a private registry that will make your projects look awesome. Verdaccio could also be used for hosting a registry, emulate real testing environments or improve your developer workflow. <iframe width="560" height="315" src="https://www.youtube.com/embed/oVCjDWeehAQ?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

* Webová aplikace založená na Node.js
* Soukromý npm registr
* Je to místní síťová proxy
* It's a Pluggable application
* It's fairly easy to install and to use
* Nabízíme podporu pro Docker a Kubernetes
* 100% kompatibilní s yarn, npm a pnpm
* Byl **forked** z `sinopia@1.4.0` a je 100% **zpětně kompatibilní**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.