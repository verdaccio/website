---
id: version-4.4.1-protect-your-dependencies
title: Protegiendo paquetes
original_id: protect-your-dependencies
---

`verdaccio` allows you protect publish, to achieve that you will need to set up correctly your [packages access](packages).

<div id="codefund">''</div>

### Configuración del paquete

Veamos por ejemplo la siguiente configuración. Tienes un conjunto de dependencias con prefijo `my-company-*` y necesitas protegerlas de anónimos o de otro usuario registrado sin credenciales.

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

With this configuration, basically we allow to groups **admin** and **teamA** to *publish* and **teamA**   **teamB** **teamC** *access* to such dependencies.

### Caso de Uso: teamD trata de acceder a la dependencia

So, if I am logged as **teamD**. I shouldn't be able to access all dependencies that match with `my-company-*` pattern.

```bash
➜ npm whoami
teamD
```
I won't have access to such dependencies and also won't be visible via web for user **teamD**. If I try to access the following will happen.

```bash
➜ npm install my-company-core
npm ERR! code E403
npm ERR! 403 Forbidden: webpack-1@latest
```
o con `yarn`

```bash
➜ yarn add my-company-core
yarn add v0.24.6
info No lockfile found.
[1/4] 🔍  Resolving packages...
error Ocurrió un error inesperado: "http://localhost:5555/webpack-1: no se les permite acceder al paquete my-company-core a usuarios no registrados".
```
