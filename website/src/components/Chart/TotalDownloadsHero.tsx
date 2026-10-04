import {
  dockerPulls,
  dockerPullsTotal,
  monthlyDownloads,
  yearlyDownloads,
} from '@verdaccio/local-scripts';

import styles from './TotalDownloadsHero.module.scss';

import React from 'react';

// Total npm downloads across all years
const totalNpmDownloads = Object.values(yearlyDownloads).reduce(
  (sum: number, count) => sum + (count as number),
  0
);

// The weekly proxylytics series only goes back to 2024; prefer the cumulative all-time
// pull_count and fall back to the weekly sum when the snapshot is unavailable.
const weeklyDockerPulls = Object.values(dockerPulls).reduce(
  (sum: number, entry) => sum + (entry as { pullCount: number }).pullCount,
  0
);
const dockerTotalDates = Object.keys(dockerPullsTotal).sort();
const latestDockerTotal = dockerTotalDates.length
  ? (dockerPullsTotal as Record<string, number>)[dockerTotalDates[dockerTotalDates.length - 1]]
  : 0;
const totalDockerPulls = latestDockerTotal || weeklyDockerPulls;

const grandTotal = totalNpmDownloads + totalDockerPulls;

// Latest month downloads
const latestMonth = monthlyDownloads[monthlyDownloads.length - 1];
const latestMonthLabel = latestMonth?.start
  ? new Date(latestMonth.start).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  : '';

// Data collection dates
const npmStartYear = Object.keys(yearlyDownloads).sort()[0];

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

const TotalDownloadsHero: React.FC = () => {
  return (
    <div className={styles.summary}>
      <div className={styles.stat}>
        <span className={styles.statNumber}>{formatNumber(grandTotal)}</span>
        <span className={styles.statLabel}>Total downloads + pulls · since {npmStartYear}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statNumber}>{formatNumber(totalNpmDownloads)}</span>
        <span className={styles.statLabel}>npm downloads · since {npmStartYear}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statNumber}>{formatNumber(totalDockerPulls)}</span>
        <span className={styles.statLabel}>Docker pulls · all-time</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statNumber}>{formatNumber(latestMonth?.downloads || 0)}</span>
        <span className={styles.statLabel}>{latestMonthLabel}</span>
      </div>
    </div>
  );
};

export default TotalDownloadsHero;
