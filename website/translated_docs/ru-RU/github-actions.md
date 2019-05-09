---
id: github-actions
title: "Github Actions"
---

С помощью [GitHub Actions](https://github.com/features/actions) вы можете автоматизировать свою работу, каждый экшн из GitHub Action выполняет определенный шаг.

![actions](/img/github-actions.png)

## Тестирование пакетов

Verdaccio предоставляет несколько кастомных экшнов для интеграции в ваш цикл, вам нужно только добавить следующие строчки в нужный шаг в `main.workflow`.

```gha
action "Publish Verdaccio" {
  uses = "verdaccio/github-actions/publish@master"
  args = ["publish"]
}
```

Этот экшн сделает `npm publish` и если публикация пройдет успешно, позволит переход в следующий шаг, в противном случае пометит шаг как неудачный. При возникновении проблем во время пбликации, экшн известит вас об этом.

Внутри использется docker-образ с плагинами `verdaccio-auth-memory` и `verdaccio-memory` (аутентификация и хранилище) для ускорения процесса.

Если хотите узнать больше про экшны, [посетите репозиторий](https://github.com/verdaccio/github-actions), выделенный под GitHub Actions.