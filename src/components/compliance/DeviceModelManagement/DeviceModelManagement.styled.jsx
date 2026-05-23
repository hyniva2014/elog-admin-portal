import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const EditButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.brand.main,
  border: `1px solid ${theme.palette.brand.main}`,
  borderRadius: "8px",
}));

export const CancelEditButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.brand.main,
  border: `1px solid ${theme.palette.brand.main}`,
  borderRadius: "8px",
  backgroundColor: theme.palette.brand.lighter,
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const SummaryCardBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.brand.main,
  fontSize: 14,
  fontWeight: 400,
  borderRadius: "8px",
}));

export const GridContainer = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
}));

export const StatusText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "value",
})(({ value, theme }) => ({
  color: value === "Active" ? theme.palette.success.main : theme.palette.error.main,
}));

export const StatusTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "value",
})(({ value, theme }) => ({
  color: value === "Active" ? theme.palette.success.main : theme.palette.error.main,
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

export const actionIconSx = (theme) => ({
  fontSize: 20,
  color: theme.palette.grey[600],
});

export const requiredSelectSx = (theme) => ({
  "& .MuiInputLabel-asterisk": {
    color: `${theme.palette.error.main} !important`,
  },
  "& .MuiFormLabel-asterisk": {
    color: `${theme.palette.error.main} !important`,
  },
  "& label .MuiFormLabel-asterisk": {
    color: `${theme.palette.error.main} !important`,
  },
  "& .MuiInputLabel-root[data-shrink='false'] .MuiFormLabel-asterisk": {
    color: `${theme.palette.error.main} !important`,
  },
});