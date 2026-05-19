import { Box, Paper, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ChartContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "chartheight",
})(({ chartheight, theme }) => ({
  padding: "16px",
  paddingTop: "8px",
  paddingBottom: "8px",
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: "16px",
  height: chartheight || 360,
  minHeight: 250,
  boxShadow: "none",
  display: "flex",
  flexDirection: "column",
}));

export const ChartTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isdark",
})(({ isdark, theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  color: isdark ? theme.palette.common.white : theme.palette.grey[900],
}));

export const ChartWrapper = styled(Box)({
  height: 280,
  minHeight: 200,
  minWidth: 200,
  width: "100%",
  position: "relative",
  display: "block",
});
export const ChartHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px",
  marginBottom: "16px",
}));


export const ChartSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: 4,
  fontSize: 12,
  fontWeight: 400,
}));

export const TooltipContainer = styled(Paper)(() => ({
  padding: "16px",
  borderRadius: "16px",
  minWidth: 160,
}));

export const TooltipLabel = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 700,
  marginBottom: "8px",
}));

export const TooltipRow = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "4px",
}));

export const TooltipText = styled(Typography)(() => ({
  fontSize: 13,
  fontWeight: 500,
}));

export const TooltipValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "textcolor",
})(({ textcolor }) => ({
  fontSize: 13,
  fontWeight: 700,
  color: textcolor,
}));

export const YearSelect = styled(TextField)({
  minWidth: 100,
  maxWidth: 120,
});



