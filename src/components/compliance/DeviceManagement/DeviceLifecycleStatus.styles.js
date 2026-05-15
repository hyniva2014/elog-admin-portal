import { styled } from "@mui/material/styles";
import { Box, Card, CardContent, Typography, Stack } from "@mui/material";

export const CardContainer = styled(Card)(({ theme }) => ({
  borderRadius: 10,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(1.5),
  flex: 1,
  display: "flex",
  flexDirection: "column",
  "&:last-child": {
    paddingBottom: theme.spacing(1.5),
  },
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(2),
    "&:last-child": { paddingBottom: theme.spacing(2) },
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2.5),
    "&:last-child": { paddingBottom: theme.spacing(2.5) },
  },
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  fontSize: "1rem",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.125rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
    marginBottom: theme.spacing(2),
  },
}));

export const ContentStack = styled(Stack)({
  flex: 1,
  width: "100%",
  minWidth: 0,
});

/**
 * ChartBox accepts a `chartsize` prop (number, in px) to set its dimensions.
 * This avoids inline sx={{ width, height }} in the component.
 */
export const ChartBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "chartsize",
})(({ chartsize }) => ({
  position: "relative",
  flexShrink: 0,
  width: chartsize,
  height: chartsize,
}));

export const ChartCenterLabel = styled(Box)({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
});

/**
 * ChartCenterSubText accepts a `fontsize` prop to avoid inline sx={{ fontSize }}.
 */
export const ChartCenterSubText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "fontsize",
})(({ theme, fontsize }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  lineHeight: 1.2,
  fontSize: fontsize,
}));

/**
 * ChartCenterTotal accepts a `fontsize` prop to avoid inline sx={{ fontSize }}.
 */
export const ChartCenterTotal = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "fontsize",
})(({ theme, fontsize }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  lineHeight: 1.2,
  fontSize: fontsize,
}));

export const StatCardsWrapper = styled(Box)({
  flex: 1,
  width: "100%",
  minWidth: 0,
});

/**
 * StatCardBox accepts `bordercolor`, `bgcolor`, `cardpx`, and `cardpy` props
 * to avoid inline sx={{ px, py }} in the component.
 */
export const StatCardBox = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "bordercolor" && prop !== "bgcolor" && prop !== "cardpx" && prop !== "cardpy",
})(({ theme, bordercolor, bgcolor, cardpx, cardpy }) => ({
  borderRadius: 8,
  border: "1px solid",
  borderColor: bordercolor,
  backgroundColor: bgcolor,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 2,
  minWidth: 0,
  height: "80%",
  paddingLeft: theme.spacing(cardpx ?? 1.5),
  paddingRight: theme.spacing(cardpx ?? 1.5),
  paddingTop: theme.spacing(cardpy ?? 1.75),
  paddingBottom: theme.spacing(cardpy ?? 1.75),
}));

/**
 * StatCardLabel accepts `labelcolor` and `fontsize` props to avoid inline sx.
 */
export const StatCardLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "labelcolor" && prop !== "fontsize",
})(({ labelcolor, fontsize }) => ({
  color: labelcolor,
  fontWeight: 600,
  lineHeight: 1.3,
  overflowWrap: "break-word",
  wordBreak: "break-word",
  whiteSpace: "normal",
  minWidth: 0,
  fontSize: fontsize,
}));

/**
 * StatCardCount accepts `labelcolor` and `fontsize` props to avoid inline sx.
 */
export const StatCardCount = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "labelcolor" && prop !== "fontsize",
})(({ labelcolor, fontsize }) => ({
  color: labelcolor,
  fontWeight: 700,
  lineHeight: 1.2,
  fontSize: fontsize,
}));
