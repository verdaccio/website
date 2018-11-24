---
id: version-3.8.6-protect-your-dependencies
title: Protezione dei pacchetti
original_id: protect-your-dependencies
---
`verdaccio` permette di proteggere la pubblicazione. Per ottenere ciò è necessario configurare correttamente l'[accesso ai pacchetti](packages).

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

o con `yarn`

```bash
➜ yarn add my-company-core
yarn add v0.24.6
info No lockfile found.
[1/4] 🔍  Resolving packages...
errore Si è verificato un errore imprevisto: "http://localhost:5555/webpack-1: gli utenti non registrati non sono autorizzati ad accedere al pacchetto my-company-core".
```