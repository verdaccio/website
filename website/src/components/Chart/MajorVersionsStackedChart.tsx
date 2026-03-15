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

const majorBaseColors: Record<string, [number, number, number]> = {
  '3': [255, 152, 0], // orange
  '4': [233, 30, 99], // pink
  '5': [75, 94, 64], // green (verdaccio)
  '6': [33, 150, 243], // blue
  '7': [156, 39, 176], // purple
  '8': [0, 188, 212], // cyan
};

const isPrerelease = (version: string) =>
  /(alpha|beta|next)/i.test(version) || /\d+\.\d+\.\d+-.+/.test(version);

const MajorVersionsStackedChart: React.FC = () => {
  const allDates = Object.keys(npmjsDownloads).sort();
  const labels = [...allDates];

  const majorTotals: Record<string, number[]> = {};

  allDates.forEach((date, dateIndex) => {
    const downloads = npmjsDownloads[date];
    Object.entries(downloads).forEach(([version, count]) => {
      if (isPrerelease(version)) return;
      const major = version.split('.')[0];
      if (Number(major) < 3) return;
      if (!majorTotals[major]) {
        majorTotals[major] = new Array(allDates.length).fill(0);
      }
      majorTotals[major][dateIndex] += count as number;
    });
  });

  const majors = Object.keys(majorTotals).sort((a, b) => Number(a) - Number(b));

  const datasets = majors.map((major) => {
    const base = majorBaseColors[major] || [100, 100, 100];
    const color = `rgb(${base[0]}, ${base[1]}, ${base[2]})`;
    return {
      label: `v${major}.x`,
      data: majorTotals[major],
      borderColor: color,
      backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.6)'),
      fill: true,
      tension: 0.3,
      pointRadius: 0,
      pointHoverRadius: 4,
      borderWidth: 2,
    };
  });

  const chartData = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Downloads by Major Version (stacked)',
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
        stacked: true,
      },
      y: {
        title: { display: true, text: 'Downloads' },
        ticks: {
          callback: (value) => Number(value).toLocaleString(),
        },
        stacked: true,
      },
    },
  };

  // Only show trends for versions with meaningful recent volume
  const recentThreshold = 500;
  const trends: TrendInfo[] = datasets
    .filter((ds) => {
      const last4 = ds.data.slice(-4);
      const avg = last4.reduce((a, b) => a + b, 0) / last4.length;
      return avg >= recentThreshold;
    })
    .map((ds) => ({
      label: ds.label,
      percentChange: computeTrend(ds.data),
    }))
    .sort((a, b) => b.percentChange - a.percentChange);

  const tableHeaders = ['Date', ...datasets.map((ds) => ds.label)];
  const tableRows = labels
    .map((date, i) => [date, ...datasets.map((ds) => ds.data[i] || 0)])
    .reverse();

  return (
    <div>
      <Line data={chartData} options={options} />
      <TrendBadges trends={trends} />
      <DataTable headers={tableHeaders} rows={tableRows} />
    </div>
  );
};

export default MajorVersionsStackedChart;
