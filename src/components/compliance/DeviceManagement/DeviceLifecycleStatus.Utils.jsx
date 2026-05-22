export const CURRENT_YEAR = new Date().getFullYear().toString();

// export const DEFAULT_SEGMENTS = [
//   {
//     key: "active",
//     label: "Active",
//     count: 1095,
//     chartColor: "#48bb78",
//     bg: "#f0fff4",
//     borderColor: "#9ae6b4",
//     labelColor: "#48bb78",
//   },
//   {
//     key: "inStock",
//     label: "In Stock",
//     count: 227,
//     chartColor: "#4299e1",
//     bg: "#ebf8ff",
//     borderColor: "#90cdf4",
//     labelColor: "#4299e1",
//   },
//   {
//     key: "inMaintenance",
//     label: "In Maintenance",
//     count: 35,
//     chartColor: "#ed8936",
//     bg: "#fffaf0",
//     borderColor: "#fbd38d",
//     labelColor: "#dd6b20",
//   },
//   {
//     key: "retired",
//     label: "Retired",
//     count: 23,
//     chartColor: "#4a5568",
//     bg: "#f7fafc",
//     borderColor: "#cbd5e0",
//     labelColor: "#4a5568",
//   },
// ];

export const mapLifecycleToSegments = (lifecycle = {}) => [
  {
    key: "active",
    label: "Active",
    count: lifecycle.active_device_count ?? 0,
    chartColor: "#48bb78",
    bg: "#f0fff4",
    borderColor: "#9ae6b4",
    labelColor: "#48bb78",
  },
  {
    key: "inStock",
    label: "In Stock",
    count: lifecycle.in_stock_device_count ?? 0,
    chartColor: "#4299e1",
    bg: "#ebf8ff",
    borderColor: "#90cdf4",
    labelColor: "#4299e1",
  },
  {
    key: "inMaintenance",
    label: "In Maintenance",
    count: lifecycle.out_of_service_device_count ?? 0,
    chartColor: "#ed8936",
    bg: "#fffaf0",
    borderColor: "#fbd38d",
    labelColor: "#dd6b20",
  },
  {
    key: "retired",
    label: "Retired",
    count: lifecycle.retired ?? 0,
    chartColor: "#4a5568",
    bg: "#f7fafc",
    borderColor: "#cbd5e0",
    labelColor: "#4a5568",
  },
];

export const getChartDimensions = (containerWidth) => {
  const isNarrow = containerWidth > 0 && containerWidth < 420;
  const isWide = containerWidth >= 680;

  const chartPx =
    containerWidth === 0
      ? 360
      : isNarrow
        ? Math.min(containerWidth - 32, 320)
        : isWide
          ? 400
          : Math.min(Math.round(containerWidth * 0.5), 360);

  const cardAreaWidth = isNarrow
    ? containerWidth - 32
    : containerWidth - chartPx - 48;

  const cardWidth = Math.max((cardAreaWidth - 12) / 2, 60);

  return {
    isNarrow,
    isWide,
    chartPx,
    cardWidth,
  };
};

export const getResponsiveSizes = (cardWidth, chartPx, isWide) => {
  const labelSize =
    cardWidth < 70
      ? "0.6rem"
      : cardWidth < 90
        ? "0.68rem"
        : cardWidth < 120
          ? "0.75rem"
          : cardWidth < 160
            ? "0.8rem"
            : "0.875rem";

  const numberSize =
    cardWidth < 70
      ? "1.1rem"
      : cardWidth < 90
        ? "1.3rem"
        : cardWidth < 120
          ? "1.55rem"
          : cardWidth < 160
            ? "1.85rem"
            : isWide
              ? "2.4rem"
              : "2.1rem";

  const cardPx = cardWidth < 80 ? 1 : cardWidth < 110 ? 1.25 : 1.5;

  const cardPy = cardWidth < 80 ? 1 : cardWidth < 110 ? 1.25 : 1.75;

  const totalFontSize =
    chartPx < 220 ? "1rem" : chartPx < 280 ? "1.375rem" : "1.75rem";

  const centerSubSize = chartPx < 220 ? "0.65rem" : "0.85rem";

  return {
    labelSize,
    numberSize,
    cardPx,
    cardPy,
    totalFontSize,
    centerSubSize,
  };
};

export const getChartOptions = (displayedSegments, colors) => ({
  chart: {
    type: "donut",
    toolbar: { show: false },
    animations: { enabled: true },
  },

  labels: displayedSegments.map((s) => s.label),

  colors,

  legend: {
    show: false,
  },

  dataLabels: {
    enabled: false,
  },

  stroke: {
    width: 3,
    colors: ["#ffffff"],
  },

  plotOptions: {
    pie: {
      donut: {
        size: "70%",
        labels: {
          show: false,
        },
      },
    },
  },

  tooltip: {
    y: {
      formatter: (val) => `${val} devices`,
    },
  },

  states: {
    hover: {
      filter: {
        type: "lighten",
        value: 0.04,
      },
    },
  },
});
