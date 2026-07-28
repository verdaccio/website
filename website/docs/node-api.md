---
id: node-api
title: 'Node API'
---

Verdaccio can be invoked programmatically. The Node API was introduced after version `verdaccio@3.0.0`.

## Usage {#usage}

:::info

Since Verdaccio 6.x, the recommended Node.js API is asynchronous. Use `await runServer(...)` and then call `.listen(...)` on the returned app/server.

:::

```js
import { runServer } from 'verdaccio';

const app = await runServer('./config/config.yaml');

app.listen(4873, () => {
  console.log('verdaccio running on http://localhost:4873');
});
```

:::warning

Since Verdaccio 7.x, the deprecated programmatic API surface was removed:

- Callback-style server startup is no longer supported.
- `config.self_path` was removed; use `config.configPath` instead.

:::

#### Programmatically {#programmatically}

The following callback-style example is deprecated. It only applies to older Verdaccio versions and should not be used for Verdaccio 7.x.

```js
const startServer = require("verdaccio").default;

let config = {
    storage: "./storage",
    auth: {
        htpasswd: {
            file: "./htpasswd"
        }
    },
    uplinks: {
        npmjs: {
            url: "https://registry.npmjs.org/",
        }
    },
    configPath: "./config.yaml",
    packages: {
        "@*/*": {
            access: "$all",
            publish: "$authenticated",
            proxy: "npmjs",
        },
        "**": {
            proxy: "npmjs"
        }
    },
    log: {
            type: "stdout",
            format: "pretty",
            level: "http",
        };
};

startServer(
    config,
    6000,
    undefined,
    "1.0.0",
    "verdaccio",
    (webServer, addrs) => {
        webServer.listen(
            addrs.port || addrs.path,
            addrs.host,
            () => {
                console.log(`verdaccio running on : ${addrs.host}:${addrs.port}`);
            }
        );
    }
);
```

## Other implementations {#other-implementations}

- [verdaccio-server](https://github.com/boringame/verdaccio-server) local npm registry proxy server

```js
// js
import * as verdaccioServer from 'verdaccio-server';

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
