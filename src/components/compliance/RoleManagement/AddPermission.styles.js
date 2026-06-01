import { styled } from "@mui/material/styles";
import { Box, Card, Button, Switch } from "@mui/material";

export const COLORS = {
  primary: "#284495",
  primaryHover: "#1d3577",
  success: "#22C55E",
  white: "#FFFFFF",
  background: "#F8FAFC",
  cardBackground: "#F6FBF6",
  border: "#DDE5DC",
  lightBorder: "#E5E7EB",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
};

export const PageWrapper = styled(Box)(() => ({
  background: COLORS.background,
  minHeight: "100vh",
  marginTop: theme.spacing(2),
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const TopFieldsWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 14,
  border: `1px solid ${COLORS.border}`,
  background: COLORS.cardBackground,
  boxShadow: "none",
  padding: theme.spacing(2.2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const CardHeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));

export const ModuleTitleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const CountBadge = styled(Box)(() => ({
  background: COLORS.primary,
  color: COLORS.white,
  padding: "4px 12px",
  borderRadius: 8,
  fontWeight: 700,
  fontSize: 14,
  minWidth: 52,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const PermissionListWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  flex: 1,
}));

export const PermissionItem = styled(Box)(({ theme }) => ({
  border: `1px solid ${COLORS.lightBorder}`,
  borderRadius: 10,
  padding: theme.spacing(1.8),
  background: COLORS.white,
}));

export const PermissionContent = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const StyledSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: COLORS.success,
  },

  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: COLORS.success,
    opacity: 1,
  },
}));

export const CardFooterWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

export const OutlineButton = styled(Button)(() => ({
  borderRadius: 8,
  textTransform: "none",
  height: 44,
}));

export const PrimaryButton = styled(Button)(() => ({
  borderRadius: 8,
  textTransform: "none",
  height: 44,
  background: COLORS.primary,

  "&:hover": {
    background: COLORS.primaryHover,
  },
}));

export const FooterWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  paddingBottom: theme.spacing(3),
}));

export const FooterCancelButton = styled(Button)(() => ({
  minWidth: 180,
  textTransform: "none",
}));

export const FooterSaveButton = styled(Button)(() => ({
  minWidth: 180,
  textTransform: "none",
  background: COLORS.primary,

  "&:hover": {
    background: COLORS.primaryHover,
  },
}));