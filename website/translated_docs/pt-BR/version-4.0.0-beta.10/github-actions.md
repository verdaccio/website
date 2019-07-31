---
id: version-4.0.0-beta.10-github-actions
title: Github Actions
original_id: github-actions
---

Com [GitHub Actions](https://github.com/features/actions) você pode automatizar seu fluxo de trabalho, cada GitHub Action executa uma etapa específica em um processo.

![actions](/img/github-actions.png)

## Testando os seus pacotes

Verdaccio provides a custom acttion for easy integration in your flow, you only add the following to your `main.workflow` in the step you consider the better for your flow.

```gha
action "Publish Verdaccio" {
  uses = "verdaccio/github-actions/publish@master"
  args = ["publish"]
}
```

The action will perform a `npm publish` and if the publishing finishes succesfully will allow to continue to the next step, otherwise will fails. Se houver qualquer problema ao publicar um pacote você notará usando essa ação.

Dentro da imagem usa-se os plugins `verdaccio-auth-memory` e `verdaccio-memory` para gerenciar autenticação e armazenamento para acelerar o processo.

Se você quiser saber mais sobre a ação, [visite nosso repositório ](https://github.com/verdaccio/github-actions) dedicado ao GitHub Actions.