---
id: version-4.0.0-alpha.4-what-is-verdaccio
title: C'est quoi Verdaccio?
original_id: what-is-verdaccio
---
Verdaccio est un **journal proxy npm léger et privé** écrit dans **Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## Qu'est-ce qu'un journal

* Référentiel des paquets qui implémentent la **spécification CommonJS Compliant Package Registry** pour la lecture des informations sur les paquets
* Fournit un API compatible avec les clients npm **(yarn/npm/pnpm)**
* Suit le contrôle de version compatible sémantique **(semver)**

    $> verdaccio
    

![registry](assets/verdaccio_server.gif)

## Utilisation de Verdaccio

L'utilisation de verdaccio avec n'importe quel gestionnaire de paquets de poste client est très simple.

![registry](assets/npm_install.gif)

Vous pouvez utiliser un registre personnalisé ou le configurer de manière général pour tous vos projets

    npm set registry http://localhost:4873
    

ou depuis la ligne de commande comme argument `--registry` dans npm (légèrement différent dans yarn)

    npm install lodash --registry http://localhost:4873
    

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
* Il s'agit d'un **fork** basé sur `sinopia@1.4.0` et 100% **rétrocompatible**.
* Le nom Verdaccio vient d'**Une nuance de vert populaire dans l’Italie médiévale tardive et utilisée pour les fresques**.