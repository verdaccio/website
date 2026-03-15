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

const isPrerelease = (version: string) =>
  /(alpha|beta|next)/i.test(version) || /\d+\.\d+\.\d+-.+/.test(version);

const majorColors: Record<string, string> = {
  '5': 'rgb(75, 94, 64)',
  '6': 'rgb(33, 150, 243)',
};

interface MajorData {
  cumulative: number[];
  releases: { weekIndex: number; version: string }[];
}

function buildCumulativeByMajor(major: string): MajorData {
  const allDates = Object.keys(npmjsDownloads).sort();
  const cumulative: number[] = [];
  const releases: { weekIndex: number; version: string }[] = [];
  let runningTotal = 0;
  let started = false;
  let weekIndex = 0;

  // Track first-seen to detect new releases
  const seen = new Set<string>();
  let currentLatest = '';

  allDates.forEach((date) => {
    const downloads = npmjsDownloads[date];
    let periodTotal = 0;
    const newVersions: string[] = [];

    Object.entries(downloads).forEach(([version, count]) => {
      if (isPrerelease(version)) return;
      if (version.split('.')[0] !== major) return;
      periodTotal += count as number;

      if (!seen.has(version) && (count as number) > 0) {
        seen.add(version);
        newVersions.push(version);
      }
    });

    if (periodTotal > 0) started = true;
    if (started) {
      runningTotal += periodTotal;
      cumulative.push(runningTotal);

      // Check if there's a new highest version released this period
      if (newVersions.length > 0) {
        const allReleased = [...seen].sort((a, b) => semver.rcompare(a, b));
        const latestNow = allReleased[0];
        if (latestNow && latestNow !== currentLatest) {
          releases.push({ weekIndex, version: latestNow });
          currentLatest = latestNow;
        }
      }

      weekIndex++;
    }
  });

  return { cumulative, releases };
}

const CumulativeAdoptionChart: React.FC = () => {
  const majorsToTrack = ['5', '6'];
  const majorData: Record<string, MajorData> = {};
  majorsToTrack.forEach((m) => {
    majorData[m] = buildCumulativeByMajor(m);
  });

  const maxWeeks = Math.max(...majorsToTrack.map((m) => majorData[m].cumulative.length));
  const labels = Array.from({ length: maxWeeks }, (_, i) => `Week ${i + 1}`);

  const datasets = majorsToTrack.map((major) => {
    const { cumulative, releases } = majorData[major];
    const releaseIndices = new Set(releases.map((r) => r.weekIndex));

    return {
      label: `v${major}.x`,
      data: cumulative,
      borderColor: majorColors[major],
      backgroundColor: majorColors[major]?.replace('rgb', 'rgba').replace(')', ', 0.1)'),
      tension: 0.3,
      pointRadius: cumulative.map((_, i) => (releaseIndices.has(i) ? 5 : 0)),
      pointHoverRadius: 5,
      pointBackgroundColor: majorColors[major],
      borderWidth: 2,
    };
  });

  // Custom plugin to draw version labels at release points
  const releaseLabelPlugin = {
    id: 'cumulativeReleaseLabels',
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      ctx.save();
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';

      majorsToTrack.forEach((major, mIdx) => {
        const meta = chart.getDatasetMeta(mIdx);
        const { releases } = majorData[major];
        ctx.fillStyle = majorColors[major] || '#333';

        // Only label every other release to reduce clutter
        const filtered = releases.filter((_, i) => i % 2 === 0 || i === releases.length - 1);

        filtered.forEach(({ weekIndex, version }) => {
          const point = meta.data[weekIndex];
          if (!point) return;
          const offset = mIdx === 0 ? -12 : 14;
          ctx.textBaseline = mIdx === 0 ? 'bottom' : 'top';
          ctx.fillText(version, point.x, point.y + offset);
        });
      });

      ctx.restore();
    },
  };

  const chartData = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Cumulative Adoption: v5.x vs v6.x (from first release)',
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
            const major = majorsToTrack[context.datasetIndex];
            const weekIdx = context.dataIndex;
            const release = majorData[major].releases.find((r) => r.weekIndex === weekIdx);
            const suffix = release ? ` (released ${release.version})` : '';
            return `${context.dataset.label}: ${Number(context.raw).toLocaleString()}${suffix}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Weeks since first release' },
        grid: { display: false },
        ticks: { maxTicksLimit: 12 },
      },
      y: {
        title: { display: true, text: 'Cumulative Downloads' },
        ticks: {
          callback: (value) => Number(value).toLocaleString(),
        },
      },
    },
  };

  // Show every 4th week in the table
  const step = 4;
  const tableRows: (string | number)[][] = [];
  for (let i = 0; i < maxWeeks; i += step) {
    tableRows.push([
      `Week ${i + 1}`,
      majorData['5'].cumulative[i] ?? '-',
      majorData['6'].cumulative[i] ?? '-',
    ]);
  }

  return (
    <div>
      <Line data={chartData} options={options} plugins={[releaseLabelPlugin]} />
      <DataTable headers={['Week', 'v5.x Cumulative', 'v6.x Cumulative']} rows={tableRows} />
    </div>
  );
};

export default CumulativeAdoptionChart;
