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

import { monthlyDownloads } from '@verdaccio/local-scripts';

import DataTable from './DataTable';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const yearColors: Record<string, string> = {
  '2019': 'rgba(158, 158, 158, 0.6)',
  '2020': 'rgba(121, 85, 72, 0.8)',
  '2021': 'rgba(255, 152, 0, 0.8)',
  '2022': 'rgba(233, 30, 99, 0.8)',
  '2023': 'rgba(156, 39, 176, 0.8)',
  '2024': 'rgba(33, 150, 243, 1)',
  '2025': 'rgba(75, 94, 64, 1)',
  '2026': 'rgba(0, 188, 212, 1)',
};

// Group monthly downloads by year
function groupByYear() {
  const byYear: Record<string, (number | null)[]> = {};

  monthlyDownloads.forEach((entry) => {
    const date = new Date(entry.start);
    const year = String(date.getFullYear());
    const monthIdx = date.getMonth();

    if (!byYear[year]) {
      byYear[year] = new Array(12).fill(null);
    }
    byYear[year][monthIdx] = entry.downloads;
  });

  return byYear;
}

const YearOverYearChart: React.FC = () => {
  const byYear = groupByYear();
  const years = Object.keys(byYear).sort();

  const datasets = years.map((year) => ({
    label: year,
    data: byYear[year],
    borderColor: yearColors[year] || 'rgba(100, 100, 100, 0.8)',
    backgroundColor: 'transparent',
    tension: 0.3,
    pointRadius: 3,
    pointHoverRadius: 6,
    borderWidth: year === years[years.length - 1] ? 3 : 1.5,
    borderDash: year === years[years.length - 1] ? [] : [],
    spanGaps: false,
  }));

  const chartData = { labels: monthNames, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Year-over-Year Monthly Downloads',
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
            const val = context.raw as number | null;
            return val != null
              ? `${context.dataset.label}: ${val.toLocaleString()}`
              : `${context.dataset.label}: N/A`;
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
        beginAtZero: true,
        ticks: {
          callback: (value) => Number(value).toLocaleString(),
        },
      },
    },
  };

  // Table: months as rows, years as columns
  const tableHeaders = ['Month', ...years];
  const tableRows = monthNames.map((month, i) => [
    month,
    ...years.map((year) => byYear[year][i] ?? '-'),
  ]);

  return (
    <div>
      <Line data={chartData} options={options} />
      <DataTable headers={tableHeaders} rows={tableRows} />
    </div>
  );
};

export default YearOverYearChart;
