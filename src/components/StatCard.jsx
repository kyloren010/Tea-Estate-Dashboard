export default function StatCard({ label, value, valueColor = "#f3c85f" }) {
  return (
    <div
      style={{
        backgroundColor: "#121614",
        padding: "14px",
        borderRadius: "8px",
        border: "1px solid #232a26",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: "#88929a",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: valueColor,
          marginTop: "2px",
        }}
      >
        {value}
      </div>
    </div>
  );
}
