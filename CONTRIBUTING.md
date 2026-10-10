# Contributing to the Verdaccio website

Thanks for helping to improve the documentation and the website.

The guide for contributing to Verdaccio itself, including the commit and pull request conventions, lives with the code:
[CONTRIBUTING.md in verdaccio/verdaccio](https://github.com/verdaccio/verdaccio/blob/master/CONTRIBUTING.md).
The published version of these guidelines is on [verdaccio.org/community/contributing](https://www.verdaccio.org/community/contributing).

## This repository

- `website/docs`: the documentation.
- `website/dev`: the developer guides (plugins and the Node API).
- `website/community`, `website/talks`, `website/blog`: the community pages, the video talks and the blog.
- `website/src`: the Docusaurus site (home page, components and styles).
- `packages/tools`: the scripts and plugins that generate the site data (downloads, contributors, plugins).

## Local setup

Use the Node.js version in `.nvmrc` and [pnpm](https://pnpm.io) through corepack:

```shell
nvm install
corepack enable
pnpm install
pnpm --filter @verdaccio/website start
```

`pnpm build` builds the packages, and `pnpm --filter @verdaccio/website build` builds the site, which fails on broken links.

## Before you push

```shell
pnpm lint
pnpm format:check
```

Use `pnpm format` to fix formatting. Pull request titles follow the conventional commit style in lowercase, for example `docs: explain the uplinks timeout`, because the repository squash merges and takes the commit message from the title.

## Generated data

Some files are updated by a scheduled workflow and should not be edited by hand: the contributors, the downloads and the plugins catalog data. To propose a plugin for the catalog, use the "Suggest a new addon" issue template.
