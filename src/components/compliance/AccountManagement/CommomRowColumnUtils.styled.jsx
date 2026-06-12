import { styled, Typography } from "@mui/material";

export const Datefieldstext = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
}));

export const Timefieldstext = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.grey[500],
}));
