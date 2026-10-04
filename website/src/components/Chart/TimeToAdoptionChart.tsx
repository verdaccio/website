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

const isPrerelease = (version: string) =>
  /(alpha|beta|next)/i.test(version) || /\d+\.\d+\.\d+-.+/.test(version);

const MIN_MAJOR = 5; // 3.x / 4.x are ignored across the page.
const THRESHOLDS = [25, 50, 75];
const WEEK_MS = 1000 * 60 * 60 * 24 * 7;

const thresholdColors: Record<number, string> = {
  25: 'rgb(144, 202, 249)',
  50: 'rgb(33, 150, 243)',
  75: 'rgb(21, 101, 192)',
};

const TimeToAdoptionChart: React.FC = () => {
  const allDates = Object.keys(npmjsDownloads).sort();

  // Download share (%) per major (v5+, stable only), per date.
  const shareByDate: Record<string, Record<string, number>> = {};
  const majorsSeen = new Set<string>();
  allDates.forEach((date) => {
    const byMajor: Record<string, number> = {};
    Object.entries(npmjsDownloads[date]).forEach(([version, count]) => {
      if (isPrerelease(version)) return;
      const major = version.split('.')[0];
      if (Number(major) < MIN_MAJOR) return;
      byMajor[major] = (byMajor[major] || 0) + (count as number);
      if ((count as number) > 0) majorsSeen.add(major);
    });
    const total = Object.values(byMajor).reduce((a, b) => a + b, 0);
    shareByDate[date] = {};
    Object.keys(byMajor).forEach((m) => {
      shareByDate[date][m] = total > 0 ? (byMajor[m] / total) * 100 : 0;
    });
  });

  // For each major: first date with stable downloads, then weeks until it first
  // reaches each share threshold.
  const weeksToThreshold: Record<string, Record<number, number | null>> = {};
  [...majorsSeen].forEach((major) => {
    const firstDate = allDates.find((d) => (shareByDate[d][major] || 0) > 0);
    weeksToThreshold[major] = {};
    THRESHOLDS.forEach((t) => {
      if (!firstDate) {
        weeksToThreshold[major][t] = null;
        return;
      }
      const hit = allDates.find((d) => d >= firstDate && (shareByDate[d][major] || 0) >= t);
      weeksToThreshold[major][t] = hit
        ? Math.round((new Date(hit).getTime() - new Date(firstDate).getTime()) / WEEK_MS)
        : null;
    });
  });

  // Only show majors that actually reached the first threshold.
  const majors = [...majorsSeen]
    .filter((m) => weeksToThreshold[m][THRESHOLDS[0]] != null)
    .sort((a, b) => Number(a) - Number(b));

  const datasets = THRESHOLDS.map((t) => ({
    label: `${t}% share`,
    data: majors.map((m) => weeksToThreshold[m][t]),
    backgroundColor: thresholdColors[t],
    borderWidth: 0,
    borderRadius: 2,
  }));

  const chartData = { labels: majors.map((m) => `v${m}.x`), datasets };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Time to Adoption (weeks to reach download share)',
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
            const v = context.raw as number | null;
            return v == null
              ? `${context.dataset.label}: not reached yet`
              : `${context.dataset.label}: ${v} weeks`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Weeks since first stable release' },
        beginAtZero: true,
        ticks: { stepSize: 10 },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  return (
    <div>
      <div style={{ height: `${Math.max(220, majors.length * 70)}px` }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TimeToAdoptionChart;
