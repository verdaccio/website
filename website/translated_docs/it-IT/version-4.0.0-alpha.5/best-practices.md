---
id: version-4.0.0-alpha.5-best
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

Ricorda sempre, **l'ordine di accesso ai pacchetti è importante**, i pacchetti vengono combinati sempre dall'alto verso il basso.

### Utilizzo di pacchetti pubblici da npmjs.org

Se qualche pacchetto non esiste nell'archivio, il server proverà a recuperarlo da npmjs.org. Se npmjs.org non funziona, fornirà solo i pacchetti presenti nella cache come se non ne esistessero altri. **Verdaccio scaricherà solo ciò che è necessario (= richiesto dai client)** e questa informazione verrà memorizzata nella cache, così che se il client chiederà la stessa cosa una seconda volta, potrà essere soddisfatto senza dover chiedere a npmjs.org.

**Esempio:**

Se si fa una richiesta `express@4.0.1` che va a buon fine da questo server una volta, sarà possibile farla un'altra volta (con tutte le sue dipendenze) in ogni momento, anche con npmjs.org non funzionante. Però diciamo che `express@4.0.0` non verrà scaricato fino a che non sia effettivamente necessario per qualcuno. E se npmjs.org è offline, questo server direbbe che solo `express@4.0.1` (= solo quello che è nella cache) viene pubblicato, ma nient'altro.

### Override su pacchetti pubblici 

Se si desidera utilizzare una versione modificata di qualche pacchetto pubblico `foo`, si può pubblicarla solamente sul server locale, così scrivendo `npm install foo`, **valuterà di installare questa versione**.

Ci sono due opzioni qui:

1. Si desidera creare un **fork** separato e interrompere la sincronizzazione con la versione pubblica.

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

The security starts in your environment, for such thing we totally recommend read **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and follow the recomendations.

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