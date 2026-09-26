---
id: node-api
title: 'Node API'
---

Verdaccio can be started programmatically instead of from the command line, which is what
test harnesses and embedded registries usually want.

## `runServer` {#runserver}

```ts
runServer(config?: string | ConfigYaml): Promise<http.Server | https.Server>
```

It resolves with a **native Node server that is not listening yet**, so you decide the port
and when to start it. Whether it is `http` or `https` follows the `https` block of the
configuration.

It accepts the configuration in three ways: nothing at all for the defaults, a path to a
config file, or the configuration inline.

```js
import { runServer } from 'verdaccio';

// const app = await runServer();
// const app = await runServer('./config/config.yaml');

const app = await runServer({
  storage: './storage',
  auth: { htpasswd: { file: './htpasswd' } },
  uplinks: { npmjs: { url: 'https://registry.npmjs.org/' } },
  packages: {
    '@*/*': { access: '$all', publish: '$authenticated', proxy: 'npmjs' },
    '**': { access: '$all', proxy: 'npmjs' },
  },
  log: { type: 'stdout', format: 'pretty', level: 'http' },
});

app.listen(4000, () => {
  console.log('verdaccio running on http://localhost:4000');
});
```

On Verdaccio 6 `runServer` takes a second optional argument, `{ listenArg }`, which
overrides the `listen` entry of the configuration. Verdaccio 7 and newer do not have it —
pass the port to `listen()` instead, as above.

Verdaccio 7 also exports `initServer(config, port, version, pkgName)`, which creates the
server **and** starts it listening. `runServer` is the one to prefer: it hands you the
server so you can shut it down, which is what a test harness needs.

## What the package exports {#exports}

The surface is not the same on every line. Import `runServer` **by name** — it is the only
thing all three agree on, and the default export means something different on each:

| Export | 6.x | 7.x | 9.x |
| --- | --- | --- | --- |
| `runServer` | yes | yes | yes |
| `default` | `startVerdaccio` | `runServer` | *(none)* |
| `initServer` | no | yes | no |
| `startVerdaccio` | yes | no | no |
| `ConfigBuilder`, `parseConfigFile`, `getDefaultConfig`, `Config` | yes | yes | no |
| `fileUtils`, `errorUtils`, `cryptoUtils`, `pkgUtils` | yes | no | no |

Anything the `verdaccio` package no longer re-exports is still available from the module it
came from — `@verdaccio/config` and `@verdaccio/core` — so the fix when upgrading is to
import from there instead.

## The old callback API {#legacy-api}

Verdaccio 6 still exports an entry point taking six positional arguments and a callback:

```js
// deprecated, Verdaccio 6 only
const startServer = require('verdaccio').default;
startServer(config, 6000, undefined, '1.0.0', 'verdaccio', (webServer, addrs) => {
  webServer.listen(addrs.port || addrs.path, addrs.host);
});
```

It is gone from Verdaccio 7 onwards. On 7.x the same call silently does something else —
`default` is `runServer`, which ignores every argument after the first — and on 9.x it
throws `startServer is not a function`, because there is no default export at all. Use
`runServer` instead.
