---
id: version-4.6.1-what-is-verdaccio
title: Šta je Verdaccio?
original_id: šta-je-verdaccio
---

Verdaccio is a **lightweight private npm proxy registry** built in **Node.js**
<iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>
<div id="codefund">''</div>

## Šta je registry

* A repository for packages that implements the **CommonJS Compliant Package Registry specification** for reading package info
* Provide an API compatible with npm clients **(yarn/npm/pnpm)**
* Follow the semantic Versioning compatible **(semver)**

```
$> verdaccio
```

![registry](assets/verdaccio_server.gif)

## Korišćenje Verdaccio-a

Korišćenje verdaccio-a sa bilo kojim node package manager client je vrlo jasno određeno.

![registry](assets/npm_install.gif)

Možete koristiti prilagođeni registry za sve svoje projekte bilo ako ga podesite na globalno

```
npm set registry http://localhost:4873
```

ili preko command line kao argument `--registry` u npm (malo se razlikuje u odnosu na yarn)

```
npm install lodash --registry http://localhost:4873
```

## Private

Svi paketi koje publikujete su podešeni kao privatni i dostupni su samo ako su tako konfigurisani.

## Proxy

Verdaccio kešira sve dependencies na zahtev i tako ubrzava instaliranje na lokalne ili privatne mreže.

## Verdaccio u kratkim crtama

* To je web app bazirana na Node.js
* To je privatni npm registry
* To je lokalni network proxy
* To je aplikacija koja podržava plugine
* Prilično jednostavan za instaliranje i korišćenje
* Nudimo Docker i Kubernetes podršku
* 100% Komparibilan sa yarn, npm i pnpm
* It was **forked** based on `sinopia@1.4.0` and 100% **backward compatible**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.
