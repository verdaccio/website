# Verdaccio website

Source of [verdaccio.org](https://verdaccio.org), the documentation and website of [Verdaccio](https://github.com/verdaccio/verdaccio), the lightweight Node.js private proxy registry. It is built with [Docusaurus](https://docusaurus.io).

## Repository layout

- `website/docs`: the documentation.
- `website/dev`: the developer guides (plugins and the Node API).
- `website/community`, `website/talks`, `website/blog`: the community pages, the video talks and the blog.
- `website/src`: the Docusaurus site (home page, components and styles).
- `packages/tools`: the scripts and plugins that generate the site data (downloads, contributors, plugins).
- `scripts`: maintenance scripts, for example the plugins catalog update.

## Requirements

- The Node.js version in [`.nvmrc`](.nvmrc).
- [pnpm](https://pnpm.io), installed through corepack. The version is pinned in `packageManager` in `package.json`.

## Local development

```shell
nvm install
corepack enable
pnpm install
pnpm build
pnpm --filter @verdaccio/website start
```

The site is served at <http://localhost:3000>.

## Commands

| Command                                           | Description                                 |
| ------------------------------------------------- | ------------------------------------------- |
| `pnpm build`                                      | Build the internal packages.                |
| `pnpm website`                                    | Build the site (fails on broken links).     |
| `pnpm --filter @verdaccio/website start`          | Start the development server.               |
| `pnpm --filter @verdaccio/website check:examples` | Type-check the plugin examples in the docs. |
| `pnpm lint`                                       | Run oxlint.                                 |
| `pnpm format` / `pnpm format:check`               | Fix or check formatting with oxfmt.         |
| `pnpm script:addon`                               | Update the plugins catalog data.            |

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) first. Some data files (contributors, downloads, plugins catalog) are updated by scheduled workflows and must not be edited by hand. To propose a plugin for the catalog, use the "Suggest a new addon" issue template.

Security issues: see [SECURITY.md](SECURITY.md).

## License

MIT, as declared in `package.json`.
