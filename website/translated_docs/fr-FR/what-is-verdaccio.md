---
id: what-is-verdaccio
title: "C'est quoi Verdaccio?"
---

Verdaccio est un **journal proxy npm léger et privé** écrit dans **Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## What's a registry?

* A registry is a repository for packages, that implements the **CommonJS Compliant Package Registry specification** for reading package's information.
* Provide a compatible API with npm clients **(yarn/npm/pnpm)**.
* Semantic Versioning compatible **(semver)**.

    $> verdaccio
    

![registry](assets/verdaccio_server.gif)

## Utilisation de Verdaccio

Using Verdaccio with any Node.js package manager client is quite straightforward.

![registry](assets/npm_install.gif)

You can use a custom registry either by setting it globally for all your projects

    npm set registry http://localhost:4873
    

or by using it in command line as an argument `--registry` in npm (slightly different in yarn)

    npm install lodash --registry http://localhost:4873
    

    yarn config set registry http:///localhost:4873
    

## Privé

Tous les paqutes que vous publiez sont privés et accessibles uniquement sur la base de votre configuration.

## Proxy

Verdaccio cache all dependencies on demand and speed up installations in local or private networks.

## Verdaccio en quelques mots

### Cover your projects with a multi purpose lightweight Node.js registry

This talk is about Verdaccio, an open-source, multi-purpose, lightweight proxy, and private registry. In it Juan Picado explains the benefits and good practices when running a private registry that will make your projects look awesome. Verdaccio could also be used for hosting a registry, emulate real testing environments or improve your developer workflow. <iframe width="560" height="315" src="https://www.youtube.com/embed/oVCjDWeehAQ?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

* C'est une application web basée sur Node.js
* C'est un registre npm privé
* C'est un réseau local proxy
* C'est une application extensible
* It's fairly easy to install and to use
* Nous offrons un soutien Docker et Kubernetes
* Il est 100% compatible avec les yarn, npm et pnpm
* Il s'agit d'un **fork** basé sur `sinopia@1.4.0` et 100% **rétrocompatible**.
* Le nom Verdaccio vient d'**Une nuance de vert populaire dans l’Italie médiévale tardive et utilisée pour les fresques**.