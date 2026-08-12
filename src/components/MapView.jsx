import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapFlyTo from "./MapFlyTo";
import { getCustomIcon } from "../utils/mapUtils";

const MAP_LAYERS = {
  dark: {
    name: "Dark Canvas",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
  satellite: {
    name: "Satellite View",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  },
};

export default function MapView({
  filteredEstates,
  selectedEstate,
  comparedEstate,
  filterRegion,
  onSelectEstate,
}) {
  const [mapStyle, setMapStyle] = useState("dark");

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* LAYER TOGGLE BUTTONS */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 1000,
          background: "rgba(18, 22, 20, 0.85)",
          backdropFilter: "blur(8px)",
          padding: "4px",
          borderRadius: "8px",
          border: "1px solid #232a26",
          display: "flex",
          gap: "4px",
        }}
      >
        {Object.keys(MAP_LAYERS).map((key) => (
          <button
            key={key}
            onClick={() => setMapStyle(key)}
            style={{
              padding: "6px 12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              backgroundColor: mapStyle === key ? "#f3c85f" : "transparent",
              color: mapStyle === key ? "#121614" : "#88929a",
              transition: "all 0.2s ease",
            }}
          >
            {MAP_LAYERS[key].name}
          </button>
        ))}
      </div>

      <MapContainer
        center={[26.8, 91.5]}
        zoom={7}
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          key={mapStyle}
          url={MAP_LAYERS[mapStyle].url}
          attribution={MAP_LAYERS[mapStyle].attribution}
        />

        <MapFlyTo
          selectedEstate={selectedEstate}
          filteredEstates={filteredEstates}
          filterRegion={filterRegion}
        />

        {filteredEstates.map((estate) => {
          const isPrimary = selectedEstate?.id === estate.id;
          const isCompared = comparedEstate?.id === estate.id;

          return (
            <Marker
              key={estate.id}
              position={[estate.lat, estate.lng]}
              icon={getCustomIcon(
                isCompared ? "Compare" : estate.region,
                isPrimary || isCompared,
              )}
              eventHandlers={{
                click: () => onSelectEstate(estate),
              }}
            >
              <Popup>
                <strong style={{ color: "#f3c85f" }}>{estate.name}</strong>
                <br />
                <span style={{ fontSize: "12px" }}>{estate.location}</span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
