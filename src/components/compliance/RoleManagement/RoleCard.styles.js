import { styled } from "@mui/material/styles";
import { Box, Avatar, IconButton, Typography } from "@mui/material";

export const COLORS = {
  primary: "#284495",
  primaryHover: "#1d3577",
  white: "#FFFFFF",
  border: "#E5E7EB",
  hoverBackground: "#F3F4F6",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  success: "#16A34A",
  danger: "#DC2626",
};

export const RoleRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 14,
  padding: theme.spacing(2.5, 3),
  marginBottom: theme.spacing(2),
  minHeight: 40,
  gap: theme.spacing(2),
}));

export const EqualColumn = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  minWidth: 0,
}));

export const LeftSection = styled(EqualColumn)(({ theme }) => ({
  gap: theme.spacing(2),
}));

export const RoleAvatar = styled(Avatar)(() => ({
  width: 52,
  height: 52,
  fontSize: 20,
  fontWeight: 700,
  color: COLORS.white,
  backgroundColor: COLORS.primary,
}));

export const RoleTitle = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 700,
  color: COLORS.textPrimary,
  lineHeight: 1.3,
}));

export const RoleDescription = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: COLORS.textSecondary,
  marginTop: theme.spacing(0.5),
}));

export const UsersColumn = styled(EqualColumn)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
}));

export const ClickableUsersCount = styled(Typography)(() => ({
  fontSize: 15,
  fontWeight: 700,
  color: COLORS.primary,
  cursor: "pointer",

  "&:hover": {
    textDecoration: "underline",
  },
}));

export const StatusColumn = styled(EqualColumn)(() => ({
  justifyContent: "center",
}));

export const ActiveStatusText = styled(Typography)(
  ({ theme }) => ({
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.success,
    padding: theme.spacing(0.7, 1.8),
    borderRadius: 999,
  }),
);

export const InactiveStatusText = styled(Typography)(
  ({ theme }) => ({
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.danger,
    padding: theme.spacing(0.7, 1.8),
  }),
);

export const ActionsWrapper = styled(EqualColumn)(
  ({ theme }) => ({
    justifyContent: "flex-end",
    gap: theme.spacing(1.2),
  }),
);

export const ViewButton = styled(IconButton)(() => ({
  width: 30,
  height: 30,
  borderRadius: 10,

  "&:hover": {
    backgroundColor: COLORS.hoverBackground,
  },
}));

export const EditButton = styled(IconButton)(() => ({
  width: 30,
  height: 30,
  borderRadius: 10,

  "&:hover": {
    backgroundColor: COLORS.hoverBackground,
  },
}));