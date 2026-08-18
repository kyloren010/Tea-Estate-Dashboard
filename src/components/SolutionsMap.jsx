import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";

import jalpaiguriData from "../data/jalpaiguri.json";

const TiffOverlayLayer = ({ activeTiffUrl }) => {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    if (!activeTiffUrl) {
      if (layerRef.current && map.hasLayer(layerRef.current)) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
      return;
    }

    let isMounted = true;

    fetch(activeTiffUrl)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => parseGeoraster(arrayBuffer))
      .then((georaster) => {
        if (!isMounted) return;

        if (layerRef.current && map.hasLayer(layerRef.current)) {
          map.removeLayer(layerRef.current);
        }

        const layer = new GeoRasterLayer({
          georaster,
          opacity: 0.9,
          resolution: 128,
          pixelValuesToColorFn: (values) => {
            const [r, g, b] = values;
            if (r <= 5 && g <= 5 && b <= 5) {
              return null; // Transparent black pixels
            }
            return `rgb(${r},${g},${b})`;
          },
        });

        layerRef.current = layer;
        layer.addTo(map);
        map.fitBounds(layer.getBounds());
      })
      .catch((err) => console.error("Error loading GeoTIFF:", err));

    return () => {
      isMounted = false;
      if (layerRef.current && map.hasLayer(layerRef.current)) {
        map.removeLayer(layerRef.current);
      }
    };
  }, [activeTiffUrl, map]);

  return null;
};

const SolutionsMap = ({
  activeTiffUrl,
  isInspectActive,
  selectedGardenData,
}) => {
  const jalpaiguriStyle = {
    color: "#4ade80",
    weight: 2,
    opacity: 0.8,
    fillColor: "#22c55e",
    fillOpacity: 0.1,
  };

  const gardenStyle = {
    color: "#f59e0b",
    weight: 2.5,
    opacity: 0.9,
    fillColor: "#fbbf24",
    fillOpacity: 0.25,
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[26.52, 88.73]}
        zoom={9}
        zoomSnap={0.25}
        zoomDelta={0.5}
        wheelPxPerZoomLevel={120}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {/* Requirement 1 & 6: Main Jalpaiguri boundary */}
        {isInspectActive && (
          <GeoJSON data={jalpaiguriData} style={jalpaiguriStyle} />
        )}

        {/* Requirement 2: Garden boundary inside Jalpaiguri */}
        {isInspectActive && selectedGardenData && (
          <GeoJSON
            key={JSON.stringify(selectedGardenData)}
            data={selectedGardenData}
            style={gardenStyle}
          />
        )}

        {/* Satellite GeoTIFF Overlay */}
        {isInspectActive && <TiffOverlayLayer activeTiffUrl={activeTiffUrl} />}
      </MapContainer>
    </div>
  );
};

export default SolutionsMap;
