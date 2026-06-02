import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

export const AutocompleteWrapper = styled(Box)(() => ({
  position: "relative",
  width: "100%",
}));

export const SuggestionsDropdown = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  right: 0,
  zIndex: theme.zIndex.modal + 1,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  maxHeight: 220,
  overflowY: "auto",
}));

export const SuggestionItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "highlighted",
})(({ highlighted, theme }) => ({
  padding: "8px 12px",
  cursor: "pointer",
  backgroundColor: highlighted
    ? theme.palette.action.hover
    : "transparent",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const SuggestionText = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
}));

export const SuggestionSubText = styled(Typography)(({ theme }) => ({
  fontSize: 11,
  color: theme.palette.text.secondary,
  lineHeight: 1.3,
}));

export const LoadingText = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.secondary,
  padding: "10px 12px",
  textAlign: "center",
}));
