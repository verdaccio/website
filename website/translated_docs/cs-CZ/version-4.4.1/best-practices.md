---
id: version-4.4.1-best
title: Osvědčené postupy
original_id: osvědčené
---

Následující příručka obsahuje seznam nejlepších praktických postupů, které obvykle doporučujeme všem uživatelům. Neberte tuto příručku jako povinnou, vyberte si podle svých potřeb.

<div id="codefund">''</div>

**Feel free to suggest your best practices with the Verdaccio community**.

## Soukromý registr

You can add users and manage which users can access which packages.

Doporučujeme, abyste definovali předponu pro vaše soukromé balíčky, například `local-*` nebo `@my-company/*`, takže všechny vaše soukromé balíčky budou vypadat takto: `local-foo`. This way you can clearly separate public packages from private ones.

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

If some package doesn't exist in the storage, server will try to fetch it from npmjs.org. If npmjs.org is down, it serves packages from cache pretending that no other packages exist. **Verdaccio will download only what's needed (= requested by clients)**, and this information will be cached, so if client will ask the same thing second time, it can be served without asking npmjs.org for it.

**Příklad:**

Pokud jste jednou úspěšně požádali o `express@4.0.1` z tohoto serveru, můžete to provést znovu (se všemi závislostmi) kdykoliv, i když je npmjs.org vypnutý. Ale např. `express@4.0. ` nebude staženo, dokud ho někdo nepotřebuje. A pokud je npmjs.org offline, tento server by oznámil, že je publikován pouze `express@4.0.1` (= pouze to, co je v mezipaměti), ale nic jiného.

### Override public packages

If you want to use a modified version of some public package `foo`, you can just publish it to your local server, so when your type `npm install foo`, **it'll consider installing your version**.

There's two options here:

1. You want to create a separate **fork** and stop synchronizing with public version.

   If you want to do that, you should modify your configuration file so verdaccio won't make requests regarding this package to npmjs anymore. Přidejte do `config.yaml` samostatnou položku pro tento balíček a odeberte `npmjs` ze seznamu `proxy` a restartujte server.

   ```yaml
    packages:
      '@my-company/*':
        access: $all
        publish: $authenticated
        # comment it out or leave it empty
        # proxy:
   ```

   When you publish your package locally, **you should probably start with version string higher than existing one**, so it won't conflict with existing package in the cache.

2. You want to temporarily use your version, but return to public one as soon as it's updated.

   In order to avoid version conflicts, **you should use a custom pre-release suffix of the next patch version**. Pokud má například veřejný balíček verzi 0.1.2, můžete nahrát `0.1.3-moje-docasna-oprava`.

   ```bash
    npm version 0.1.3-my-temp-fix
    npm --publish --tag fix --registry http://localhost:4873
   ```

   Tímto způsobem bude váš balíček používán, dokud jeho původní správce nezmění svůj veřejný balíček na `0.1.3`.




## Bezpečnost

The security starts in your environment, for such thing we totally recommend read **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and follow the recommendation.

### Přístup k balíčkům

Ve výchozím nastavení jsou všechny balíčky, které publikujete ve Verdaccio, přístupné všem uživatelům. Doporučujeme chránit registr před externími neoprávněnými uživateli aktualizací vlastnost `access` na `$authenticated`.

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

Použití JWT také zlepšuje výkon s autentizačními pluginy, starý systém bude provádět rozbalování a ověřování pověření v každém požadavku, zatímco JWT bude spoléhat na podpis tokenu, který se vyhne režii pro plugin.

As a side note, at **npmjs the token never expires**.
