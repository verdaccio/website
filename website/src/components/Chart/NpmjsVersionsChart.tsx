import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
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
import TrendBadges, { computeTrend } from './TrendBadges';
import type { TrendInfo } from './TrendBadges';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const versionColors = [
  '#4B5E40',
  '#2196F3',
  '#FF9800',
  '#9C27B0',
  '#E91E63',
  '#00BCD4',
  '#795548',
  '#607D8B',
  '#F44336',
  '#4CAF50',
  '#FF5722',
  '#3F51B5',
  '#CDDC39',
  '#009688',
  '#FFC107',
];

// Base hue per major version for prerelease gradient coloring
const majorBaseColors: Record<string, [number, number, number]> = {
  '3': [121, 85, 72], // brown
  '4': [96, 125, 139], // blue-grey
  '5': [75, 94, 64], // green (verdaccio)
  '6': [33, 150, 243], // blue
  '7': [156, 39, 176], // purple
  '8': [233, 30, 99], // pink
};

function getMajorGradientColor(major: string, index: number, total: number): string {
  const base = majorBaseColors[major] || [100, 100, 100];
  // Vary lightness: first version is darkest, last is lightest
  const lightnessFactor = total > 1 ? 0.3 + (index / (total - 1)) * 0.5 : 0.5;
  const r = Math.round(base[0] + (255 - base[0]) * lightnessFactor);
  const g = Math.round(base[1] + (255 - base[1]) * lightnessFactor);
  const b = Math.round(base[2] + (255 - base[2]) * lightnessFactor);
  return `rgb(${r}, ${g}, ${b})`;
}

const isPrerelease = (version: string) =>
  semver.prerelease(version) || /(alpha|beta|next)/i.test(version);

const processPrereleaseData = (data) => {
  const allDates = Object.keys(data).sort();
  const dates = allDates.slice(-6);
  const labels = [...dates];

  // Aggregate downloads by major version per date
  const majorTotals: Record<string, number[]> = {};

  dates.forEach((date, dateIndex) => {
    const downloads = data[date];
    Object.entries(downloads).forEach(([version, count]) => {
      if (!isPrerelease(version)) return;
      const major = version.split('.')[0];
      if (!majorTotals[major]) {
        majorTotals[major] = new Array(dates.length).fill(0);
      }
      majorTotals[major][dateIndex] += count as number;
    });
  });

  const majors = Object.keys(majorTotals).sort((a, b) => Number(a) - Number(b));

  const datasetArray = majors.map((major) => {
    const base = majorBaseColors[major] || [100, 100, 100];
    const color = `rgb(${base[0]}, ${base[1]}, ${base[2]})`;
    return {
      label: `v${major}.x pre-releases`,
      data: majorTotals[major],
      borderColor: color,
      backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.6)'),
      fill: true,
      tension: 0.3,
      pointRadius: 2,
      pointHoverRadius: 5,
      borderWidth: 2,
    };
  });

  return { labels, datasetArray };
};

const processData = (data, { prerelease }) => {
  if (prerelease) return processPrereleaseData(data);

  const allDates = Object.keys(data).sort();

  const labels = [];
  const datasets = {};
  let colorIndex = 0;

  allDates.forEach((date) => {
    const downloads = data[date];
    labels.push(date);

    Object.keys(downloads).forEach((version) => {
      if (isPrerelease(version)) return;

      if (!datasets[version]) {
        const color = versionColors[colorIndex % versionColors.length];
        colorIndex++;
        datasets[version] = {
          label: version,
          data: Array(labels.length - 1).fill(0),
          borderColor: color,
          backgroundColor: color + '33',
          fill: false,
          tension: 0.3,
          pointRadius: 0,
          pointHoverRadius: 3,
          borderWidth: 2,
        };
      }

      while (datasets[version].data.length < labels.length - 1) {
        datasets[version].data.push(0);
      }

      datasets[version].data.push(downloads[version] || 0);
    });
  });

  Object.values(datasets).forEach((dataset) => {
    while (dataset.data.length < labels.length) {
      dataset.data.push(0);
    }
  });

  const totalDownloads = Object.entries(datasets).map(([version, dataset]) => {
    const total = dataset.data.reduce((sum, count) => sum + count, 0);
    return { version, total };
  });

  const groupedByMajor = {};
  totalDownloads.forEach(({ version, total }) => {
    const majorVersion = version.split('.')[0];
    if (!groupedByMajor[majorVersion]) {
      groupedByMajor[majorVersion] = [];
    }
    groupedByMajor[majorVersion].push({ version, total });
  });

  const topVersions = [];
  Object.values(groupedByMajor).forEach((versions) => {
    versions
      .sort((a, b) => b.total - a.total)
      .filter(({ version }) => semver.satisfies(version, '>2.0.0'))
      .splice(0, 8)
      .forEach(({ version }) => topVersions.push(version));
  });

  const filteredDatasets = topVersions.map((version) => datasets[version]);
  filteredDatasets.sort((a, b) => semverCompare(a.label, b.label));

  return { labels, datasetArray: filteredDatasets };
};

const semverCompare = (v1, v2) => {
  const parse = (v) => v.split('.').map(Number);
  const [v1Major, v1Minor, v1Patch] = parse(v1);
  const [v2Major, v2Minor, v2Patch] = parse(v2);

  if (v1Major !== v2Major) return v1Major - v2Major;
  if (v1Minor !== v2Minor) return v1Minor - v2Minor;
  return v1Patch - v2Patch;
};

const majorFilterConfig = {
  v5: { test: (v: string) => v.startsWith('5.'), title: 'npm Downloads v5.x' },
  v6: { test: (v: string) => v.startsWith('6.'), title: 'npm Downloads v6.x' },
  latest: { test: (v: string) => Number(v.split('.')[0]) >= 7, title: 'npm Downloads v7+' },
};

const NpmjsVersionsChart = ({
  prerelease,
  majorFilter,
}: {
  prerelease?: boolean;
  majorFilter?: 'v5' | 'v6' | 'latest';
}) => {
  const { labels, datasetArray } = processData(npmjsDownloads, { prerelease });

  const filteredDatasets = majorFilter
    ? datasetArray.filter((ds) => ds && majorFilterConfig[majorFilter].test(ds.label))
    : datasetArray;

  const chartData = {
    labels: labels,
    datasets: filteredDatasets,
  };

  const titleText = majorFilter
    ? majorFilterConfig[majorFilter].title + (prerelease ? ' (Pre-releases)' : '')
    : prerelease
      ? 'npm Downloads Pre-releases (last 6 months)'
      : 'npm Downloads by Version';

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: titleText,
        font: { size: 14, weight: 'bold' as const },
        padding: { bottom: 16 },
      },
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 12, padding: 12 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${Number(context.raw).toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Date' },
        grid: { display: false },
        ticks: { maxTicksLimit: 10 },
        ...(prerelease ? { stacked: true } : {}),
      },
      y: {
        title: { display: true, text: 'Downloads' },
        ticks: {
          callback: (value) => Number(value).toLocaleString(),
        },
        ...(prerelease ? { stacked: true } : {}),
      },
    },
  };
  // Build trend badges
  const trends: TrendInfo[] = filteredDatasets
    .filter((ds) => ds)
    .map((ds) => ({
      label: ds.label,
      percentChange: computeTrend(ds.data),
    }))
    .sort((a, b) => b.percentChange - a.percentChange);

  // Build data table
  const tableHeaders = ['Date', ...filteredDatasets.filter((ds) => ds).map((ds) => ds.label)];
  const tableRows = labels
    .map((date, i) => [date, ...filteredDatasets.filter((ds) => ds).map((ds) => ds.data[i] || 0)])
    .reverse();

  return (
    <div>
      <Line data={chartData} options={options} />
      <TrendBadges trends={trends} />
      <DataTable headers={tableHeaders} rows={tableRows} />
    </div>
  );
};

export default NpmjsVersionsChart;
