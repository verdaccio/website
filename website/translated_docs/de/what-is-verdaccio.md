---
id: was-ist-verdaccio
title: "Was ist Verdaccio?"
---

Verdaccio ist eine **minimalistische private npm proxy registry** basierend auf ** Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

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

Alle veröffentlichten Packages sind privat und nur basierend auf der Konfiguration zugänglich.

## Proxy

Verdaccio speichert alle Abhängigkeiten und beschleunigt somit Installationen in lokalen oder privaten Netzwerken.

## Verdaccio in a nutshell

### Cover your Projects with a Multi purpose Lightweight Node.js Registry

This talk is about Verdaccio, an open-source, multi-purpose, lightweight proxy, and private registry. It explains all the benefits and good practices about how to run a registry that will make your projects look awesome, could be used for hosting a registry, emulate real testing environments or improve your developer workflow. <iframe width="560" height="315" src="https://www.youtube.com/embed/oVCjDWeehAQ?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

<div id="codefund">''</div>

* Es ist eine Webapplikation basierend auf Node.js
* Es ist eine private npm registry
* Es ist ein lokaler Netzwerk Proxy
* It's a Pluggable application
* Sehr einfache Nutzung sowie Konfiguration
* Docker und Kubernetes Support
* Kompatibel mit yarn, npm und pnpm
* Basiert auf `sinopia@1.4.0` und 100% **rückwärts kompatibel**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.