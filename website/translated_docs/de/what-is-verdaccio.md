---
id: was-ist-verdaccio
title: "Was ist Verdaccio?"
---

Verdaccio ist eine **minimalistische private npm proxy registry** basierend auf ** Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## What's a registry?

* A registry is a repository for packages, that implements the **CommonJS Compliant Package Registry specification** for reading package's information.
* Provide a compatible API with npm clients **(yarn/npm/pnpm)**.
* Semantic Versioning compatible **(semver)**.

    $> verdaccio
    

![registry](assets/verdaccio_server.gif)

## Konfiguration

Using Verdaccio with any Node.js package manager client is quite straightforward.

![registry](assets/npm_install.gif)

You can use a custom registry either by setting it globally for all your projects

    npm set registry http://localhost:4873
    

or by using it in command line as an argument `--registry` in npm (slightly different in yarn)

    npm set registry http://localhost:4873
    

    yarn config set registry http:///localhost:4873
    

## Private

Alle veröffentlichten Packages sind privat und nur basierend auf der Konfiguration zugänglich.

## Proxy

Verdaccio cache all dependencies on demand and speed up installations in local or private networks.

## Verdaccio in a nutshell

### Cover your projects with a multi purpose lightweight Node.js registry

This talk is about Verdaccio, an open-source, multi-purpose, lightweight proxy, and private registry. In it Juan Picado explains the benefits and good practices when running a private registry that will make your projects look awesome. Verdaccio could also be used for hosting a registry, emulate real testing environments or improve your developer workflow. <iframe width="560" height="315" src="https://www.youtube.com/embed/oVCjDWeehAQ?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

* Es ist eine Webapplikation basierend auf Node.js
* Es ist eine private npm registry
* Es ist ein lokaler Netzwerk Proxy
* It's a Pluggable application
* It's fairly easy to install and to use
* Docker und Kubernetes Support
* Kompatibel mit yarn, npm und pnpm
* Basiert auf `sinopia@1.4.0` und 100% **rückwärts kompatibel**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.