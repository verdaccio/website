import { ecosystemDownloads } from '@verdaccio/local-scripts';

import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const colors = [
  'rgb(33, 150, 243)',
  'rgb(156, 39, 176)',
  'rgb(255, 152, 0)',
  'rgb(76, 175, 80)',
  'rgb(233, 30, 99)',
  'rgb(0, 188, 212)',
  'rgb(121, 85, 72)',
  'rgb(96, 125, 139)',
];

const TOP_N = 7;

const EcosystemShareChart: React.FC = () => {
  const packages = Object.keys(ecosystemDownloads);

  if (packages.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--ifm-color-emphasis-600)' }}>
        <p>Ecosystem download data not yet collected. Run the fetch script to populate.</p>
      </div>
    );
  }

  // Rank packages by total downloads, keep the top N and fold the rest into "Others".
  const ranked = packages
    .map((pkg) => {
      const total = Object.values(ecosystemDownloads[pkg]).reduce(
        (sum: number, v) => sum + (v as number),
        0
      );
      return { pkg: pkg.replace('@verdaccio/', '@v/'), total };
    })
    .sort((a, b) => b.total - a.total);

  const top = ranked.slice(0, TOP_N);
  const rest = ranked.slice(TOP_N);
  const othersTotal = rest.reduce((sum, r) => sum + r.total, 0);

  const sliceLabels = [...top.map((r) => r.pkg), ...(othersTotal > 0 ? ['Others'] : [])];
  const sliceValues = [...top.map((r) => r.total), ...(othersTotal > 0 ? [othersTotal] : [])];
  const grandTotal = ranked.reduce((sum, r) => sum + r.total, 0);

  const chartData = {
    labels: sliceLabels,
    datasets: [
      {
        data: sliceValues,
        backgroundColor: sliceLabels.map((_, i) =>
          i < top.length ? colors[i % colors.length] : 'rgb(189, 189, 189)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Ecosystem Package Share',
        font: { size: 14, weight: 'bold' as const },
        padding: { bottom: 16 },
      },
      legend: {
        position: 'right' as const,
        labels: { boxWidth: 12, padding: 10, font: { size: 11 } },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.raw as number;
            const share = grandTotal > 0 ? ((val / grandTotal) * 100).toFixed(1) : '0';
            return `${context.label}: ${val.toLocaleString()} (${share}%)`;
          },
        },
      },
    },
  };

  return (
    <div>
      <div style={{ height: '340px' }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default EcosystemShareChart;
