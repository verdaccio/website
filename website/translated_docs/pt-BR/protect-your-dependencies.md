---
id: protect-your-dependencies
title: "Protegendo seus pacotes"
---

O `verdaccio` permite que você proteja a publicação, para assegurar isso você precisará configurar corretamente o seu [acesso a pacotes](packages).

<div id="codefund">''</div>

### Configuração de pacote

Vamos ver por exemplo a seguinte configuração. Você tem um conjunto de dependências que são prefixadas com `my-company-*` e você precisa protegê-las de um usuário anônimo ou outro usuário logado sem credenciais corretas.

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

Com esta configuração, basicamente permitimos aos grupos **admin** e **teamA** a *publicar* (publish) e aos grupos **teamA** **teamB** **teamC** a *acessar* (access) tais dependências.

### Exemplo de caso: teamD tenta acessar a dependência

Desta forma, se eu estiver logado como **teamD**, eu não deveria poder acessar todas as dependências que combinam com o padrão `my-company-*`.

```bash
➜ npm whoami
teamD
```

Eu não terei acesso a tais dependências e elas também não serão visíveis via web para o usuário **teamD**. Se eu tentar acessar o seguinte vai acontecer.

```bash
➜ npm install my-company-core
npm ERR! code E403
npm ERR! 403 Forbidden: webpack-1@latest
```

ou com `yarn`

```bash
➜ yarn add my-company-core
yarn add v0.24.6
info No lockfile found.
[1/4] 
error An unexpected error occurred: "http://localhost:5555/webpack-1: usuários não registrados não têm permissão para acessar o pacote my-company-core".
```