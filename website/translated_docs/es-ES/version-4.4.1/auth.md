---
id: version-4.4.1-authentification
title: Autenticación
original_id: authentification
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

<div id="codefund">''</div>

The client authentification is handled by `npm` client itself. Once you login to the application:

```bash
npm adduser --registry http://localhost:4873
```

Un toquen es generado en el archivo de configuración de `npm` alojado en el folder de usuario de tu máquina. Para mas información sobre `.npmrc`lea [la documentación oficial](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Publicar anónimamente

`verdaccio` te permite habilitar publicar de manera anónima, para poder hacerlo necesitarás configurar correctamente tu [acceso a paquetes](packages.md).

Por ejemplo:

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

As is described [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) until `npm@5.3.0` and all minor releases **won't allow you publish without a token**.

## Entendiendo los Grupos

### El significado de `$all` y `$anonymous`

As you know *Verdaccio* uses the `htpasswd` by default. Dicha extensión no implementa los métodos `allow_access`, `allow_publish` ni `allow_unpublish`. Thus, *Verdaccio* will handle that in the following way:

* Si tú no iniciaste sesión (eres anónimo), `$all` y `$anonymous` significarán exactamente lo mismo.
* If you are logged in, `$anonymous` won't be part of your groups and `$all` will match any logged user. A new group `$authenticated` will be added to the list.

As a takeaway, `$all` **will match all users, independently whether is logged or not**.

**The previous behavior only applies to the default authentication plugin**. Si tú estás usando una extensión personalizada y dicha extensión implementa `allow_access`, `allow_publish` o `allow_unpublish`, la resolución del acceso dependerá de dicha extensión. Verdaccio establecerá solamente los grupos por defecto.

Entonces recapitulando:

* **logged**: `$all`, `$authenticated`, + groups added by the plugin
* **anonymous (logged out)**: `$all` and `$anonymous`.

## Htpasswd por defecto

Para simplificar la instalación, `verdaccio` usa una extensión basada en `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    #max_users: 1000
```

| Propiedad | Tipo   | Requerido | Ejemplo    | Soporte | Descripción                                    |
| --------- | ------ | --------- | ---------- | ------- | ---------------------------------------------- |
| file      | string | Si        | ./htpasswd | all     | archivo que aloja las credenciales encriptadas |
| max_users | number | No        | 1000       | all     | limita los usuarios que pueden registrarse     |

En caso que decidas no permitir más nuevos registros, puedes definir `max_users: -1`.
