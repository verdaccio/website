import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

import { ecosystemDownloads } from '@verdaccio/local-scripts';

import DataTable from './DataTable';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const colors = [
  'rgb(75, 94, 64)',
  'rgb(33, 150, 243)',
  'rgb(255, 152, 0)',
  'rgb(156, 39, 176)',
  'rgb(233, 30, 99)',
  'rgb(0, 188, 212)',
  'rgb(121, 85, 72)',
  'rgb(96, 125, 139)',
  'rgb(244, 67, 54)',
  'rgb(76, 175, 80)',
  'rgb(255, 87, 34)',
  'rgb(63, 81, 181)',
  'rgb(205, 220, 57)',
  'rgb(0, 150, 136)',
  'rgb(255, 193, 7)',
  'rgb(103, 58, 183)',
  'rgb(139, 195, 74)',
  'rgb(255, 111, 0)',
];

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

const EcosystemTrendChart: React.FC = () => {
  const packages = Object.keys(ecosystemDownloads);

  if (packages.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--ifm-color-emphasis-600)' }}>
        <p>Ecosystem download data not yet collected. Run the fetch script to populate.</p>
      </div>
    );
  }

  // Collect all months across all packages, sorted chronologically
  const allMonths = new Set<string>();
  for (const pkg of packages) {
    for (const month of Object.keys(ecosystemDownloads[pkg])) {
      allMonths.add(month);
    }
  }
  const labels = [...allMonths].sort();

  // Sort packages by total downloads descending
  const sortedPackages = [...packages]
    .map((pkg) => {
      const total = Object.values(ecosystemDownloads[pkg]).reduce(
        (sum: number, v) => sum + (v as number),
        0
      );
      return { pkg, total };
    })
    .sort((a, b) => b.total - a.total);

  const datasets = sortedPackages.map(({ pkg }, i) => {
    const data = labels.map((month) => (ecosystemDownloads[pkg][month] as number) || 0);
    const color = colors[i % colors.length];
    return {
      label: pkg.replace('@verdaccio/', '@v/'),
      data,
      borderColor: color,
      backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
      tension: 0.3,
      pointRadius: 2,
      pointHoverRadius: 5,
      borderWidth: 2,
    };
  });

  const chartData = { labels: labels.map((l) => l.slice(0, 7)), datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Ecosystem Package Downloads Over Time',
        font: { size: 14, weight: 'bold' as const },
        padding: { bottom: 16 },
      },
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 12, padding: 8, font: { size: 10 } },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.raw as number;
            return `${context.dataset.label}: ${val.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Month' },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: 'Downloads' },
        ticks: {
          callback: (value) => formatNumber(Number(value)),
        },
      },
    },
  };

  const tableHeaders = ['Month', ...sortedPackages.map((p) => p.pkg.replace('@verdaccio/', '@v/'))];
  const tableRows = labels
    .map((month, i) => [month.slice(0, 7), ...datasets.map((ds) => ds.data[i])])
    .reverse();

  return (
    <div>
      <Line data={chartData} options={options} />
      <DataTable headers={tableHeaders} rows={tableRows} />
    </div>
  );
};

export default EcosystemTrendChart;
