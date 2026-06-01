import { styled } from "@mui/material/styles";
import { Box, Button, Card, Divider, Switch, Typography } from "@mui/material";

export const COLORS = {
  primary: "#284495",
  primaryHover: "#1d3577",
  success: "#22C55E",
  white: "#FFFFFF",
  background: "#F8FAFC",
  border: "#E5E7EB",
  lightGreen: "#00C24E0D",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  mutedText: "#9CA3AF",
};

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

export const SaveButton = styled(Button)(() => ({
  minWidth: 180,
  textTransform: "none",
  backgroundColor: COLORS.primary,

  "&:hover": {
    backgroundColor: COLORS.primaryHover,
  },
}));

export const CardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export const PageWrapper = styled(Box)(() => ({
  background: COLORS.background,
  minHeight: "100vh",
  padding: 24,
}));

export const PageTitle = styled(Typography)(() => ({
  fontSize: 32,
  fontWeight: 700,
  color: COLORS.textPrimary,
}));

export const PageSubtitle = styled(Typography)(({ theme }) => ({
  color: COLORS.textSecondary,
  marginBottom: theme.spacing(4),
}));

export const PermissionCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isenabled",
})(({ isenabled }) => ({
  width: "100%",
  borderRadius: 12,
  border: `1px solid ${COLORS.border}`,
  backgroundColor: isenabled ? COLORS.lightGreen : COLORS.white,
  boxShadow: "none",
  display: "flex",
  flexDirection: "column",
  minHeight: 520,
}));

export const CardContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  flex: 1,
  display: "flex",
  flexDirection: "column",
}));

export const CountBadge = styled(Box)(({ theme }) => ({
  backgroundColor: COLORS.primary,
  color: COLORS.white,
  padding: theme.spacing(1, 2),
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 600,
  minWidth: 60,
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

export const PermissionItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: `1px solid ${COLORS.border}`,
  borderRadius: 8,
  padding: theme.spacing(1.5, 2),
  backgroundColor: COLORS.lightGreen,
}));

export const PermissionTitle = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 500,
  color: COLORS.textPrimary,
}));

export const PermissionDescription = styled(Typography)(() => ({
  fontSize: 12,
  color: COLORS.textSecondary,
}));

export const StyledSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: COLORS.success,
  },

  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: COLORS.success,
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
})(({ disabledbutton }) => ({
  textTransform: "none",
  backgroundColor: COLORS.white,
  color: disabledbutton ? COLORS.mutedText : COLORS.textSecondary,
  borderColor: COLORS.border,
  height: 42,
  borderRadius: 8,
}));

export const ModuleTitle = styled(Typography)(
  () => ({
    fontSize: "16px",
    fontWeight: 600,
    color: COLORS.textPrimary,
    lineHeight: "24px",
  }),
);

export const Container = styled(Box)(
  ({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor:
      theme.palette.background.default,
    minHeight: "100vh",
  }),
);

export const Title = styled(Typography)(
  ({ theme }) => ({
    fontSize: "28px",
    fontWeight: 700,
    color: theme.palette.text.primary,
    lineHeight: "36px",
    marginBottom: theme.spacing(1),
  }),
);
