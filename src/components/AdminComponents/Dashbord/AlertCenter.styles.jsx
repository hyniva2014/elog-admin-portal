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

export const AlertDetails = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

export const AlertCardTitle = styled(Typography)(() => ({
  fontSize: 18,
  fontWeight: 700,
  color: "#0F172A",
  lineHeight: 1.2,
}));

export const AlertDetailRow = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  alignItems: "center",
}));

export const AlertDetailItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#475569",
  fontSize: 13,
  fontWeight: 500,
}));

export const AlertTime = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 500,
  color: "#64748B",
  whiteSpace: "nowrap",
}));

//Header styles for AdminDashBoard.jsx
export const HeaderSubtitle = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 400,
  color: "#6B7280",
  marginBottom: 16,
}));

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

export const ComplianceTitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "20px",
  color: "#202027",
}));

export const DateRangeText = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "13px",
  color: "#202027",
  marginTop: 4,
}));

export const AlertIcon = styled("img")({
  width: 14,
  height: 14,
});




//DateRangeSelector styles for AdminDashBoard.jsx
export const buttonGroupStyles = (theme) => ({
  boxShadow: "none",

  "& .MuiButton-root": {
    textTransform: "none",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.secondary,
    border: "none",
    fontSize: "0.8rem",
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.palette.grey[100],
    },

    "&.selected": {
      backgroundColor: "#284495",
      color: theme.palette.common.white,
      fontWeight: 600,

      "&:hover": {
        backgroundColor: "#284495",
      },
    },
  },
});
