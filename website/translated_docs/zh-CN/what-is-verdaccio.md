---
id: what-is-verdaccio（verdaccio是什么）
title: "Verdaccio是什么？"
---

Verdaccio 是一个 **Node.js**创建的**轻量的私有npm proxy registry** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## What's a registry?

* A registry is a repository for packages, that implements the **CommonJS Compliant Package Registry specification** for reading package's information.
* Provide a compatible API with npm clients **(yarn/npm/pnpm)**.
* Semantic Versioning compatible **(semver)**.

    $> verdaccio
    

![registry](assets/verdaccio_server.gif)

## 使用Verdaccio

Using Verdaccio with any Node.js package manager client is quite straightforward.

![registry](assets/npm_install.gif)

You can use a custom registry either by setting it globally for all your projects

    npm set registry http://localhost:4873
    

or by using it in command line as an argument `--registry` in npm (slightly different in yarn)

    npm install lodash --registry http://localhost:4873
    

    yarn config set registry http:///localhost:4873
    

## 私有

所有您发布的包是私有的并且访问权限仅取决于您的配置。

## Proxy

Verdaccio cache all dependencies on demand and speed up installations in local or private networks.

## Introduction to Verdaccio

This talk is about Verdaccio, an open-source, multi-purpose, lightweight proxy, and private registry. In it **Priscila Olivera** and **Juan Picado** explains details what a private registry is need it for your development. <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

* 它是基于Node.js的网页应用程序
* 它是私有npm registry
* 它是本地网络proxy
* 它是可插入式应用程序
* It's fairly easy to install and to use
* 我们提供Docker和Kubernetes支持
* 它与yarn, npm 和pnpm 100% 兼容
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.