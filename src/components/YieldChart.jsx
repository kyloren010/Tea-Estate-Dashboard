import { Line } from "react-chartjs-2";
import { getChartData, chartOptions } from "../utils/chartConfig";

export default function YieldChart({ selectedEstate, comparedEstate }) {
  return (
    <div
      style={{
        backgroundColor: "#121614",
        padding: "16px",
        borderRadius: "8px",
        border: "1px solid #232a26",
      }}
    >
      <h4
        style={{
          margin: "0 0 12px 0",
          fontSize: "12px",
          color: "#e5e9f0",
          fontWeight: "600",
        }}
      >
        Harvest Timeline Comparison (2025)
      </h4>
      <div style={{ height: "200px" }}>
        <Line
          data={getChartData(selectedEstate, comparedEstate)}
          options={chartOptions}
        />
      </div>
    </div>
  );
}
