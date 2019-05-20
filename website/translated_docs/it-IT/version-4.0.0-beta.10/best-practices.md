---
id: version-4.0.0-beta.10-best
title: Migliori Pratiche
original_id: best
---

La guida seguente è un elenco delle migliore pratiche raccolte e che raccomandiamo solitamente a tutti gli utenti. Non considerare questa guida come obbligatoria, puoi selezionare qualcuna di esse a seconda delle tue esigenze.

**Suggerisci le tue migliori pratiche alla community di Verdaccio**.

## Registro Privato

È possibile aggiungere utenti e gestire quali utenti possono accedere a quali pacchetti.

È raccomandabile definire un prefisso per i tuoi pacchetti privati, per esempio `local-*` o `@my-company/*` con scope, così che tutti i tuoi elementi privati appariranno così: `local-foo`. In questo modo si possono separare chiaramente i pacchetti pubblici da quelli privati.

```yaml
  packages:
    '@my-company/*':
      access: $all
      publish: $authenticated
     'local-*':
      access: $all
      publish: $authenticated
    '@*/*':
      access: $all
      publish: $authenticated
    '**':
      access: $all
      publish: $authenticated
   ```

Always remember, **the order of packages access is important**, packages are mached always top to bottom.

### Using public packages from npmjs.org

If some package doesn't exist in the storage, server will try to fetch it from npmjs.org. Se npmjs.org non funziona, fornirà solo i pacchetti presenti nella cache come se non ne esistessero altri. **Verdaccio will download only what's needed (= requested by clients)**, and this information will be cached, so if client will ask the same thing second time, it can be served without asking npmjs.org for it.

**Example:**

If you successfully request `express@4.0.1` from this server once, you'll able to do that again (with all it's dependencies) anytime even if npmjs.org is down. But say `express@4.0.0` will not be downloaded until it's actually needed by somebody. And if npmjs.org is offline, this server would say that only `express@4.0.1` (= only what's in the cache) is published, but nothing else.

### Override public packages

If you want to use a modified version of some public package `foo`, you can just publish it to your local server, so when your type `npm install foo`, **it'll consider installing your version**.

There's two options here:

1. You want to create a separate **fork** and stop synchronizing with public version.

   Se si vuole fare ciò, si dovrebbe modificare il file di configurazione affinché verdaccio non faccia più richieste a npmjs riguardo a questi pacchetti. Add a separate entry for this package to `config.yaml` and remove `npmjs` from `proxy` list and restart the server.

   ```yaml
    packages:
      '@my-company/*':
        access: $all
        publish: $authenticated
        # comment it out or leave it empty
        # proxy:
   ```

   When you publish your package locally, **you should probably start with version string higher than existing one**, so it won't conflict with existing package in the cache.

2. Si vuole temporaneamente utilizzare la propria versione, ma tornare alla pubblica appena questa sia aggiorna,.

   In order to avoid version conflicts, **you should use a custom pre-release suffix of the next patch version**. For example, if a public package has version 0.1.2, you can upload `0.1.3-my-temp-fix`.

   ```bash
    npm version 0.1.3-my-temp-fix
    npm --publish --tag fix --registry http://localhost:4873
   ```

   This way your package will be used until its original maintainer updates his public package to `0.1.3`.




## Security

The security starts in your environment, for such thing we totally recommend read **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and follow the recommendation.

### Package Access

By default all packages are you publish in Verdaccio are accessible for all public, we totally recommend protect your registry from external non authorized users updating `access` property to `$authenticated`.

```yaml
  packages:
    '@my-company/*':
      access: $authenticated
      publish: $authenticated
    '@*/*':
      access: $authenticated
      publish: $authenticated
    '**':
      access: $authenticated
      publish: $authenticated
   ```

In that way, **nobody will take advance of your registry unless is authorized and private packages won't be displayed in the User Interface**.

## Server

### Connessioni Assicurate

L'utilizzo di **HTTPS** è una raccomandazione comune, per questa ragione raccomandiamo di leggere la sezione [SSL](ssl.md) per rendere Verdaccio sicuro o di utilizzare un HTTPS [reverse proxy](reverse-proxy.md) oltre a Verdaccio.

### Token in Scadenza

In `verdaccio@3.x` i token non hanno data di scadenza. Per questo motivo, nel prossimo `verdaccio@4.x`, abbiamo introdotto la funzionalità JWT [PR#896] (https://github.com/verdaccio/verdaccio/pull/896)

```yaml
security:
  api:
    jwt:
      sign:
        expiresIn: 15d
        notBefore: 0
  web:
    sign:
      expiresIn: 7d
```

**L'utilizzo di questa configurazione sovrascriverà il sistema corrente e sarai in grado di controllare per quanto tempo il token sarà valido**.

Utilizzare JWT migliora inoltre la prestazione con i plugin di autenticazione, il vecchio sistema realizzerà una decompressione e convaliderà le credenziali in ciascuna richiesta, mentre JWT dipenderà dalla firma del token evitando l'overhead per il plugin.

Come nota a margine, in **npmjs il token non scade mai**.