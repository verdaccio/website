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

import { ecosystemVersionDownloads } from '@verdaccio/local-scripts';

import DataTable from './DataTable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const majorColors: Record<string, string> = {
  '1': 'rgba(255, 152, 0, 0.7)',
  '2': 'rgba(233, 30, 99, 0.7)',
  '3': 'rgba(75, 94, 64, 0.7)',
  '4': 'rgba(33, 150, 243, 0.7)',
  '5': 'rgba(156, 39, 176, 0.7)',
  '6': 'rgba(0, 188, 212, 0.7)',
  '7': 'rgba(121, 85, 72, 0.7)',
  '8': 'rgba(96, 125, 139, 0.7)',
};

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

const EcosystemVersionDownloadsChart: React.FC = () => {
  const packages = Object.keys(ecosystemVersionDownloads);

  if (packages.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--ifm-color-emphasis-600)' }}>
        <p>Ecosystem version data not yet collected. Run the fetch script to populate.</p>
      </div>
    );
  }

  // Collect all major versions across all packages
  const allMajors = new Set<string>();
  for (const pkg of packages) {
    for (const major of Object.keys(ecosystemVersionDownloads[pkg])) {
      allMajors.add(major);
    }
  }
  const sortedMajors = [...allMajors].sort((a, b) => Number(a) - Number(b));

  // Sort packages by total downloads descending
  const sortedPackages = [...packages].sort((a, b) => {
    const totalA = Object.values(ecosystemVersionDownloads[a]).reduce(
      (sum: number, v) => sum + (v as number),
      0
    );
    const totalB = Object.values(ecosystemVersionDownloads[b]).reduce(
      (sum: number, v) => sum + (v as number),
      0
    );
    return totalB - totalA;
  });

  const labels = sortedPackages.map((pkg) => pkg.replace('@verdaccio/', '@v/'));

  const datasets = sortedMajors.map((major) => ({
    label: `v${major}.x`,
    data: sortedPackages.map((pkg) => (ecosystemVersionDownloads[pkg][major] as number) || 0),
    backgroundColor: majorColors[major] || 'rgba(100, 100, 100, 0.7)',
    borderRadius: 2,
    borderWidth: 0,
  }));

  const grandTotal = sortedPackages.reduce((sum, pkg) => {
    return (
      sum +
      Object.values(ecosystemVersionDownloads[pkg]).reduce((s: number, v) => s + (v as number), 0)
    );
  }, 0);

  const chartData = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y' as const,
    plugins: {
      title: {
        display: true,
        text: `Ecosystem Downloads by Major Version (last week) — ${formatNumber(grandTotal)} total`,
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
            const val = context.raw as number;
            return `${context.dataset.label}: ${val.toLocaleString()} downloads`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: { display: true, text: 'Downloads (last week)' },
        ticks: {
          callback: (value) => formatNumber(Number(value)),
        },
      },
      y: {
        stacked: true,
        grid: { display: false },
      },
    },
  };

  const tableHeaders = ['Package', ...sortedMajors.map((m) => `v${m}.x`), 'Total'];
  const tableRows = sortedPackages.map((pkg) => {
    const total = Object.values(ecosystemVersionDownloads[pkg]).reduce(
      (sum: number, v) => sum + (v as number),
      0
    );
    return [
      pkg,
      ...sortedMajors.map((m) => (ecosystemVersionDownloads[pkg][m] as number) || 0),
      total,
    ];
  });

  return (
    <div>
      <Bar data={chartData} options={options} />
      <DataTable headers={tableHeaders} rows={tableRows} />
    </div>
  );
};

export default EcosystemVersionDownloadsChart;
