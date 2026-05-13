import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AlertContainer = styled(Paper)(() => ({
  padding: "16px",
  paddingTop: 0,
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
  height: 360,
  overflow: "auto",
  boxShadow: "none",
}));

export const AlertHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  position: "sticky",
  top: 0,
  zIndex: 10,
  background: "#FFFFFF",
  paddingTop: "8px",
  paddingBottom: "8px",
}));

export const AlertTitle = styled(Typography)(() => ({
  fontSize: 18,
  fontWeight: 700,
  color: "#0F172A",
}));

export const ViewAllText = styled(Typography)(() => ({
  fontSize: 11,
  fontWeight: 500,
  color: "#64748B",
  cursor: "pointer",
  textDecoration: "underline",
}));

export const AlertList = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

export const AlertCard = styled(Box)(() => ({
  display: "flex",
  alignItems: "stretch",
  background: "#F8FAFC",
  borderRadius: "10px",
  overflow: "hidden",
  minHeight: 90,
  border: "1px solid rgba(226,232,240,0.8)",
  position: "relative",
}));

export const AlertAccentBar = styled(Box)(({ accentcolor }) => ({
  width: "6px",
  backgroundColor: accentcolor,
}));

export const AlertContent = styled(Box)(() => ({
  flex: 1,
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}));

export const AlertLeftContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const AlertSeverity = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 400,
  color: "#475569",
  marginBottom: "8px",
}));

export const AlertMessage = styled(Typography)(() => ({
  fontSize: 20,
  fontWeight: 500,
  color: "#0F172A",
  lineHeight: 1.4,
}));

export const AlertTime = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 500,
  color: "#64748B",
  whiteSpace: "nowrap",
}));



//Header styles for AdminDashBoard.jsx
export const HeaderContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const HeaderTitle = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: 600,
  color: "#202027",
  marginBottom: "4px",
}));

export const HeaderSubtitle = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 400,
  color: "#6B7280",
  marginBottom: 16,
}));