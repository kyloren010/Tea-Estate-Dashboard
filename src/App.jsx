import { useState } from "react";
import estatesData from "./data/teaEstates.json";
import Header from "./components/Header";
import MapView from "./components/MapView";
import EstateDetails from "./components/EstateDetails";

export default function App() {
  const [selectedEstate, setSelectedEstate] = useState(estatesData[0]);
  const [comparedEstate, setComparedEstate] = useState(null);
  const [filterRegion, setFilterRegion] = useState("All");

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
        totalProduction={totalProduction}
        filterRegion={filterRegion}
        onRegionChange={handleRegionChange}
      />

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
          comparedEstate={comparedEstate}
          filterRegion={filterRegion}
          onSelectEstate={setSelectedEstate}
        />

        <EstateDetails
          selectedEstate={selectedEstate}
          comparedEstate={comparedEstate}
          filteredEstates={filteredEstates}
          onSelectEstate={setSelectedEstate}
          onSelectCompare={setComparedEstate}
        />
      </div>
    </div>
  );
}
