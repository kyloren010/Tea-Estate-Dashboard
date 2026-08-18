import { useState } from "react";
import { ESTATES_DATA } from "../data/estatesData";

const SolutionsInspector = ({
  isInspectActive,
  selectedTiffUrl,
  setSelectedTiffUrl,
  setSelectedGardenData,
}) => {
  const [openEstateId, setOpenEstateId] = useState(null);

  // Requirement 2 & 5: Toggle Garden boundary and remove active TIFF when garden selection is toggled off
  const handleGardenClick = (estate) => {
    if (openEstateId === estate.id) {
      setOpenEstateId(null);
      setSelectedGardenData(null);
      setSelectedTiffUrl(null); // Clear satellite image if open
    } else {
      setOpenEstateId(estate.id);
      setSelectedGardenData(estate.geoJson);
      setSelectedTiffUrl(null); // Reset TIFF until user selects a month
    }
  };

  // Requirement 3 & 4: Toggle satellite layer on first click, disappear on second click
  const handleMonthClick = (url) => {
    if (selectedTiffUrl === url) {
      setSelectedTiffUrl(null);
    } else {
      setSelectedTiffUrl(url);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#121815",
        border: "1px solid #232d28",
        borderRadius: "12px",
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: "#e5e9f0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          paddingBottom: "16px",
          borderBottom: "1px solid #232d28",
        }}
      >
        <span style={{ fontWeight: "600", fontSize: "16px", color: "#4ade80" }}>
          Estate Inspection Mode
        </span>
      </div>

      <div style={{ flex: 1, marginTop: "20px", position: "relative" }}>
        {!isInspectActive ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            Enable "Inspect" in header to select tea gardens and view satellite
            layers.
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                textTransform: "uppercase",
              }}
            >
              Select Estate
            </span>

            {ESTATES_DATA.map((estate) => (
              <div key={estate.id} style={{ position: "relative" }}>
                <div
                  onClick={() => handleGardenClick(estate)}
                  style={{
                    padding: "12px 16px",
                    backgroundColor:
                      openEstateId === estate.id ? "#1e2923" : "#18201c",
                    border: "1px solid #2d3832",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "500", fontSize: "14px" }}>
                      {estate.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      {estate.location}
                    </div>
                  </div>
                  <span
                    style={{
                      color: "#4ade80",
                      fontSize: "12px",
                      transform:
                        openEstateId === estate.id
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    ▶
                  </span>
                </div>

                {openEstateId === estate.id && (
                  <div
                    style={{
                      position: "absolute",
                      right: "100%",
                      top: "0",
                      marginRight: "8px",
                      width: "200px",
                      backgroundColor: "#18201c",
                      border: "1px solid #2d3832",
                      borderRadius: "8px",
                      padding: "8px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#94a3b8",
                        marginBottom: "6px",
                        paddingLeft: "8px",
                        textTransform: "uppercase",
                      }}
                    >
                      Available Imagery
                    </div>
                    {estate.tiffs.map((tiff) => (
                      <div
                        key={tiff.month}
                        onClick={() => handleMonthClick(tiff.url)}
                        style={{
                          padding: "8px",
                          fontSize: "13px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          backgroundColor:
                            selectedTiffUrl === tiff.url
                              ? "#22c55e22"
                              : "transparent",
                          color:
                            selectedTiffUrl === tiff.url
                              ? "#4ade80"
                              : "#cbd5e1",
                          fontWeight:
                            selectedTiffUrl === tiff.url ? "600" : "400",
                        }}
                      >
                        {tiff.month}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionsInspector;
