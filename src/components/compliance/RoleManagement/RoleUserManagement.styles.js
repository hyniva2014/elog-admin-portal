import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const SearchWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  maxWidth: 340,
}));

export const StatusText = styled("span")(({ theme, statuscolor }) => ({
  color: statuscolor && theme.palette[statuscolor]
    ? theme.palette[statuscolor].main
    : theme.palette.text.primary,
  fontWeight: 400,
  fontSize: 13,
}));