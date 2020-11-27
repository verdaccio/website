---
id: didara julọ
title: "Awọn iṣeṣi to Darajulọ"
---

Itọsọna yii jẹ akojọ ti awọn iṣeṣi to dara julọ ti o jẹ gbigba ati eyi ti a saba maa n gba niyanju fun gbogbo awọn olumulo. Maṣe mu itọsọna yi bi dandan, o le mu diẹ ninu wọn ni ibamu si awọn inilo rẹ.

**Feel free to suggest your best practices to the Verdaccio community**.

## Ibi iforukọsilẹ Ikọkọ

O se afikun awọn olumulo ati ki o ṣakoso irufẹ awọn olumulo ti o le wọle si irufẹ awọn akopọ.

Igbaniyanju wa wipe ki o seto iṣaaju kan fun awọn akojọ ikọkọ rẹ, fun apẹẹrẹ `local-*` or scoped `@my-company/*`, nitoriki gbogbo awọn ohun ikọkọ rẹ le dabi iru eyi: `local-foo`. Ni ọna yii o le ya awọn akopọ gbogbogbo sọtọ gedegede kuro ni ti awọn ti ikọkọ.

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

### Lilo awọn akopọ gbogbogbo lati npmjs.org

If a package doesn't exist in the storage, the server will try to fetch it from npmjs.org. If npmjs.org is down, it serves packages from the cache pretending that no other packages exist. **Verdaccio will download only what's needed (requested by clients)**, and this information will be cached, so if the client requests the same thing a second time it can be served without asking npmjs.org for it.

**Apẹẹrẹ:**

If you successfully request `express@4.0.1` from the server once, you'll be able to do it again (with all of it's dependencies) any time, even if npmjs.org is down. Though note that `express@4.0.0` will not be downloaded until it's actually needed by somebody. And if npmjs.org is offline, the server will say that only `express@4.0.1` (what's in the cache) is published, but nothing else.

### Fagbara bori awọn akopọ gbogbogbo

Ti o ba fẹ lo diẹ ninu awọn akopọ ti gbangba ti ẹya to ti ni ayipada `foo`, o le ṣe atẹjade rẹ si olupese ibilẹ rẹ, nitorina nigbati iru `npm install foo` rẹ, **o ma gbero fifi ti iwọ sori ẹrọ**.

Awọn aṣayan meji lo wa nibi:

1. O fẹ ṣẹda **fork** to daduro ati ki o da imuṣiṣẹpọ pẹlu gbogbogbo duro.
    
    If you want to do that, you should modify your configuration file so Verdaccio won't make requests regarding this package to npmjs anymore. Se afikun iwọle to daduro fun akopọ yi si `config.yaml` ki o si yọ `npmjs` kuro ninu akojọ `proxy` ki o wa tun olupese bẹrẹ.
    
    ```yaml
    awọn akopọ:
      '@my-company/*':
        access: $all
        publish: $authenticated
        # comment it out or leave it empty
        # proxy:
    ```
    
    When you publish your package locally, **you should probably start with a version string higher than the existing package** so it won't conflict with that package in the cache.

2. You want to temporarily use your version, but return to the public one as soon as it's updated.
    
    Lati le yago fun awọn atako ti ẹya, **o yẹ ki o lo afikun ipari ti iṣaaju agbejade to jẹ akanṣe ti awẹ ẹya tokan**. Fun apẹẹrẹ, ti akopọ gbogbogbo ba jẹ ẹya 0.1.2, o le sagbega si `0.1.3-my-temp-fix`.
    
    ```bash
    npm version 0.1.3-my-temp-fix
    npm publish --tag fix --registry http://localhost:4873
    ```
    
    Ni ọna yii akopọ rẹ ma jẹ lilo titi ti oulowo olutọju rẹ yoo fi ṣe imudojuiwọn akopọ gbogbogbo ti ara rẹ si `0.1.3`.

## Aabo

Security starts in your environment. For such things we recommend reading **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and following the steps outlined there.

### Iwọlesi Akopọ

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

**Lilo iṣeto yii yoo ṣe atẹmọlẹ eto ti lọwọlọwọ yii atipe iwọ yoo le ṣakoso iye igba ti aami naa yoo fi wa laye**.

Using JWT also improves the performance with authentication plugins. The old system will perform an unpackage and validate the credentials on every request, while JWT will rely on the token signature instead, avoiding the overhead for the plugin.

Gẹgẹbi akọsilẹ ẹgbẹ kan, ni **npmjs aami naa ko kin jotan**.