import { useState } from "react";
import { exportToPdf } from "../utils/pdfExporter";

export default function PdfExportButton({
  selectedEstate,
  comparedEstates = [],
  chartType = "line",
}) {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    if (!selectedEstate) return;
    setIsExporting(true);
    await exportToPdf(selectedEstate, comparedEstates, chartType);
    setIsExporting(false);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isExporting || !selectedEstate}
      style={{
        backgroundColor: isExporting ? "#2a342e" : "#1f2923",
        color: isExporting ? "#88929a" : "#f3c85f",
        border: "1px solid #323d35",
        borderRadius: "6px",
        padding: "7px 14px",
        fontSize: "12px",
        fontWeight: "600",
        cursor: isExporting ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        transition: "all 0.2s ease",
      }}
    >
      {isExporting ? "⏳ Exporting Report..." : "📄 Export Clean PDF Report"}
    </button>
  );
}
