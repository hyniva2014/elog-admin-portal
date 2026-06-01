import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const COLORS = {
  primary: "#284495",
  white: "#FFFFFF",
  lightBlue: "#F3F8FF",
  success: "#2e7d32",
  error: "#c62828",
  grey: "#6B7280",
  warning: "#ed6c02",
  orange: "#FFA726",
  textPrimary: "#111827",
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

export const StyledForm = styled("form")(() => ({
  paddingTop: 15,
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

// export const StatusTypography = styled(Typography)(({ value }) => ({
//   color: value === "Active" ? COLORS.success : COLORS.error,
// }));

export const StatusTypography = styled(Typography)(({ value }) => {
  let color = COLORS.textPrimary;
  if (value === "Assigned") color = COLORS.success;
  else if (value === "In Stock") color = COLORS.warning;
  else if (value === "Allocated") color = COLORS.orange;
  return { color, fontWeight: 600 };
});

export const actionIconSx = {
  fontSize: 20,
  color: COLORS.grey,
};
