---
id: cli-registry
title: 'Using a private registry'
---

Setting up a private registry is quite easy on all major Package managers and can be achieved in a few different ways depending on your goals. The following links details how you can achieve this goal for each major package manager.

- [npm](setup-npm.md)
- [yarn](setup-yarn.md)
- [pnpm](setup-pnpm.md)
- [deno](setup-deno.md)
- [bun](setup-bun.md)

## Package manager compatibility {#package-manager-compatibility}

Verdaccio validates package manager compatibility in a dedicated end-to-end test suite. The list of tested npm, Yarn, pnpm, Deno, and Bun versions is maintained manually by contributors so each compatibility update is explicit and reviewable.

| Package manager | Setup guide | Tested versions |
| --- | --- | --- |
| npm | [npm](setup-npm.md) | Maintained in [verdaccio/e2e-tests](https://github.com/verdaccio/e2e-tests/blob/main/README.md) |
| Yarn | [yarn](setup-yarn.md) | Maintained in [verdaccio/e2e-tests](https://github.com/verdaccio/e2e-tests/blob/main/README.md) |
| pnpm | [pnpm](setup-pnpm.md) | Maintained in [verdaccio/e2e-tests](https://github.com/verdaccio/e2e-tests/blob/main/README.md) |
| Deno | [deno](setup-deno.md) | Maintained in [verdaccio/e2e-tests](https://github.com/verdaccio/e2e-tests/blob/main/README.md) |
| Bun | [bun](setup-bun.md) | Maintained in [verdaccio/e2e-tests](https://github.com/verdaccio/e2e-tests/blob/main/README.md) |
