---
title: Contributing
hide_title: true
sidebar_label: Contributing
description: 'How to contribute to Verdaccio: where the code lives, how to report a bug, propose a change or improve the documentation.'
---

# Contributing

We're happy that you're considering contributing, and any change matters.

The full contributing guide lives with the code, so it is always the version that matches it:

**[Read CONTRIBUTING.md in verdaccio/verdaccio →](https://github.com/verdaccio/verdaccio/blob/master/CONTRIBUTING.md)**

It covers the local setup, building and running tests, debugging, the commit and pull request conventions, and changesets. Start there before you open a pull request.

## Ways to contribute {#ways}

- **[Report a bug](https://github.com/verdaccio/verdaccio/issues/new/choose)** or ask a question in the [discussions](https://github.com/verdaccio/verdaccio/discussions).
- **[Fix a bug](https://github.com/verdaccio/verdaccio/issues?q=is%3Aopen+is%3Aissue+label%3A%22issue%3A+bug%22)** or **[test and triage](https://github.com/verdaccio/verdaccio/issues?q=is%3Aopen+is%3Aissue+label%3Aissue_needs_triage)** what others reported.
- **[Work on an approved feature](https://github.com/verdaccio/verdaccio/issues?q=is%3Aopen+is%3Aissue+label%3A%22topic%3A+feature+request%22)**, or propose a new one in an issue first.
- **[Write a plugin](/dev/dev-plugins)** for authentication, storage, middleware, the UI or filters, and [get it listed](/dev/plugins-search).
- **Improve the documentation**: every page has an "Edit this page" link.
- **Chat with us** on [Discord](https://discord.gg/7qWJxBf).

## Where the code lives {#repositories}

Verdaccio is not a single repository:

- **[verdaccio/verdaccio](https://github.com/verdaccio/verdaccio)**: the registry, the web UI and the internal packages.
- **[verdaccio/website](https://github.com/verdaccio/website)**: this website and its documentation.
- **[verdaccio/charts](https://github.com/verdaccio/charts)**: the official Helm chart.
- **[Plugins](/dev/plugins-search)**: most of them live in their own repositories.

Open the pull request in the repository that owns the change.

## Contributing to this website {#website}

The documentation is Markdown under [`website/docs`](https://github.com/verdaccio/website/tree/master/website/docs), the developer guides are under `website/dev`, and the site is built with [Docusaurus](https://docusaurus.io/).

```bash
git clone https://github.com/verdaccio/website.git
cd website
corepack enable
pnpm install
pnpm --filter @verdaccio/website start
```

Before you push, run `pnpm lint` and `pnpm format:check`. The repository README has the rest of the commands.

## Security {#security}

Please do not report vulnerabilities in a public issue, follow the [security policy](/community/security).

## Code of conduct {#code-of-conduct}

Everyone taking part is expected to follow the [code of conduct](https://github.com/verdaccio/verdaccio/blob/master/CODE_OF_CONDUCT.md).
