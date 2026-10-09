# @verdaccio/contributors

Collects the people who contribute to the repositories of a GitHub organisation, using
[octokit](https://github.com/octokit/octokit.js). It feeds the website's contributors page and is
run weekly by the `static data` workflow through `@verdaccio/local-scripts`.

```ts
import { collectContributors } from '@verdaccio/contributors';

const data = await collectContributors({
  token: process.env.TOKEN,
  organization: 'verdaccio',
  excludedAccounts: ['renovate[bot]'],
});
```

Besides the commit count per person and per repository it returns the avatar and profile URL, the
first and last week of activity (from the weekly commit statistics, so only for the 100 top
contributors of each repository), the repositories with their stars, language and last push, and
the totals.

Run it from the repo root with `TOKEN=<github token> pnpm --filter @verdaccio/local-scripts run contributors:update`.
