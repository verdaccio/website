---
id: version-4.4.1-best
title: Migliori Pratiche
original_id: best
---

La guida seguente è un elenco delle migliore pratiche raccolte e che raccomandiamo solitamente a tutti gli utenti. Non considerare questa guida come obbligatoria, puoi selezionare qualcuna di esse a seconda delle tue esigenze.

<div id="codefund">''</div>

**Feel free to suggest your best practices with the Verdaccio community**.

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

### Utilizzo dei pacchetti pubblici da npmjs.org

Se qualche pacchetto non esiste nell'archivio, il server proverà a recuperarlo da npmjs.org. Se npmjs.org non funziona, fornirà solo i pacchetti presenti nella cache come se non ne esistessero altri. **Verdaccio will download only what's needed (= requested by clients)**, and this information will be cached, so if client will ask the same thing second time, it can be served without asking npmjs.org for it.

**Esempio:**

Se fai una richiesta `express@4.0.1` da questo server che va a buon fine una volta, sarà possibile farla un'altra volta (con tutte le sue dipendenze) in ogni momento, anche con npmjs.org non funzionante. Però diciamo che `express@4.0.0` non verrà scaricato fino a che non sia effettivamente necessario per qualcuno. E se npmjs.org è offline, questo server direbbe che solo `express@4.0.1` (= solo quello che è nella cache) viene pubblicato, ma nient'altro.

### Annullare pacchetti pubblici

If you want to use a modified version of some public package `foo`, you can just publish it to your local server, so when your type `npm install foo`, **it'll consider installing your version**.

Ci sono due opzioni qui:

1. You want to create a separate **fork** and stop synchronizing with public version.

   Se si vuole fare ciò, si dovrebbe modificare il file di configurazione affinché verdaccio non faccia più richieste a npmjs riguardo a questi pacchetti. Aggiungi una voce separata per questo pacchetto a `config.yaml`, rimuovi `npmjs` dalla lista `proxy` e riavvia il server.

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

   In order to avoid version conflicts, **you should use a custom pre-release suffix of the next patch version**. Per esempio, se un pacchetto pubblico ha la versione 0.1.2, puoi fare l'upload di `0.1.3-my-temp-fix`.

   ```bash
    npm version 0.1.3-my-temp-fix
    npm --publish --tag fix --registry http://localhost:4873
   ```

   In questo modo il tuo pacchetto verrà utilizzato fino a che il suo manutentore originale aggiorna il suo pacchetto pubblico alla `0.1.3`.




## Sicurezza

The security starts in your environment, for such thing we totally recommend read **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and follow the recommendation.

### Accesso ai Pacchetti

Di default tutti i pacchetti che pubblichi su Verdaccio sono accessibili a chiunque, ti raccomandiamo vivamente di proteggere il tuo registro da utenti esterni non autorizzati che aggiornano la proprietà `access` a `$authenticated`.

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

### Secured Connections

Using **HTTPS** is a common recomendation, for such reason we recommend read the [SSL](ssl.md) section to make Verdaccio secure or using a HTTPS [reverse proxy](reverse-proxy.md) on top of Verdaccio.

### Expiring Tokens

In `verdaccio@3.x` the tokens have no expiration date. For such reason we introduced in the next `verdaccio@4.x` the JWT feature [PR#896](https://github.com/verdaccio/verdaccio/pull/896)

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

**Using this configuration will override the current system and you will be able to control how long the token will live**.

Utilizzare JWT migliora inoltre la prestazione con i plugin di autenticazione, il vecchio sistema realizzerà una decompressione e convaliderà le credenziali in ciascuna richiesta, mentre JWT dipenderà dalla firma del token evitando l'overhead per il plugin.

As a side note, at **npmjs the token never expires**.
