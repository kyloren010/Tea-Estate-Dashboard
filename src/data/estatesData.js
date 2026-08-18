import binaguriBoundary from "./binaguri_tea_gardens.json";

export const ESTATES_DATA = [
  {
    id: "binnaguri",
    name: "Binnaguri Tea Estate",
    location: "Jalpaiguri, West Bengal",
    geoJson: binaguriBoundary,
    tiffs: [
      {
        month: "January 2026",
        url: "/RGB_GeoTIFF/2026_01_January_20260103_RGB.tif",
      },
      {
        month: "February 2026",
        url: "/RGB_GeoTIFF/2026_02_February_20260202_RGB.tif",
      },
      {
        month: "March 2026",
        url: "/RGB_GeoTIFF/2026_03_March_20260304_RGB.tif",
      },
      {
        month: "April 2026",
        url: "/RGB_GeoTIFF/2026_04_April_20260403_RGB.tif",
      },
      { month: "May 2026", url: "/RGB_GeoTIFF/2026_05_May_20260528_RGB.tif" },
      { month: "June 2026", url: "/RGB_GeoTIFF/2026_06_June_20260602_RGB.tif" },
      {
        month: "August 2026",
        url: "/RGB_GeoTIFF/2026_08_August_20260811_RGB.tif",
      },
    ],
  },
];
