import { useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Import or pass your Jalpaiguri GeoJSON data object
import jalpaiguriData from "../data/jalpaiguri.json";
const JalpaiguriMap = () => {
  const [showBoundary, setShowBoundary] = useState(true);
  const mapRef = useRef(null);

  // Dynamic styling for the GeoJSON boundary
  const boundaryStyle = {
    color: "#0284c7", // Border stroke color
    weight: 2.5, // Stroke width
    opacity: 0.9,
    fillColor: "#38bdf8", // Interior fill color
    fillOpacity: 0.25,
  };

  // Dynamic styling on hover
  const highlightStyle = {
    weight: 4,
    color: "#0369a1",
    fillOpacity: 0.45,
  };

  // Attach hover and interaction events to the GeoJSON layer
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const { district, lgd_code } = feature.properties;
      layer.bindTooltip(
        `<div><strong>District:</strong> ${district || "Jalpaiguri"}<br/><strong>LGD Code:</strong> ${lgd_code || "N/A"}</div>`,
        { sticky: true },
      );
    }

    layer.on({
      mouseover: (e) => {
        const targetLayer = e.target;
        targetLayer.setStyle(highlightStyle);
        targetLayer.bringToFront();
      },
      mouseout: (e) => {
        const targetLayer = e.target;
        targetLayer.setStyle(boundaryStyle);
      },
    });
  };

  // Automatically adjust bounds once the GeoJSON layer mounts
  const handleGeoJSONEachFeature = (feature, layer) => {
    onEachFeature(feature, layer);
  };

  const handleMapCreated = (mapInstance) => {
    mapRef.current = mapInstance;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* Floating Control Overlay */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 1000,
          backgroundColor: "#ffffff",
          padding: "10px 16px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontFamily: "sans-serif",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          id="boundary-toggle"
          checked={showBoundary}
          onChange={(e) => setShowBoundary(e.target.checked)}
          style={{ cursor: "pointer", width: "16px", height: "16px" }}
        />
        <label
          htmlFor="boundary-toggle"
          style={{ cursor: "pointer", fontWeight: 500, color: "#1e293b" }}
        >
          Show Jalpaiguri Boundary
        </label>
      </div>

      {/* React-Leaflet Map Instance */}
      <MapContainer
        center={[26.52, 88.73]}
        zoom={9}
        style={{ width: "100%", height: "100%" }}
        ref={handleMapCreated}
      >
        <LayersControl position="topleft">
          {/* Base Map Layers */}
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Esri World Imagery (Satellite)">
            <TileLayer
              attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Declarative GeoJSON Layer Toggle */}
        {showBoundary && (
          <GeoJSON
            data={jalpaiguriData}
            style={boundaryStyle}
            onEachFeature={handleGeoJSONEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default JalpaiguriMap;
