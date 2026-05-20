import { Box, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Main Container
export const AlertsContainer = styled(Box)(() => ({
  display: "flex",
  // gap: 20,
  height: "100%",
}));

export const AlertCardContainer = styled(Paper)(({ theme }) => ({
  paddingLeft: "16px",
  paddingTop: 0,
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: "0px",
  height: "675px",
  overflow: "auto",
  boxShadow: "none",
}));

// Left Sidebar - Alert List
export const AlertList = styled(Box)(() => ({
  flex: "0 0 300px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
 

  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#ccc",
    borderRadius: 3,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#999",
  },
}));

// Alert Card in List
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

// Alert Content in List
export const AlertContent = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 12,
}));

// Alert Details Container
export const AlertDetails = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 12,
}));

// Main Detail Section (Right side)
export const DetailSection = styled(Paper)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 24,
  padding: 24,
  background: "#ffffff",
  borderRadius: 8,
  border: `1px solid ${theme.palette.grey[200]}`,
  overflowY: "auto",
  boxShadow: "none",

  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#ccc",
    borderRadius: 3,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#999",
  },
}));

// Header Section with Title and Badge
export const DetailHeader = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: 16,
  borderBottom: "1px solid #e5e7eb",
}));

export const DetailTitleWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));

export const DetailTitle = styled(Typography)(() => ({
  margin: 0,
  fontSize: 18,
  fontWeight: 700,
  color: "#1f2937",
  lineHeight: 1.2,
}));

export const DetailSubTitle = styled(Typography)(() => ({
  fontSize: 13,
  fontWeight: 400,
  color: "#6B7280",
}));

export const BadgeContainer = styled(Box)(() => ({
  display: "flex",
  gap: 8,
}));

export const Badge = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ variant }) => ({
  padding: "4px 12px",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  backgroundColor:
    variant === "critical"
      ? "#fee2e2"
      : variant === "warning"
      ? "#fef3c7"
      : variant === "info"
      ? "#dbeafe"
      : variant === "success"
      ? "#dcfce7"
      : "#f3f4f6",
  color:
    variant === "critical"
      ? "#dc2626"
      : variant === "warning"
      ? "#d97706"
      : variant === "info"
      ? "#2563EB"
      : variant === "success"
      ? "#16A34A"
      : "#6B7280",
}));

// Information Grid Section
export const InfoSection = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
}));

export const TriggerSection = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  backgroundColor : "#FFFBEB",
  padding: 16,
}));

export const SectionTitle = styled(Typography)(() => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  textTransform: "uppercase",
  color: "#6B7280",
  letterSpacing: 0.5,
  marginLeft: 12,
  marginTop: 8,
}));

export const InfoGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 16,
}));

export const InfoCard = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  padding: 12,
  background: "none",
  boxShadow: "none",
}));

export const TriggerInfoCard = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  padding: 12,
  paddingLeft: 0,
  background:"none",
  boxShadow: "none",
}));

export const InfoLabel = styled(Typography)(() => ({
  fontSize: 12,
  fontWeight: 500,
  color: "#6B7280",
  textTransform: "uppercase",
  letterSpacing: 0.3,
}));

export const InfoValue = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 500,
  color: "#1f2937",
}));

export const StatusBadge = styled(Box)(() => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 8px",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 500,
  backgroundColor: "#dcfce7",
  color: "#16a34a",
  width: "fit-content",
  "&::before": {
    content: '""',
    width: 6,
    height: 6,
    background: "#16a34a",
    borderRadius: "50%",
  },
}));

// Alert Card Title in List
export const AlertCardTitle = styled(Typography)(() => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  color: "#1f2937",
  lineHeight: 1.4,
}));

// Alert Detail Items
export const AlertDetailItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  color: "#4b5563",
}));

export const AlertDetailRow = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
}));

// Alert Icon
export const AlertIcon = styled("img")({
  width: 16,
  height: 16,
  objectFit: "contain",
});

// Alert Time
export const AlertTime = styled(Typography)(() => ({
  margin: 0,
  fontSize: 12,
  color: "#9ca3af",
}));

// Action Buttons Section
export const ActionSection = styled(Box)(() => ({
  display: "flex",
  gap: 12,
  paddingTop: 16,
  borderTop: "1px solid #e5e7eb",
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "10px 16px",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",

  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.grey[300]}`,
  boxShadow: "none",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderColor: theme.palette.primary.main,
  },
}));

export const LocationItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "#4b5563",
}));

export const CoordinateBadge = styled(Box)(() => ({
  padding: "4px 8px",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 500,
}));



export const AlertTopRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

export const AlertRight = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

export const AlertStatus = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#dc2626",
});

export const AlertOpen = styled(Typography)({
  fontSize: "14px",
  fontWeight: 500,
  color: "#1d4ed8",
  cursor: "pointer",

  "&:hover": {
    textDecoration: "underline",
  },
});

export const ELDTag = styled(Box)({
  padding: "4px 10px",
  borderRadius: 6,
  background: "#EEF2FF",
  color: "#2563EB",
  fontSize: 12,
  width: "fit-content",
});

export const LocationRow = styled(Box)({
  display: "flex",
  gap: "20px",
  marginTop: 10,
});