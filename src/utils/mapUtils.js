import L from "leaflet";

/**
 * Generates custom divIcon marker based on region and selection state
 */
export const getCustomIcon = (region, isSelected) => {
  const color = region === "Assam" ? "#f3c85f" : "#38bdf8";
  const size = isSelected ? 28 : 20;

  return L.divIcon({
    className: "custom-pin",
    html: `<div style="
      background-color: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 3px solid #121614;
      box-shadow: 0 0 ${isSelected ? "12px" : "6px"} ${color};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};
