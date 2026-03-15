import { Credentials, TranslationStatus } from '@crowdin/crowdin-api-client';
import got from 'got';
import fs from 'node:fs/promises';
import path from 'node:path';

export interface MonthlyDownloadEntry {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

export interface DockerPullEntry {
  pullCount: number;
  ipCount: number;
}

export interface NpmjsDownloadsEntry {
  [version: string]: number;
}

export interface YearlyDownloadsEntry {
  [year: string]: number;
}

export interface TranslationProgress {
  translationProgress: number;
  approvalProgress: number;
}

export interface ProgressLangEntry {
  [language: string]: TranslationProgress;
}

const debug = require('debug')('verdaccio:local-scripts');

const token = process.env.TOKEN || '';
const START_YEAR = 2016;
const END_YEAR = new Date().getFullYear();
const END_MONTH = new Date().getMonth() + 1;
const API_URL = 'https://api.npmjs.org/downloads/point';
const PACKAGE_NAME = 'verdaccio';

const ECOSYSTEM_PACKAGES = [
  '@verdaccio/auth',
  '@verdaccio/config',
  '@verdaccio/core',
  '@verdaccio/hooks',
  '@verdaccio/loaders',
  '@verdaccio/local-storage-legacy',
  '@verdaccio/logger',
  '@verdaccio/middleware',
  '@verdaccio/proxy',
  '@verdaccio/search-indexer',
  '@verdaccio/signature',
  '@verdaccio/streams',
  '@verdaccio/tarball',
  '@verdaccio/ui-theme',
  '@verdaccio/url',
  '@verdaccio/utils',
  'verdaccio-auth-memory',
  'verdaccio-memory',
];

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 2000;
const REQUEST_DELAY_MS = 3000;

export const getISODateOnly = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry<T>(url: string, retries = MAX_RETRIES): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = (await got.get(url, { timeout: { request: 30000 } }).json()) as T;
      return response;
    } catch (error: any) {
      const status = error?.response?.statusCode;
      const isRateLimit = status === 429;
      const isServerError = status >= 500;
      const isRetryable = isRateLimit || isServerError;

      if (attempt < retries && isRetryable) {
        const retryAfter = isRateLimit
          ? parseInt(error?.response?.headers?.['retry-after'] || '0', 10) * 1000
          : 0;
        const backoff = Math.max(retryAfter, INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt - 1));
        // eslint-disable-next-line no-console
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

function getMonthKey(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, '0')}-01`;
}

async function fetchDownloadData(
  year: number,
  month: number
): Promise<MonthlyDownloadEntry | null> {
  const startDate = getMonthKey(year, month);
  const endDate = `${year}-${String(month).padStart(2, '0')}-${new Date(year, month, 0).getDate()}`;
  const url = `${API_URL}/${startDate}:${endDate}/${PACKAGE_NAME}`;

  try {
    const data = await fetchWithRetry<MonthlyDownloadEntry>(url);
    // eslint-disable-next-line no-console
    console.info(
      `  [monthly] fetched ${startDate} -> ${endDate}: ${data.downloads.toLocaleString()} downloads`
    );
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`  [monthly] failed ${startDate} -> ${endDate}:`, error);
    return null;
  }
}

export async function fetchMonthlyData() {
  const npmjsFile = path.join(__dirname, '../../src/monthly_downloads.json');

  let existing: MonthlyDownloadEntry[] = [];
  try {
    existing = JSON.parse(await fs.readFile(npmjsFile, 'utf8'));
    // eslint-disable-next-line no-console
    console.info(`[monthly] Loaded ${existing.length} existing entries`);
  } catch {
    // eslint-disable-next-line no-console
    console.info('[monthly] No existing data, starting fresh');
  }

  const existingKeys = new Set(existing.map((e) => e.start));
  const currentMonthKey = getMonthKey(END_YEAR, END_MONTH);
  const results: MonthlyDownloadEntry[] = existing.filter((e) => e.start !== currentMonthKey);

  let fetched = 0;
  let skipped = 0;

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    for (let month = 1; month <= 12; month++) {
      if (year === END_YEAR && month > END_MONTH) break;

      const key = getMonthKey(year, month);
      const isCurrentMonth = key === currentMonthKey;

      if (existingKeys.has(key) && !isCurrentMonth) {
        skipped++;
        continue;
      }

      if (fetched > 0) await delay(REQUEST_DELAY_MS);
      const data = await fetchDownloadData(year, month);
      if (data) results.push(data);
      fetched++;
    }
  }

  results.sort((a, b) => a.start.localeCompare(b.start));
  await fs.writeFile(npmjsFile, JSON.stringify(results));
  // eslint-disable-next-line no-console
  console.info(`[monthly] Done: ${fetched} fetched, ${skipped} cached, ${results.length} total`);
}

export async function fetchYearlyData() {
  const monthlyFile = path.join(__dirname, '../../src/monthly_downloads.json');
  const yearlyFile = path.join(__dirname, '../../src/yearly_downloads.json');

  let monthlyData: MonthlyDownloadEntry[] = [];
  try {
    monthlyData = JSON.parse(await fs.readFile(monthlyFile, 'utf8'));
  } catch {
    // eslint-disable-next-line no-console
    console.info('[yearly] No monthly data found, run downloads:monthly first');
    return;
  }

  let existingYearly: YearlyDownloadsEntry = {};
  try {
    existingYearly = JSON.parse(await fs.readFile(yearlyFile, 'utf8'));
  } catch {
    // no existing yearly data
  }

  const results: YearlyDownloadsEntry = {};
  for (const entry of monthlyData) {
    const year = entry.start.slice(0, 4);
    results[year] = (results[year] || 0) + entry.downloads;
  }

  // Log changes compared to previous data
  for (const [year, total] of Object.entries(results)) {
    const prev = existingYearly[year] || 0;
    const diff = total - prev;
    if (diff !== 0) {
      // eslint-disable-next-line no-console
      console.info(
        `  [yearly] ${year}: ${total.toLocaleString()} downloads (${diff > 0 ? '+' : ''}${diff.toLocaleString()})`
      );
    }
  }

  await fs.writeFile(yearlyFile, JSON.stringify(results));
  // eslint-disable-next-line no-console
  console.info(`[yearly] Aggregated ${Object.keys(results).length} years from monthly data`);
}

export async function fetchNpmjsApiDownloadsWeekly() {
  try {
    const npmjsFile = path.join(__dirname, '../../src/npmjs_downloads.json');
    const currentDate = getISODateOnly();
    const npmjsDownloads: NpmjsDownloadsEntry = JSON.parse(await fs.readFile(npmjsFile, 'utf8'));

    const totalEntries = Object.keys(npmjsDownloads).length;

    if (npmjsDownloads[currentDate]) {
      // eslint-disable-next-line no-console
      console.info(`[weekly] Already fetched for ${currentDate} (${totalEntries} total entries)`);
      return;
    }

    const response = await fetchWithRetry<{ downloads: number }>(
      'https://api.npmjs.org/versions/verdaccio/last-week'
    );

    npmjsDownloads[currentDate] = response.downloads;

    await fs.writeFile(npmjsFile, JSON.stringify(npmjsDownloads));
    // eslint-disable-next-line no-console
    console.info(
      `[weekly] Saved ${currentDate}: ${response.downloads.toLocaleString()} downloads (${totalEntries + 1} total entries)`
    );
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(`[weekly] Error:`, err);
    process.exit(1);
  }
}

export async function dockerPullWeekly() {
  try {
    const npmjsFile = path.join(__dirname, '../../src/docker_pull.json');
    const pullCounts: { [date: string]: DockerPullEntry } = JSON.parse(
      await fs.readFile(npmjsFile, 'utf8')
    );

    const existingCount = Object.keys(pullCounts).length;

    const response = await fetchWithRetry<{
      repos: {
        'verdaccio/verdaccio': {
          pulls: { end: string; pullCount: number; ipCount: number }[];
        };
      };
    }>('https://hub.docker.com/api/publisher/proxylytics/v1/repos/pulls?repos=verdaccio/verdaccio');
    const currentPulls = response.repos['verdaccio/verdaccio'].pulls;
    let added = 0;
    currentPulls.forEach(({ end, pullCount, ipCount }) => {
      if (pullCounts[end]) {
        return;
      }
      pullCounts[end] = { pullCount, ipCount };
      // eslint-disable-next-line no-console
      console.info(
        `  [docker] New: ${end} - ${pullCount.toLocaleString()} pulls, ${ipCount.toLocaleString()} unique IPs`
      );
      added++;
    });
    await fs.writeFile(npmjsFile, JSON.stringify(pullCounts));
    // eslint-disable-next-line no-console
    console.info(
      `[docker] ${added} new entries added (${existingCount} existing, ${existingCount + added} total)`
    );
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(`[docker] Error:`, err);
    process.exit(1);
  }
}

export interface EcosystemDownloadsEntry {
  [packageName: string]: { [month: string]: number };
}

export async function fetchEcosystemDownloads() {
  const ecosystemFile = path.join(__dirname, '../../src/ecosystem_downloads.json');

  let existing: EcosystemDownloadsEntry = {};
  try {
    existing = JSON.parse(await fs.readFile(ecosystemFile, 'utf8'));
    // eslint-disable-next-line no-console
    console.info(`[ecosystem] Loaded existing data for ${Object.keys(existing).length} packages`);
  } catch {
    // eslint-disable-next-line no-console
    console.info('[ecosystem] No existing data, starting fresh');
  }

  for (const pkg of ECOSYSTEM_PACKAGES) {
    if (!existing[pkg]) {
      existing[pkg] = {};
    }

    // Only fetch months we don't have yet + always re-fetch current month
    for (let year = 2025; year <= END_YEAR; year++) {
      for (let month = 1; month <= 12; month++) {
        if (year === END_YEAR && month > END_MONTH) break;

        const key = getMonthKey(year, month);
        if (existing[pkg][key] !== undefined) {
          // eslint-disable-next-line no-console
          console.info(`  [ecosystem] ${pkg} ${key}: skipped (cached)`);
          continue;
        }

        const startDate = key;
        const endDate = `${year}-${String(month).padStart(2, '0')}-${new Date(year, month, 0).getDate()}`;
        const url = `${API_URL}/${startDate}:${endDate}/${encodeURIComponent(pkg)}`;

        try {
          await delay(REQUEST_DELAY_MS);
          const data = await fetchWithRetry<{ downloads: number }>(url);
          existing[pkg][key] = data.downloads;
          // eslint-disable-next-line no-console
          console.info(`  [ecosystem] ${pkg} ${startDate}: ${data.downloads.toLocaleString()}`);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`  [ecosystem] ${pkg} ${startDate}: failed`, error);
        }
      }
    }
  }

  await fs.writeFile(ecosystemFile, JSON.stringify(existing));
  // eslint-disable-next-line no-console
  console.info(`[ecosystem] Done: ${Object.keys(existing).length} packages saved`);
}

export async function fetchAllDownloads() {
  // eslint-disable-next-line no-console
  console.info('[downloads] Starting all download fetches...\n');

  // eslint-disable-next-line no-console
  console.info('[downloads] 1/5 Fetching npmjs weekly...');
  await fetchNpmjsApiDownloadsWeekly();
  // eslint-disable-next-line no-console
  console.info('');

  // eslint-disable-next-line no-console
  console.info('[downloads] 2/5 Fetching docker pulls...');
  await dockerPullWeekly();
  // eslint-disable-next-line no-console
  console.info('');

  // eslint-disable-next-line no-console
  console.info('[downloads] 3/5 Fetching monthly downloads (incremental)...');
  await fetchMonthlyData();
  // eslint-disable-next-line no-console
  console.info('');

  // eslint-disable-next-line no-console
  console.info('[downloads] 4/5 Aggregating yearly downloads...');
  await fetchYearlyData();
  // eslint-disable-next-line no-console
  console.info('');

  // eslint-disable-next-line no-console
  console.info('[downloads] 5/5 Fetching ecosystem package downloads...');
  await fetchEcosystemDownloads();
  // eslint-disable-next-line no-console
  console.info('');

  // eslint-disable-next-line no-console
  console.info('[downloads] All done.');
}

export async function fetchTranslationsAPI() {
  try {
    debug('api report start');
    const credentials: Credentials = {
      token,
    };
    const api: TranslationStatus = new TranslationStatus(credentials);
    const progress = await api.getProjectProgress(295539, { limit: 100 });
    const final: ProgressLangEntry = progress.data.reduce((acc: ProgressLangEntry, item) => {
      const { languageId, translationProgress, approvalProgress } = item.data;
      acc[languageId] = { translationProgress, approvalProgress };
      return acc;
    }, {});
    const location = path.join(__dirname, '../../src/progress_lang.json');
    await fs.writeFile(location, JSON.stringify(final));
    // eslint-disable-next-line no-console
    debug('translations written at %s ends', location);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(`error on process crowdin translations run`, err);
    process.exit(1);
  }
}
