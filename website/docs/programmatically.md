---
id: verdaccio-programmatically
title: 'Node.js API'
---

Verdaccio is a binary command available in your environment when you install the package globally, for example `npm i -g verdaccio`. It can also be used as a dependency in your project through the Node.js API.

### Using `spawn` from `node:child_process`

Using the binary is the fastest way to run Verdaccio from another Node.js process. Prefer `spawn` with the public `verdaccio` executable instead of resolving internal package files.

The following example starts Verdaccio, waits until `/-/ping` responds, and returns a cleanup function that stops the child process.

```typescript
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

type VerdaccioProcess = {
  child: ChildProcessWithoutNullStreams;
  stop: () => Promise<void>;
};

export async function startVerdaccio(configPath: string, port = 4873): Promise<VerdaccioProcess> {
  const controller = new AbortController();
  const registry = `http://localhost:${port}`;
  const child = spawn('verdaccio', ['--config', configPath, '--listen', String(port)], {
    signal: controller.signal,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let startupError: Error | undefined;

  child.once('error', (error) => {
    startupError = error;
  });

  for (let attempt = 0; attempt < 60; attempt++) {
    if (startupError) {
      throw startupError;
    }

    try {
      const response = await fetch(`${registry}/-/ping`);
      if (response.ok) {
        return {
          child,
          stop: async () => {
            if (child.exitCode !== null) {
              return;
            }
            await new Promise<void>((resolve) => {
              child.once('exit', () => resolve());
              controller.abort();
            });
          },
        };
      }
    } catch {
      // Verdaccio is still starting.
    }

    await delay(250);
  }

  controller.abort();
  throw new Error(`Verdaccio did not start at ${registry}`);
}
```

You can see the full example on this repository.

[https://github.com/juanpicado/verdaccio-fork](https://github.com/juanpicado/verdaccio-fork)

### Using the module API

Feature available in `v5.11.0` and higher.

:::info

Since Verdaccio 6.x, the recommended API is `runServer(...)`, which can be awaited.

:::

:::warning

Since Verdaccio 7.x, the deprecated callback-style API and `self_path` programmatic config property were removed. Use `await runServer(...)` and `configPath`.

:::

Using `const verdaccio = require('verdaccio');` as the default module is deprecated. Use `runServer` for future compatibility.

There are three ways to use it:

- No input, it will find the `config.yaml` as is you would run `verdaccio` in the console.
- With an absolute path.
- With a config object.

```js
import { runServer } from 'verdaccio';

// Default configuration
const app = await runServer();

// Or a config file path
const appWithConfigPath = await runServer('./config/config.yaml');

// Or a config object
const appWithConfigObject = await runServer({ configuration });

app.listen(4000, () => {
  // do something
});
```

When using a config object, Verdaccio 6.x and newer can use `configPath` to identify the active configuration file.

```js
import { parseConfigFile, runServer } from 'verdaccio';
import { fileURLToPath } from 'node:url';

const configPath = fileURLToPath(new URL('./config.yaml', import.meta.url));
const config = parseConfigFile(configPath);

config.configPath = configPath;

const app = await runServer(config);
app.listen(4000);
```

For versions older than `v5.11.0`.

:::warning

The following API is deprecated and was removed in Verdaccio 7.x. It is kept here only for older Verdaccio versions.

:::

```js
const fs = require('fs');
const path = require('path');
const verdaccio = require('verdaccio').default;
const YAML = require('js-yaml');

const getConfig = () => {
  return YAML.load(fs.readFileSync(path.join(__dirname, 'config.yaml'), 'utf8'));
};

const cache = path.join(__dirname, 'cache');
const config = Object.assign({}, getConfig(), {
  self_path: cache,
});

verdaccio(config, 6000, cache, '1.0.0', 'verdaccio', (webServer, addrs, pkgName, pkgVersion) => {
  try {
    webServer.unref();
    webServer.listen(addrs.port || addrs.path, addrs.host, () => {
      console.log('verdaccio running');
    });
  } catch (error) {
    console.error(error);
  }
});
```
