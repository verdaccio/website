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

import { ecosystemDownloads } from '@verdaccio/local-scripts';

import DataTable from './DataTable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const colors = [
  'rgba(75, 94, 64, 0.7)',
  'rgba(33, 150, 243, 0.7)',
  'rgba(255, 152, 0, 0.7)',
  'rgba(156, 39, 176, 0.7)',
  'rgba(233, 30, 99, 0.7)',
  'rgba(0, 188, 212, 0.7)',
  'rgba(121, 85, 72, 0.7)',
  'rgba(96, 125, 139, 0.7)',
  'rgba(244, 67, 54, 0.7)',
  'rgba(76, 175, 80, 0.7)',
  'rgba(255, 87, 34, 0.7)',
  'rgba(63, 81, 181, 0.7)',
  'rgba(205, 220, 57, 0.7)',
  'rgba(0, 150, 136, 0.7)',
  'rgba(255, 193, 7, 0.7)',
  'rgba(103, 58, 183, 0.7)',
  'rgba(139, 195, 74, 0.7)',
  'rgba(255, 111, 0, 0.7)',
];

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

const EcosystemDownloadsChart: React.FC = () => {
  const packages = Object.keys(ecosystemDownloads);

  if (packages.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--ifm-color-emphasis-600)' }}>
        <p>Ecosystem download data not yet collected. Run the fetch script to populate.</p>
      </div>
    );
  }

  // Total downloads per package, sorted descending
  const packageData = packages
    .map((pkg) => {
      const data = ecosystemDownloads[pkg];
      const total = Object.values(data).reduce((sum: number, v) => sum + (v as number), 0);
      return { pkg, total };
    })
    .sort((a, b) => b.total - a.total);

  const grandTotal = packageData.reduce((sum, p) => sum + p.total, 0);

  const labels = packageData.map((p) => p.pkg.replace('@verdaccio/', '@v/'));
  const values = packageData.map((p) => p.total);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Downloads',
        data: values,
        backgroundColor: values.map((_, i) => colors[i % colors.length]),
        borderRadius: 4,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y' as const,
    plugins: {
      title: {
        display: true,
        text: `Ecosystem Downloads by Package — ${formatNumber(grandTotal)} total (2025+)`,
        font: { size: 14, weight: 'bold' as const },
        padding: { bottom: 16 },
      },
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.raw as number;
            const pct = ((val / grandTotal) * 100).toFixed(1);
            return `${val.toLocaleString()} downloads (${pct}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Downloads' },
        ticks: {
          callback: (value) => formatNumber(Number(value)),
        },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  const tableRows = packageData.map((p, i) => [
    i + 1,
    p.pkg,
    p.total,
    `${((p.total / grandTotal) * 100).toFixed(1)}%`,
  ]);

  return (
    <div>
      <Bar data={chartData} options={options} />
      <DataTable headers={['#', 'Package', 'Downloads', '% of Total']} rows={tableRows} />
    </div>
  );
};

export default EcosystemDownloadsChart;
