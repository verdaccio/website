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
const ipCounts = entries.map(([, data]) => data.ipCount);

const data = {
  labels,
  datasets: [
    {
      label: 'Pulls',
      data: pullCounts,
      borderColor: 'rgba(75, 94, 64, 1)',
      backgroundColor: 'rgba(75, 94, 64, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
      yAxisID: 'y',
    },
    {
      label: 'Unique IPs',
      data: ipCounts,
      borderColor: 'rgba(33, 150, 243, 1)',
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
      borderDash: [4, 3],
      yAxisID: 'y1',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { boxWidth: 12, padding: 12 },
    },
    title: {
      display: true,
      text: 'Weekly Docker Pulls & Unique Users',
      font: { size: 14, weight: 'bold' as const },
      padding: { bottom: 16 },
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${Number(context.raw).toLocaleString()}`,
      },
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
      position: 'left' as const,
      beginAtZero: true,
      ticks: {
        callback: (value) => Number(value).toLocaleString(),
      },
    },
    y1: {
      title: { display: true, text: 'Unique IPs' },
      position: 'right' as const,
      beginAtZero: true,
      grid: { display: false },
      ticks: {
        callback: (value) => Number(value).toLocaleString(),
      },
    },
  },
};

const pullTrend = computeTrend(pullCounts);
const ipTrend = computeTrend(ipCounts);
const tableRows = entries
  .map(
    ([date, d]) =>
      [new Date(date).toLocaleDateString('en-US'), d.pullCount, d.ipCount] as [
        string,
        number,
        number,
      ]
  )
  .reverse();

const DockerPullChart = () => {
  return (
    <div>
      <Line data={data} options={options} />
      <TrendBadges
        trends={[
          { label: 'Pulls', percentChange: pullTrend },
          { label: 'Unique IPs', percentChange: ipTrend },
        ]}
      />
      <DataTable headers={['Date', 'Pulls', 'Unique IPs']} rows={tableRows} />
    </div>
  );
};

export default DockerPullChart;
