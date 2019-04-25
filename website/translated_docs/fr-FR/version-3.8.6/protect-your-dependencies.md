---
id: version-3.8.6-protect-your-dependencies
title: Protection des paquets
original_id: protect-your-dependencies
---

`verdaccio` vous permet de protéger la publication. Pour ce faire, il est nécessaire de configurer correctement le [package acces](packages).

### Configuration du paquet

Voyons, par exemple, la configuration suivante. Vous avez une série de dépendances préfixées par `my-company - *` et vous devez les protéger contre les utilisateurs anonymes ou contre les autres utilisateurs connectés sans informations d'identification correctes.

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

Avec cette configuration, en principe, nous permettons aux groupes **admin** et **teamA** de *publier*, et **teamA** **teamB** **teamC** d'*accéder* à de telles dépendences.

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