---
id: setup-npm
title: 'npm'
---

# npm {#npm}

The minimum supported npm version is **10**. Every supported Verdaccio requires a
Node.js release that already bundles npm 10 or 11, so older clients are neither
tested nor supported.

Some features need more than that: `npm stage` requires **npm 11.17**.

## Setting up global registry for all projects {#all}

To set the registry for all your local projects in any terminal window run:

```bash
npm set registry http://localhost:4873/
```

This will set the registry for your operational system user and you can find it on the file `~/.npmrc`.

## Using registry for a specific project {#specific}

To set this value for a specific project open its root folder on a terminal window and run:

```bash
npm set registry http://localhost:4873/ --location project
```

This will set the registry in a `.npmrc` file in your project root directory.

or by specific scope eg: `@my-scope/auth`:

```
npm config set @my-scope:registry http://localhost:4873
```

## Using registry only on specific command {#command}

If you want one single use append `--registry http://localhost:4873/` to the required command.
Some examples:

```bash
npm ci --registry http://localhost:4873
npm install --registry http://localhost:4873
npm install lodash --registry http://localhost:4873
```

## How to prevent your package from being published in other registries

If you only want to publish your package to Verdaccio but keep installing from other registries you can setup the `publishConfig` in your `package.json` as [described in the official documentation](https://docs.npmjs.com/cli/v8/using-npm/registry#how-can-i-prevent-my-package-from-being-published-in-the-official-registry).

```json
{
  "publishConfig": {
    "registry": "http://localhost:4873"
  }
}
```

## Creating user {#creating-user}

Since `npm@9` the two commands do separate things, which is the behaviour on
every supported version:

- `login` authenticates an existing user and does **not** create one:

```bash
npm login --registry http://localhost:4873
```

- `adduser` creates a user and does **not** log them in:

```bash
npm adduser --registry http://localhost:4873
```

Both rely on web login by default; adding `--auth-type=legacy` gets the previous
behaviour back.

> On `npm@8` and older, either command both created the user and logged them in.
> Those versions are no longer supported.

> [Web login is not supported for verdaccio.](https://github.com/verdaccio/verdaccio/issues/3413)

## Two-factor authentication {#two-factor}

:::info Depends on the registry
Requires the `tfa` [feature flag](configuration#experiments) enabled on the
Verdaccio side. It is experimental, off by default, and available from **7.x** —
it does not exist in **6.x**. Nothing is configured on the npm side.
:::

With the flag enabled you can protect your account with a time-based one-time
password using the standard npm commands:

```bash
npm profile enable-2fa auth-and-writes
npm profile get                          # two-factor auth: auth-and-writes
npm profile disable-2fa
```

Once enabled, publishing asks for a code. npm prompts for it in an interactive
terminal; in a script pass it directly:

```bash
npm publish --otp=123456
```

Without a TTY and without `--otp`, npm fails with `EOTP` rather than hanging.

See [two-factor authentication](two-factor-authentication) for the modes,
recovery codes and the caveats around publishing from CI.

## Staged publishing {#staged-publishing}

:::info Depends on the registry
Requires the `stage` [feature flag](configuration#experiments) enabled on the
Verdaccio side. It is experimental, off by default, and available from **7.x** —
it does not exist in **6.x**. With the flag off, the `npm stage` commands answer
`404`.
:::

With the flag enabled, `npm stage` uploads a version for review instead of
publishing it outright. It only becomes installable once a maintainer approves
it.

```bash
npm stage publish            # upload for review, nothing is installable yet
npm stage list               # see what is waiting
npm stage download <id>      # inspect the tarball before deciding
npm stage approve <id>       # publish it for real
npm stage reject <id>        # discard it
```

**These commands require npm 11.17 or newer.** They do not exist in earlier
versions, and there is no Yarn or pnpm equivalent.

`npm stage publish` never asks for a one-time password, which is what lets a CI
pipeline prepare a release that a human approves later with theirs.

See [staged publishing](staged-publishing) for the full flow and the permissions
involved.

## Troubleshooting {#troubleshooting}

### `npm login` with npm@9 or higher

If you are running into issues login with `npm@9.x` or higher you could try use the legacy mode (see above).

For progress on the native support on future you can track the following [issue#3413](https://github.com/verdaccio/verdaccio/issues/3413).

### SSL and certificates {#ssl-and-certificates}

When using Verdaccio under SSL without a valid certificate, defining `strict-ssl` in your config file is required otherwise you will get `SSL Error: SELF_SIGNED_CERT_IN_CHAIN` errors.

`npm` does not support [invalid certificates anymore](https://blog.npmjs.org/post/78085451721/npms-self-signed-certificate-is-no-more) since 2014.

```bash
npm config set ca ""
npm config set strict-ssl false
```

### Mixed registries in lockefile (npm v7+)

Since version 7 npm got more strict with the introduction of `lockfileVersion: 2`. If you have mixed `resolved` fields in your lockfile, for instance, having this in your lockfile:

```json
{
  "name": "npm7",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "lodash": "4.17.20",
        "underscore": "^1.11.0"
      }
    },
    ..... // removed for simplicity
  },
  "dependencies": {
    "lodash": {
      "version": "4.17.20",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.20.tgz",
      "integrity": "sha512-PlhdFcillOINfeV7Ni6oF1TAEayyZBoZ8bcshTHqOYJYlrqzRK5hagpagky5o4HfCzzd1TRkXPMFq6cKk9rGmA=="
    },
    "underscore": {
      "version": "1.11.0",
      "resolved": "http://localhost:4873/underscore/-/underscore-1.11.0.tgz",
      "integrity": "sha512-xY96SsN3NA461qIRKZ/+qox37YXPtSBswMGfiNptr+wrt6ds4HaMw23TP612fEyGekRE6LNRiLYr/aqbHXNedw=="
    }
  }
}
```

Either running `npm i --registry https://registry.npmjs.org` or using `.npmrc` will fail your installation.
