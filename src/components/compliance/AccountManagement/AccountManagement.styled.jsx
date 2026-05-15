import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";

export const HeaderContainer = styled(Box)(() => ({
  marginBottom: 16,
}));

export const AddAccountButton = styled(Button)(({ theme }) => ({
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
  shouldForwardProp: (prop) => prop !== "accountStatus",
})(({ accountStatus, theme }) => ({
  color: accountStatus === "Active" ? theme.palette.success.main : theme.palette.error.main,
  fontSize: 13,
  fontWeight: 400,
}));

export const AddressCellText = styled(Typography)(() => ({
  fontSize: 13,
  whiteSpace: "normal",
  lineHeight: 1.35,
}));

export const actionIconSx = {
  fontSize: 18,
  color: "text.secondary",
};

export const DialogFormContainer = styled(Box)(() => ({
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 12,
  paddingBottom: 8,
}));

export const SectionHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: 8,
}));

export const PrimarySectionHeader = styled(SectionHeaderText)(() => ({
  marginTop: 0.5,
}));

export const SecondarySectionHeader = styled(SectionHeaderText)(() => ({
  marginTop: 1,
}));
