---
id: best
title: "Migliori Pratiche"
---

La guida seguente è un elenco delle migliore pratiche raccolte e che raccomandiamo solitamente a tutti gli utenti. Non considerare questa guida come obbligatoria, puoi selezionare qualcuna di esse a seconda delle tue esigenze.

**Suggerisci le tue migliori pratiche alla community di Verdaccio**.

## Registro Privato

È possibile aggiungere utenti e gestire quali utenti possono accedere a quali pacchetti.

È raccomandabile definire un prefisso per i tuoi pacchetti privati, per esempio `local-*` o `@my-company/*` con scope, così che tutti i tuoi elementi privati appariranno così: `local-foo`. In questo modo si possono separare chiaramente i pacchetti pubblici da quelli privati.

    yaml
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

Ricorda sempre, **l'ordine dell'accesso ai pacchetti è importante**, i pacchetti sono sempre considerati dall'alto verso il basso.

### Utilizzo dei pacchetti pubblici da npmjs.org

Se qualche pacchetto non esiste nell'archivio, il server proverà a recuperarlo da npmjs.org. Se npmjs.org non funziona, fornirà solo i pacchetti presenti nella cache come se non ne esistessero altri. **Verdaccio scaricherà solo ciò che è necessario (= richiesto dai client)** e questa informazione verrà memorizzata nella cache, così se il client chiederà la stessa cosa una seconda volta, potrà essere soddisfatto senza doverla chiedere a npmjs.org.

**Esempio:**

Se fai una richiesta `express@4.0.1` da questo server che va a buon fine una volta, sarà possibile farla un'altra volta (con tutte le sue dipendenze) in ogni momento, anche con npmjs.org non funzionante. Però diciamo che `express@4.0.0` non verrà scaricato fino a che non sia effettivamente necessario per qualcuno. E se npmjs.org è offline, questo server direbbe che solo `express@4.0.1` (= solo quello che è nella cache) viene pubblicato, ma nient'altro.

### Annullare pacchetti pubblici

Se desideri utilizzare una versione modificata di qualche pacchetto pubblico `foo`, puoi pubblicarla direttamente sul tuo server locale, così quando scrivi `npm install foo`, ** considererà di installare la tua versione**.

Ci sono due opzioni qui:

1. Desideri creare un **fork** separato e interrompere la sincronizzazione con la versione pubblica.
    
    Se si vuole fare ciò, si dovrebbe modificare il file di configurazione affinché verdaccio non faccia più richieste a npmjs riguardo a questi pacchetti. Aggiungi una voce separata per questo pacchetto a `config.yaml`, rimuovi `npmjs` dalla lista `proxy` e riavvia il server.
    
    ```yaml
    packages:
      '@my-company/*':
        access: $all
        publish: $authenticated
        # commentalo o lascialo vuoto
        # proxy:
    ```
    
    Quando pubblichi il tuo pacchetto in locale, **dovresti probabilmente iniziare con la stringa di versione superiore a quella esistente**, così che non vada in conflitto con il pacchetto esistente nella cache.

2. Si vuole temporaneamente utilizzare la propria versione, ma tornare alla pubblica appena questa sia aggiorna,.
    
    In order to avoid version conflicts, **you should use a custom pre-release suffix of the next patch version**. For example, if a public package has version 0.1.2, you can upload `0.1.3-my-temp-fix`.
    
    ```bash
    npm version 0.1.3-my-temp-fix
    npm --publish --tag fix --registry http://localhost:4873
    ```
    
    This way your package will be used until its original maintainer updates his public package to `0.1.3`.

## Sicurezza

The security starts in your environment, for such thing we totally recommend read **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and follow the recomendations.

### Accesso al pacchetto

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

Using JWT also improves the performance with authentication plugins, the old system will perform an unpackage and validating the credentials in each request, while JWT will rely on the token signature avoiding the overhead for the plugin.

As a side note, at **npmjs the token never expires**.