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

import { dockerPulls } from '@verdaccio/local-scripts';

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

const entries = Object.entries(dockerPulls);
const labels = entries.map(([date]) => new Date(date).toLocaleDateString('en-US'));
const pullCounts = entries.map(([, data]) => data.pullCount);

const data = {
  labels,
  datasets: [
    {
      label: 'Docker Pulls',
      data: pullCounts,
      borderColor: 'rgba(75, 94, 64, 1)',
      backgroundColor: 'rgba(75, 94, 64, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
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
      text: 'Weekly Docker Pulls',
      font: { size: 14, weight: 'bold' as const },
      padding: { bottom: 16 },
    },
  },
  scales: {
    x: {
      title: { display: true, text: 'Date' },
      grid: { display: false },
      ticks: { maxTicksLimit: 8 },
    },
    y: {
      title: { display: true, text: 'Pulls' },
      beginAtZero: true,
      ticks: {
        callback: (value) => Number(value).toLocaleString(),
      },
    },
  },
};

const trend = computeTrend(pullCounts);
const tableRows: [string, number][] = entries
  .map(([date, d]) => [new Date(date).toLocaleDateString('en-US'), d.pullCount] as [string, number])
  .reverse();

const DockerPullChart = () => {
  return (
    <div>
      <Line data={data} options={options} />
      <TrendBadges trends={[{ label: 'Weekly trend', percentChange: trend }]} />
      <DataTable headers={['Date', 'Pulls']} rows={tableRows} />
    </div>
  );
};

export default DockerPullChart;
