import { buildTooltipHtml } from "./IncidentDistribution.utils";

/**
 * Returns the ApexCharts options object for the Incident Distribution chart.
 * @param {object} theme   - MUI theme
 * @param {string[]} colors - Series colors array
 * @param {object} CHART_STYLES - Pre-computed style tokens from getChartStyles(theme)
 * @param {string[]} CATEGORIES - X-axis category labels
 */
export const getIncidentChartOptions = (theme, colors, CHART_STYLES, CATEGORIES) => ({
  chart: {
    type: "bar",
    stacked: true,
    stackType: "normal",
    toolbar: { show: false },
    fontFamily: theme.typography.fontFamily,
  },
  plotOptions: {
    bar: { horizontal: false, columnWidth: "58%", borderRadius: 2 },
  },
  colors,
  dataLabels: { enabled: false },
  stroke: { width: 0 },
  xaxis: {
    categories: CATEGORIES,
    labels: {
      style: {
        colors: CHART_STYLES.axisLabelColor,
        fontSize: CHART_STYLES.axisLabelFontSize,
        fontWeight: CHART_STYLES.axisLabelFontWeight,
      },
    },
    axisBorder: { show: true, color: CHART_STYLES.axisBorderColor },
    axisTicks: { show: false },
  },
  yaxis: {
    max: 20,
    tickAmount: 4,
    title: {
      text: "Incident Distribution",
      style: {
        color: CHART_STYLES.axisLabelColor,
        fontSize: CHART_STYLES.yAxisTitleFontSize,
        fontWeight: CHART_STYLES.yAxisTitleFontWeight,
      },
    },
    labels: {
      style: {
        colors: CHART_STYLES.axisLabelColor,
        fontSize: CHART_STYLES.axisLabelFontSize,
      },
    },
    axisBorder: { show: true, color: CHART_STYLES.axisBorderColor },
  },
  grid: {
    borderColor: CHART_STYLES.gridBorderColor,
    strokeDashArray: 4,
    padding: { left: 8, right: 8 },
  },
  legend: { show: false },
  tooltip: {
    shared: true,
    intersect: false,
    custom: ({ series, dataPointIndex, w }) =>
      buildTooltipHtml({ series, dataPointIndex, w, CHART_STYLES }),
  },
});
