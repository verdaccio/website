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

import { monthlyDownloads } from '@verdaccio/local-scripts';

import DataTable from './DataTable';
import TrendBadges, { computeTrend } from './TrendBadges';

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

const downloadValues = monthlyDownloads.map((entry) => entry.downloads);

const data = {
  labels: monthlyDownloads.map((entry) => entry.start),
  datasets: [
    {
      label: 'Monthly Downloads',
      data: downloadValues,
      borderColor: 'rgba(75, 94, 64, 1)',
      backgroundColor: 'rgba(75, 94, 64, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 0,
      pointHoverRadius: 4,
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Monthly npm Downloads',
      font: { size: 14, weight: 'bold' as const },
      padding: { bottom: 16 },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `Downloads: ${Number(context.raw).toLocaleString()}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: { display: true, text: 'Month' },
      grid: { display: false },
      ticks: { maxTicksLimit: 12 },
    },
    y: {
      title: { display: true, text: 'Downloads' },
      ticks: {
        callback: (value) => Number(value).toLocaleString(),
      },
    },
  },
};

const trend = computeTrend(downloadValues);
const tableRows: [string, number][] = monthlyDownloads
  .map((entry) => [entry.start, entry.downloads] as [string, number])
  .reverse();

const NpmjsMonthlyDownloadsChart = () => {
  return (
    <div>
      <Line data={data} options={options} />
      <TrendBadges trends={[{ label: 'Monthly trend', percentChange: trend }]} />
      <DataTable headers={['Month', 'Downloads']} rows={tableRows} />
    </div>
  );
};

export default NpmjsMonthlyDownloadsChart;
