---
id: version-4.0.0-alpha.6-protect-your-dependencies
title: Protezione dei pacchetti
original_id: protect-your-dependencies
---

`verdaccio` allows you protect publish, to achieve that you will need to set up correctly your [packages access](packages).

### Configurazione del pacchetto

Vediamo, per esempio, la seguente configurazione. Si dispone di una serie di dipendenze che hanno come prefisso `my-company-*` e si necessita di proteggerle da anonimi o da altri utenti loggati senza credenziali.

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

Con questa configurazione, si permette fondamentalmente di raggruppare **admin** e **teamA** per *pubblicare* e **teamA** **teamB** **teamC** *per accedere* a tali dipendenze.

### Caso d'uso: teamD prova ad accedere alla dipendenza

Quindi, ipotizziamo che io sia loggato come **teamD**. Non dovrei essere in grado di accedere a tutte le dipendenze che corrispondono col modello `my company-*`.

```bash
➜ npm whoami
teamD
```

Non avrò accesso a tali dipendenze e non saranno nemmeno visibili per l'utente **teamD** via web. Se tentassi di accedere, accadrebbe il seguente evento.

```bash
➜ npm install my-company-core
npm ERR! code E403
npm ERR! 403 Forbidden: webpack-1@latest
```

o con `yarn`

```bash
➜ yarn add my-company-core
yarn add v0.24.6
info No lockfile found.
[1/4] 🔍  Resolving packages...
errore Si è verificato un errore imprevisto: "http://localhost:5555/webpack-1: gli utenti non registrati non sono autorizzati ad accedere al pacchetto my-company-core".
```