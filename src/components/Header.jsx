export default function Header({
  activeTab = "overview",
  setActiveTab,
  showBoundary,
  setShowBoundary,
  totalProduction,
  filterRegion,
  onRegionChange,
  chartType,
  setChartType,
  onExportPdf,
}) {
  return (
    <header
      style={{
        backgroundColor: "#121614",
        borderBottom: "1px solid #232a26",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* BRANDING & NAVIGATION TABS */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "20px",
              fontFamily: "Georgia, serif",
              color: "#4ade80",
              letterSpacing: "1px",
            }}
          >
            TEA GARDEN OVERVIEW
          </h1>
          <p style={{ margin: 0, fontSize: "11px", color: "#88929a" }}>
            Geospatial Production Analytics & Harvest Trends (2025)
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#1a211d",
            padding: "3px",
            borderRadius: "6px",
            border: "1px solid #232a26",
          }}
        >
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              backgroundColor:
                activeTab === "overview" ? "#4ade80" : "transparent",
              color: activeTab === "overview" ? "#121614" : "#88929a",
              border: "none",
              padding: "6px 14px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              transition: "all 0.2s ease",
            }}
          >
            🏠 Overview
          </button>
          <button
            onClick={() => setActiveTab("solutions")}
            style={{
              backgroundColor:
                activeTab === "solutions" ? "#4ade80" : "transparent",
              color: activeTab === "solutions" ? "#121614" : "#88929a",
              border: "none",
              padding: "6px 14px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              transition: "all 0.2s ease",
            }}
          >
            💡 Solutions
          </button>
        </div>
      </div>

      {/* RIGHT SIDE CONTROLS */}
      {activeTab === "overview" ? (
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* STAT OVERVIEW */}
          <div style={{ textAlign: "right", marginRight: "8px" }}>
            <div
              style={{
                fontSize: "10px",
                color: "#88929a",
                textTransform: "uppercase",
              }}
            >
              Region Production
            </div>
            <div
              style={{ fontSize: "14px", fontWeight: "bold", color: "#f3c85f" }}
            >
              {totalProduction ? totalProduction.toLocaleString() : 0} kg
            </div>
          </div>

          {/* REGION FILTER BUTTONS */}
          <div style={{ display: "flex", gap: "4px" }}>
            {["All", "Assam", "West Bengal"].map((region) => (
              <button
                key={region}
                onClick={() => onRegionChange(region)}
                style={{
                  backgroundColor:
                    filterRegion === region ? "#f3c85f" : "#1a211d",
                  color: filterRegion === region ? "#121614" : "#88929a",
                  border: "1px solid #2d3530",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: filterRegion === region ? "bold" : "normal",
                }}
              >
                {region}
              </button>
            ))}
          </div>

          {/* CHART TYPE TOGGLE BUTTONS */}
          <div style={{ display: "flex", gap: "4px" }}>
            <button
              onClick={() => setChartType("line")}
              style={{
                backgroundColor: chartType === "line" ? "#38bdf8" : "#1a211d",
                color: chartType === "line" ? "#121614" : "#88929a",
                border: "1px solid #2d3530",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: chartType === "line" ? "bold" : "normal",
              }}
            >
              Line Chart
            </button>
            <button
              onClick={() => setChartType("bar")}
              style={{
                backgroundColor: chartType === "bar" ? "#38bdf8" : "#1a211d",
                color: chartType === "bar" ? "#121614" : "#88929a",
                border: "1px solid #2d3530",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: chartType === "bar" ? "bold" : "normal",
              }}
            >
              Bar Graph
            </button>
          </div>

          {/* PDF EXPORT BUTTON */}
          <button
            onClick={onExportPdf}
            style={{
              backgroundColor: "#f3c85f",
              color: "#121614",
              border: "none",
              padding: "6px 14px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            📄 Export Clean PDF Report
          </button>
        </div>
      ) : (
        /* INSPECT TOGGLE FOR SOLUTIONS TAB */
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            backgroundColor: "#1a211d",
            padding: "6px 14px",
            borderRadius: "6px",
            border: "1px solid #2d3530",
            fontSize: "13px",
            fontWeight: 500,
            color: "#e5e9f0",
            userSelect: "none",
          }}
        >
          <input
            type="checkbox"
            checked={showBoundary}
            onChange={(e) => setShowBoundary(e.target.checked)}
            style={{
              cursor: "pointer",
              accentColor: "#4ade80",
              width: "15px",
              height: "15px",
            }}
          />
          Inspect
        </label>
      )}
    </header>
  );
}
