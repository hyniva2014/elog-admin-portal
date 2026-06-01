import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Avatar, IconButton } from "@mui/material";

export const COLORS = {
  primary: "#284495",
  primaryHover: "#1d3577",
  white: "#FFFFFF",
  background: "#F8FAFC",
  border: "#E5E7EB",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  mutedText: "#9CA3AF",
  success: "#16A34A",
  danger: "#DC2626",
};

export const Container = styled(Box)(({ theme }) => ({
  backgroundColor: COLORS.background,
  padding: theme.spacing(3),
  borderRadius: 10,
  minHeight: "100vh",
  marginTop: "15px",
}));

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));

export const Title = styled(Typography)(() => ({
  fontSize: 28,
  fontWeight: 700,
  color: COLORS.textPrimary,
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: COLORS.textSecondary,
  marginTop: theme.spacing(0.5),
}));

export const RoleCount = styled(Typography)(({ theme }) => ({
  color: COLORS.mutedText,
  marginTop: theme.spacing(0.8),
}));

export const AddButton = styled(Button)(() => ({
  backgroundColor: COLORS.primary,
  textTransform: "none",
  borderRadius: 8,
  padding: "10px 20px",

  "&:hover": {
    backgroundColor: COLORS.primaryHover,
  },
}));

export const RoleRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 10,
  padding: "18px 22px",
  marginBottom: theme.spacing(2),
}));

export const LeftSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  width: "40%",
}));

export const RoleIcon = styled(Avatar)(() => ({
  width: 52,
  height: 52,
}));

export const RoleTitle = styled(Typography)(() => ({
  fontSize: 18,
  fontWeight: 700,
  color: COLORS.textPrimary,
}));

export const RoleDescription = styled(Typography)(({ theme }) => ({
  color: COLORS.textSecondary,
  marginTop: theme.spacing(0.5),
}));

export const ColumnCenter = styled(Box)(() => ({
  width: "20%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const ClickableUsersCount = styled(Typography)(() => ({
  color: COLORS.primary,
  fontWeight: 600,
  cursor: "pointer",
}));

export const ActiveStatusText = styled(Typography)(() => ({
  color: COLORS.success,
  fontWeight: 600,
}));

export const InactiveStatusText = styled(Typography)(() => ({
  color: COLORS.danger,
  fontWeight: 600,
}));

export const Actions = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  width: "20%",
  justifyContent: "flex-end",
}));

export const ViewButton = styled(IconButton)(() => ({
  borderRadius: 8,
}));

export const EditButton = styled(IconButton)(() => ({
  borderRadius: 8,
}));
