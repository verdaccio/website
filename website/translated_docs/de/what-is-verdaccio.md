---
id: was-ist-verdaccio
title: "Was ist Verdaccio?"
---

Verdaccio ist eine **minimalistische private npm proxy registry** basierend auf ** Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

<div id="codefund">''</div>

## Was ist eine Registry

* Ein Package Repository, welches die **CommonJS Compliant Package Registry specification** zum Lesen der Package-Informationen implementiert.
* Stellt eine mit den NPM Package Managern **(yarn/npm/pnpm)** kompatible API zur Verfügung.
* Konform dem Semantic Versioning **(semver)** Standard.

    $> verdaccio
    

![registry](assets/verdaccio_server.gif)

## Konfiguration

Die Konfiguration von Verdaccio mit jedem beliebigem Node Package Manager ist sehr unkompliziert.

![registry](assets/npm_install.gif)

Konfiguration einer Registry global für alle Projekte

    npm set registry http://localhost:4873
    

oder mittels dem Kommandozeilen-Parameter `--registry` in npm (etwas anders in yarn)

    npm set registry http://localhost:4873
    

## Private

All packages that you publish are private and only accessible based in your configuration.

## Proxy

Verdaccio cache all dependencies by demand and speed up installations in local or private networks.

## Verdaccio in a nutshell

* It's a web app based on Node.js
* It's a private npm registry
* It's a local network proxy
* It's a Pluggable application
* It's a fairly easy install and use
* We offer Docker and Kubernetes support
* It is 100% compatible with yarn, npm and pnpm
* It was **forked** based on `sinopia@1.4.0` and 100% **backward compatible**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.