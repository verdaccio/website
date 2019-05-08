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

The action will perform a `npm publish` and if the publishing finish succesfully will allow to continue to the next step, otherwise will fails. If there is any issue publishing a package you will notice using this action.

Within the image uses `verdaccio-auth-memory` and `verdaccio-memory` plugins to handle authentification and storage to speed up the process.

If you want to know more about the action, [visit our repository](https://github.com/verdaccio/github-actions) dedicated for GitHub Actions.