import { useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import jalpaiguriData from "../data/jalpaiguri.json";

const JalpaiguriMap = ({ showBoundary = true }) => {
  const mapRef = useRef(null);

  const boundaryStyle = {
    color: "#0284c7",
    weight: 2.5,
    opacity: 0.9,
    fillColor: "#38bdf8",
    fillOpacity: 0.25,
  };

  const highlightStyle = {
    weight: 4,
    color: "#0369a1",
    fillOpacity: 0.45,
  };

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

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 110px)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <MapContainer
        center={[26.52, 88.73]}
        zoom={9}
        style={{ width: "100%", height: "100%" }}
        ref={(map) => (mapRef.current = map)}
      >
        <LayersControl position="topleft">
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

        {showBoundary && (
          <GeoJSON
            data={jalpaiguriData}
            style={boundaryStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default JalpaiguriMap;
