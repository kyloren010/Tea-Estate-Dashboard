import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function MapFlyTo({
  selectedEstate,
  filteredEstates,
  filterRegion,
}) {
  const map = useMap();

  useEffect(() => {
    if (!filteredEstates || filteredEstates.length === 0) return;

    // When "All" is selected, calculate bounding box to fit all estates on screen
    if (filterRegion === "All") {
      const bounds = L.latLngBounds(
        filteredEstates.map((estate) => [estate.lat, estate.lng]),
      );
      map.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 8,
        animate: true,
        duration: 1.2,
      });
    } else if (selectedEstate) {
      // Zoom into the specific selected estate
      map.flyTo([selectedEstate.lat, selectedEstate.lng], 9, {
        duration: 1.2,
      });
    }
  }, [selectedEstate, filterRegion, filteredEstates, map]);

  return null;
}
