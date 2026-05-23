import fs from 'fs/promises';
import got from 'got';
import path from 'path';
import sanitizeHtml from 'sanitize-html';

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 2000;
const REQUEST_DELAY_MS = 1500;
const PRUNE_AFTER_DAYS = 30;

const SEVERITY_RANK: Record<string, number> = {
  LOW: 1,
  MODERATE: 2,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4,
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function extractRepository(repository: any): string | undefined {
  if (!repository) return undefined;
  const raw = typeof repository === 'string' ? repository : repository.url;
  if (typeof raw !== 'string' || raw.trim() === '') return undefined;
  return raw
    .replace(/^git\+/, '')
    .replace(/^git:\/\//, 'https://')
    .replace(/^ssh:\/\/git@/, 'https://')
    .replace(/\.git$/, '')
    .trim();
}

async function fetchWithRetry<T>(url: string, retries = MAX_RETRIES): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return (await got.get(url, { timeout: { request: 30000 } }).json()) as T;
    } catch (error: any) {
      const status = error?.response?.statusCode;
      const isRetryable = status === 429 || status >= 500;

      if (attempt < retries && isRetryable) {
        const retryAfter =
          status === 429
            ? parseInt(error?.response?.headers?.['retry-after'] || '0', 10) * 1000
            : 0;
        const backoff = Math.max(retryAfter, INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt - 1));
        console.warn(
          `[retry] ${url} failed (${status}), attempt ${attempt}/${retries}, waiting ${backoff}ms`
        );
        await delay(backoff);
        continue;
      }
      throw error;
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} attempts`);
}

async function fetchVulnerabilities(name: string) {
  try {
    const res: any = await got
      .post('https://api.osv.dev/v1/query', {
        json: { package: { name, ecosystem: 'npm' } },
        timeout: { request: 30000 },
      })
      .json();
    const vulns: any[] = res?.vulns ?? [];
    if (vulns.length === 0) return undefined;

    let highestRank = 0;
    let highest: string = 'LOW';
    const ids = new Set<string>();
    for (const v of vulns) {
      const raw = (v.database_specific?.severity ?? '').toString().toUpperCase();
      const rank = SEVERITY_RANK[raw] ?? 0;
      if (rank > highestRank) {
        highestRank = rank;
        highest = raw === 'MEDIUM' ? 'MODERATE' : raw;
      }
      if (v.id) ids.add(v.id);
      for (const alias of v.aliases ?? []) ids.add(alias);
    }
    return {
      count: vulns.length,
      highest_severity: highest,
      ids: Array.from(ids).slice(0, 10),
    };
  } catch (err) {
    console.warn('[osv] failed for', name, (err as any)?.message ?? err);
    return undefined;
  }
}

(async () => {
  const data = require('../website/src/components/EcosystemSearch/addons.json');
  let processed = 0;
  for (let item of data.addons) {
    try {
      if (processed > 0) await delay(REQUEST_DELAY_MS);

      const d: any = await fetchWithRetry(`https://registry.npmjs.org/${item.name}`);
      const latest = d?.['dist-tags']?.latest;
      if (!latest) {
        // Package was unpublished or has no published versions — mark missing and skip
        if (!item.missingSince) {
          item.missingSince = new Date().toISOString();
        }
        const missingDays = Math.floor(
          (Date.now() - new Date(item.missingSince).getTime()) / 86_400_000
        );
        console.warn(
          `[skip] ${item.name}: no dist-tags.latest (missing for ${missingDays}d, prunes at ${PRUNE_AFTER_DAYS}d)`
        );
        continue;
      }
      delete item.missingSince;

      await delay(REQUEST_DELAY_MS);
      const apiDownloads: any = await fetchWithRetry(
        `https://api.npmjs.org/downloads/point/last-month/${item.name}`
      );

      item.description = sanitizeHtml(d.description ?? '', {
        allowedTags: [],
        allowedAttributes: {},
      });
      // remove markdown links from description (e.g. [link](url))
      item.description = item.description.trim().replace(/\[(.*?)\]\(.*?\)/gm, '$1');
      item.url = `https://www.npmjs.org/${item.name}`;
      item.registry = `https://registry.npmjs.org/${item.name}`;
      item.bundled = typeof item.bundled === 'boolean' ? item.bundled : false;
      item.origin = item.origin ? item.origin : 'community';
      item.category = item.category ? item.category : 'authentication';
      item.latest = latest;
      item.downloads = apiDownloads.downloads;
      item.modified = d.time?.modified ?? d.time?.[latest];

      const repository = extractRepository(d.repository);
      if (repository) {
        item.repository = repository;
      } else {
        delete item.repository;
      }

      await delay(REQUEST_DELAY_MS);
      const vulnerabilities = await fetchVulnerabilities(item.name);
      if (vulnerabilities) {
        item.vulnerabilities = vulnerabilities;
      } else {
        delete item.vulnerabilities;
      }

      processed++;
      // eslint-disable-next-line no-console
      console.info(`[addon] ${processed}/${data.addons.length} ${item.name}`);
    } catch (err: any) {
      const status = err?.response?.statusCode;
      if (status === 404) {
        if (!item.missingSince) {
          item.missingSince = new Date().toISOString();
        }
        // eslint-disable-next-line no-console
        console.warn(`[skip] ${item.name}: 404 from registry, marked missing`);
      } else {
        // eslint-disable-next-line no-console
        console.error('error for %s', item.name, err);
      }
    }
  }

  // Prune entries that have been missing longer than PRUNE_AFTER_DAYS
  const cutoff = Date.now() - PRUNE_AFTER_DAYS * 86_400_000;
  const before = data.addons.length;
  const pruned: string[] = [];
  data.addons = data.addons.filter((item: any) => {
    if (!item.missingSince) return true;
    if (new Date(item.missingSince).getTime() <= cutoff) {
      pruned.push(item.name);
      return false;
    }
    return true;
  });
  if (pruned.length > 0) {
    // eslint-disable-next-line no-console
    console.info(
      `[prune] dropped ${pruned.length}/${before} addon(s) missing > ${PRUNE_AFTER_DAYS}d:`,
      pruned.join(', ')
    );
  }

  await fs.writeFile(
    path.join(__dirname, '../website/src/components/EcosystemSearch/addons.json'),
    JSON.stringify({ ...data }, null, 4)
  );
  // eslint-disable-next-line no-console
  console.info(`[addon] Done: ${processed} addons updated, ${pruned.length} pruned`);
})();
