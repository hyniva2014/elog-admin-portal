import { Box, styled, Typography } from "@mui/material";

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
})(({ theme, accentcolor }) => {
  const paletteColor = accentcolor && theme.palette[accentcolor];
  const resolvedColor =
    paletteColor?.main || accentcolor || theme.palette.primary.main;

  return {
    width: 4,
    height: "100%",
    backgroundColor: resolvedColor,
    borderRadius: "4px 0 0 4px",
    position: "absolute",
    left: 0,
    top: 0,
  };
});

export const ContentWrapper = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

export const ValueText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isdashboard",
})(({ theme, isdashboard }) => ({
  fontSize: isdashboard ? 44 : 22,
  fontWeight: isdashboard ? 700 : 500,
  lineHeight: isdashboard ? 1 : "normal",
  color: isdashboard
    ? theme.palette.text.primary
    : theme.palette.text.secondary,
  paddingLeft: isdashboard ? theme.spacing(6) : 0,
}));

export const CardContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(1),
}));

export const TextContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const TitleRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isdashboard",
})(({ theme, isdashboard }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: isdashboard ? theme.spacing(1) : 0,
}));

export const TitleText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));
