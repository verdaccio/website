import React from 'react';

import { dockerPulls, monthlyDownloads, yearlyDownloads } from '@verdaccio/local-scripts';

import styles from './TotalDownloadsHero.module.scss';

// Total npm downloads across all years
const totalNpmDownloads = Object.values(yearlyDownloads).reduce(
  (sum: number, count) => sum + (count as number),
  0
);

// Total docker pulls (sum of all weekly pull counts)
const totalDockerPulls = Object.values(dockerPulls).reduce(
  (sum: number, entry) => sum + (entry as { pullCount: number }).pullCount,
  0
);

const grandTotal = totalNpmDownloads + totalDockerPulls;

// Latest month downloads
const latestMonth = monthlyDownloads[monthlyDownloads.length - 1];
const latestMonthLabel = latestMonth?.start
  ? new Date(latestMonth.start).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  : '';

// Data collection dates
const npmStartYear = Object.keys(yearlyDownloads).sort()[0];
const dockerDates = Object.keys(dockerPulls).sort();
const dockerStartLabel = dockerDates[0]
  ? new Date(dockerDates[0]).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  : '';

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

const TotalDownloadsHero: React.FC = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.mainStat}>
        <span className={styles.number}>{formatNumber(grandTotal)}</span>
        <span className={styles.label}>Total Downloads + Pulls</span>
      </div>
      <div className={styles.breakdown}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{formatNumber(totalNpmDownloads)}</span>
          <span className={styles.statLabel}>npm Downloads (since {npmStartYear})</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNumber}>{formatNumber(totalDockerPulls)}</span>
          <span className={styles.statLabel}>Docker Pulls (since {dockerStartLabel})</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNumber}>{formatNumber(latestMonth?.downloads || 0)}</span>
          <span className={styles.statLabel}>{latestMonthLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default TotalDownloadsHero;
