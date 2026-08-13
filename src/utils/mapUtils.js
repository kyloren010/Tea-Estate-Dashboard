import L from "leaflet";

// Match the exact color palette used in chartConfig.js
export const ESTATE_COLORS = [
  "#f3c85f", // Gold (Primary Selected)
  "#38bdf8", // Sky Blue (Compare 1)
  "#4ade80", // Light Green (Compare 2)
  "#fb7185", // Coral Red (Compare 3)
  "#c084fc", // Soft Purple (Compare 4)
];

/**
 * Generates custom divIcon marker based on region, selection state, and custom color
 */
export const getCustomIcon = (region, isSelected, customColor = null) => {
  // Use explicit color if provided; otherwise fallback to region default
  const color = customColor
    ? customColor
    : region === "Assam"
      ? "#fb0808"
      : "#3f05fd";

  const size = isSelected ? 26 : 18;

  return L.divIcon({
    className: "custom-pin",
    html: `<div style="
      background-color: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 2px solid #121614;
      box-shadow: 0 0 ${isSelected ? "12px" : "4px"} ${color};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};
