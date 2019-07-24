---
id: version-3.8.6-protect-your-dependencies
title: Protegendo seus pacotes
original_id: protect-your-dependencies
---

`verdaccio` allows you protect publish, to achieve that you will need to set up correctly your [packages acces](packages).

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

So, if I am logged as **teamD**. I shouldn't be able to access all dependencies that match with `my-company-*` pattern.

```bash
➜ npm whoami
teamD
```

I won't have access to such dependencies and also won't be visible via web for user **teamD**. If I try to access the following will happen.

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
[1/4] 🔍  Resolving packages...
error An unexpected error occurred: "http://localhost:5555/webpack-1: usuários não registrados não têm permissão para acessar o pacote my-company-core".
```