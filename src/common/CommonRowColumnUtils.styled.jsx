import { styled } from "@mui/material/styles";

export const StatusText = styled("span")(({ theme, statuscolor }) => {
  const colorValue =
    statuscolor && theme.palette[statuscolor]
      ? theme.palette[statuscolor].main
      : statuscolor || theme.palette.text.primary;

  return {
    color: colorValue,
    fontWeight: 400,
  };
});
