import { npmjsDownloads } from '@verdaccio/local-scripts';

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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const majorBaseColors: Record<string, string> = {
  '3': 'rgb(255, 152, 0)',
  '4': 'rgb(233, 30, 99)',
  '5': 'rgb(75, 94, 64)',
  '6': 'rgb(33, 150, 243)',
  '7': 'rgb(156, 39, 176)',
  '8': 'rgb(0, 188, 212)',
};

const isPrerelease = (version: string) =>
  /(alpha|beta|next)/i.test(version) || /\d+\.\d+\.\d+-.+/.test(version);

const CurrentVersionShareChart: React.FC = () => {
  const allDates = Object.keys(npmjsDownloads).sort();
  const latestDate = allDates[allDates.length - 1];

  // Aggregate the latest period's downloads by major version.
  const byMajor: Record<string, number> = {};
  const downloads = npmjsDownloads[latestDate] ?? {};
  Object.entries(downloads).forEach(([version, count]) => {
    if (isPrerelease(version)) return;
    const major = version.split('.')[0];
    if (Number(major) < 5) return;
    byMajor[major] = (byMajor[major] || 0) + (count as number);
  });

  const majors = Object.keys(byMajor).sort((a, b) => Number(a) - Number(b));
  const total = majors.reduce((sum, m) => sum + byMajor[m], 0);
  const pct = (m: string) => (total > 0 ? (byMajor[m] / total) * 100 : 0);

  const datasets = majors.map((major) => ({
    label: `v${major}.x`,
    data: [Math.round(pct(major) * 10) / 10],
    backgroundColor: majorBaseColors[major] || 'rgb(100, 100, 100)',
    borderWidth: 0,
    borderRadius: 2,
  }));

  const chartData = { labels: ['Downloads'], datasets };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Current Version Share (${latestDate})`,
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
            const major = majors[context.datasetIndex];
            return `${context.dataset.label}: ${context.raw}% (${byMajor[major].toLocaleString()})`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        min: 0,
        max: 100,
        ticks: { callback: (value) => `${value}%` },
      },
      y: {
        stacked: true,
        grid: { display: false },
      },
    },
  };

  return (
    <div>
      <div style={{ height: '150px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CurrentVersionShareChart;
