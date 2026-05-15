import { styled } from "@mui/material/styles";
import { Box, Card, CardContent, Typography, Stack } from "@mui/material";

export const CardContainer = styled(Card)({
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

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

export const ChartBox = styled(Box)({
  position: "relative",
  flexShrink: 0,
});

export const ChartCenterLabel = styled(Box)({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
});

export const ChartCenterSubText = styled(Typography)({
  color: "#718096",
  fontWeight: 500,
  lineHeight: 1.2,
});

export const ChartCenterTotal = styled(Typography)({
  color: "#1a202c",
  fontWeight: 700,
  lineHeight: 1.2,
});

export const StatCardsWrapper = styled(Box)({
  flex: 1,
  width: "100%",
  minWidth: 0,
});

export const StatCardBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bordercolor" && prop !== "bgcolor",
})(({ bordercolor, bgcolor }) => ({
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
}));

export const StatCardLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "labelcolor",
})(({ labelcolor }) => ({
  color: labelcolor,
  fontWeight: 600,
  lineHeight: 1.3,
  overflowWrap: "break-word",
  wordBreak: "break-word",
  whiteSpace: "normal",
  minWidth: 0,
}));

export const StatCardCount = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "labelcolor",
})(({ labelcolor }) => ({
  color: labelcolor,
  fontWeight: 700,
  lineHeight: 1.2,
}));
