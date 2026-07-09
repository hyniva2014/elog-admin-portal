import { styled } from "@mui/material/styles";

import { Box, Typography, Button, Grid } from "@mui/material";

export const HeaderContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const TitleContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 20,
  fontWeight: 600,
}));

export const HeaderSubtitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isvisible",
})(({ isvisible }) => ({
  fontFamily: "Roboto, sans-serif",
  fontSize: 13,
  color: "#202027",
  fontWeight: 400,
  lineHeight: "100%",
  letterSpacing: "0%",
  marginTop: 4,
  minHeight: 20,
  visibility: isvisible ? "visible" : "hidden",
  display: isvisible ? "block" : "none",
}));

export const ActionContainer = styled(Grid)(() => ({
  display: "flex",
  gap: 16,
}));

export const HeaderButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  textTransform: "none",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
