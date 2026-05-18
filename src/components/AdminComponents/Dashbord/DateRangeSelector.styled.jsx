import { Button, ButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,

  "& .MuiButton-root": {
    textTransform: "none",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.secondary,
    border: "none",
    fontSize: "0.8rem",
    fontWeight: 500,

    "&:not(:last-of-type)": {
      borderRight: `1px solid ${theme.palette.divider}`,
    },

    "&:hover": {
      backgroundColor: theme.palette.grey[100],
    },

    "&.selected": {
      backgroundColor: theme.palette.sidebar?.main ?? theme.palette.primary.main,
      color: theme.palette.common.white,
      fontWeight: 600,

      "&:hover": {
        backgroundColor: theme.palette.sidebar?.dark ?? theme.palette.primary.dark,
      },
    },
  },
}));

export const PeriodButton = styled(Button)(() => ({
  // Individual period button — inherits group styles above
}));
