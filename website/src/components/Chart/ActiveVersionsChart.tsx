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

import { npmjsDownloads } from '@verdaccio/local-scripts';

import DataTable from './DataTable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const majorBaseColors: Record<string, [number, number, number]> = {
  '3': [255, 152, 0],
  '4': [233, 30, 99],
  '5': [75, 94, 64],
  '6': [33, 150, 243],
  '7': [156, 39, 176],
  '8': [0, 188, 212],
};

const isPrerelease = (version: string) =>
  /(alpha|beta|next)/i.test(version) || /\d+\.\d+\.\d+-.+/.test(version);

const ActiveVersionsChart: React.FC = () => {
  const allDates = Object.keys(npmjsDownloads).sort();
  const labels = [...allDates];
  const threshold = 100;

  // For each date, count how many distinct versions per major had > threshold downloads
  const majorActiveByDate: Record<string, number[]> = {};

  allDates.forEach((date, dateIndex) => {
    const downloads = npmjsDownloads[date];
    const majorVersions: Record<string, Set<string>> = {};

    Object.entries(downloads).forEach(([version, count]) => {
      if (isPrerelease(version)) return;
      const major = version.split('.')[0];
      if (Number(major) < 3) return;
      if ((count as number) < threshold) return;
      if (!majorVersions[major]) majorVersions[major] = new Set();
      majorVersions[major].add(version);
    });

    Object.entries(majorVersions).forEach(([major, versions]) => {
      if (!majorActiveByDate[major]) {
        majorActiveByDate[major] = new Array(allDates.length).fill(0);
      }
      majorActiveByDate[major][dateIndex] = versions.size;
    });
  });

  const majors = Object.keys(majorActiveByDate).sort((a, b) => Number(a) - Number(b));

  const datasets = majors.map((major) => {
    const base = majorBaseColors[major] || [100, 100, 100];
    const color = `rgba(${base[0]}, ${base[1]}, ${base[2]}, 0.8)`;
    return {
      label: `v${major}.x`,
      data: majorActiveByDate[major],
      backgroundColor: color,
      borderColor: `rgb(${base[0]}, ${base[1]}, ${base[2]})`,
      borderWidth: 1,
      borderRadius: 2,
    };
  });

  const chartData = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: `Active Versions per Major (>${threshold} downloads/period)`,
        font: { size: 14, weight: 'bold' as const },
        padding: { bottom: 16 },
      },
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 12, padding: 12 },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw} versions`,
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
        title: { display: true, text: 'Active Versions' },
        stacked: true,
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  const tableHeaders = ['Date', ...majors.map((m) => `v${m}.x`)];
  const tableRows = allDates
    .map((date, i) => [date, ...majors.map((m) => majorActiveByDate[m][i])])
    .reverse();

  return (
    <div>
      <Bar data={chartData} options={options} />
      <DataTable headers={tableHeaders} rows={tableRows} />
    </div>
  );
};

export default ActiveVersionsChart;
