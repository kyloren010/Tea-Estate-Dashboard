import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar (1st)",
  "Apr (1st)",
  "May (2nd)",
  "Jun (2nd)",
  "Jul (2nd)",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Helper to sum yields by Flush periods
export const calculateFlushYields = (monthlyArray = []) => {
  const firstFlush = (monthlyArray[2] || 0) + (monthlyArray[3] || 0);
  const secondFlush =
    (monthlyArray[4] || 0) + (monthlyArray[5] || 0) + (monthlyArray[6] || 0);
  const remainder =
    monthlyArray.reduce((a, b) => a + b, 0) - (firstFlush + secondFlush);
  return { firstFlush, secondFlush, remainder };
};

export const getChartData = (estateA, estateB = null) => {
  const datasets = [
    {
      label: `${estateA.name} (kg)`,
      data: estateA.monthlyYield,
      borderColor: "#f3c85f",
      backgroundColor: estateB ? "transparent" : "rgba(243, 200, 95, 0.12)",
      fill: !estateB,
      tension: 0.35,
      pointBackgroundColor: "#f3c85f",
      pointRadius: 4,
    },
  ];

  if (estateB) {
    datasets.push({
      label: `${estateB.name} (kg)`,
      data: estateB.monthlyYield,
      borderColor: "#38bdf8",
      backgroundColor: "transparent",
      fill: false,
      tension: 0.35,
      pointBackgroundColor: "#38bdf8",
      pointRadius: 4,
    });
  }

  return { labels: MONTHS, datasets };
};

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: { color: "#e5e9f0", font: { size: 11 } },
    },
    tooltip: {
      backgroundColor: "#1e2421",
      titleColor: "#f3c85f",
      bodyColor: "#e5e9f0",
      borderColor: "#2d3530",
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (context) =>
          `${context.dataset.label}: ${context.parsed.y.toLocaleString()} kg`,
      },
    },
  },
  scales: {
    x: {
      grid: { color: "rgba(255,255,255,0.05)" },
      ticks: { color: "#88929a", font: { size: 10 } },
    },
    y: {
      grid: { color: "rgba(255,255,255,0.05)" },
      ticks: { color: "#88929a", font: { size: 11 } },
    },
  },
};
