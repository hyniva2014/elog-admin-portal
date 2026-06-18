import { Box, Button, styled, Typography } from "@mui/material";

export const Datefieldstext = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
}));

export const Timefieldstext = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.grey[500],
}));

export const ActionIcon = styled("img")(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const BackButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(3),
}));

export const BackButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.brand.main,
  width: 183,
  "&:hover": {
    backgroundColor: theme.palette.brand.dark,
  },
}));
