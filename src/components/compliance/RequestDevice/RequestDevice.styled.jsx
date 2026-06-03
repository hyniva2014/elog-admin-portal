import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

export const HeaderContainer = styled(Box)(() => ({
  marginBottom: 16,
}));

export const StatusText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status, theme }) => ({
  color:
    status === "Pending"
      ? theme.palette.warning.main
      : theme.palette.success.main,
  fontSize: 14,
  fontWeight: 500,
}));

export const StockMessageText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(1),
  fontWeight: 600,
}));

export const AvailableCountText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
}));
