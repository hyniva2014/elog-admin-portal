import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const CareerFormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1.5),
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 64px)",
  maxHeight: "calc(100vh - 64px)",
  minHeight: 0,
  boxSizing: "border-box",
}));

export const CareerFormHeader = styled(Box)(({ theme }) => ({
  paddingInline: 24,
  paddingBlock: 16,
  flexShrink: 0,
  backgroundColor: theme.palette.background.paper,
  position: "sticky",
  top: 14,
  zIndex: 10,
}));

export const CareerFormStepper = styled(Box)(({ theme }) => ({
  paddingInline: 24,
  borderBottom: `2px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  flexShrink: 0,
  position: "sticky",
  top: 104,
  zIndex: 9,
}));

export const StepRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "center",
  flexWrap: "wrap",
  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(4),
  },
  [theme.breakpoints.up("md")]: {
    gap: theme.spacing(6),
  },
  [theme.breakpoints.up("lg")]: {
    gap: theme.spacing(9),
  },
}));

export const StepItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  borderBottom: active ? `2px solid ${theme.palette.brand.main}` : "none",
  paddingBottom: active ? theme.spacing(0.5) : 0,
  cursor: "pointer",
}));

export const StepLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  fontSize: 14,
  fontWeight: active ? 600 : 400,
  color: active ? theme.palette.brand.main : theme.palette.text.secondary,
  "&:hover": {
    color: active ? theme.palette.brand.main : theme.palette.text.primary,
  },
}));

export const CareerFormContent = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
  paddingInline: 24,
  paddingTop: 24,
  paddingBottom: 16,
  scrollPaddingTop: 24,
}));
