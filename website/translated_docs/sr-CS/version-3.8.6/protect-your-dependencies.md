---
id: version-3.8.6-protect-your-dependencies
title: Protecting packages
original_id: protect-your-dependencies
---

`verdaccio` Vam omogućava da publikujete. Kako biste u tome uspeli, neophodno je da ispravno podesite svoj [packages acces](packages).

### Konfigurisanje paketa

Pogledajmo navedena podešavanja kao primer. Potrebno je da podesite dependencies koje imaju prefiks u vidu `my-company-*` i treba da ih zaštitite od anonimnih ili drugih prijavljenih korisnika koji su bez odgovarajućih ovlašćenja (credentials).

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

Sa navedenom konfiguracijom dozvoljavamo grupama **admin** i **teamA** da *publikuju* a grupama **teamA** **teamB** i **teamC** *pristup* do tih dependencies.

### Primer iz prakse: teamD pokušava da pristupi nekoj dependency

Znači, ako sam prijavljen kao **teamD**. Ne bi trebalo da imam pristup svim dependencies koje se podudaraju sa `my-company-*` paternom.

```bash
➜ npm whoami
teamD
```

Neću imati pristup do takvih dependencies i neću biti vidljiv preko weba za korisnika iz **teamD**. Ako pokušam da pristupim, desiće se sledeće.

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