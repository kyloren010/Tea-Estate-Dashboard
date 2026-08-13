import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getChartData, getChartOptions } from "../utils/chartConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function YieldBarChart({ selectedEstate, comparedEstates }) {
  const chartData = getChartData(selectedEstate, comparedEstates);
  const options = getChartOptions(false);

  return (
    <div
      style={{
        backgroundColor: "#121614",
        padding: "16px",
        borderRadius: "8px",
        border: "1px solid #232a26",
      }}
    >
      <div style={{ height: "220px", width: "100%" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
