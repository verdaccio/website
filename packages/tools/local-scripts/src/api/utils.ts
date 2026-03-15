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

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 2000;
const REQUEST_DELAY_MS = 500;

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
  debug('fetching data for %s to %s', startDate, endDate);
  const url = `${API_URL}/${startDate}:${endDate}/${PACKAGE_NAME}`;

  try {
    return await fetchWithRetry<MonthlyDownloadEntry>(url);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to fetch data for ${startDate} to ${endDate}:`, error);
    return null;
  }
}

export async function fetchMonthlyData() {
  const npmjsFile = path.join(__dirname, '../../src/monthly_downloads.json');

  let existing: MonthlyDownloadEntry[] = [];
  try {
    existing = JSON.parse(await fs.readFile(npmjsFile, 'utf8'));
  } catch {
    // file doesn't exist yet, start fresh
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

      debug('fetching data for %s %s', year, month);
      if (fetched > 0) await delay(REQUEST_DELAY_MS);
      const data = await fetchDownloadData(year, month);
      if (data) results.push(data);
      fetched++;
    }
  }

  results.sort((a, b) => a.start.localeCompare(b.start));
  await fs.writeFile(npmjsFile, JSON.stringify(results));
  // eslint-disable-next-line no-console
  console.info(`[monthly] Done: ${fetched} fetched, ${skipped} cached`);
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

  const results: YearlyDownloadsEntry = {};
  for (const entry of monthlyData) {
    const year = entry.start.slice(0, 4);
    results[year] = (results[year] || 0) + entry.downloads;
  }

  await fs.writeFile(yearlyFile, JSON.stringify(results));
  // eslint-disable-next-line no-console
  console.info(`[yearly] Aggregated ${Object.keys(results).length} years from monthly data`);
}

export async function fetchNpmjsApiDownloadsWeekly() {
  try {
    const npmjsFile = path.join(__dirname, '../../src/npmjs_downloads.json');
    const currentDate = getISODateOnly();
    debug('current date %s', currentDate);
    const npmjsDownloads: NpmjsDownloadsEntry = JSON.parse(await fs.readFile(npmjsFile, 'utf8'));
    if (npmjsDownloads[currentDate]) {
      // eslint-disable-next-line no-console
      console.info('already fetched for today');
      return;
    }

    const response = await fetchWithRetry<{ downloads: number }>(
      'https://api.npmjs.org/versions/verdaccio/last-week'
    );

    npmjsDownloads[currentDate] = response.downloads;

    await fs.writeFile(npmjsFile, JSON.stringify(npmjsDownloads));
    // eslint-disable-next-line no-console
    console.info(`[weekly] npmjs downloads saved for ${currentDate}`);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(`error on process npmjs downloads run`, err);
    process.exit(1);
  }
}

export async function dockerPullWeekly() {
  try {
    const npmjsFile = path.join(__dirname, '../../src/docker_pull.json');
    const currentDate = getISODateOnly();
    debug('current date %s', currentDate);
    const pullCounts: { [date: string]: DockerPullEntry } = JSON.parse(
      await fs.readFile(npmjsFile, 'utf8')
    );

    const response = await fetchWithRetry<{
      repos: {
        'verdaccio/verdaccio': {
          pulls: { end: string; pullCount: number; ipCount: number }[];
        };
      };
    }>(
      'https://hub.docker.com/api/publisher/proxylytics/v1/repos/pulls?repos=verdaccio/verdaccio'
    );
    const currentPulls = response.repos['verdaccio/verdaccio'].pulls;
    let added = 0;
    currentPulls.forEach(({ end, pullCount, ipCount }) => {
      if (pullCounts[end]) {
        debug(`docker ${end} already fetched`);
        return;
      }
      pullCounts[end] = { pullCount, ipCount };
      added++;
    });
    await fs.writeFile(npmjsFile, JSON.stringify(pullCounts));
    // eslint-disable-next-line no-console
    console.info(`[docker] ${added} new entries added`);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(`error on process docker downloads run`, err);
    process.exit(1);
  }
}

export async function fetchAllDownloads() {
  // eslint-disable-next-line no-console
  console.info('[downloads] Starting all download fetches...');

  // Docker + npmjs weekly are single API calls, run first
  // eslint-disable-next-line no-console
  console.info('[downloads] Fetching npmjs weekly...');
  await fetchNpmjsApiDownloadsWeekly();

  // eslint-disable-next-line no-console
  console.info('[downloads] Fetching docker pulls...');
  await dockerPullWeekly();

  // Monthly is incremental (only fetches missing months), then yearly aggregates from it
  // eslint-disable-next-line no-console
  console.info('[downloads] Fetching monthly downloads...');
  await fetchMonthlyData();

  // eslint-disable-next-line no-console
  console.info('[downloads] Aggregating yearly downloads...');
  await fetchYearlyData();

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
