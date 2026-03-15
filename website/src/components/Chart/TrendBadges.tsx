import React from 'react';

import styles from './DataTable.module.scss';

export interface TrendInfo {
  label: string;
  percentChange: number;
}

interface TrendBadgesProps {
  trends: TrendInfo[];
}

const TrendBadges: React.FC<TrendBadgesProps> = ({ trends }) => {
  if (trends.length === 0) return null;

  return (
    <div className={styles.trendList}>
      {trends.map(({ label, percentChange }) => {
        const isUp = percentChange > 5;
        const isDown = percentChange < -5;
        const trendClass = isUp ? styles.trendUp : isDown ? styles.trendDown : styles.trendFlat;
        const arrow = isUp ? '\u2191' : isDown ? '\u2193' : '\u2192';
        const sign = percentChange > 0 ? '+' : '';

        return (
          <span key={label} className={`${styles.trendBadge} ${trendClass}`}>
            <span className={styles.arrow}>{arrow}</span>
            {label} {sign}
            {Math.round(percentChange)}%
          </span>
        );
      })}
    </div>
  );
};

/**
 * Computes trend by comparing the last data point against the one before it.
 */
export function computeTrend(dataPoints: number[]): number {
  if (dataPoints.length < 2) {
    return 0;
  }

  const recent = dataPoints[dataPoints.length - 1];
  const previous = dataPoints[dataPoints.length - 2];

  if (previous === 0) return 0;
  return ((recent - previous) / previous) * 100;
}

export default TrendBadges;
