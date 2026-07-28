---
id: setup-pnpm
title: 'pnpm'
---

### pnpm {#pnpm}

We recommend pnpm 11 or higher.

`pnpm` recognize by default the configuration at `.npmrc` and also the `--registry` value.
This means that you can follow the same commands described in [npm](setup-npm.md) replacing `npm` by `pnpm`.

You can configure Verdaccio for a private scope in `.npmrc`:

```ini title=".npmrc"
registry=https://registry.npmjs.org/
@my-company:registry=http://localhost:4873/
```

With this configuration, unscoped packages continue resolving from the public registry, while `@my-company/*` packages resolve from Verdaccio.

### Minimum release age with a private scope {#minimum-release-age}

pnpm can delay installing newly published package versions with `minimumReleaseAge`. In pnpm 11, the default is one day. If your private scope publishes internal packages that must be available immediately, exclude that scope from the age gate.

```yaml title="pnpm-workspace.yaml"
minimumReleaseAge: 1440
minimumReleaseAgeExclude:
  - '@my-company/*'
```

`minimumReleaseAge` is measured in minutes. Packages matching `minimumReleaseAgeExclude` bypass the age gate, but still use the registry configured for their scope.

See also [pnpm settings: `minimumReleaseAge`](https://pnpm.io/settings#minimumreleaseage).

### pnpm 11 command changes {#pnpm-11-command-changes}

Since pnpm 11, pnpm no longer falls back to the npm CLI for commands it does not implement. Commands such as `pnpm search`, `pnpm star`, `pnpm stars`, `pnpm unstar`, `pnpm token`, `pnpm whoami`, `pnpm owner`, and `pnpm profile` now return a "not implemented" error. Use the npm CLI directly for commands that pnpm no longer supports.

Other registry commands were reimplemented natively in pnpm 11, including `pnpm login`, `pnpm adduser`, `pnpm logout`, `pnpm publish`, `pnpm view`, `pnpm deprecate`, `pnpm unpublish`, and `pnpm dist-tag`.

## Troubleshooting

The most of problems might be resolved with the [npm troubleshooting list](setup-npm.md#troubleshooting) since are highly compatible in most of the commands.
