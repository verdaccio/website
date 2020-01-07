---
id: version-4.4.1-node-api
title: Node API
original_id: node-api
---

Verdaccio può essere invocato a livello di programmazione. The node API was introduced after version `verdaccio@3.0.0`.

## Utilizzo

<div id="codefund">''</div>

#### Programmazione

```js
 import startServer from 'verdaccio';

 startServer(configJsonFormat, 6000, store, '1.0.0', 'verdaccio',
    (webServer, addrs, pkgName, pkgVersion) => {
        webServer.listen(addr.port || addr.path, addr.host, () => {
            console.log('verdaccio running');
        });
  });
```

## Altre implementazioni

* [verdaccio-server](https://github.com/boringame/verdaccio-server) registro proxy di npm locale

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
