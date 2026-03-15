import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import semver from 'semver';

import { npmjsDownloads } from '@verdaccio/local-scripts';

import DataTable from './DataTable';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const majorColors: Record<string, string> = {
  '5': 'rgb(75, 94, 64)',
  '6': 'rgb(33, 150, 243)',
};

const isPrerelease = (version: string) =>
  /(alpha|beta|next)/i.test(version) || /\d+\.\d+\.\d+-.+/.test(version);

const LatestAdoptionChart: React.FC = () => {
  const allDates = Object.keys(npmjsDownloads).sort();
  const majorsToTrack = ['5', '6'];

  // Build a map of the first date each version appeared in the data (proxy for release date)
  const firstSeen: Record<string, string> = {};
  allDates.forEach((date) => {
    const downloads = npmjsDownloads[date];
    Object.entries(downloads).forEach(([version, count]) => {
      if (isPrerelease(version)) return;
      if ((count as number) > 0 && !firstSeen[version]) {
        firstSeen[version] = date;
      }
    });
  });

  // For each date, determine the latest version per major based on release date (first seen),
  // not just highest semver. The "latest" is the highest semver that was already released by that date.
  const percentData: Record<string, number[]> = {};
  const latestVersionByDate: Record<string, string[]> = {};
  majorsToTrack.forEach((m) => {
    percentData[m] = [];
  });

  allDates.forEach((date, dateIdx) => {
    const downloads = npmjsDownloads[date];
    latestVersionByDate[date] = [];

    majorsToTrack.forEach((major) => {
      const versions: { version: string; count: number }[] = [];
      Object.entries(downloads).forEach(([version, count]) => {
        if (isPrerelease(version)) return;
        if (version.split('.')[0] !== major) return;
        versions.push({ version, count: count as number });
      });

      if (versions.length === 0) {
        percentData[major].push(0);
        latestVersionByDate[date].push('-');
        return;
      }

      // Only consider versions that were released on or before this date
      const releasedVersions = versions
        .filter((v) => firstSeen[v.version] && firstSeen[v.version] <= date)
        .map((v) => v.version);

      if (releasedVersions.length === 0) {
        percentData[major].push(0);
        latestVersionByDate[date].push('-');
        return;
      }

      const latestVersion = releasedVersions.sort((a, b) => semver.rcompare(a, b))[0];
      const totalMajor = versions.reduce((sum, v) => sum + v.count, 0);
      const latestCount = versions.find((v) => v.version === latestVersion)?.count || 0;

      const pct = totalMajor > 0 ? (latestCount / totalMajor) * 100 : 0;
      percentData[major].push(Math.round(pct * 10) / 10);
      latestVersionByDate[date].push(latestVersion);
    });
  });

  // Detect where the latest version changes (new release) per major
  const releasePoints: Record<string, { dateIndex: number; version: string }[]> = {};
  majorsToTrack.forEach((major, mIdx) => {
    releasePoints[major] = [];
    let prevLatest = '';
    allDates.forEach((date, i) => {
      const cur = latestVersionByDate[date]?.[mIdx] || '-';
      if (cur !== '-' && cur !== prevLatest) {
        releasePoints[major].push({ dateIndex: i, version: cur });
        prevLatest = cur;
      }
    });
  });

  const datasets = majorsToTrack.map((major, mIdx) => {
    const releases = releasePoints[major];
    const releaseIndices = new Set(releases.map((r) => r.dateIndex));

    return {
      label: `v${major}.x latest patch`,
      data: percentData[major],
      borderColor: majorColors[major],
      backgroundColor: majorColors[major]?.replace('rgb', 'rgba').replace(')', ', 0.1)'),
      tension: 0.3,
      pointRadius: percentData[major].map((_, i) => (releaseIndices.has(i) ? 6 : 0)),
      pointHoverRadius: 6,
      pointBackgroundColor: majorColors[major],
      borderWidth: 2,
    };
  });

  // Custom plugin to draw version labels at release points
  const releaseLabelPlugin = {
    id: 'releaseLabels',
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      ctx.save();
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';

      majorsToTrack.forEach((major, mIdx) => {
        const meta = chart.getDatasetMeta(mIdx);
        const releases = releasePoints[major];
        ctx.fillStyle = majorColors[major] || '#333';

        releases.forEach(({ dateIndex, version }) => {
          const point = meta.data[dateIndex];
          if (!point) return;
          const x = point.x;
          const y = point.y;
          // Alternate label position above/below to reduce overlap
          const offset = mIdx === 0 ? -14 : 14;
          ctx.textBaseline = mIdx === 0 ? 'bottom' : 'top';
          ctx.fillText(version, x, y + offset);
        });
      });

      ctx.restore();
    },
  };

  const chartData = { labels: allDates, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Latest Patch Adoption Rate (% of major downloads)',
        font: { size: 14, weight: 'bold' as const },
        padding: { bottom: 16 },
      },
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 12, padding: 12 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const date = allDates[context.dataIndex];
            const majorIdx = majorsToTrack.indexOf(
              context.dataset.label.replace('v', '').replace('.x latest patch', '')
            );
            const ver = latestVersionByDate[date]?.[majorIdx] || '';
            return `${context.dataset.label}: ${context.raw}%${ver && ver !== '-' ? ` (${ver})` : ''}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Date' },
        grid: { display: false },
        ticks: { maxTicksLimit: 10 },
      },
      y: {
        title: { display: true, text: '% on Latest Patch' },
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  const tableHeaders = ['Date', ...majorsToTrack.flatMap((m) => [`v${m}.x latest`, `v${m}.x %`])];
  const tableRows = allDates
    .map((date, i) => [
      date,
      ...majorsToTrack.flatMap((m, mIdx) => [
        latestVersionByDate[date]?.[mIdx] || '-',
        `${percentData[m][i]}%`,
      ]),
    ])
    .reverse();

  return (
    <div>
      <Line data={chartData} options={options} plugins={[releaseLabelPlugin]} />
      <DataTable headers={tableHeaders} rows={tableRows} />
    </div>
  );
};

export default LatestAdoptionChart;
