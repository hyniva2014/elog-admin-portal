import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const AddButton = styled(Button)(({ theme }) => ({
  color: "#FFFFFF",
  backgroundColor: "#284495",
  fontSize: 14,
  fontWeight: 400,
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
  color: "#FFFFFF",
  backgroundColor: "#284495",
  border: 1,
  borderRadius: 2,
  borderColor: "#284495",
}));

export const CancelEditButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: "#284495",
  border: 1,
  borderRadius: 2,
  borderColor: "#284495",
  backgroundColor: "#F3F8FF",
}));

export const StatusTypography = styled(Typography)(({ value }) => ({
  color: value === "Active" ? "#2e7d32" : "#c62828",
}));
