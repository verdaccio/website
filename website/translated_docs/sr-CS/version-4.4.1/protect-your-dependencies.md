---
id: version-4.4.1-protect-your-dependencies
title: Protecting packages
original_id: protect-your-dependencies
---

`verdaccio` allows you protect publish, to achieve that you will need to set up correctly your [packages access](packages).

<div id="codefund">''</div>

### Konfigurisanje paketa

Pogledajmo navedena podešavanja kao primer. Potrebno je da podesite dependencies koje imaju prefiks u vidu `my-company-*` i treba da ih zaštitite od anonimnih ili drugih prijavljenih korisnika koji su bez odgovarajućih ovlašćenja (credentials).

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

With this configuration, basically we allow to groups **admin** and **teamA** to *publish* and **teamA**   **teamB** **teamC** *access* to such dependencies.

### Primer iz prakse: teamD pokušava da pristupi nekoj dependency

So, if I am logged as **teamD**. Ne bi trebalo da imam pristup svim dependencies koje se podudaraju sa `my-company-*` paternom.

```bash
➜ npm whoami
teamD
```
I won't have access to such dependencies and also won't be visible via web for user **teamD**. Ako pokušam da pristupim, desiće se sledeće.

```bash
➜ npm install my-company-core
npm ERR! code E403
npm ERR! 403 Forbidden: webpack-1@latest
```
ili sa `yarn`

```bash
➜ yarn add my-company-core
yarn add v0.24.6
info No lockfile found.
[1/4] 🔍  Resolving packages...
error An unexpected error occurred: "http://localhost:5555/webpack-1: unregistered users are not allowed to access package my-company-core".
```
