import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { yearlyDownloads } from '@verdaccio/local-scripts';

import DataTable from './DataTable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: Object.keys(yearlyDownloads),
  datasets: [
    {
      label: 'Yearly Downloads',
      data: Object.values(yearlyDownloads),
      backgroundColor: 'rgba(75, 94, 64, 0.7)',
      borderColor: 'rgba(75, 94, 64, 1)',
      borderWidth: 1,
      borderRadius: 4,
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
      text: 'Yearly npm Downloads',
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
      title: { display: true, text: 'Year' },
      grid: { display: false },
    },
    y: {
      title: { display: true, text: 'Downloads' },
      beginAtZero: true,
      ticks: {
        callback: (value) => Number(value).toLocaleString(),
      },
    },
  },
};

const tableRows: [string, number][] = Object.entries(yearlyDownloads)
  .map(([year, count]) => [year, count as number])
  .reverse();

const NpmjsYearlyDownloadsChart = () => {
  return (
    <div>
      <Bar data={data} options={options} />
      <DataTable headers={['Year', 'Downloads']} rows={tableRows} />
    </div>
  );
};

export default NpmjsYearlyDownloadsChart;
