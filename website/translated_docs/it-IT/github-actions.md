---
id: github-actions
title: "Github Action"
---

Con [GitHub Action](https://github.com/features/actions) è possibile automatizzare il workflow, ciascun GitHub Action compie uno specifico step in un processo.

![actions](/img/github-actions.png)

## Testare i pacchetti

Verdaccio provides a custom acttion for easy integration in your flow, you only add the following to your `main.workflow` in the step you consider the better for your flow.

```gha
action "Publish Verdaccio" {
  uses = "verdaccio/github-actions/publish@master"
  args = ["publish"]
}
```

The action will perform a `npm publish` and if the publishing finish succesfully will allow to continue to the next step, otherwise will fails. If there is any issue publishing a package you will notice using this action.

Within the image uses `verdaccio-auth-memory` and `verdaccio-memory` plugins to handle authentification and storage to speed up the process.

If you want to know more about the action, [visit our repository](https://github.com/verdaccio/github-actions) dedicated for GitHub Actions.