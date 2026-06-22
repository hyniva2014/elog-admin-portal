import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.sidebar.main,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 400,
  borderRadius: theme.shape.borderRadius * 2,
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[500],
  },
}));

export const SummaryCardBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const StyledForm = styled("form")(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

export const GridContainer = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
}));

export const EditButton = styled(Button)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 400,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.sidebar.main,
  border: `1px solid ${theme.palette.sidebar.main}`,
  borderRadius: theme.shape.borderRadius * 2,
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[500],
    border: `1px solid ${theme.palette.grey[300]}`,
  },
}));

export const CancelEditButton = styled(Button)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 400,
  color: theme.palette.sidebar.main,
  border: `1px solid ${theme.palette.sidebar.main}`,
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.light.main,
}));

export const StatusTypography = styled(Typography)(({ value, theme }) => ({
  color: value === "Active" ? theme.palette.success.main : theme.palette.error.main,
}));

export const ELogsTypography = styled(Typography)(({ value, theme }) => ({
  color: value === "Yes" ? theme.palette.success.main : theme.palette.grey[600],
}));

export const StyledActionIcon = styled(VisibilityOutlinedIcon)(
  ({ theme, canView }) => ({
    fontSize: 20,
    color: canView
      ? theme.palette.text.secondary
      : theme.palette.action.disabled,
  })
);
export const actionContainer = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: 1,
};