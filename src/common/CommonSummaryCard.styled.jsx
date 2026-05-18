import { Box, styled } from "@mui/material";

export const SummaryCardRoot = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    flex: "1 1 200px",
    minWidth: 200,
    minHeight: 80,

    backgroundColor: isDark
      ? theme.palette.grey[100]
      : theme.palette.common.white,

    borderRadius: theme.shape.borderRadius * 1,

    boxShadow: isDark
      ? `0px 2px 6px ${theme.palette.grey[900]}66`
      : `0px 1px 4px ${theme.palette.grey[900]}40`,

    display: "flex",
    alignItems: "center",

    padding: theme.spacing(1.5, 2),
    position: "relative",
  };
});

export const AccentBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "accentcolor",
})(({ accentcolor }) => ({
  width: 4,
  height: "100%",
  backgroundColor: accentcolor,
  borderRadius: "4px 0 0 4px",
  position: "absolute",
  left: 0,
  top: 0,
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));
