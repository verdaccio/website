---
id: version-3.8.6-what-is-verdaccio
title: Шта је Verdaccio?
original_id: шта-је-verdaccio
---

Verdaccio је **lightweight private npm proxy registry** уграђен у **Node.js**

## Шта је registry

* Репозиторијум за пакете који имплементира **CommonJS Compliant Package Registry specification** за читање информација о пакету
* Обезбеђује API компатибилност са npm клијентима, **(yarn/npm/pnpm)**
* Прати семантику Versioning compatible **(semver)**

    $> verdaccio
    

![registry](/svg/verdaccio_server.gif)

## Коришћење Verdaccio-а

Коришћење verdaccio-а са било којим node package manager client је врло јасно одређено.

![registry](/svg/npm_install.gif)

Можете користити прилагођени registry за све своје пројекте било ако га подесите на глобално

    npm set registry http://localhost:4873
    

или преко command line као аргумент `--registry` у npm (мало се разликује у односу на yarn)

    npm install lodash --registry http://localhost:4873
    

## Private

Сви пакети које публикујете су подешени као приватни и доступни су само ако су тако конфигурисани.

## Proxy

Verdaccio кешира све dependencies на захтев и тако убрзава инсталирање на локалне или приватне мреже.

## Verdaccio у кратким цртама

* То је web app базирана на Node.js
* То је приватни npm registry
* То је локални network proxy
* То је апликација која подржава плугине
* Прилично једноставан за инсталирање и коришћење
* Нудимо Docker и Kubernetes подршку
* 100% Компатибилан са yarn, npm и pnpm
* Након што је **форкован** на бази `sinopia@1.4.0` остварује 100% **компатибилност уназад**.
* Име Verdaccio означава** зелену боју која се користила за италијанско фрескосликарство касног средњег века**.