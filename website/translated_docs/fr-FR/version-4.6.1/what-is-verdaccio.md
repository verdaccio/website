---
id: version-4.6.1-what-is-verdaccio
title: C'est quoi Verdaccio?
original_id: what-is-verdaccio
---

Verdaccio is a **lightweight private npm proxy registry** built in **Node.js**
<iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>
<div id="codefund">''</div>

## Qu'est-ce qu'un journal

* A repository for packages that implements the **CommonJS Compliant Package Registry specification** for reading package info
* Provide an API compatible with npm clients **(yarn/npm/pnpm)**
* Follow the semantic Versioning compatible **(semver)**

```
$> verdaccio
```

![registry](assets/verdaccio_server.gif)

## Utilisation de Verdaccio

L'utilisation de verdaccio avec n'importe quel gestionnaire de paquets de poste client est très simple.

![registry](assets/npm_install.gif)

Vous pouvez utiliser un registre personnalisé ou le configurer de manière général pour tous vos projets

```
npm set registry http://localhost:4873
```

ou depuis la ligne de commande comme argument `--registry` dans npm (légèrement différent dans yarn)

```
npm install lodash --registry http://localhost:4873
```

## Privé

Tous les paqutes que vous publiez sont privés et accessibles uniquement sur la base de votre configuration.

## Proxy

Verdaccio stocke toutes les dépendances sur demande et accélère les installations au niveau des réseaux locaux ou privés.

## Verdaccio en quelques mots

* C'est une application web basée sur Node.js
* C'est un registre npm privé
* C'est un réseau local proxy
* C'est une application extensible
* Il est assez facile à installer et à utiliser
* Nous offrons un soutien Docker et Kubernetes
* Il est 100% compatible avec les yarn, npm et pnpm
* It was **forked** based on `sinopia@1.4.0` and 100% **backward compatible**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.
