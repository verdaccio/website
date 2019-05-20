---
id: version-4.0.0-beta.10-github-actions
title: Github Actions
original_id: github-actions
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

The action will perform a `npm publish` and if the publishing finishes succesfully will allow to continue to the next step, otherwise will fails. При возникновении проблем во время пбликации, экшн известит вас об этом.

Внутри использется docker-образ с плагинами `verdaccio-auth-memory` и `verdaccio-memory` (аутентификация и хранилище) для ускорения процесса.

Если хотите узнать больше про экшны, [посетите репозиторий](https://github.com/verdaccio/github-actions), выделенный под GitHub Actions.