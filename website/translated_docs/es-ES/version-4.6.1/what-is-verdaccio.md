---
id: version-4.6.1-what-is-verdaccio
title: Qué es Verdaccio?
original_id: what-is-verdaccio
---

Verdaccio is a **lightweight private npm proxy registry** built in **Node.js**
<iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>
<div id="codefund">''</div>

## Qué es un registro

* A repository for packages that implements the **CommonJS Compliant Package Registry specification** for reading package info
* Provide an API compatible with npm clients **(yarn/npm/pnpm)**
* Follow the semantic Versioning compatible **(semver)**

```
$> verdaccio
```

![registry](assets/verdaccio_server.gif)

## Usando Verdaccio

Usar verdaccio con cualquier cliente de manejador de paquetes es muy sencillo.

![registry](assets/npm_install.gif)

Puedes usar un registro personalizado bien definiendolo globalmente para todos los projectos

```
npm set registry http://localhost:4873
```

o por línea de commandos como argumento `--registry` en npm (ligeramente diferente en yarn)

```
npm install lodash --registry http://localhost:4873
```

## Privado

Todos los paquetes que publicas son privados y accesibles basados en tu configuración.

## Proxy

Verdaccio almacena todas las dependencias bajo demanda y acelera las instalaciones en redes locales y privadas.

## Verdaccio en pocas palabras

* Es una aplicación web basada en Node.js
* Es un registro privado
* Es un proxy para la red local
* Es una aplicación extensible
* Es muy fácil de usar e instalar
* Ofrecemos soporte en Docker y Kubernetes
* Es 100% compatible con yarn, npm y pnpm
* It was **forked** based on `sinopia@1.4.0` and 100% **backward compatible**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.
