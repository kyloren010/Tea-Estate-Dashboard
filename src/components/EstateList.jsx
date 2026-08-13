import { useState } from "react";

export default function EstateList({
  filteredEstates = [],
  selectedEstate,
  comparedEstates = [],
  comparedEstate = null, // Fallback for single-object handling
  onSelectEstate,
  onSelectCompare,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("yield-desc");

  // Normalize compared list into a standard array
  const activeComparedList = Array.isArray(comparedEstates)
    ? comparedEstates
    : comparedEstate
      ? [comparedEstate]
      : [];

  // Filter by search keyword
  const searchFiltered = filteredEstates.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sort logic
  const sortedEstates = [...searchFiltered].sort((a, b) => {
    if (sortBy === "yield-desc") return b.totalYield - a.totalYield;
    if (sortBy === "yield-asc") return a.totalYield - b.totalYield;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div style={{ marginTop: "20px" }}>
      {/* SEARCH AND SORT CONTROLS */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="🔍 Search estate or district..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            backgroundColor: "#121614",
            border: "1px solid #232a26",
            borderRadius: "6px",
            padding: "8px 12px",
            color: "#e5e9f0",
            fontSize: "12px",
            outline: "none",
          }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            backgroundColor: "#121614",
            border: "1px solid #232a26",
            borderRadius: "6px",
            padding: "8px",
            color: "#88929a",
            fontSize: "12px",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="yield-desc">Yield: High → Low</option>
          <option value="yield-asc">Yield: Low → High</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      <h4
        style={{
          fontSize: "11px",
          color: "#88929a",
          textTransform: "uppercase",
          margin: "0 0 8px 0",
          letterSpacing: "0.5px",
        }}
      >
        Select Estate ({sortedEstates.length})
      </h4>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          maxHeight: "180px",
          overflowY: "auto",
        }}
      >
        {sortedEstates.map((item) => {
          const isSelected = selectedEstate?.id === item.id;

          // Check if item exists in compared array
          const isCompared = activeComparedList.some(
            (comp) => comp?.id === item.id,
          );

          return (
            <div
              key={item.id}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: isSelected
                  ? "#232a26"
                  : isCompared
                    ? "#182c38"
                    : "#121614",
                border: isSelected
                  ? "1px solid #f3c85f"
                  : isCompared
                    ? "1px solid #38bdf8"
                    : "1px solid transparent",
                transition: "all 0.15s ease",
              }}
            >
              <div
                onClick={() => onSelectEstate(item)}
                style={{ cursor: "pointer", flex: 1 }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: isSelected ? "bold" : "normal",
                    color: isSelected
                      ? "#f3c85f"
                      : isCompared
                        ? "#38bdf8"
                        : "#e5e9f0",
                  }}
                >
                  {item.name}
                </div>
                <div style={{ fontSize: "11px", color: "#88929a" }}>
                  {(item.totalYield / 1000).toFixed(0)}k kg • {item.region}
                </div>
              </div>

              {/* COMPARE BUTTON */}
              {!isSelected && (
                <button
                  onClick={() => onSelectCompare(item)}
                  style={{
                    padding: "4px 8px",
                    fontSize: "11px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: isCompared ? "#38bdf8" : "#232a26",
                    color: isCompared ? "#121614" : "#88929a",
                    fontWeight: "600",
                  }}
                >
                  {isCompared ? "Comparing ✓" : "+ Compare"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
