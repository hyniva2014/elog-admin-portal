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
}));

export const SummaryCardBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const FormBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const StatusTypography = styled(Typography)(({ theme, value }) => ({
  color: value === "Active" ? theme.palette.success.dark : theme.palette.error.dark,
}));

export const DialogFormContainer = styled(Box)(() => ({
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 12,
  paddingBottom: 8,
}));

export const SectionHeader = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: 8,
  marginTop: 4,
}));
