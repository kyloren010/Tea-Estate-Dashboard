export default function ChartToggle({ chartType, setChartType }) {
  return (
    <div
      style={{
        display: "inline-flex",
        backgroundColor: "#121614",
        padding: "3px",
        borderRadius: "6px",
        border: "1px solid #232a26",
      }}
    >
      <button
        type="button"
        onClick={() => setChartType("line")}
        style={{
          background: chartType === "line" ? "#232a26" : "transparent",
          color: chartType === "line" ? "#f3c85f" : "#88929a",
          border: "none",
          borderRadius: "4px",
          padding: "5px 12px",
          fontSize: "12px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        📈 Line Chart
      </button>

      <button
        type="button"
        onClick={() => setChartType("bar")}
        style={{
          background: chartType === "bar" ? "#232a26" : "transparent",
          color: chartType === "bar" ? "#f3c85f" : "#88929a",
          border: "none",
          borderRadius: "4px",
          padding: "5px 12px",
          fontSize: "12px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        📊 Bar Graph
      </button>
    </div>
  );
}
