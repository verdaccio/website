---
id: node-api
title: "Api Node"
---

Verdaccio pode ser chamado programaticamente. A API do nó foi introduzida após a versão `verdaccio@3.0.0-alpha.10`.

## Utilização

#### Programação

```js
 import startServer from 'verdaccio'; 

 startServer(configJsonFormat, 6000, store, '1.0.0', 'verdaccio',
    (webServer, addrs, pkgName, pkgVersion) => {
        webServer.listen(addr.port || addr.path, addr.host, () => {
            console.log('verdaccio running');
        });
  });
```

## Outros Usos

* [verdaccio-server](https://github.com/boringame/verdaccio-server) um proxy local para npm

```js
// js
import * as verdaccioServer from "verdaccio-server";
verdaccioServer.start();
verdaccioServer.stop();
verdaccioServer.list();
verdaccioServer.stopAll();
verdaccioServer.show();
verdaccioServer.cli();
// windows .net2
verdaccioServer.serviceInstall();
verdaccioServer.serviceUninstall();
verdaccioServer.serviceStart();
verdaccioServer.serviceStop();
verdaccioServer.serviceRestart();
```