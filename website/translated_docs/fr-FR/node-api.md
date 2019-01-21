---
id: node-api
title: "Node API"
---
Verdaccio can be invoked programmatically. The node API was introduced after version `verdaccio@3.0.0-alpha.10`.

## Utilisation

#### Par programme

```js
 mport startServer from 'verdaccio';   

 startServer(configJsonFormat, 6000, store, '1.0.0', 'verdaccio',
    (webServer, addrs, pkgName, pkgVersion) => {
        webServer.listen(addr.port || addr.path, addr.host, () => {
            console.log('verdaccio running');
        });
  });
```

## Autres implémentations

* [verdaccio-server](https://github.com/boringame/verdaccio-server) registre local npm, serveur proxy

```js
js
import * comme verdaccioServer de « verdaccio-serveur » ;
verdaccioServer.start() ;
verdaccioServer.stop() ;
verdaccioServer.list() ;
verdaccioServer.stopAll() ;
verdaccioServer.show() ;
verdaccioServer.cli() ;
/ / windows .net2
verdaccioServer.serviceInstall() ;
verdaccioServer.serviceUninstall() ;
verdaccioServer.serviceStart() ;
verdaccioServer.serviceStop() ;
verdaccioServer.serviceRestart() ;
```