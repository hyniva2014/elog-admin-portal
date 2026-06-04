import { styled } from "@mui/material/styles";
import { Box, Button, Card, Divider, Switch, Typography } from "@mui/material";

export const TopFieldsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  flexWrap: "wrap",
}));

export const RoleNameWrapper = styled(Box)(() => ({
  width: "300px",
}));

export const DescriptionWrapper = styled(Box)(() => ({
  flex: 1,
}));

export const CardsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(3),
  marginTop: theme.spacing(3),
}));

export const CardItemWrapper = styled(Box)(() => ({
  width: "calc(50% - 12px)",
  minWidth: "420px",
  display: "flex",
}));

export const FooterWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  paddingBottom: theme.spacing(3),
}));

export const CancelButton = styled(Button)(() => ({
  minWidth: 180,
  textTransform: "none",
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  minWidth: 180,
  textTransform: "none",
  backgroundColor: theme.palette.brand.main,
  "&:hover": {
    backgroundColor: theme.palette.brand.dark,
  },
}));

export const CardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export const PageWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  minHeight: "100vh",
  padding: 24,
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: 32,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const PageSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
}));

export const PermissionCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isenabled",
})(({ theme, isenabled }) => ({
  width: "100%",

  borderRadius: 12,

  border: `1px solid ${theme.palette.custom.lightBorder}`,

  backgroundColor: isenabled
    ? theme.palette.custom.lightGreen
    : theme.palette.common.white,

  boxShadow: "none",

  display: "flex",

  flexDirection: "column",

  minHeight: 520,

  transition: "background-color 0.3s ease",
}));

export const CardContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  flex: 1,
  display: "flex",
  flexDirection: "column",
}));

export const CountBadge = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.brand.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1, 2),
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 600,
  minWidth: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const PermissionsWrapper = styled(Box)(({ theme }) => ({
  maxHeight: 350,
  overflowY: "auto",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  paddingRight: theme.spacing(0.5),
}));

export const PermissionsList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

export const PermissionItem = styled(Box, {
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

  transition: "all 0.3s ease",
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

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const CardFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  paddingTop: 0,
}));

export const FooterActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "disabledbutton",
})(({ theme, disabledbutton }) => ({
  textTransform: "none",
  backgroundColor: theme.palette.common.white,
  color: disabledbutton
    ? theme.palette.custom.mutedText
    : theme.palette.text.secondary,
  borderColor: theme.palette.custom.lightBorder,
  height: 32,
  borderRadius: 5,
  "&:hover": {
    backgroundColor: theme.palette.brand.dark,
  },
}));

export const ModuleTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: "24px",
}));

export const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "28px",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: "36px",
  marginBottom: theme.spacing(1),
}));
