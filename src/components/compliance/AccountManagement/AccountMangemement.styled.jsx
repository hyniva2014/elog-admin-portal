import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";

export const HeaderContainer = styled(Box)(() => ({
  marginBottom: 16,
}));

export const AddAccountButton = styled(Button)(() => ({
  color: "#FFFFFF",
  backgroundColor: "#284495",
  textTransform: "none",
  fontWeight: 600,
  minWidth: 102,
  height: 36,
  "&:hover": {
    backgroundColor: "#203776",
  },
}));

export const GridContainer = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
}));

export const StatusText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "accountStatus",
})(({ accountStatus }) => ({
  color: accountStatus === "Active" ? "#3D9B26" : "#DA0008",
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
  color: "#6E7079",
};

export const DialogFormContainer = styled(Box)(() => ({
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 12,
  paddingBottom: 8,
}));

export const SectionHeaderText = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: 600,
  color: "#495057",
  marginBottom: 8,
}));
