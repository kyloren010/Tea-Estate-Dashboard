import { motion, AnimatePresence } from "framer-motion";
import StatCard from "./StatCard";
import YieldChart from "./YieldChart";
import EstateList from "./EstateList";
import { calculateFlushYields } from "../utils/chartConfig";

export default function EstateDetails({
  selectedEstate,
  comparedEstate,
  filteredEstates,
  onSelectEstate,
  onSelectCompare,
}) {
  const primaryFlush = calculateFlushYields(selectedEstate.monthlyYield);

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

          {/* ========================================================= */}
          {/* 🔴 ORIGINAL CODE (COMMENTED OUT FOR LATER USE)          */}
          {/* ========================================================= */}
          {
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
          }

          {/* ==================== 🟡 START OF UNFINISHED BUTTON ==================== */}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "4px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: "Georgia, serif",
                fontSize: "22px",
                color: "#e5e9f0",
              }}
            >
              {selectedEstate.name}
            </h2>

            <button
              disabled
              style={{
                opacity: 0.5,
                cursor: "not-allowed",
                backgroundColor: "#232a26",
                color: "#88929a",
                border: "1px solid #2d3530",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "11px",
                whiteSpace: "nowrap",
              }}
              title="Phase 2 Feature"
            >
              📥 Export CSV (Phase 2)
            </button>
          </div> */}
          {/* ===================== 🟡 END OF UNFINISHED BUTTON ===================== */}

          <p
            style={{ margin: "0 0 16px 0", color: "#88929a", fontSize: "12px" }}
          >
            📍 {selectedEstate.location} • ({selectedEstate.lat}°N,{" "}
            {selectedEstate.lng}°E)
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

          {/* COMPARISON STATUS BANNER */}
          {comparedEstate && (
            <div
              style={{
                backgroundColor: "rgba(56, 189, 248, 0.1)",
                border: "1px solid #38bdf8",
                borderRadius: "6px",
                padding: "8px 12px",
                fontSize: "12px",
                color: "#38bdf8",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span>
                Comparing with: <strong>{comparedEstate.name}</strong>
              </span>
              <button
                onClick={() => onSelectCompare(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#38bdf8",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ✕ Clear
              </button>
            </div>
          )}

          {/* DUAL OR SINGLE YIELD CHART */}
          <YieldChart
            selectedEstate={selectedEstate}
            comparedEstate={comparedEstate}
          />

          {/* QUICK SELECTOR & COMPARISON SELECTOR */}
          <EstateList
            filteredEstates={filteredEstates}
            selectedEstate={selectedEstate}
            comparedEstate={comparedEstate}
            onSelectEstate={onSelectEstate}
            onSelectCompare={onSelectCompare}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
