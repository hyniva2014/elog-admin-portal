import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";

export const HeaderContainer = styled(Box)(() => ({
  marginBottom: 16,
}));

export const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  textTransform: "none",
  fontWeight: 600,
  minWidth: 102,
  height: 36,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const GridContainer = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
}));

export const StatusText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status, theme }) => ({
  color: status === "Active" ? theme.palette.success.main : theme.palette.error.main,
  fontSize: 13,
  fontWeight: 400,
}));

export const ActionIcon = styled("img")({
  width: 18,
  height: 18,
  cursor: "pointer",
});

export const DialogFormContainer = styled(Box)(() => ({
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 12,
  paddingBottom: 8,
}));