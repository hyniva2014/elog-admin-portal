import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// ─── Alert Center ────────────────────────────────────────────────────────────

export const AlertContainer = styled(Paper)(({ theme }) => ({
  padding: "16px",
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

export const ChartHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  marginBottom: "12px",
  marginTop: "8px",
  position: "sticky",
  top: -16,
  backgroundColor: theme.palette.common.white,
  zIndex: 1,
  paddingTop: "8px",
  paddingBottom: "8px",
}));

export const AlertTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  fontSize: "1rem",
  [theme.breakpoints.up("sm")]: { fontSize: "1.125rem" },
  [theme.breakpoints.up("md")]: { fontSize: "1.25rem" },
}));

export const ViewAllText = styled(Typography)(({ theme, isLoading }) => ({
  fontSize: 11,
  fontWeight: 500,
  color: theme.palette.text.secondary,
  cursor: isLoading ? "not-allowed" : "pointer",
  textDecoration: "underline",
  pointerEvents: isLoading ? "none" : "auto",
  opacity: isLoading ? 0.5 : 1,
}));

export const AlertList = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

export const AlertCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "stretch",
  background: theme.palette.common.white,
  borderRadius: "8px",
  overflow: "hidden",
  minHeight: 90,
  border: `1px solid ${theme.palette.grey[200]}`,
  position: "relative",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[100],
    boxShadow: `0 8px 24px 0 rgba(0,0,0,0.12)`,
  },
}));

export const AlertCardChevron = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingRight: "12px",
  color: theme.palette.text.secondary,
  flexShrink: 0,
}));

export const AlertAccentBar = styled(Box)(({ theme }) => ({
  width: "4px",
  backgroundColor: theme.palette.custom.navyBlue,
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
  flex: 1,
}));

export const AlertTitleRow = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "12px",
  marginBottom: "8px",
}));

export const SeverityBadge = styled(Box)(({ theme, severity }) => {
  const getBadgeColor = (sev) => {
    switch (sev?.toLowerCase()) {
      case "critical":
        return {
          bg: "#FEE2E2",
          text: "#DC2626",
          border: "#FCA5A5",
        };
      case "high":
        return {
          bg: "#FFEDD5",
          text: "#EA580C",
          border: "#FDBA74",
        };
      case "medium":
        return {
          bg: "#FEF3C7",
          text: "#D97706",
          border: "#FCD34D",
        };
      case "low":
        return {
          bg: "#DBEAFE",
          text: "#2563EB",
          border: "#BFDBFE",
        };
      case "info":
        return {
          bg: "#E0F2FE",
          text: "#0284C7",
          border: "#BAE6FD",
        };
      default:
        return {
          bg: "#F3F4F6",
          text: "#374151",
          border: "#D1D5DB",
        };
    }
  };

  const colors = getBadgeColor(severity);

  return {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 600,
    backgroundColor: colors.bg,
    color: colors.text,
    border: `1px solid ${colors.border}`,
    whiteSpace: "nowrap",
    textTransform: "capitalize",
  };
});

export const CategoryBadge = styled(Box)(({ theme }) => ({
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: 500,
  backgroundColor: "#F3F4F6",
  color: "#374151",
  border: `1px solid #D1D5DB`,
  display: "flex",
  alignItems: "center",
  gap: "4px",
  whiteSpace: "nowrap",
}));

export const AlertDetailRow = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  alignItems: "center",
  paddingBottom: 8,
  marginBottom: 8,
  borderBottom: "none",
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

export const AlertIconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  fontSize: 14,
}));

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
  gap: "4px",
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
