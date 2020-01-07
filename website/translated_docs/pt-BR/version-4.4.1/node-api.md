---
id: version-4.4.1-node-api
title: Api Node
original_id: node-api
---

Verdaccio can be invoked programmatically. The node API was introduced after version `verdaccio@3.0.0`.

## Utilização

<div id="codefund">''</div>

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
