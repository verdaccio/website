---
id: version-4.6.1-what-is-verdaccio
title: Was ist Verdaccio?
original_id: was-ist-verdaccio
---

Verdaccio is a **lightweight private npm proxy registry** built in **Node.js**
<iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>
<div id="codefund">''</div>

## Was ist eine Registry

* A repository for packages that implements the **CommonJS Compliant Package Registry specification** for reading package info
* Provide an API compatible with npm clients **(yarn/npm/pnpm)**
* Follow the semantic Versioning compatible **(semver)**

```
$> verdaccio
```

![registry](assets/verdaccio_server.gif)

## Konfiguration

Die Konfiguration von Verdaccio mit jedem beliebigem Node Package Manager ist sehr unkompliziert.

![registry](assets/npm_install.gif)

Konfiguration einer Registry global für alle Projekte

```
npm set registry http://localhost:4873
```

oder mittels dem Kommandozeilen-Parameter `--registry` in npm (etwas anders in yarn)

```
npm set registry http://localhost:4873
```

## Private

Alle veröffentlichten Packages sind privat und nur basierend auf der Konfiguration zugänglich.

## Proxy

Verdaccio speichert alle Abhängigkeiten und beschleunigt somit Installationen in lokalen oder privaten Netzwerken.

## Verdaccio in a nutshell

* Es ist eine Webapplikation basierend auf Node.js
* Es ist eine private npm registry
* Es ist ein lokaler Netzwerk Proxy
* It's a Pluggable application
* Sehr einfache Nutzung sowie Konfiguration
* Docker und Kubernetes Support
* Kompatibel mit yarn, npm und pnpm
* It was **forked** based on `sinopia@1.4.0` and 100% **backward compatible**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.
