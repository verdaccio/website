import fs from 'fs/promises';
import got from 'got';
import path from 'path';

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 2000;
const REQUEST_DELAY_MS = 1500;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

(async () => {
  const data = require('../website/src/components/EcosystemSearch/addons.json');
  let processed = 0;
  for (let item of data.addons) {
    try {
      if (processed > 0) await delay(REQUEST_DELAY_MS);

      const d: any = await fetchWithRetry(`https://registry.npmjs.org/${item.name}`);
      await delay(REQUEST_DELAY_MS);
      const apiDownloads: any = await fetchWithRetry(
        `https://api.npmjs.org/downloads/point/last-month/${item.name}`
      );

      item.description = d.description;
      // remove html tags from description (e.g. <h1...>)
      // CodeQL js/incomplete-multi-character-sanitization
      let previous;
      do {
        previous = item.description;
        item.description = item.description.replace(/<[^>]*>?/gm, '');
      } while (item.description !== previous);
      // remove markdown links from description (e.g. [link](url))
      item.description = item.description.trim().replace(/\[(.*?)\]\(.*?\)/gm, '$1');
      item.url = `https://www.npmjs.org/${item.name}`;
      item.registry = `https://registry.npmjs.org/${item.name}`;
      item.bundled = typeof item.bundled === 'boolean' ? item.bundled : false;
      item.origin = item.origin ? item.origin : 'community';
      item.category = item.category ? item.category : 'authentication';
      item.latest = d['dist-tags'].latest;
      item.downloads = apiDownloads.downloads;
      processed++;
      // eslint-disable-next-line no-console
      console.info(`[addon] ${processed}/${data.addons.length} ${item.name}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error for %s', item.name, err);
    }
  }
  await fs.writeFile(
    path.join(__dirname, '../website/src/components/EcosystemSearch/addons.json'),
    JSON.stringify({ ...data }, null, 4)
  );
  // eslint-disable-next-line no-console
  console.info(`[addon] Done: ${processed} addons updated`);
})();
