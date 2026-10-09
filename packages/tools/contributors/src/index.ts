import type {
  CollectOptions,
  Contributor,
  ContributorsData,
  Repository,
  RepositoryContribution,
} from './types';

import { Octokit } from 'octokit';

export type * from './types';

const DEFAULT_EXCLUDED = [
  'verdacciobot',
  'verdacciopack',
  'fossabot',
  'github-actions[bot]',
  'dependabot-preview[bot]',
  'dependabot[bot]',
  'greenkeeper[bot]',
  'snyk-bot',
  'allcontributors[bot]',
  'renovate[bot]',
  'renovate-bot',
];

const STATS_ATTEMPTS = 5;
const STATS_WAIT_MS = 3000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// run `worker` over `items` with at most `limit` in flight, keeping the order of the results
async function mapLimit<T, R>(items: T[], limit: number, worker: (item: T) => Promise<R>) {
  const results = Array.from({ length: items.length }) as R[];
  let next = 0;
  const lanes = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index]);
    }
  });
  await Promise.all(lanes);
  return results;
}

type Raw = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

/**
 * Reads every public repository of the organisation and adds up the contributors of each one.
 *
 * The result keeps the shape the website already used (`contributors` and `repositories`) and
 * adds the avatar and profile URL, the first and last contribution of every person, and totals.
 */
export async function collectContributors(options: CollectOptions): Promise<ContributorsData> {
  const {
    token,
    organization,
    excludedAccounts = [],
    allowFork = false,
    allowPrivateRepo = false,
    withStats = true,
    concurrency = 4,
    log = () => {},
  } = options;
  const excluded = new Set([...DEFAULT_EXCLUDED, ...excludedAccounts]);

  const octokit = new Octokit({
    auth: token,
    throttle: {
      onRateLimit: (retryAfter, requestOptions, _octokit, retryCount) => {
        log(
          `rate limit on ${requestOptions.method} ${requestOptions.url}, retry in ${retryAfter}s`
        );
        return retryCount < 2;
      },
      onSecondaryRateLimit: (retryAfter, requestOptions) => {
        log(`secondary rate limit on ${requestOptions.url}, retry in ${retryAfter}s`);
        return true;
      },
    },
  });

  const allRepos = await octokit.paginate(octokit.rest.repos.listForOrg, {
    org: organization,
    type: 'all',
    per_page: 100,
  });
  const repos = allRepos.filter(
    (repo) => (allowFork || !repo.fork) && (allowPrivateRepo || !repo.private)
  );
  log(`${repos.length} repositories in ${organization}`);

  const people = new Map<string, Contributor>();
  const repositories: Repository[] = [];

  await mapLimit(repos, concurrency, async (repo) => {
    const owner = repo.owner.login;
    let contributors: Raw[] = [];
    try {
      contributors = (await octokit.paginate(octokit.rest.repos.listContributors, {
        owner,
        repo: repo.name,
        per_page: 100,
      })) as Raw[];
    } catch (error) {
      // an empty repository answers 204/404 here; it just has nobody to count
      log(`skipped ${repo.name}: ${(error as Error).message}`);
      return;
    }

    const people_ = contributors.filter(
      (c) => c.login && !excluded.has(c.login) && !(c as { type?: string }).type?.includes('Bot')
    );
    if (people_.length === 0) {
      return;
    }

    repositories.push({
      name: repo.name,
      login: owner,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description ?? null,
      stargazers_count: repo.stargazers_count ?? 0,
      archived: !!repo.archived,
      language: repo.language ?? null,
      pushed_at: repo.pushed_at ?? null,
    });

    // weekly commit statistics: GitHub computes them lazily and answers 202 until they are ready
    const span = new Map<string, { first?: number; last?: number }>();
    if (withStats) {
      for (let attempt = 0; attempt < STATS_ATTEMPTS; attempt++) {
        const res = await octokit.rest.repos.getContributorsStats({ owner, repo: repo.name });
        if (res.status === 200 && Array.isArray(res.data)) {
          for (const entry of res.data) {
            const login = entry.author?.login;
            if (!login) continue;
            const active = (entry.weeks ?? []).filter((week) => (week.c ?? 0) > 0);
            const firstWeek = active[0]?.w;
            const lastWeek = active[active.length - 1]?.w;
            if (firstWeek === undefined || lastWeek === undefined) continue;
            span.set(login, { first: firstWeek, last: lastWeek });
          }
          break;
        }
        await sleep(STATS_WAIT_MS);
      }
    }

    for (const c of people_) {
      const entry: RepositoryContribution = { name: repo.name, contributions: c.contributions };
      let person = people.get(c.login);
      if (!person) {
        person = {
          id: c.id,
          login: c.login,
          avatar_url: c.avatar_url,
          html_url: c.html_url,
          contributions: 0,
          repositories: [],
        };
        people.set(c.login, person);
      }
      person.contributions += c.contributions;
      person.repositories.push(entry);

      const range = span.get(c.login);
      if (range?.first !== undefined) {
        const first = new Date(range.first * 1000).toISOString();
        if (!person.firstContributionAt || first < person.firstContributionAt) {
          person.firstContributionAt = first;
        }
      }
      if (range?.last !== undefined) {
        const last = new Date(range.last * 1000).toISOString();
        if (!person.lastContributionAt || last > person.lastContributionAt) {
          person.lastContributionAt = last;
        }
      }
    }
    log(`${repo.name}: ${people_.length} contributors`);
  });

  // GitHub only returns the weekly statistics of the 100 top contributors of a repository, so
  // everybody else has no dates yet. Ask for their commits directly: the first page, with one
  // commit per page, is the newest commit and the last page is the oldest.
  if (withStats) {
    const jobs = [...people.values()]
      .filter((person) => !person.firstContributionAt || !person.lastContributionAt)
      .flatMap((person) => person.repositories.map((repo) => ({ person, repo })));
    log(`reading the commit dates of ${jobs.length} contributions without statistics`);

    await mapLimit(jobs, concurrency, async ({ person, repo }) => {
      const query = {
        owner: organization,
        repo: repo.name,
        author: person.login,
        per_page: 1,
      };
      try {
        const newest = await octokit.rest.repos.listCommits(query);
        const lastDate = newest.data[0]?.commit.author?.date;
        if (!lastDate) return;
        const lastPage = /[?&]page=(\d+)>; rel="last"/.exec(String(newest.headers.link ?? ''));
        let firstDate = lastDate;
        if (lastPage) {
          const oldest = await octokit.rest.repos.listCommits({
            ...query,
            page: Number(lastPage[1]),
          });
          firstDate = oldest.data[0]?.commit.author?.date ?? lastDate;
        }
        if (!person.firstContributionAt || firstDate < person.firstContributionAt) {
          person.firstContributionAt = firstDate;
        }
        if (!person.lastContributionAt || lastDate > person.lastContributionAt) {
          person.lastContributionAt = lastDate;
        }
      } catch (error) {
        log(`no commit dates for ${person.login} in ${repo.name}: ${(error as Error).message}`);
      }
    });
  }

  const contributors = [...people.values()]
    .map((person) => ({
      ...person,
      repositories: person.repositories.sort((a, b) => b.contributions - a.contributions),
    }))
    .sort((a, b) => b.contributions - a.contributions || a.login.localeCompare(b.login));

  repositories.sort((a, b) => a.name.localeCompare(b.name));

  return {
    generatedAt: new Date().toISOString(),
    organization,
    totals: {
      contributors: contributors.length,
      contributions: contributors.reduce((sum, c) => sum + c.contributions, 0),
      repositories: repositories.length,
    },
    contributors,
    repositories,
  };
}
