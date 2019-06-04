---
id: github-actions
title: "Github Action"
---

Con [GitHub Action](https://github.com/features/actions) è possibile automatizzare il workflow, ciascuna GitHub Action esegue un passaggio specifico in un processo.

![actions](/img/github-actions.png)

## Testare i pacchetti

Verdaccio provides a custom action for easy integration in your flow, you only add the following to your `main.workflow` in the step you consider the better for your flow.

```gha
action "Publish Verdaccio" {
  uses = "verdaccio/github-actions/publish@master"
  args = ["publish"]
}
```

The action will perform a `npm publish` and if the publishing finishes successfully will allow to continue to the next step, otherwise will fails. Se è presente un qualsiasi problema pubblicando un pacchetto si noterà utilizzando questa azione.

All'interno dell'immagine utilizza i plugin `verdaccio-auth-memory` e `verdaccio-memory` per gestire l'autenticazione e l'archiviazione per velocizzare il processo.

Se si desidera sapere di più sull'azione, [visitare il nostro repository](https://github.com/verdaccio/github-actions) dedicato alle GitHub Action.