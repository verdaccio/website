---
id: what-is-verdaccio
title: "Что такое Verdaccio?"
---

Verdaccio - это **"легкий" приватный прокси для npm реестра**, построенный на основе**Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

<div id="codefund">''</div>

## Что значит реестр

* Репозиторий для пакетов, который реализует **CommonJS Compliant Package Registry specification** для чтения информации о пакетах
* Предоставляет API, совместимое с клиентскими приложениями npm **(yarn/npm/pnpm)**
* Поддерживает семантическое версионирование **(semver)**

    $> verdaccio
    

![реестр](assets/verdaccio_server.gif)

## Использование Verdaccio

Использовать verdaccio вместо с любым пакетным менеджером - очень просто.

![реестр](assets/npm_install.gif)

Вы можете сохранить ссылку на свой собственный репозиторий пакетов, установив глобальную настройку для всех проектов

    npm set registry http://localhost:4873
    

или передав аргумент командной строки `--registry` в npm (и немного по-другому в yarn)

    npm install lodash --registry http://localhost:4873
    

## Приватный

Все пакеты, которые вы опубликуете - приватные, и доступ к ним осуществляется в соотвествии с правами, опредёленными в конфигурации.

## Прокси

Verdaccio кэширует все запрошенные зависимости и ускоряет установку пакетов в локальной или приватной сети.

## Verdaccio в двух словах

* Веб-приложение на Node
* Приватный npm-реестр
* Прокси для локальной сети
* Возможно подключение плагинов
* Легко установить и использовать
* Поддержка Docker и Kubernetes
* 100% совместим с yarn, npm и pnpm
* **Форк** проекта `sinopia@1.4.0`, на 100% **обратно совместим**.
* Verdaccio означает **цвет зеленой краски для фресковой живописи, популярный в Средние Века**.