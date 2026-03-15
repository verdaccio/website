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
  '3': [255, 152, 0],
  '4': [233, 30, 99],
  '5': [75, 94, 64],
  '6': [33, 150, 243],
  '7': [156, 39, 176],
  '8': [0, 188, 212],
};

const isPrerelease = (version: string) =>
  /(alpha|beta|next)/i.test(version) || /\d+\.\d+\.\d+-.+/.test(version);

const MigrationShareChart: React.FC = () => {
  const allDates = Object.keys(npmjsDownloads).sort();

  // Build per-date totals by major
  const majorByDate: Record<string, Record<string, number>> = {};
  allDates.forEach((date) => {
    majorByDate[date] = {};
    const downloads = npmjsDownloads[date];
    Object.entries(downloads).forEach(([version, count]) => {
      if (isPrerelease(version)) return;
      const major = version.split('.')[0];
      if (Number(major) < 3) return;
      majorByDate[date][major] = (majorByDate[date][major] || 0) + (count as number);
    });
  });

  // Get all majors
  const allMajors = new Set<string>();
  Object.values(majorByDate).forEach((m) => Object.keys(m).forEach((k) => allMajors.add(k)));
  const majors = [...allMajors].sort((a, b) => Number(a) - Number(b));

  // Compute % share per date
  const percentData: Record<string, number[]> = {};
  majors.forEach((m) => {
    percentData[m] = [];
  });

  allDates.forEach((date) => {
    const totals = majorByDate[date];
    const sum = Object.values(totals).reduce((a, b) => a + b, 0);
    majors.forEach((m) => {
      const pct = sum > 0 ? ((totals[m] || 0) / sum) * 100 : 0;
      percentData[m].push(Math.round(pct * 10) / 10);
    });
  });

  const datasets = majors.map((major) => {
    const base = majorBaseColors[major] || [100, 100, 100];
    const color = `rgb(${base[0]}, ${base[1]}, ${base[2]})`;
    return {
      label: `v${major}.x`,
      data: percentData[major],
      borderColor: color,
      backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.6)'),
      fill: true,
      tension: 0.3,
      pointRadius: 0,
      pointHoverRadius: 4,
      borderWidth: 2,
    };
  });

  const chartData = { labels: allDates, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Version Migration (% share over time)',
        font: { size: 14, weight: 'bold' as const },
        padding: { bottom: 16 },
      },
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 12, padding: 12 },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
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
        title: { display: true, text: '% Share' },
        stacked: true,
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  const tableHeaders = ['Date', ...majors.map((m) => `v${m}.x`)];
  const tableRows = allDates
    .map((date, i) => [date, ...majors.map((m) => `${percentData[m][i]}%`)])
    .reverse();

  return (
    <div>
      <Line data={chartData} options={options} />
      <DataTable headers={tableHeaders} rows={tableRows} />
    </div>
  );
};

export default MigrationShareChart;
