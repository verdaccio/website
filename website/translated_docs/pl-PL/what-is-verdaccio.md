---
id: what-is-verdaccio
title: "Co to jest Verdaccio?"
---

Verdaccio is a **lightweight private npm proxy registry** built in **Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

<div id="codefund">''</div>

## Co to jest rejestr

* A repository for packages that implements the **CommonJS Compliant Package Registry specification** for reading package info
* Provide an API compatible with npm clients **(yarn/npm/pnpm)**
* Follow the semantic Versioning compatible **(semver)**

    $> verdaccio
    

![registry](assets/verdaccio_server.gif)

## Using Verdaccio

Using verdaccio with any node package manager client is quite straightforward.

![registry](assets/npm_install.gif)

You can use a custom registry either setting globally for all your projects

    npm set registry http://localhost:4873
    

or by command line as argument `--registry` in npm (slightly different in yarn)

    npm install lodash --registry http://localhost:4873
    

## Private

All packages that you publish are private and only accessible based in your configuration.

## Proxy

Verdaccio cache all dependencies by demand and speed up installations in local or private networks.

## Verdaccio w skrócie

* Jest to internetowa aplikacja oparta na Node.js
* Jest to prywatny rejestr npm
* Jest to proxy sieci lokalnej
* It's a Pluggable application
* Jest bardzo prosty w instalacji i w użyciu
* Oferujemy wsparcie Docker i Kubernetes
* Jest w 100% kompatybilny z yarn, npm i pnpm
* It was **forked** based on `sinopia@1.4.0` and 100% **backward compatible**.
* Słowo Verdaccio oznacza **zielony kolor popularny w późnych średniowiecznych włochach w malarstwie freskowym**.