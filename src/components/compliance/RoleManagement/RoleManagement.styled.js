import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Avatar, IconButton } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
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

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));

export const RoleCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.mutedText,
  marginTop: theme.spacing(0.8),
}));

export const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.brand.main,
  textTransform: "none",
  borderRadius: 5,
  padding: "8px 20px",
  "&:hover": {
    backgroundColor: theme.palette.brand.dark,
  },
}));

export const RoleRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.custom.lightBorder}`,
  borderRadius: 10,
  padding: "18px 22px",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    alignItems: "flex-start",
  },
}));

export const LeftSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  flex: 2,
  minWidth: 0,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const RoleIcon = styled(Avatar)(() => ({
  width: 52,
  height: 52,
}));

export const RoleTitle = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  color: theme.palette.text.primary,
  wordBreak: "break-word",
}));

export const RoleDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
  wordBreak: "break-word",
  overflowWrap: "break-word",
}));

export const ColumnCenter = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 80,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
  },
}));

export const ClickableUsersCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.brand.main,
  fontWeight: 600,
  cursor: "pointer",
}));

export const ActiveStatusText = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.main,
  fontWeight: 600,
}));

export const InactiveStatusText = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.dangerRed,
  fontWeight: 600,
}));

export const Actions = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  justifyContent: "flex-end",
  minWidth: 80,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "flex-start",
    marginTop: theme.spacing(1),
  },
}));

export const ViewButton = styled(IconButton)(() => ({
  borderRadius: 8,
}));

export const EditButton = styled(IconButton)(() => ({
  borderRadius: 8,
}));
