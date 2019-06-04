---
id: github-actions
title: "Github Actions"
---

С помощью [GitHub Actions](https://github.com/features/actions) вы можете автоматизировать свою работу, каждый экшн из GitHub Action выполняет определенный шаг.

![actions](/img/github-actions.png)

## Тестирование пакетов

Verdaccio provides a custom action for easy integration in your flow, you only add the following to your `main.workflow` in the step you consider the better for your flow.

```gha
action "Publish Verdaccio" {
  uses = "verdaccio/github-actions/publish@master"
  args = ["publish"]
}
```

The action will perform a `npm publish` and if the publishing finishes successfully will allow to continue to the next step, otherwise will fails. При возникновении проблем во время пбликации, экшн известит вас об этом.

Внутри использется docker-образ с плагинами `verdaccio-auth-memory` и `verdaccio-memory` (аутентификация и хранилище) для ускорения процесса.

Если хотите узнать больше про экшны, [посетите репозиторий](https://github.com/verdaccio/github-actions), выделенный под GitHub Actions.