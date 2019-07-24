---
id: version-4.0.2-github-actions
title: Github Actions
original_id: github-actions
---

Com [GitHub Actions](https://github.com/features/actions) você pode automatizar seu fluxo de trabalho, cada GitHub Action executa uma etapa específica em um processo.

![actions](/img/github-actions.png)

## Testando os seus pacotes

O Verdaccio fornece uma ação personalizada para facilitar a integração em seu fluxo. Basta adicionar o seguinte ao seu `main.workflow` na etapa que você considere melhor para o seu fluxo.

```gha
action "Publish Verdaccio" {
  uses = "verdaccio/github-actions/publish@master"
  args = ["publish"]
}
```

Esta ação irá executar um `npm publish` e se a publicação terminar com sucesso, continuará até o próximo passo, senão irá falhar. Se houver qualquer problema ao publicar um pacote você notará usando essa ação.

Dentro da imagem usa-se os plugins `verdaccio-auth-memory` e `verdaccio-memory` para gerenciar autenticação e armazenamento para acelerar o processo.

Se você quiser saber mais sobre a ação, [visite nosso repositório ](https://github.com/verdaccio/github-actions) dedicado ao GitHub Actions.