import { Box, Button, Paper, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

// Main Container
export const AlertsContainer = styled(Box)(() => ({
  display: "flex",
  height: "100%",
}));

export const AlertCardContainer = styled(Paper)(({ theme, detailsPanel }) => ({
  paddingLeft: "16px",
  paddingTop: 0,
  paddingRight: detailsPanel ? theme.spacing(2) : 0,
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: "0px",
  height: "675px",
  overflow: "none",
  boxShadow: "none",
}));

// Left Sidebar - Alert List
export const AlertList = styled(Box)(({ theme }) => ({
  flex: "0 0 300px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",

  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.grey[100],
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.grey[400],
    borderRadius: 3,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.grey[500],
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
  background: theme.palette.background.paper,
  borderRadius: 8,
  border: `1px solid ${theme.palette.grey[200]}`,
  overflowY: "auto",
  boxShadow: "none",

  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.grey[100],
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.grey[400],
    borderRadius: 3,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.grey[500],
  },
}));

// Header Section with Title and Badge
export const DetailHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: 16,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const DetailTitleWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));

export const DetailTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 18,
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.2,
}));

export const DetailSubTitle = styled(Typography)(({ theme, severity }) => ({
  fontSize: 13,
  fontWeight: 400,
  color:
    severity === "Critical"
      ? theme.palette.error.main
      : theme.palette.warning.main,
}));

export const BadgeContainer = styled(Box)(() => ({
  display: "flex",
  gap: 8,
}));

export const Badge = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ theme, variant }) => ({
  padding: "4px 12px",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  backgroundColor:
    variant === "critical"
      ? theme.palette.error.lighter
      : variant === "warning"
      ? theme.palette.warning.lighter
      : variant === "info"
      ? theme.palette.info.lighter
      : variant === "success"
      ? theme.palette.success.lighter
      : theme.palette.grey[100],
  color:
    variant === "critical"
      ? theme.palette.error.main
      : variant === "warning"
      ? theme.palette.warning.dark
      : variant === "info"
      ? theme.palette.info.dark
      : variant === "success"
      ? theme.palette.success.dark
      : theme.palette.text.secondary,
}));

// Information Grid Section
export const InfoSection = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
}));

export const TriggerSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  backgroundColor: alpha(theme.palette.warning.main, 0.09),
  padding: 16,
  border : `1px solid ${theme.palette.warning.lighter}`,
  borderRadius: 6,
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
  letterSpacing: 0.5,
  marginLeft: 12,
  marginTop: 8,
}));

export const TriggerSectionTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
  letterSpacing: 0.5,
  marginLeft: 0,
  marginTop: 8,
}));

export const InfoGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 16,
}));

export const TriggerInfoGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
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
  background: "none",
  boxShadow: "none",
}));

export const InfoLabel = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
  letterSpacing: 0.3,
}));

export const InfoValue = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const StatusBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 8px",
  borderRadius: 10,
  fontSize: 12,
  fontWeight: 500,
  backgroundColor: theme.palette.success.lighter,
  color: theme.palette.success.dark,
  width: "fit-content",
  "&::before": {
    content: '""',
    width: 6,
    height: 6,
    background: theme.palette.success.dark,
    borderRadius: "50%",
  },
}));

// Alert Card Title in List
export const AlertCardTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
}));

// Alert Detail Items
export const AlertDetailItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  color: theme.palette.text.secondary,
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

export const DetailAlertIcon = styled("img")({
  width: 24,
  height: 24,
  objectFit: "contain",
});

// Alert Time
export const AlertTime = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 12,
  color: theme.palette.text.disabled,
}));

// Action Buttons Section
export const ActionSection = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 12,
  paddingTop: 16,
  borderTop: `1px solid ${theme.palette.divider}`,
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
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.main,
  },
}));

export const LocationItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: theme.palette.text.secondary,
}));

export const CoordinateBadge = styled(Box)(() => ({
  padding: "4px 8px",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 500,
}));

export const AlertTopRow = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}));

export const AlertRight = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
}));

export const AlertStatus = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.error.main,
}));

export const AlertOpen = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "inProgress",
})(({ theme, inProgress }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: inProgress ? theme.palette.warning.main : theme.palette.primary.dark,
  cursor: "pointer",

  "&:hover": {
    textDecoration: "underline",
  },
}));

export const ELDTag = styled(Box)(({ theme }) => ({
  padding: "4px 10px",
  borderRadius: 6,
  background: theme.palette.primary.lighter,
  color: theme.palette.primary.main,
  fontSize: 12,
  width: "fit-content",
}));

export const LocationRow = styled(Box)(() => ({
  display: "flex",
  gap: "20px",
  marginTop: 10,
}));

// Alert Center Screen Header layout
export const AlertScreenHeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const AlertSummaryCardBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
