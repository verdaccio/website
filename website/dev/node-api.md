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

On **6.x** `runServer` takes a second optional argument, `{ listenArg }`, which overrides
the `listen` entry of the configuration. **7.x** does not have it — pass the port to
`listen()` instead, as above.

Verdaccio **7.x** also exports `initServer(config, port, version, pkgName)`, which creates
the server **and** starts it listening. `runServer` is the one to prefer: it hands you the
server so you can shut it down, which is what a test harness needs. `initServer` is also
the path that emits the [`verdaccio_started` message](#verdaccio-started).

## Building the configuration {#config-builder}

Passing a big literal to `runServer` gets unwieldy, and a typo in a nested key is silent.
`ConfigBuilder` from `@verdaccio/config` builds the same object with a typed, chainable API,
and can also serialise it to a real `config.yaml`.

<CodeBlock language="ts">{ConfigBuilderExample}</CodeBlock>

`getDefaultConfig()` and `parseConfigFile()` live in the same package and are the other two
pieces: the first gives you Verdaccio's defaults as a starting point, the second reads an
existing YAML file.

## What the package exports {#exports}

The surface is not the same on both lines. `runServer` is the one name they agree on, so
importing it **by name** is what always works:

| Export                                                           | 6.x              | 7.x         |
| ---------------------------------------------------------------- | ---------------- | ----------- |
| `runServer`                                                      | yes              | yes         |
| `default`                                                        | `startVerdaccio` | `runServer` |
| `initServer`                                                     | no               | yes         |
| `startVerdaccio`                                                 | yes              | no          |
| `ConfigBuilder`, `parseConfigFile`, `getDefaultConfig`, `Config` | yes              | yes         |
| `fileUtils`, `errorUtils`, `cryptoUtils`, `pkgUtils`             | yes              | no          |

Note that `default` is **not** the same function on both: on 6.x it is the deprecated
callback API described below, on 7.x it is `runServer`. Code that does
`require('verdaccio')(...)` and is moved from 6.x to 7.x will not fail — it will silently
do something else, because `runServer` ignores every argument after the first. Always
import by name.

Whatever a given version does not re-export is still available from the package it comes
from: the configuration helpers from
[`@verdaccio/config`](https://www.npmjs.com/package/@verdaccio/config) and the utilities from
[`@verdaccio/core`](https://www.npmjs.com/package/@verdaccio/core). Importing from there
works on both lines, which makes it the safer habit for code that has to span versions.

## Running the binary in a child process {#fork}

Instead of importing the package, you can `fork` the binary and wait until it is up.

### The `verdaccio_started` message {#verdaccio-started}

When Verdaccio is started as a **forked child process**, it sends this message to its
parent over the IPC channel the moment the HTTP server is listening:

```json
{ "verdaccio_started": true }
```

That is the signal to wait for. It is what makes forking worth using in a test harness:
you get a precise "ready" event instead of polling the port or sleeping.

Three things to know about it:

- **No configuration is needed.** The only condition is that `process.send` exists,
  which Node.js provides whenever the process was created by `fork()` (or by `spawn()`
  with `stdio` including `'ipc'`). It is **not** gated by `_debug` or by any config key.
- **It is sent once**, from the `listen` callback, so it arrives after the port is
  actually accepting connections.
- **Only the binary sends it.** `runServer` hands you a server that is not listening
  yet, so nothing is emitted; the message comes from the code path that listens —
  `initServer`, which is what `bin/verdaccio` runs.

```ts
import { type ChildProcess, fork } from 'child_process';

export function runRegistry(args: string[] = [], childOptions = {}): Promise<ChildProcess> {
  return new Promise((resolve, reject) => {
    const childFork = fork(require.resolve('verdaccio/bin/verdaccio'), args, childOptions);
    childFork.on('message', (msg: { verdaccio_started?: boolean }) => {
      if (msg.verdaccio_started) {
        resolve(childFork);
      }
    });
    childFork.on('error', (err) => reject(err));
    childFork.on('disconnect', () => reject(new Error('verdaccio disconnected before start')));
  });
}
```

`require.resolve` is not available in ESM; use
`import.meta.resolve('verdaccio/bin/verdaccio')` there.

A full example lives in
[juanpicado/verdaccio-fork](https://github.com/juanpicado/verdaccio-fork).

## The `_debug` flag {#debug-flag}

`_debug` is a **top-level** key of `config.yaml`. The leading underscore marks it as
internal: it exists for Verdaccio's own test suites and for harnesses built on top of
it, it is not part of the supported configuration surface, and it should never be set on
a real registry.

```yaml title="config.yaml"
_debug: true
```

It is unrelated to the `verdaccio_started` message above — that one needs no
configuration at all.

Setting it changes two things on every line, plus one more on 6.x:

### 1. It mounts `GET /-/_debug` {#debug-endpoint}

An endpoint that reports the state of the process:

```json
{
  "pid": 51234,
  "main": "/usr/local/lib/node_modules/verdaccio/bin/verdaccio",
  "conf": "/Users/you/.config/verdaccio/config.yaml",
  "mem": { "rss": 98500608, "heapTotal": 44072960, "heapUsed": 31240328 },
  "gc": null
}
```

`mem` is `process.memoryUsage()`, and `conf` is the resolved path of the configuration
file in use — handy to confirm _which_ config a process actually picked up. If Node.js
was started with `--expose-gc`, the handler **runs a full garbage collection before
answering**, which is what makes the endpoint useful for leak hunting: request it, force
a collection, and compare `mem` across requests.

The endpoint has no authentication of its own, which is the main reason not to enable
this outside a test run.

### 2. It freezes the packument revision {#debug-rev}

With `_debug` present, the storage layer stops bumping the `_rev` of a package's
manifest when it writes it. Tests that assert on stored metadata want a stable
revision; a live registry wants the opposite, since `_rev` is what makes concurrent
writes detectable.

:::caution `_debug: false` is not "off"
The check is for the key being **absent**, not for it being false. `_debug: false` still
freezes the revision. The only way to get normal behaviour back is to **remove the key**
(or comment it out).
:::

### 3. On 6.x only: an extra publish route {#debug-add-version}

Verdaccio **6.x** additionally registers `PUT /:package/:version/-tag/:tag`, a
development-only route for adding a single version to a manifest. It was removed in
**7.x**, so do not build anything on it.

## The old callback API {#legacy-api}

Verdaccio **6.x** still exports an entry point taking six positional arguments and a
callback:

```js
// deprecated, 6.x only
const startServer = require('verdaccio').default;
startServer(config, 6000, undefined, '1.0.0', 'verdaccio', (webServer, addrs) => {
  webServer.listen(addrs.port || addrs.path, addrs.host);
});
```

It is gone from **7.x** onwards. There the same call silently does something else, because
`default` is `runServer` and it ignores every argument after the first: you get a server
that is not listening, on the default configuration, and no error. Use `runServer`
instead.
