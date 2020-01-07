---
id: version-4.4.1-protect-your-dependencies
title: Protection des paquets
original_id: protect-your-dependencies
---

`verdaccio` allows you protect publish, to achieve that you will need to set up correctly your [packages access](packages).

<div id="codefund">''</div>

### Configuration du paquet

Voyons, par exemple, la configuration suivante. Vous avez une série de dépendances préfixées par `my-company - *` et vous devez les protéger contre les utilisateurs anonymes ou contre les autres utilisateurs connectés sans informations d'identification correctes.

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

With this configuration, basically we allow to groups **admin** and **teamA** to *publish* and **teamA**   **teamB** **teamC** *access* to such dependencies.

### Cas d'utilisation: teamD tente d'accéder à la dépendance

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
ou avec `yarn`

```bash
➜ yarn add my-company-core
yarn add v0.24.6
info No lockfile found.
[1/4] 🔍  Resolving packages...
error Une erreur inattendue s'est produite: "http: // localhost: 5555 / webpack-1: les utilisateurs non enregistrés ne sont pas autorisés à accéder au paquet my-company-core".
```
