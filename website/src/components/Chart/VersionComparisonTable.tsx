import React from 'react';
import semver from 'semver';

import { npmjsDownloads } from '@verdaccio/local-scripts';

import styles from './DataTable.module.scss';

interface VersionStats {
  version: string;
  totalDownloads: number;
  last6MonthsDownloads: number;
  previous6MonthsDownloads: number;
  growthPercent: number;
  trend: 'growing' | 'declining' | 'stable';
}

function buildVersionStats(): VersionStats[] {
  const dates = Object.keys(npmjsDownloads).sort();
  const last6Months = dates.slice(-6);
  const previous6Months = dates.slice(-12, -6);

  const versionTotals: Record<string, { total: number; recent: number; previous: number }> = {};

  dates.forEach((date) => {
    const downloads = npmjsDownloads[date];
    Object.entries(downloads).forEach(([version, count]) => {
      if (semver.prerelease(version)) return;
      const major = version.split('.')[0];
      if (major !== '5' && major !== '6') return;

      if (!versionTotals[version]) {
        versionTotals[version] = { total: 0, recent: 0, previous: 0 };
      }
      versionTotals[version].total += count as number;

      if (last6Months.includes(date)) {
        versionTotals[version].recent += count as number;
      }
      if (previous6Months.includes(date)) {
        versionTotals[version].previous += count as number;
      }
    });
  });

  return Object.entries(versionTotals)
    .map(([version, { total, recent, previous }]) => {
      const growthPercent =
        previous > 0 ? ((recent - previous) / previous) * 100 : recent > 0 ? 100 : 0;

      let trend: 'growing' | 'declining' | 'stable' = 'stable';
      if (growthPercent > 5) trend = 'growing';
      else if (growthPercent < -5) trend = 'declining';

      return {
        version,
        totalDownloads: total,
        last6MonthsDownloads: recent,
        previous6MonthsDownloads: previous,
        growthPercent,
        trend,
      };
    })
    .sort((a, b) => semver.rcompare(a.version, b.version));
}

const trendIcon = (trend: string) => {
  if (trend === 'growing') return '\u2191';
  if (trend === 'declining') return '\u2193';
  return '\u2192';
};

const trendClass = (trend: string) => {
  if (trend === 'growing') return styles.trendUp;
  if (trend === 'declining') return styles.trendDown;
  return styles.trendFlat;
};

function generateSummary(
  v5Stats: VersionStats[],
  v6Stats: VersionStats[],
  v5Total: number,
  v6Total: number,
  v5Recent: number,
  v6Recent: number
) {
  const lines: string[] = [];

  // Overall dominance
  const dominant = v5Total > v6Total ? 'v5.x' : 'v6.x';
  const ratio =
    v5Total > v6Total
      ? (v5Total / (v6Total || 1)).toFixed(1)
      : (v6Total / (v5Total || 1)).toFixed(1);
  lines.push(
    `Overall, ${dominant} leads in all-time downloads with roughly ${ratio}x more downloads than ${dominant === 'v5.x' ? 'v6.x' : 'v5.x'}.`
  );

  // Recent momentum
  const recentDominant = v5Recent > v6Recent ? 'v5.x' : 'v6.x';
  const recentOther = recentDominant === 'v5.x' ? 'v6.x' : 'v5.x';
  const recentRatio =
    v5Recent > v6Recent
      ? (v5Recent / (v6Recent || 1)).toFixed(1)
      : (v6Recent / (v5Recent || 1)).toFixed(1);
  lines.push(
    `In the last 6 months, ${recentDominant} continues to lead at ${recentRatio}x the volume of ${recentOther}.`
  );

  // Top version per major
  const topV5 = [...v5Stats].sort((a, b) => b.last6MonthsDownloads - a.last6MonthsDownloads)[0];
  const topV6 = [...v6Stats].sort((a, b) => b.last6MonthsDownloads - a.last6MonthsDownloads)[0];
  if (topV5) {
    lines.push(
      `The most popular v5.x release is ${topV5.version} with ${topV5.last6MonthsDownloads.toLocaleString()} downloads in the last 6 months.`
    );
  }
  if (topV6) {
    lines.push(
      `The most popular v6.x release is ${topV6.version} with ${topV6.last6MonthsDownloads.toLocaleString()} downloads in the last 6 months.`
    );
  }

  // Growing versions
  const growing = [...v5Stats, ...v6Stats]
    .filter((s) => s.trend === 'growing')
    .sort((a, b) => b.growthPercent - a.growthPercent);
  if (growing.length > 0) {
    const top3 = growing.slice(0, 3).map((s) => `${s.version} (+${Math.round(s.growthPercent)}%)`);
    lines.push(`Fastest growing versions: ${top3.join(', ')}.`);
  }

  // Declining versions
  const declining = [...v5Stats, ...v6Stats]
    .filter((s) => s.trend === 'declining')
    .sort((a, b) => a.growthPercent - b.growthPercent);
  if (declining.length > 0) {
    const top3 = declining.slice(0, 3).map((s) => `${s.version} (${Math.round(s.growthPercent)}%)`);
    lines.push(`Most declining versions: ${top3.join(', ')}.`);
  }

  // Adoption summary
  const v5Growing = v5Stats.filter((s) => s.trend === 'growing').length;
  const v5Declining = v5Stats.filter((s) => s.trend === 'declining').length;
  const v6Growing = v6Stats.filter((s) => s.trend === 'growing').length;
  const v6Declining = v6Stats.filter((s) => s.trend === 'declining').length;
  lines.push(
    `v5.x has ${v5Growing} growing and ${v5Declining} declining version(s). ` +
      `v6.x has ${v6Growing} growing and ${v6Declining} declining version(s).`
  );

  return lines;
}

const VersionComparisonTable: React.FC = () => {
  const allStats = buildVersionStats();
  const v5Stats = allStats.filter((s) => s.version.startsWith('5.'));
  const v6Stats = allStats.filter((s) => s.version.startsWith('6.'));

  const v5Total = v5Stats.reduce((sum, s) => sum + s.totalDownloads, 0);
  const v6Total = v6Stats.reduce((sum, s) => sum + s.totalDownloads, 0);
  const v5Recent = v5Stats.reduce((sum, s) => sum + s.last6MonthsDownloads, 0);
  const v6Recent = v6Stats.reduce((sum, s) => sum + s.last6MonthsDownloads, 0);

  const summary = generateSummary(v5Stats, v6Stats, v5Total, v6Total, v5Recent, v6Recent);

  return (
    <div>
      <h3 style={{ marginBottom: '0.5rem' }}>v5.x vs v6.x Overview</h3>
      <div className={styles.tableWrapper} style={{ maxHeight: 'none', marginBottom: '1.5rem' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Major</th>
              <th>All-time Downloads</th>
              <th>Last 6 Months</th>
              <th>Versions Tracked</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>v5.x</strong>
              </td>
              <td>{v5Total.toLocaleString()}</td>
              <td>{v5Recent.toLocaleString()}</td>
              <td>{v5Stats.length}</td>
            </tr>
            <tr>
              <td>
                <strong>v6.x</strong>
              </td>
              <td>{v6Total.toLocaleString()}</td>
              <td>{v6Recent.toLocaleString()}</td>
              <td>{v6Stats.length}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>v5.x Detail</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Version</th>
                  <th>All-time</th>
                  <th>Last 6m</th>
                  <th>Prev 6m</th>
                  <th>Growth</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {v5Stats.map((s) => (
                  <tr key={s.version}>
                    <td>
                      <strong>{s.version}</strong>
                    </td>
                    <td>{s.totalDownloads.toLocaleString()}</td>
                    <td>{s.last6MonthsDownloads.toLocaleString()}</td>
                    <td>{s.previous6MonthsDownloads.toLocaleString()}</td>
                    <td>
                      {s.growthPercent > 0 ? '+' : ''}
                      {Math.round(s.growthPercent)}%
                    </td>
                    <td>
                      <span className={`${styles.trendBadge} ${trendClass(s.trend)}`}>
                        <span className={styles.arrow}>{trendIcon(s.trend)}</span>
                        {s.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>v6.x Detail</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Version</th>
                  <th>All-time</th>
                  <th>Last 6m</th>
                  <th>Prev 6m</th>
                  <th>Growth</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {v6Stats.map((s) => (
                  <tr key={s.version}>
                    <td>
                      <strong>{s.version}</strong>
                    </td>
                    <td>{s.totalDownloads.toLocaleString()}</td>
                    <td>{s.last6MonthsDownloads.toLocaleString()}</td>
                    <td>{s.previous6MonthsDownloads.toLocaleString()}</td>
                    <td>
                      {s.growthPercent > 0 ? '+' : ''}
                      {Math.round(s.growthPercent)}%
                    </td>
                    <td>
                      <span className={`${styles.trendBadge} ${trendClass(s.trend)}`}>
                        <span className={styles.arrow}>{trendIcon(s.trend)}</span>
                        {s.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem 1.25rem',
          background: 'var(--ifm-color-emphasis-100)',
          borderRadius: '8px',
          fontSize: '0.9rem',
          lineHeight: '1.7',
          color: 'var(--ifm-color-emphasis-800)',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Summary</h3>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          {summary.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VersionComparisonTable;
