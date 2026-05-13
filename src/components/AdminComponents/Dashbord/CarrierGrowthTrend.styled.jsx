import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ChartContainer = styled(Paper)(({ chartheight }) => ({
  padding: "16px",
  paddingTop: "8px",
  paddingBottom: "8px",
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
  height: chartheight || 360,
  boxShadow: "none",
}));

export const ChartTitle = styled(Typography)(({ isdark }) => ({
  fontSize: 18,
  fontWeight: 700,
  marginBottom: "24px",
  color: isdark ? "#FFFFFF" : "#111827",
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

export const TooltipValue = styled(Typography)(({ textcolor }) => ({
  fontSize: 13,
  fontWeight: 700,
  color: textcolor,
}));
