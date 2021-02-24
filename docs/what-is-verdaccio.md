---
id: what-is-verdaccio
title: "What is Verdaccio?"
---

Verdaccio is a **lightweight private npm proxy registry** built in **Node.js**

<iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## What's a registry?

* A registry is a repository for packages, that implements the **CommonJS Compliant Package Registry specification** for reading package's information.
* Provide a compatible API with npm clients **(yarn/npm/pnpm)**.
* Semantic Versioning compatible **(semver)**.

```
$> verdaccio
```

![registry](assets/verdaccio_server.gif)

## Using Verdaccio

Using Verdaccio with any Node.js package manager client is quite straightforward.

![registry](assets/npm_install.gif)

You can use a custom registry either by setting it globally for all your projects

```
npm set registry http://localhost:4873
```

or by using it in command line as an argument `--registry` in npm (slightly different in yarn)

```
npm install lodash --registry http://localhost:4873
```
```
yarn config set registry http://localhost:4873
```

## Private

All packages that you publish are private and only accessible based in your configuration.

## Proxy

Verdaccio cache all dependencies on demand and speed up installations in local or private networks.

## In a Nutshell

* It's a web app based on Node.js
* It's a private npm registry
* It's a local network proxy
* It's a Pluggable application
* It's fairly easy to install and to use
* We offer Docker and Kubernetes support
* It is 100% compatible with yarn, npm and pnpm
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.
