import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const EditButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.brand.main,
  border: 1,
  borderRadius: 2,
  borderColor: theme.palette.brand.main,
}));

export const CancelEditButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.brand.main,
  border: 1,
  borderRadius: 2,
  borderColor: theme.palette.brand.main,
  backgroundColor: theme.palette.brand.lighter,
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const SummaryCardBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
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

export const DialogFormContainer = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1),
}));

export const FormBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const StyledForm = styled("form")(() => ({
  paddingTop: 15,
}));

export const actionIconSx = {
  fontSize: 20,
  color: "#6B7280",
};