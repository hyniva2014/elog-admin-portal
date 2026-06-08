import { styled } from "@mui/material/styles";
import { Box, Card, CardContent, Typography, Stack, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const getChartStyles = (theme) => ({
  axisLabelColor:   theme.palette.text.secondary,
  axisBorderColor:  theme.palette.divider,
  gridBorderColor:  theme.palette.divider,
  axisLabelFontSize:   "11px",
  axisLabelFontWeight: 500,
  yAxisTitleFontSize:  "12px",
  yAxisTitleFontWeight: 600,
  tooltipBg:           theme.palette.background.paper,
  tooltipBorder:       theme.palette.divider,
  tooltipDivider:      theme.palette.action.hover,
  tooltipShadow:       "0 4px 12px rgba(0,0,0,0.1)",
  tooltipBorderRadius: "8px",
  tooltipPadding:      "10px 14px",
  tooltipMinWidth:     "220px",
  tooltipCategoryColor:         theme.palette.text.primary,
  tooltipCategoryFontSize:      "13px",
  tooltipCategoryFontWeight:    700,
  tooltipCategoryMarginBottom:  "8px",
  tooltipCategoryPaddingBottom: "6px",
  tooltipLabelColor:    theme.palette.text.secondary,
  tooltipLabelFontSize: "13px",
  tooltipValueColor:      theme.palette.text.primary,
  tooltipValueFontSize:   "13px",
  tooltipValueFontWeight: 700,
  tooltipDotSize:    "10px",
  tooltipRowPadding: "3px 0",
  tooltipRowGap:     "8px",
  tooltipTotalFontWeight: 600,
  tooltipTotalPaddingTop: "6px",
  tooltipTotalMarginTop:  "6px",
});

export const CardContainer = styled(Card)(({ theme }) => ({
  borderRadius: 10,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(1.5),
  flex: 1,
  display: "flex",
  flexDirection: "column",
  "&:last-child": { paddingBottom: theme.spacing(1.5) },
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(2),
    "&:last-child": { paddingBottom: theme.spacing(2) },
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2.5),
    "&:last-child": { paddingBottom: theme.spacing(2.5) },
  },
}));

export const HeaderStack = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "space-between",
  gap: theme.spacing(1.5),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
  },
}));

export const TitleBox = styled(Box)({
  minWidth: 0,
  flex: 1,
});

export const ChartTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  fontSize: "1rem",
  [theme.breakpoints.up("sm")]: { fontSize: "1.125rem" },
  [theme.breakpoints.up("md")]: { fontSize: "1.25rem" },
}));

export const ChartSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: 4,
  fontSize: 12,
}));

export const FiltersStack = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: theme.spacing(1.5),
  [theme.breakpoints.up("sm")]: {
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
}));

export const FilterControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    minWidth: 150,
    width: "auto",
  },
}));

export const PeriodControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    minWidth: 120,
    width: "auto",
  },
}));


export const ChartWrapper = styled(Box)({
  width: "100%",
  height: 260,
  flexGrow: 1,
  minWidth: 0,
});

export const LegendGrid = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

export const LegendRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "16px",
  padding: "8px",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "12px",
  },
}));

export const LegendItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  width: "100%", // Take full width of grid cell
  minWidth: 0, // Allow text truncation if needed
});

export const LegendDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "dotcolor",
})(({ dotcolor }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: dotcolor,
}));

export const LegendLabel = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.primary,
}));



export const TooltipContainer = styled(Box)(({ theme }) => ({
  padding: "16px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(4px)",
  boxShadow: theme.shadows[1],
  minWidth: "180px",
}));

export const TooltipTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: "8px",
}));

export const TooltipRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "8px",
}));

export const TooltipDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "dotcolor",
})(({ dotcolor }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: dotcolor,
  flexShrink: 0,
}));

export const TooltipLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 500,
});

export const TooltipFooter = styled(Box)(({ theme }) =>({
  marginTop: "8px",
  paddingTop: "8px",
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const TooltipFooterLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
});

export const TooltipFooterValue = styled(Typography) ({
  fontSize: "14px",
  fontWeight: 700,
});


export const NoDataBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: "14px",
  textAlign: "center",
  marginTop: "60px",
}));


export const getIncidentColors = (theme) => ({
  HOS: theme.palette.error.main,
  "Mobile - Driver Log": theme.palette.error.dark,
  DVIR: theme.palette.success.main,
  DOT: theme.palette.warning.main,
  ACCIDENT: theme.palette.secondary.main,
  "TEAM DRIVER": theme.palette.info.main,
  PROFILE: theme.palette.grey[600],
  "Web - Compliance Management": theme.palette.primary.main,
  VIOLATIONS: theme.palette.error.light,
  "DOCUMENT CENTER": theme.palette.info.dark,
  "OPERATION CENTER": theme.palette.success.dark,
  "HOS SETTINGS": theme.palette.warning.dark,
  ROLES: theme.palette.secondary.dark,
  USERS: theme.palette.success.light,
  "REPORT INCIDENT": theme.palette.error.main,
  REPORTS: theme.palette.primary.dark,
});