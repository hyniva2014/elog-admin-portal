import { Box, ButtonGroup, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// ─── Alert Center ────────────────────────────────────────────────────────────

export const AlertContainer = styled(Paper)(({ theme }) => ({
  padding: "16px",
  paddingTop: 0,
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: "16px",
  height: 360,
  overflow: "auto",
  boxShadow: "none",

  /* Chrome, Edge, Safari */
  "&::-webkit-scrollbar": {
    width: "4px",
  },

  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[400],
    borderRadius: "10px",
  },

  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.grey[500],
  },

  /* Firefox */
  scrollbarWidth: "thin",
  scrollbarColor: `${theme.palette.grey[400]} transparent`,
}));

export const ChartHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px",
  marginBottom: "16px",
  marginTop: "16px",
}));

export const AlertTitle = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const ViewAllText = styled(Typography)(({ theme }) => ({
  fontSize: 11,
  fontWeight: 500,
  color: theme.palette.text.secondary,
  cursor: "pointer",
  textDecoration: "underline",
}));

export const AlertList = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

export const AlertCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "stretch",
  background: theme.palette.grey[50],
  borderRadius: "2px",
  overflow: "hidden",
  minHeight: 90,
  border: `1px solid ${theme.palette.grey[200]}`,
  position: "relative",
}));

export const AlertAccentBar = styled(Box)(({ accentcolor }) => ({
  width: "4px",
  backgroundColor: accentcolor,
}));

export const AlertContent = styled(Box)(() => ({
  flex: 1,
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}));

export const AlertDetails = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

export const AlertCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.2,
}));

export const AlertDetailRow = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  alignItems: "center",
}));

export const AlertDetailItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: theme.palette.text.secondary,
  fontSize: 13,
  fontWeight: 500,
}));

export const AlertTime = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.text.disabled,
  whiteSpace: "nowrap",
}));

export const AlertIcon = styled("img")({
  width: 14,
  height: 14,
});

// ─── AdminDashBoard Header ────────────────────────────────────────────────────

export const HeaderContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
  width: "100%",
}));

export const HeaderLeft = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const ComplianceTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "20px",
  color: theme.palette.text.primary,
}));

export const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 400,
  color: theme.palette.text.secondary,
  marginBottom: 16,
}));

export const DateRangeText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "13px",
  color: theme.palette.text.primary,
  marginTop: 4,
}));
