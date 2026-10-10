export type CollectOptions = {
  /** GitHub token; without one the API allows only a few requests per hour. */
  token?: string;
  organization: string;
  /** Logins to leave out. Accounts GitHub flags as `Bot` are always left out. */
  excludedAccounts?: string[];
  allowFork?: boolean;
  allowPrivateRepo?: boolean;
  /**
   * Also read the weekly commit statistics of every repository, which gives the first and the
   * last contribution of each person. It costs one extra request per repository.
   */
  withStats?: boolean;
  /** Repositories fetched in parallel. */
  concurrency?: number;
  log?: (message: string) => void;
};

export type RepositoryContribution = {
  name: string;
  contributions: number;
};

export type Contributor = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  /** Commits in every repository of the organisation. */
  contributions: number;
  repositories: RepositoryContribution[];
  /** Date of the first commit, filled in when `withStats` is on. */
  firstContributionAt?: string;
  /** Date of the last commit (week precision when it comes from the weekly statistics). */
  lastContributionAt?: string;
};

export type Repository = {
  name: string;
  login: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  archived: boolean;
  language: string | null;
  pushed_at: string | null;
};

export type ContributorsData = {
  generatedAt: string;
  organization: string;
  totals: {
    contributors: number;
    contributions: number;
    repositories: number;
  };
  contributors: Contributor[];
  repositories: Repository[];
};
