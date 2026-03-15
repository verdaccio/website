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

import { dockerPulls } from '@verdaccio/local-scripts';

import DataTable from './DataTable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DockerTotalPull = () => {
  const monthlyData = {};
  Object.entries(dockerPulls).forEach(([date, { pullCount }]) => {
    const d = new Date(date);
    const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!monthlyData[yearMonth]) {
      monthlyData[yearMonth] = 0;
    }
    monthlyData[yearMonth] += pullCount;
  });

  const labels = Object.keys(monthlyData);
  const pullCounts = Object.values(monthlyData) as number[];

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Pulls',
        data: pullCounts,
        backgroundColor: 'rgba(128, 138, 121, 0.7)',
        borderColor: 'rgba(128, 138, 121, 1)',
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
        text: 'Monthly Total Docker Pulls',
        font: { size: 14, weight: 'bold' as const },
        padding: { bottom: 16 },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Month' },
        grid: { display: false },
        ticks: { maxTicksLimit: 10 },
      },
      y: {
        title: { display: true, text: 'Total Pulls' },
        beginAtZero: true,
        ticks: {
          callback: (value) => Number(value).toLocaleString(),
        },
      },
    },
  };

  const tableRows: [string, number][] = labels
    .map((month, i) => [month, pullCounts[i]] as [string, number])
    .reverse();

  return (
    <div>
      <Bar data={data} options={options} />
      <DataTable headers={['Month', 'Total Pulls']} rows={tableRows} />
    </div>
  );
};

export default DockerTotalPull;
