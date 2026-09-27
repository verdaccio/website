# Compiled documentation examples

Every file here is real TypeScript, type-checked in CI against the **published**
`@verdaccio/core` (`pnpm --filter @verdaccio/website check:examples`), and embedded into the
docs with `raw-loader` so there is exactly one copy of each example.

The point is that an example cannot drift: if a type is renamed or removed upstream, the
build fails with a compiler error instead of shipping as documentation. That is what
happened to `IPluginMiddleware`, `IPluginAuth`, `IPluginStorage`, `IPackageStorage`,
`IStorageManager` and `IPlugin`, which these pages documented for years after they stopped
existing (verdaccio/verdaccio#5515).

When adding an example:

1. Write it here as a `.ts` file that compiles.
2. Import it in the page with `!!raw-loader!` and render it in a `<CodeBlock>`.
3. Never paste the code into the markdown as well.

Bumping `@verdaccio/core` is how the docs follow the latest release; Renovate does it, and
a contract change shows up as a red build.

**The one thing this cannot cover** is the Verdaccio 6 callback storage contract: it is not
published as a type anywhere. `verdaccio@6`'s own `StoragePlugin` is
`pluginUtils.Storage<Config> | any`, and the `| any` is what lets its callback calls
type-check. That half of `plugin-storage.md` stays hand-written, which is safe because
6.x is in maintenance and the contract no longer moves.
