---
id: osvědčené
title: "Osvědčené postupy"
---

Následující příručka obsahuje seznam nejlepších praktických postupů, které obvykle doporučujeme všem uživatelům. Neberte tuto příručku jako povinnou, vyberte si podle svých potřeb.

**Feel free to suggest your best practices to the Verdaccio community**.

## Soukromý registr

You can add users and manage which users can access which packages.

Doporučujeme, abyste definovali předponu pro vaše soukromé balíčky, například `local-*` nebo `@my-company/*`, takže všechny vaše soukromé balíčky budou vypadat takto: `local-foo`. This way you can clearly separate public packages from private ones.

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

Always remember, **the order of packages access is important**, packages are matched always top to bottom.

### Using public packages from npmjs.org

If a package doesn't exist in the storage, the server will try to fetch it from npmjs.org. If npmjs.org is down, it serves packages from the cache pretending that no other packages exist. **Verdaccio will download only what's needed (requested by clients)**, and this information will be cached, so if the client requests the same thing a second time it can be served without asking npmjs.org for it.

**Příklad:**

If you successfully request `express@4.0.1` from the server once, you'll be able to do it again (with all of it's dependencies) any time, even if npmjs.org is down. Though note that `express@4.0.0` will not be downloaded until it's actually needed by somebody. And if npmjs.org is offline, the server will say that only `express@4.0.1` (what's in the cache) is published, but nothing else.

### Override public packages

Chcete-li použít upravenou verzi nějakého veřejného balíčku `foo`, můžete jej publikovat pouze na místní server, takže když spustíte `npm install foo`, **bude stažena Vámi vytvořená verze**.

There's two options here:

1. Chcete vytvořit samostatý **fork** a zastavit synchronizaci s veřejnou verzí.
    
    If you want to do that, you should modify your configuration file so Verdaccio won't make requests regarding this package to npmjs anymore. Přidejte do `config.yaml` samostatnou položku pro tento balíček a odeberte `npmjs` ze seznamu `proxy` a restartujte server.
    
    ```yaml
    packages:
      '@my-company/*':
        access: $all
        publish: $authenticated
        # zakomentujte nebo ponechte prázdné
        # proxy:
    ```
    
    When you publish your package locally, **you should probably start with a version string higher than the existing package** so it won't conflict with that package in the cache.

2. You want to temporarily use your version, but return to the public one as soon as it's updated.
    
    Chcete-li se vyhnout konfliktům verzí, **měli byste použít vlastní příponu předběžného vydání další verze opravy**. Pokud má například veřejný balíček verzi 0.1.2, můžete nahrát `0.1.3-moje-docasna-oprava`.
    
    ```bash
    npm version 0.1.3-my-temp-fix
    npm publish --tag fix --registry http://localhost:4873
    ```
    
    Tímto způsobem bude váš balíček používán, dokud jeho původní správce nezmění svůj veřejný balíček na `0.1.3`.

## Bezpečnost

Security starts in your environment. For such things we recommend reading **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and following the steps outlined there.

### Přístup k balíčkům

By default all packages you publish in Verdaccio are accessible for all users. We recommend protecting your registry from external non-authorized users by updating the `access` property of your packages to `$authenticated`.

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

That way, **nobody can access your registry unless they are authorized, and private packages won't be displayed in the web interface**.

## Server

### Secured Connections

Using **HTTPS** is a common recommendation. For this reason we recommend reading the [SSL](ssl.md) section to make Verdaccio secure, or alternatively using an HTTPS [reverse proxy](reverse-proxy.md) on top of Verdaccio.

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

**Použití této konfigurace přepíše současný systém a budete moci řídit, jak dlouho bude token platný**.

Using JWT also improves the performance with authentication plugins. The old system will perform an unpackage and validate the credentials on every request, while JWT will rely on the token signature instead, avoiding the overhead for the plugin.

Mimo jiné, v **npmjs token nikdy nevyprší**.