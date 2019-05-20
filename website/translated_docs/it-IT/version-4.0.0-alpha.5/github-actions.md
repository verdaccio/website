---
id: version-4.0.0-alpha.5-github-actions
title: Github Action
original_id: github-actions
---

Con [GitHub Action](https://github.com/features/actions) è possibile automatizzare il workflow, ciascuna GitHub Action esegue un passaggio specifico in un processo.

![actions](/img/github-actions.png)

## Testare i pacchetti

Verdaccio fornisce un'azione personalizzata per una semplice integrazione nel flusso; aggiungere esclusivamente quanto segue al `main.workflow` nel passaggio che si considera migliore per il flusso.

```gha
action "Publish Verdaccio" {
  uses = "verdaccio/github-actions/publish@master"
  args = ["publish"]
}
```

Questa azione eseguirà un `npm publish` e se la pubblicazione termina con successo permetterà di continuare fino al passaggio successivo, altrimenti fallirà. Se è presente un qualsiasi problema pubblicando un pacchetto si noterà utilizzando questa azione.

All'interno dell'immagine utilizza i plugin `verdaccio-auth-memory` e `verdaccio-memory` per gestire l'autenticazione e l'archiviazione per velocizzare il processo.

Se si desidera sapere di più sull'azione, [visitare il nostro repository](https://github.com/verdaccio/github-actions) dedicato alle GitHub Action.