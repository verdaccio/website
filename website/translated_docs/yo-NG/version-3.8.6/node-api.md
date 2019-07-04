---
id: version-3.8.6-node-api
title: API Oju ipade
original_id: api-oju ipade
---

Verdaccio le jẹ pipe pẹlu eto. Awọn API oju ipade jẹ sisafihan lẹhin ẹya `verdaccio@3.0.0-alpha.10`.

## Ilo

#### Pẹlu eto

```js
 import startServer from 'verdaccio';   

 startServer(configJsonFormat, 6000, store, '1.0.0', 'verdaccio',
    (webServer, addrs, pkgName, pkgVersion) => {
        webServer.listen(addr.port || addr.path, addr.host, () => {
            console.log('verdaccio running');
        });
  });
```

## Awọn imuṣiṣẹ miran

* [verdaccio-server](https://github.com/boringame/verdaccio-server) olupese ikọkọ ti ibi iforukọsilẹ npm ibilẹ

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