export default function Header({
  totalProduction,
  filterRegion,
  onRegionChange,
}) {
  const regions = ["All", "Assam", "West Bengal"];

  return (
    <header
      style={{
        borderBottom: "1px solid #232a26",
        padding: "16px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#161b18",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "28px" }}>🍃</span>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "22px",
              letterSpacing: "0.5px",
              color: "#f3c85f",
              fontFamily: "Georgia, serif",
            }}
          >
            TEA GARDEN OVERVIEW
          </h1>
          <p
            style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#88929a" }}
          >
            Geospatial Plantation Analytics & Harvest Timeline (2025)
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "11px",
              color: "#88929a",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Region Production
          </div>
          <div
            style={{ fontSize: "16px", fontWeight: "bold", color: "#f3c85f" }}
          >
            {totalProduction.toLocaleString()} kg
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "6px",
            background: "#121614",
            padding: "4px",
            borderRadius: "8px",
            border: "1px solid #232a26",
          }}
        >
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => onRegionChange(region)}
              style={{
                padding: "6px 14px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                backgroundColor:
                  filterRegion === region ? "#f3c85f" : "transparent",
                color: filterRegion === region ? "#121614" : "#88929a",
                transition: "all 0.2s ease",
              }}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
