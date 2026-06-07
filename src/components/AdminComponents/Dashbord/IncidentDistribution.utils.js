import { Bar } from "recharts";

export const getChartConfig = (isMobile) => ({
  chartHeight: isMobile ? 220 : 250,
  barMaxSize: isMobile ? 30 : 40,
  xAxisFontSize: isMobile ? 10 : 11,
  yAxisFontSize: 12,
  labelFontSize: isMobile ? 10 : 12,
  chartMargins: {
    top: 10,
    right: 20,
    left: 10,
    bottom: 10,
  },
  tooltipCursor: false,
});

export const getBarRadius = (index, totalBars) => {
  const isLastBar = index === totalBars - 1;
  return isLastBar ? [4, 4, 0, 0] : [0, 0, 0, 0];
};

export const incidentOptions = [
  { value: "all", label: "All Incident" },
  { value: "open", label: "Open Only" },
  { value: "resolved", label: "Resolved" },
];

export const periodOptions = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
];

// Legend Helpers
export const splitLegendItems = (series) => {
  const topLegendItems = series?.slice(0, 3) || [];
  const bottomLegendItems = series?.slice(3) || [];
  return { topLegendItems, bottomLegendItems };
};

// Chart Data Transformer
export const transformChartData = (incidentDistribution, categories) => {
  if (!incidentDistribution?.series?.length) return [];

  return categories.map((category, index) => {
    const row = {
      name: category,
      total: 0,
    };

    incidentDistribution.series.forEach(({ data, name }) => {
      const value = data[index] || 0;
      row[name] = value;
      row.total += value;
    });

    return row;
  });
};

// Bar Renderer Factory (returns configuration, not JSX)
export const getBarConfigs = (series, barMaxSize) => {
  return (
    series?.map(({ name, color }, index) => ({
      key: name,
      dataKey: name,
      stackId: "a",
      fill: color,
      maxBarSize: barMaxSize,
      radius: getBarRadius(index, series.length),
    })) || []
  );
};


import { useTheme } from "@mui/material/styles";

// export default function useIncidentDistribution(period, incidentScope) {
//   const theme = useTheme();

//   const INCIDENT_COLORS = {
//     HOS: theme.palette.error.main,
//     LOGS: theme.palette.error.dark,
//     DVIR: theme.palette.success.main,
//     DOT: theme.palette.warning.main,
//     ACCIDENT: theme.palette.secondary.main,
//     TEAM_DRIVER: theme.palette.info.main,
//     PROFILE: theme.palette.grey[600],
//     COMPLIANCE_DASHBOARD: theme.palette.primary.main,
//     VIOLATIONS: theme.palette.error.main,
//     DOCUMENT_CENTER: theme.palette.info.dark,
//     OPERATION_CENTER: theme.palette.success.dark,
//     HOS_SETTINGS: theme.palette.warning.dark,
//     ROLES: theme.palette.secondary.dark,
//     USERS: theme.palette.success.light,
//     REPORT_INCIDENT: theme.palette.error.dark,
//     REPORTS: theme.palette.primary.dark,
//   };

// }