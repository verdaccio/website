import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { npmjsDownloads } from '@verdaccio/local-scripts';

import DataTable from './DataTable';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

// @ts-ignore
const dates = [...Object.keys(npmjsDownloads)].sort((a, b) => new Date(b) - new Date(a));
const lastDate = dates[0];
const data = npmjsDownloads[lastDate];

function reduceDownloads(downloads) {
  const result = {};
  Object.entries(downloads).forEach(([version, count]) => {
    const majorVersion = version.split('.')[0];
    result[majorVersion] = (result[majorVersion] || 0) + count;
  });

  return result;
}

const majorColors: Record<string, { bg: string; border: string }> = {
  '3': { bg: 'rgba(255, 152, 0, 0.7)', border: 'rgba(255, 152, 0, 1)' },
  '4': { bg: 'rgba(233, 30, 99, 0.7)', border: 'rgba(233, 30, 99, 1)' },
  '5': { bg: 'rgba(75, 94, 64, 0.7)', border: 'rgba(75, 94, 64, 1)' },
  '6': { bg: 'rgba(33, 150, 243, 0.7)', border: 'rgba(33, 150, 243, 1)' },
  '7': { bg: 'rgba(156, 39, 176, 0.7)', border: 'rgba(156, 39, 176, 1)' },
  '8': { bg: 'rgba(0, 188, 212, 0.7)', border: 'rgba(0, 188, 212, 1)' },
};

const defaultColor = { bg: 'rgba(158, 158, 158, 0.7)', border: 'rgba(158, 158, 158, 1)' };

const VersionDownloadsChart = () => {
  const processedData = reduceDownloads(data);

  // Filter out versions with less than 400 downloads (mostly very old deprecated versions)
  // @ts-ignore
  const filteredData = Object.entries(processedData).filter(([_, count]) => count > 400);

  const labels = filteredData.map(([version]) => `v${version}`);
  const dataPoints = filteredData.map(([_, count]) => count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Downloads',
        data: dataPoints,
        backgroundColor: filteredData.map(([major]) => (majorColors[major] || defaultColor).bg),
        borderColor: filteredData.map(([major]) => (majorColors[major] || defaultColor).border),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: `Downloads by Major Version (${lastDate})`,
        font: { size: 14, weight: 'bold' as const },
        padding: { bottom: 16 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `${context.label}: ${Number(value).toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Version' },
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

  const tableRows = filteredData.map(([version, count]) => [`v${version}`, count as number]);

  return (
    <div>
      <Bar data={chartData} options={options} />
      <DataTable headers={['Version', 'Downloads']} rows={tableRows} />
    </div>
  );
};

export default VersionDownloadsChart;
