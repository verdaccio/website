---
id: e2e
title: 'End to End testing'
description: 'Publish to a throwaway Verdaccio registry in CI and install your packages exactly as your users will.'
---

Unit tests run against your source. They do not tell you whether the **published** package
works: whether `files` left something out, whether `exports` resolves, whether the build
output is what ends up in the tarball, or whether a workspace dependency resolves once it is
a real version range instead of a symlink.

The way to find out is to publish for real and install for real. A throwaway Verdaccio
registry lets you do that in CI, in seconds, without touching npmjs.

## Why not just publish to npmjs? {#why-a-local-registry}

- **Canary versions pile up in public forever.** Versions cannot be reused once unpublished,
  so a per-commit release burns real version numbers.
- **It needs credentials.** A publish token in CI is a token that can leak.
- **It needs the network.** A registry on `localhost` works offline and never flakes.
- **It is not reversible.** A throwaway registry is deleted with `rm -rf`.

## Pick how you run it {#how-to-run}

| Approach | Good for | Trade-off |
| --- | --- | --- |
| **Docker** | CI, and anything that already uses containers | Needs Docker available |
| **The binary in the background** | shell scripts, Makefiles | You manage the process and wait for readiness |
| **Programmatically** | test suites that start and stop it per file | Ties the registry to your test runner |

### Docker {#docker}

```bash
docker run -d --name verdaccio -p 4873:4873 \
  -v "$PWD/verdaccio.yaml:/verdaccio/conf/config.yaml" \
  verdaccio/verdaccio:6
```

Nothing is persisted unless you mount a volume over `/verdaccio/storage`, which is what you
want here: every run starts empty. See [Docker](docker.md) for the image details.

### The binary {#binary}

```bash npm2yarn
npm install -g verdaccio
```

```bash
verdaccio --config ./verdaccio.yaml --listen 4873 &
```

Do not `sleep` and hope. The registry logs its address when it is listening, so wait for
that:

```bash
npx wait-on http://localhost:4873/-/ping
```

If you start it as a **forked child process** from Node.js, it tells you itself: it sends
`{ verdaccio_started: true }` to the parent as soon as it is listening. That is the precise
signal, and it needs no configuration — see
[the Node API](/dev/node-api#verdaccio-started).

### Programmatically {#programmatically}

`runServer` gives you a server that is not listening yet, so your test decides the port and
when to stop it:

```js
import { runServer } from 'verdaccio';

const app = await runServer('./verdaccio.yaml');
const server = app.listen(4873);
// ... run your tests ...
server.close();
```

The full surface, including which exports exist on which line, is in
[the Node API](/dev/node-api).

## A configuration for throwaway registries {#configuration}

This is the part worth getting right, because a registry meant to be deleted wants the
opposite settings from a production one.

```yaml title="verdaccio.yaml"
storage: ./storage

uplinks:
  npmjs:
    url: https://registry.npmjs.org/

packages:
  # the packages under test: anyone may publish, no accounts, no tokens
  '@my-company/*':
    access: $all
    publish: $all
    unpublish: $all

  # everything else is proxied and cached so installs keep working
  '**':
    access: $all
    proxy: npmjs

# keep the noise out of the CI log
log: { type: stdout, format: pretty, level: warn }
```

Two deliberate choices:

- **`publish: $all` on the scope under test.** No user to create, no token to mint, nothing
  to keep in a secret. This is only safe because the registry is thrown away — never do it
  on a real one, see [best practices](best-practices.md).
- **`proxy: npmjs` on `**`.** Your package's own dependencies still install. Drop the
  `uplinks` and the `proxy` if you want a fully offline registry, but then everything you
  install must already be published locally.

## Publishing and installing {#the-loop}

```bash
# 1. publish the package under test
cd packages/widget
npm publish --registry http://localhost:4873

# 2. install it in a scratch project, exactly as a user would
cd "$(mktemp -d)"
npm init -y
npm install @my-company/widget --registry http://localhost:4873

# 3. assert on the installed package, not on your source tree
node -e "require('@my-company/widget')"
```

Step 3 is the whole point: it runs the code from the tarball, through the `exports` map, with
the dependencies that were actually declared.

## Four things that will bite you {#gotchas}

### `npm` refuses to publish without credentials, even when the registry allows it

`publish: $all` makes the **server** accept an anonymous publish, but npm will not even try
without an auth token configured:

```
npm error need auth This command requires you to be logged in to http://localhost:4873/
```

The token is never validated, so any string works:

```ini title=".npmrc"
registry=http://localhost:4873/
//localhost:4873/:_authToken=e2e-dummy-token
```

Note the host-scoped key: it must match the registry URL, port included.

:::caution Basic auth is gone in 7.x
Recipes that put `_auth` (a base64 `user:password`) in `.npmrc` work on **6.x** and fail on
**7.x**, which only accepts Bearer tokens. Use `_authToken`, as above, and it works on both.
:::

### A version you just published may be invisible

This one is confusing because nothing is broken:

```
npm error code ENOVERSIONS
npm error No versions available for @my-company/widget
```

Both npm and pnpm can refuse versions that are *too new*, to reduce supply-chain risk.
**pnpm 11 enables it by default with a one-day delay**, so a package published one second ago
does not exist as far as the install is concerned. Turn it off for the run, or exclude your
own scope:

```bash
npm install @my-company/widget --min-release-age=0
```

```yaml title="pnpm-workspace.yaml"
minimumReleaseAge: 1440
minimumReleaseAgeExclude:
  - '@my-company/*'
```

### The same version cannot be published twice

A second run publishing `1.0.0` gets `EPUBLISHCONFLICT`. Either start from empty storage each
time, or publish a unique version per run:

```bash
npm version "1.0.0-e2e.$(date +%s)" --no-git-tag-version
```

Starting empty is the more predictable of the two, and it is why the Docker recipe above
mounts no volume.

### Your real `.npmrc` and lockfiles leak in

A lockfile with `resolved` URLs pointing at npmjs, or a user-level `.npmrc` with a registry
or a release-age setting, will quietly override what you meant to test. Run the consuming
step in a fresh directory with its own `.npmrc`, and delete the lockfile if you are testing
resolution.

## Checking the registry itself {#verdaccio-e2e}

The above tests **your packages**. If what you need to know is whether a registry behaves
correctly with real clients — after a config change, a plugin, or a reverse proxy in front —
Verdaccio maintains a CLI for that:

```bash
npx @verdaccio/e2e-cli --registry http://localhost:4873 --pm pnpm --pm npm
```

It drives real package managers (npm, pnpm, Yarn, Bun, Deno) through publish, install, `ci`,
audit, deprecate, dist-tags, search and unpublish against the registry you point it at, and
it includes a scenario for the release-age behaviour described above. The suite lives in
[verdaccio/e2e-tests](https://github.com/verdaccio/e2e-tests).

For tests of Verdaccio's own API from Node.js, [`@verdaccio/test-helper`](https://www.npmjs.com/package/@verdaccio/test-helper)
exposes the helpers the project uses internally, such as `initializeServer` and
`publishVersion`.

## Projects doing this in the wild {#examples}

Worked examples, from smallest to largest:

- [e2e-verdaccio-example](https://github.com/rluvaton/e2e-verdaccio-example) — a minimal
  publish-and-install setup
- [e2e-ci-example-gh-actions](https://github.com/juanpicado/e2e-ci-example-gh-actions) — the
  same idea wired into GitHub Actions
- [verdaccio-end-to-end-tests](https://github.com/juanpicado/verdaccio-end-to-end-tests) —
  publishing React components and running UI tests against them
- [verdaccio-fork](https://github.com/juanpicado/verdaccio-fork) — starting the registry as a
  forked child process and waiting for `verdaccio_started`

Larger projects with this in their CI, if you want to read a production setup:
[Bun](https://github.com/oven-sh/bun/blob/main/test/cli/install/registry/verdaccio.yaml),
[create-react-app](https://github.com/facebook/create-react-app/blob/master/CONTRIBUTING.md#contributing-to-e2e-end-to-end-tests),
[adobe/react-spectrum](https://github.com/adobe/react-spectrum/pull/2432) and
[pnpm](https://github.com/pnpm/pnpm).

## Talk {#talk}

_Testing the integrity of React components by publishing in a private registry_ — the
original talk on this workflow.

<iframe width="560" height="315" src="https://www.youtube.com/embed/bRKZbrlQqLY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Slides](https://docs.google.com/presentation/d/1a2xkqj1KlUayR1Bva1bVYvavwOPVuLplxFtup9MI_U4/edit?usp=sharing)
