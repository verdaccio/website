---
id: mellor
title: "Mellores prácticas"
---

A seguinte guía é unha lista das mellores prácticas recollidas e que normalmente recomendamos a todos os usuarios. Non tome esta guía como obrigatorio, pode escoller algúns deles segundo as súas necesidades.

**Non dubide en suxerir as súas mellores prácticas á comunidade Verdaccio**.

## Rexistro Privado

Podes engadir usuarios e xestionar que usuarios poden acceder a que paquetes.

Recoméndase que defina un prefixo para os seus paquetes privados, por exemplo `local- *` ou con alcance `@ my-company/*`, polo que todas as súas cousas privadas terán este aspecto: `local-foo`. Deste xeito pode separar claramente os paquetes públicos dos privados.

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

Lembre sempre, **a orde de acceso aos paquetes é importante**, os paquetes coinciden sempre de arriba a abaixo.

### Usando paquetes públicos de npmjs.org

Se non existe un paquete no almacenamento, o servidor tentará buscalo en npmjs.org. Se npmjs.org está desactivado, serve paquetes da caché simulando que non existen outros paquetes. **Verdaccio descargará só o necesario (solicitado polos clientes)** e esta información gardarase na memoria caché, polo que se o cliente solicita o mesmo por segunda vez pódese servir sen pedilo a npmjs.org.

**Exemplo:**

Se solicita con éxito `express@4.0.1` ao servidor unha vez, poderá facelo de novo (con todas as súas dependencias) en calquera momento, aínda que npmjs.org estea inactivo. Aínda que teña en conta que `express@4.0.0` non se descargará ata que alguén o precise. E se npmjs.org está fóra de liña, o servidor dirá que só se publica `express@4.0.1` (o que hai na caché), pero nada máis.

### Anular os paquetes públicos

Se desexa usar unha versión modificada dalgún paquete público `foo`, só pode publicala no seu servidor local, polo que cando o seu tipo `npm instale foo`, **Consideraremos instalar a súa versión **.

Aquí hai dúas opcións:

1. You want to create a separate **fork** and stop synchronizing with public version.
    
    If you want to do that, you should modify your configuration file so Verdaccio won't make requests regarding this package to npmjs anymore. Add a separate entry for this package to `config.yaml` and remove `npmjs` from `proxy` list and restart the server.
    
    ```yaml
    packages:
     "@my-company/*":
       access: $all
       publish: $authenticated
       # comment it out or leave it empty
       # proxy:
    ```
    
    When you publish your package locally, **you should probably start with a version string higher than the existing package** so it won't conflict with that package in the cache.

2. You want to temporarily use your version, but return to the public one as soon as it's updated.
    
    In order to avoid version conflicts, **you should use a custom pre-release suffix of the next patch version**. For example, if a public package has version 0.1.2, you can upload `0.1.3-my-temp-fix`.
    
    ```bash
    npm version 0.1.3-my-temp-fix
    npm publish --tag fix --registry http://localhost:4873
    ```
    
    This way your package will be used until its original maintainer updates his public package to `0.1.3`.

## Security

Security starts in your environment. For such things we recommend reading:

- **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and following the steps outlined there.
- **[Avoiding npm substitution attacks](https://github.blog/2021-02-12-avoiding-npm-substitution-attacks/)**
- **[Dependency Confusion: When Are Your npm Packages Vulnerable?](https://blog.includesecurity.com/2021/02/dependency-confusion-when-are-your-npm-packages-vulnerable/)**
- **[Practical Mitigations For Dependency Confusion Attack](https://www.kernelcrypt.com/posts/depedency-confusion-explained/)** > Feel free to attach here new useful articles to improve the security.

### Strong package access with `$authenticated`

By default all packages you publish in Verdaccio are accessible for all users. We recommend protecting your registry from external non-authorized users by updating the `access` property of your packages to `$authenticated`.

```yaml
packages:
  "@my-company/*":
    access: $authenticated
    publish: $authenticated
  "@*/*":
    access: $authenticated
    publish: $authenticated
  "**":
    access: $authenticated
    publish: $authenticated
```

That way, **nobody can access your registry unless they are authorized, and private packages won't be displayed in the web interface**.

### Remove `proxy` to increase security at private packages

After a clean installation, by default all packages will be resolved to the default uplink (the public registry `npmjs`).

```yaml
packages:
  "@*/*":
    access: $authenticated
    publish: $authenticated
    proxy: npmjs
  "**":
    access: $authenticated
    publish: $authenticated
    proxy: npmjs
```

This means, if a private packaged eg: `@my-company/auth` is published locally, the registry will look up at the public registry. If your intention is fully protection, remove the `proxy` property from your configuration, for instance:

```yaml
packages:
  "@my-company/*":
    access: $authenticated
    publish: $authenticated
    unpublish: $authenticated
  "@*/*":
    access: $authenticated
    publish: $authenticated
    proxy: npmjs
  "**":
    access: $authenticated
    publish: $authenticated
    proxy: npmjs
```

This configuration will **avoid downloading needlessly to external registries**, merging external metadata and download external tarballs.

## Servidor

### Secured Connections

Using **HTTPS** is a common recommendation. For this reason we recommend reading the [SSL](ssl.md) section to make Verdaccio secure, or alternatively using an HTTPS [reverse proxy](reverse-proxy.md) on top of Verdaccio.

### Expiring Tokens

Since `verdaccio@3.x` the tokens have no expiration date. For such reason we introduced in the next `verdaccio@4.x` the JWT feature [PR#896](https://github.com/verdaccio/verdaccio/pull/896)

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

Using JWT also improves the performance with authentication plugins. The old system will perform an unpackage and validate the credentials on every request, while JWT will rely on the token signature instead, avoiding the overhead for the plugin.

As a side note, be aware at **npmjs** and the **legacy** verdaccio token never expires** unless you invalidate manually.