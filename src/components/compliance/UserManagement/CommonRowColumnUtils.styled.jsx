import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StatusText = styled("span")(({ theme, statuscolor }) => {
  const colorValue = statuscolor && theme.palette[statuscolor] ? theme.palette[statuscolor].main : theme.palette.text.primary;
  return {
    color: colorValue,
    fontWeight: 400,
  };
});
