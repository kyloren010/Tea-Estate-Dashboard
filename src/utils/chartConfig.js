import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
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

// Color palette for multiple compared estates
const ESTATE_COLORS = [
  "#f3c85f", // Gold (Primary)
  "#38bdf8", // Sky Blue
  "#4ade80", // Light Green
  "#fb7185", // Coral Red
  "#c084fc", // Soft Purple
];

export const calculateFlushYields = (monthlyArray = []) => {
  const firstFlush = (monthlyArray[2] || 0) + (monthlyArray[3] || 0);
  const secondFlush =
    (monthlyArray[4] || 0) + (monthlyArray[5] || 0) + (monthlyArray[6] || 0);
  const remainder =
    monthlyArray.reduce((a, b) => a + b, 0) - (firstFlush + secondFlush);
  return { firstFlush, secondFlush, remainder };
};

export const getChartData = (selectedEstate, comparedEstates = []) => {
  const compareList = Array.isArray(comparedEstates)
    ? comparedEstates
    : comparedEstates
      ? [comparedEstates]
      : [];

  const allEstates = [selectedEstate, ...compareList].filter(Boolean);

  const datasets = allEstates.map((estate, idx) => {
    const color = ESTATE_COLORS[idx % ESTATE_COLORS.length];
    const isSingle = allEstates.length === 1;

    return {
      label: `${estate.name} (kg)`,
      data: estate.monthlyYield,
      borderColor: color,
      backgroundColor: isSingle ? "rgba(243, 200, 95, 0.25)" : color,
      fill: isSingle,
      tension: 0.35,
      pointBackgroundColor: color,
      pointRadius: 4,
      borderRadius: 4,
    };
  });

  return { labels: MONTHS, datasets };
};

/**
 * Returns chart options configured with high contrast dark text for white canvas export
 */
export const getChartOptions = (isExporting = false) => {
  const textColor = isExporting ? "#1e293b" : "#88929a";
  const legendColor = isExporting ? "#0f172a" : "#e5e9f0";
  const gridColor = isExporting
    ? "rgba(0, 0, 0, 0.12)"
    : "rgba(255, 255, 255, 0.05)";

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: legendColor,
          font: { size: 11, weight: "600" },
        },
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
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 10, weight: "600" } },
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 11, weight: "600" } },
      },
    },
  };
};

export const chartOptions = getChartOptions(false);
