---
id: what-is-verdaccio
title: "Что такое Verdaccio?"
---

Verdaccio - это **легкий приватный проксирующий npm-репозиторий**, сделанный на **Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

## What's a registry?

* A registry is a repository for packages, that implements the **CommonJS Compliant Package Registry specification** for reading package's information.
* Provide a compatible API with npm clients **(yarn/npm/pnpm)**.
* Semantic Versioning compatible **(semver)**.

    $> verdaccio
    

![реестр](assets/verdaccio_server.gif)

## Использование Verdaccio

Using Verdaccio with any Node.js package manager client is quite straightforward.

![реестр](assets/npm_install.gif)

You can use a custom registry either by setting it globally for all your projects

    npm set registry http://localhost:4873
    

or by using it in command line as an argument `--registry` in npm (slightly different in yarn)

    npm install lodash --registry http://localhost:4873
    

    yarn config set registry http:///localhost:4873
    

## Приватный

Все пакеты, которые вы опубликуете - приватные, и доступ к ним осуществляется в соотвествии с правами, опредёленными в конфигурации.

## Прокси

Verdaccio cache all dependencies on demand and speed up installations in local or private networks.

## Verdaccio в двух словах

### Cover your projects with a multi purpose lightweight Node.js registry

This talk is about Verdaccio, an open-source, multi-purpose, lightweight proxy, and private registry. In it Juan Picado explains the benefits and good practices when running a private registry that will make your projects look awesome. Verdaccio could also be used for hosting a registry, emulate real testing environments or improve your developer workflow. <iframe width="560" height="315" src="https://www.youtube.com/embed/oVCjDWeehAQ?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe> 

* Веб-приложение на Node
* Приватный npm-реестр
* Прокси для локальной сети
* Возможно подключение плагинов
* It's fairly easy to install and to use
* Поддержка Docker и Kubernetes
* 100% совместим с yarn, npm и pnpm
* **Форк** проекта `sinopia@1.4.0`, на 100% **обратно совместим**.
* Verdaccio означает **цвет зеленой краски для фресковой живописи, популярный в Средние Века**.