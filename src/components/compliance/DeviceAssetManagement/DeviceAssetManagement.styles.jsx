import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const COLORS = {
  primary: "#284495",
  white: "#FFFFFF",
  lightBlue: "#F3F8FF",
  success: "#2e7d32",
  error: "#c62828",
};

export const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const AddButton = styled(Button)(({ theme }) => ({
  color: COLORS.white,
  backgroundColor: COLORS.primary,
  fontSize: 14,
  fontWeight: 400,
  borderRadius: "8px",
}));

export const SummaryCardBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const FormBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const EditButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: COLORS.white,
  backgroundColor: COLORS.primary,
  border: `1px solid ${COLORS.primary}`,
  borderRadius: "8px",
}));

export const CancelEditButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: COLORS.primary,
  border: `1px solid ${COLORS.primary}`,
  borderRadius: "8px",
  backgroundColor: COLORS.lightBlue,
}));

export const StatusTypography = styled(Typography)(({ value }) => ({
  color: value === "Active" ? COLORS.success : COLORS.error,
}));

export const formStyle = {
  paddingTop: 15,
};