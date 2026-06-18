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
  textSecondary: "#374151",
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
  if (value === "Assigned") color = COLORS.warning;
  else if (value === "In Stock") color = COLORS.success;
  else if (value === "Allocated") color = COLORS.orange;
  else if (value === "Out of Service") color = COLORS.error;
  return { color, fontWeight: 600 };
});

export const actionIconSx = {
  fontSize: 20,
  color: COLORS.grey,
};

export const DeleteIconSx = (isOutOfService, canDelete) => (theme) => ({
  color:
    isOutOfService || !canDelete
      ? theme.palette.action.disabled
      : theme.palette.error.main,
});

export const HistoryIcon = styled("img")({
  width: 20,
  height: 20,
});

export const HistoryContentWrapper = styled(Box)({
  marginTop: 12,
  marginLeft: -12,
  marginRight: -12,
});

export const HistoryTimeText = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
}));

export const HistoryBackButtonWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: 24,
  paddingBottom: 8,
});

export const HistoryBackButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.brand.main,
  color: theme.palette.common.white,
  fontSize: 14,
  fontWeight: 500,
  borderRadius: "4px",
  padding: "10px 40px",
  textTransform: "none",
  minWidth: "120px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: theme.palette.brand.dark,
    boxShadow: "none",
  },
}));
