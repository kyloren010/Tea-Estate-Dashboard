import { motion, AnimatePresence } from "framer-motion";
import StatCard from "./StatCard";
import EstateList from "./EstateList";
import { calculateFlushYields } from "../utils/chartConfig";

export default function EstateDetails({
  selectedEstate,
  comparedEstates = [],
  comparedEstate = null,
  filteredEstates = [],
  onSelectEstate,
  onSelectCompare,
  chartType = "line",
  YieldChartComponent,
}) {
  if (!selectedEstate) return null;

  // Calculate flush yields safely
  const primaryFlush = calculateFlushYields(selectedEstate.monthlyYield || []);

  // Normalize compared estates to an array
  const activeComparedList = Array.isArray(comparedEstates)
    ? comparedEstates
    : comparedEstate
      ? [comparedEstate]
      : [];

  return (
    <div
      style={{
        backgroundColor: "#161b18",
        borderLeft: "1px solid #232a26",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedEstate.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {/* BANNER IMAGE */}
          <div
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #2d3530",
              marginBottom: "16px",
              position: "relative",
            }}
          >
            <img
              src={selectedEstate.image}
              alt={selectedEstate.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                fontSize: "11px",
                fontWeight: "bold",
                padding: "4px 10px",
                borderRadius: "20px",
                backgroundColor:
                  selectedEstate.region === "Assam" ? "#f3c85f" : "#38bdf8",
                color: "#121614",
              }}
            >
              {selectedEstate.region}
            </span>
          </div>

          {/* ESTATE NAME & LOCATION */}
          <h2
            style={{
              margin: "0 0 4px 0",
              fontFamily: "Georgia, serif",
              fontSize: "22px",
              color: "#e5e9f0",
            }}
          >
            {selectedEstate.name}
          </h2>

          <p
            style={{
              margin: "0 0 16px 0",
              color: "#88929a",
              fontSize: "12px",
            }}
          >
            📍 {selectedEstate.location || `${selectedEstate.region}, India`} •
            ({selectedEstate.coordinates?.lat ?? selectedEstate.lat}°N,{" "}
            {selectedEstate.coordinates?.lng ?? selectedEstate.lng}°E)
          </p>

          {/* FLUSH BREAKDOWN SECTION */}
          <div style={{ marginBottom: "16px" }}>
            <h4
              style={{
                fontSize: "11px",
                color: "#88929a",
                textTransform: "uppercase",
                margin: "0 0 8px 0",
              }}
            >
              Harvest Flush Breakdown
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <StatCard
                label="1st Flush (Spring)"
                value={`${primaryFlush.firstFlush.toLocaleString()} kg`}
                valueColor="#4ade80"
              />
              <StatCard
                label="2nd Flush (Muscatel/Malt)"
                value={`${primaryFlush.secondFlush.toLocaleString()} kg`}
                valueColor="#f3c85f"
              />
            </div>
          </div>

          {/* ACTIVE COMPARISON BANNERS */}
          {activeComparedList.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "11px", color: "#88929a" }}>
                  Active Comparisons ({activeComparedList.length}):
                </span>
                <button
                  onClick={() => onSelectCompare(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#fb7185",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                >
                  Clear All
                </button>
              </div>

              {activeComparedList.map((comp) => (
                <div
                  key={comp.id}
                  style={{
                    backgroundColor: "rgba(56, 189, 248, 0.1)",
                    border: "1px solid #38bdf8",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    color: "#38bdf8",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    Comparing with: <strong>{comp.name}</strong>
                  </span>
                  <button
                    onClick={() => onSelectCompare(comp)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#38bdf8",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* DYNAMIC YIELD CHART CONTAINER */}
          <div style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontSize: "11px",
                color: "#88929a",
                textTransform: "uppercase",
                margin: "0 0 8px 0",
              }}
            >
              {chartType === "bar"
                ? "2025 Harvest Yield Profile (Bar View)"
                : "2025 Harvest Yield Profile (Line View)"}
            </h4>

            <div
              id="yield-chart-wrapper"
              style={{
                backgroundColor: "#121614",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              {YieldChartComponent ? (
                <YieldChartComponent
                  selectedEstate={selectedEstate}
                  comparedEstates={activeComparedList}
                  comparedEstate={activeComparedList[0] || null}
                />
              ) : null}
            </div>
          </div>

          {/* QUICK SELECTOR & COMPARISON SELECTOR */}
          <EstateList
            filteredEstates={filteredEstates}
            selectedEstate={selectedEstate}
            comparedEstates={activeComparedList}
            comparedEstate={activeComparedList[0] || null}
            onSelectEstate={onSelectEstate}
            onSelectCompare={onSelectCompare}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
