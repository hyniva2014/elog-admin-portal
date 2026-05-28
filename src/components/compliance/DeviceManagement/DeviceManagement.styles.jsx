import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.brand.main,
  fontSize: 14,
  fontWeight: 400,
  "&:disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

export const SummaryCardBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const FormBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const StatusTypography = styled(Typography)(({ theme, value }) => ({
  color: value === "Assigned" ? theme.palette.success.dark : theme.palette.error.dark,
}));

export const DialogFormContainer = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1),
}));

export const SectionHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(0.5),
}));
