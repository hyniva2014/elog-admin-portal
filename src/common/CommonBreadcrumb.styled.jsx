import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const BreadcrumbText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(15),
  color: theme.palette.text.secondary,
}));

export const BreadcrumbBold = styled("span")(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const BreadcrumbItemSx = {
  display: "inline-flex",
  alignItems: "center",
};

export const BreadcrumbLinkSx = {
  cursor: "pointer",
  fontSize: 13,
  "&:hover": {
    textDecoration: "underline",
  },
};

export const BreadcrumbSeparatorSx = {
  mx: 0.5,
};
