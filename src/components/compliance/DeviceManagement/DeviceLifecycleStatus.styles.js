import { styled } from "@mui/material/styles";
import { Box, Card, CardContent, Typography, Stack, Grid } from "@mui/material";

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
    marginBottom: theme.spacing(7),
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

export const SegmentWrapper = styled(Grid)(({ theme }) => ({
  width: "100%",
}));

export const SegmentRow = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },

  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
  },
}));

export const SegmentLabelWrapper = styled(Grid)(({ theme }) => ({
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    width: "160px",
  },
}));

export const SegmentLabelContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minWidth: "max-content",
  whiteSpace: "nowrap",
});

export const SegmentDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "dotcolor",
})(({ dotcolor }) => ({
  width: "12px",
  height: "12px",
  minWidth: "12px",
  minHeight: "12px",
  borderRadius: "50%",
  background: dotcolor,
  flexShrink: 0,
}));

export const SegmentLabel = styled(Typography)(({ theme }) => ({
  fontSize: "17px",
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const ProgressBarWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "64px",
  background: theme.palette.grey[100],
  borderRadius: "14px",
  position: "relative",
  overflow: "hidden",
  border: "1px solid transparent",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 8px 24px 0 rgba(0,0,0,0.12)`,
  },
}));

export const ProgressBarFill = styled(Box, {
  shouldForwardProp: (prop) => prop !== "barwidth" && prop !== "barcolor",
})(({ barwidth, barcolor }) => ({
  width: barwidth,
  height: "100%",
  background: barcolor,
  borderRadius: "14px 0 0 14px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "22px",
  transition: "width 0.3s ease",
  overflow: "hidden",
  whiteSpace: "nowrap",
}));

export const ProgressCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "15px",
  fontWeight: 700,
}));

export const ProgressPercentage = styled(Typography)(({ theme }) => ({
  position: "absolute",
  right: "20px",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "15px",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));
