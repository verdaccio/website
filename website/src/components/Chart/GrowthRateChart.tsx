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

import { monthlyDownloads } from '@verdaccio/local-scripts';

import DataTable from './DataTable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Compute month-over-month growth rate %
const growthData: { label: string; growth: number }[] = [];
for (let i = 1; i < monthlyDownloads.length; i++) {
  const prev = monthlyDownloads[i - 1].downloads;
  const curr = monthlyDownloads[i].downloads;
  const growth = prev > 0 ? ((curr - prev) / prev) * 100 : 0;
  growthData.push({
    label: monthlyDownloads[i].start,
    growth: Math.round(growth * 10) / 10,
  });
}

const GrowthRateChart: React.FC = () => {
  const labels = growthData.map((d) => d.label);
  const values = growthData.map((d) => d.growth);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Month-over-Month Growth',
        data: values,
        backgroundColor: values.map((v) =>
          v >= 0 ? 'rgba(75, 94, 64, 0.6)' : 'rgba(233, 30, 99, 0.6)'
        ),
        borderColor: values.map((v) => (v >= 0 ? 'rgba(75, 94, 64, 1)' : 'rgba(233, 30, 99, 1)')),
        borderWidth: 1,
        borderRadius: 3,
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
        text: 'Month-over-Month Growth Rate (%)',
        font: { size: 14, weight: 'bold' as const },
        padding: { bottom: 16 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.raw as number;
            const sign = val > 0 ? '+' : '';
            return `Growth: ${sign}${val}%`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Month' },
        grid: { display: false },
        ticks: { maxTicksLimit: 12 },
      },
      y: {
        title: { display: true, text: 'Growth %' },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  const tableRows = growthData
    .map((d) => [d.label, `${d.growth > 0 ? '+' : ''}${d.growth}%`])
    .reverse();

  return (
    <div>
      <Bar data={chartData} options={options} />
      <DataTable headers={['Month', 'Growth %']} rows={tableRows} />
    </div>
  );
};

export default GrowthRateChart;
