---
id: ki-ni-verdaccio
title: "Ki ni verdaccio?"
---

Verdaccio jẹ **ibi iforukọsilẹ aṣoju ikọkọ npm aladani fifuyẹ** to jẹ kikọ ni **Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

<div id="codefund">''</div>

## Kini n jẹ ibi iforukọsilẹ

* Ibi ipamọ kan fun awọn akopọ ti o n ṣe imuṣiṣẹ **alaye CommonJS Compliant Package Registry** fun kika alaye akopọ
* Pese API kan to ni ibamu pẹlu awọn onibara npm **(yarn/npm/pnpm)**
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