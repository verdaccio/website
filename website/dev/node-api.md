---
id: node-api
title: 'Node API'
description: 'Start Verdaccio programmatically with runServer, and build its configuration with ConfigBuilder.'
---

```mdx-code-block
import CodeBlock from '@theme/CodeBlock';
import ConfigBuilderExample from '!!raw-loader!./examples/config-builder.ts';
```

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

## Building the configuration {#config-builder}

Passing a big literal to `runServer` gets unwieldy, and a typo in a nested key is silent.
`ConfigBuilder` from `@verdaccio/config` builds the same object with a typed, chainable API,
and can also serialise it to a real `config.yaml`.

<CodeBlock language="ts">{ConfigBuilderExample}</CodeBlock>

`getDefaultConfig()` and `parseConfigFile()` live in the same package and are the other two
pieces: the first gives you Verdaccio's defaults as a starting point, the second reads an
existing YAML file.

## What the package exports {#exports}

The surface has not been the same on every line. `runServer` is the one name all three agree
on, so importing it **by name** is what always works:

| Export                                                           | 6.x              | 7.x         | 9.x                  |
| ---------------------------------------------------------------- | ---------------- | ----------- | -------------------- |
| `runServer`                                                      | yes              | yes         | yes                  |
| `default`                                                        | `startVerdaccio` | `runServer` | `runServer` &dagger; |
| `initServer`                                                     | no               | yes         | yes &dagger;         |
| `startVerdaccio`                                                 | yes              | no          | no                   |
| `ConfigBuilder`, `parseConfigFile`, `getDefaultConfig`, `Config` | yes              | yes         | yes &dagger;         |
| `fileUtils`, `errorUtils`, `cryptoUtils`, `pkgUtils`             | yes              | no          | no                   |

&dagger; Up to and including `9.0.0-next-9.32` the package exported **only** `runServer`, so
`require('verdaccio').default` was `undefined` and the configuration helpers had to come from
`@verdaccio/config`. That was unintended — the three lines build this entry point from
different files and drifted apart — and it is restored in the next 9.x release.

Whatever a given version does not re-export is still available from the package it comes
from: the configuration helpers from
[`@verdaccio/config`](https://www.npmjs.com/package/@verdaccio/config) and the utilities from
[`@verdaccio/core`](https://www.npmjs.com/package/@verdaccio/core). Importing from there
works on every line, which makes it the safer habit for code that has to span versions.

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
