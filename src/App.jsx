import { useState } from "react";
import estatesData from "./data/teaEstates.json";
import Header from "./components/Header";
import MapView from "./components/MapView";
import EstateDetails from "./components/EstateDetails";
import YieldBarChart from "./components/YieldBarChart";
import YieldChart from "./components/YieldChart";
import SolutionsView from "./components/SolutionsView";
import { exportToPdf } from "./utils/pdfExporter";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedEstate, setSelectedEstate] = useState(estatesData[0]);
  const [comparedEstates, setComparedEstates] = useState([]);
  const [filterRegion, setFilterRegion] = useState("All");
  const [chartType, setChartType] = useState("line");

  // Solutions Inspect state managed at App level
  const [isInspectActive, setIsInspectActive] = useState(false);
  const [selectedTiffUrl, setSelectedTiffUrl] = useState(null);

  const filteredEstates = estatesData.filter(
    (e) => filterRegion === "All" || e.region === filterRegion,
  );

  const totalProduction = filteredEstates.reduce(
    (acc, curr) => acc + curr.totalYield,
    0,
  );

  const handleRegionChange = (region) => {
    setFilterRegion(region);
    const regionEstates = estatesData.filter(
      (e) => region === "All" || e.region === region,
    );
    if (regionEstates.length > 0) {
      setSelectedEstate(regionEstates[0]);
    }
  };

  const handleToggleCompare = (estateToCompare) => {
    if (!estateToCompare) {
      setComparedEstates([]);
      return;
    }
    setComparedEstates((prev) => {
      const exists = prev.some((e) => e.id === estateToCompare.id);
      if (exists) {
        return prev.filter((e) => e.id !== estateToCompare.id);
      }
      return [...prev, estateToCompare];
    });
  };

  const handleExportPdf = () => {
    if (!selectedEstate) {
      alert("Please select a tea estate first.");
      return;
    }
    exportToPdf(selectedEstate, comparedEstates);
  };

  // Reset selected GeoTIFF layer when disabling Inspect mode
  const handleInspectToggle = (active) => {
    setIsInspectActive(active);
    if (!active) {
      setSelectedTiffUrl(null);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#121614",
        color: "#e5e9f0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isInspectActive={isInspectActive}
        setIsInspectActive={handleInspectToggle}
        totalProduction={totalProduction}
        filterRegion={filterRegion}
        onRegionChange={handleRegionChange}
        selectedEstate={selectedEstate}
        comparedEstates={comparedEstates}
        chartType={chartType}
        setChartType={setChartType}
        onExportPdf={handleExportPdf}
      />

      {activeTab === "overview" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 440px",
            flex: 1,
            height: "calc(100vh - 75px)",
            overflow: "hidden",
          }}
        >
          <MapView
            filteredEstates={filteredEstates}
            selectedEstate={selectedEstate}
            comparedEstates={comparedEstates}
            filterRegion={filterRegion}
            onSelectEstate={setSelectedEstate}
          />

          <div
            id="dashboard-export-area"
            style={{
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              backgroundColor: "#0d110e",
            }}
          >
            <EstateDetails
              selectedEstate={selectedEstate}
              comparedEstates={comparedEstates}
              filteredEstates={filteredEstates}
              onSelectEstate={setSelectedEstate}
              onSelectCompare={handleToggleCompare}
              chartType={chartType}
              YieldChartComponent={
                chartType === "bar" ? YieldBarChart : YieldChart
              }
            />
          </div>
        </div>
      )}

      {activeTab === "solutions" && (
        <div
          style={{
            flex: 1,
            height: "calc(100vh - 75px)",
            padding: "16px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SolutionsView
            isInspectActive={isInspectActive}
            setIsInspectActive={handleInspectToggle}
            selectedTiffUrl={selectedTiffUrl}
            setSelectedTiffUrl={setSelectedTiffUrl}
          />
        </div>
      )}
    </div>
  );
}
