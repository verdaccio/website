---
id: authentification
title: "Autenticación"
---

La autenticación esta atada al [plugin](plugins.md) de autenticación que estes usando. Las restricciones de paquetes es manejado por el [maneador de acceso de paquetes](packages.md).

El cliente de autenticación es manejado por el cliente `npm` en su mismo. Una vez has iniciado sesión en la aplicación:

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

Como se describe en [el ticket #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) hasta la versión de `pm@5.3.0` y todas las versiones menores **no permitirán publicar sin un token**.

## Entendiendo los Grupos

### El significado de `$all` y `$anonymous`

Como sabes *Verdaccio* usa `htpasswd` por defecto. Dicha extensión no implementa los métodos `allow_access`, `allow_publish` ni `allow_unpublish`. En consecuencia, *Verdaccio* manejará eso de la siguiente manera:

* Si tú no iniciaste sesión (eres anónimo), `$all` y `$anonymous` significarán exactamente lo mismo.
* Si tú iniciaste sesión, `$anonymous` no formará parte de tus grupos y `$all` coincidirá con cualquier usuario con sesión. Un nuevo grupo `$authenticated` será añadido a la lista.

Como nota, `$all` **coincidirá con todos los usuarios, independientemente si han iniciado sesión o no**.

**El comportamiento anterior solo aplica a la extensión de autenticación por defecto**. Si tú estás usando una extensión personalizada y dicha extensión implementa `allow_access`, `allow_publish` o `allow_unpublish`, la resolución del acceso dependerá de dicha extensión. Verdaccio establecerá solamente los grupos por defecto.

Entonces recapitulando:

* **logged**: `$all`, `$authenticated`, + grupos añadidos por la extensión
* **anonymous (sin sesión)**: `$all` y `$anonymous`.

## Htpasswd por defecto

A fin de simplificar la configuración, `verdaccio` usa una extensión basada en `htpasswd`. Desde la versión v3.0.x la extensión `verdaccio-htpasswd` es usada por defecto.

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