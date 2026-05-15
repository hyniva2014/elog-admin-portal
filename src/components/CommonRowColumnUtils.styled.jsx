import { styled } from "@mui/material/styles";

export const StatusText = styled("span")(({ theme, statuscolor }) => ({
  color: statuscolor || theme.palette.text.primary,
  fontWeight: 400,
}));
