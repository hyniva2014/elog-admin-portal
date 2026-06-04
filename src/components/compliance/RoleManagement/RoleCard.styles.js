import { styled } from "@mui/material/styles";

import {
  Box,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";

export const RoleRow = styled(
  Box,
)(({ theme }) => ({
  display: "grid",

  gridTemplateColumns: "2fr 1fr 2fr 1fr",

  alignItems: "center",

  backgroundColor:
    theme.palette.common.white,

  border: `1px solid ${theme.palette.custom.lightBorder}`,

  borderRadius: 8,

  padding: theme.spacing(2, 3),

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

export const RoleAvatar = styled(Avatar)(({ theme }) => ({
  width: 45,

  height: 45,

  fontSize: 20,

  fontWeight: 500,

  color: theme.palette.common.white,

  backgroundColor: theme.palette.avatarGrey,
}));

export const RoleTitle = styled(Typography)(({ theme }) => ({
  fontSize: 14,

  fontWeight: 700,

  color: theme.palette.text.primary,

  lineHeight: 1.3,
}));

export const RoleDescription = styled(Typography)(({ theme }) => ({
  fontSize: 14,

  fontWeight: 400,

  color: theme.palette.text.secondary,

  marginTop: theme.spacing(0.5),
}));

export const UsersColumn = styled(EqualColumn)(() => ({
  justifyContent: "center",

  paddingLeft: "120px",
}));

export const ClickableUsersCount = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  fontWeight: 700,
  color: theme.palette.brand.main,
  cursor: "pointer",
  lineHeight: 1,
  display: "inline-block",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
  margin: 0,
  padding: 0,
}));

export const StatusColumn = styled(EqualColumn)(() => ({
  justifyContent: "center",

  paddingLeft: "80px",
}));

export const ActiveStatusText = styled(Typography)(({ theme }) => ({
  fontSize: 14,

  fontWeight: 600,

  color: theme.palette.success.main,

  padding: theme.spacing(0.7, 1.8),

  borderRadius: 999,
}));

export const InactiveStatusText = styled(Typography)(({ theme }) => ({
  fontSize: 14,

  fontWeight: 600,

  color: theme.palette.custom.dangerRed,

  padding: theme.spacing(0.7, 1.8),
}));

export const ActionsWrapper = styled(EqualColumn)(({ theme }) => ({
  justifyContent: "flex-end",

  gap: theme.spacing(1.2),
}));

export const ViewButton = styled(IconButton)(({ theme }) => ({
  width: 30,

  height: 30,

  borderRadius: 50,

  "&:hover": {
    backgroundColor: theme.palette.custom.hoverBackground,
  },
}));

export const EditButton = styled(IconButton)(({ theme }) => ({
  width: 30,

  height: 30,

  borderRadius: 50,

  "&:hover": {
    backgroundColor: theme.palette.custom.hoverBackground,
  },
}));
