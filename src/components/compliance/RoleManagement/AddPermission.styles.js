import { styled } from "@mui/material/styles";
import { Box, Card, Button, Switch, Divider, Typography } from "@mui/material";

export const PageWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  minHeight: "100vh",
  padding: 24,
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
  border: `1px solid ${theme.palette.custom.border}`,
  background: theme.palette.custom.cardBackground,
  boxShadow: "none",
  padding: theme.spacing(2.2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const CountBadge = styled(Box)(({ theme }) => ({
  background: theme.palette.brand.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1, 2),
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 600,
  minWidth: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const PermissionItem = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isenabled",
})(({ theme, isenabled }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: `1px solid ${theme.palette.custom.lightBorder}`,
  borderRadius: 8,
  padding: theme.spacing(1.5, 2),
  backgroundColor: isenabled
    ? theme.palette.custom.lightGreen
    : theme.palette.common.white,
}));

export const PermissionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const PermissionDescription = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
}));

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.success.main,
  },

  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.success.main,
  },
}));

export const FooterSaveButton = styled(Button)(({ theme }) => ({
  minWidth: 180,
  textTransform: "none",
  background: theme.palette.brand.main,
  "&:hover": {
    background: theme.palette.brand.dark,
  },
}));
