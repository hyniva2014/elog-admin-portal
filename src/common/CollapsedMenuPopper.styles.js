import { Popper, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

/* Popper wrapper */
export const StyledPopper = styled(Popper)(() => ({
  zIndex: 1300,
}));

/* Container */
export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: "6px",
  borderRadius: "10px",
  backgroundColor: theme.palette.background.paper,
}));

/* Menu item */
export const StyledMenuItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  padding: "12px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "400",
  color: active ? "#284495" : "#9E9E9E",
  backgroundColor: active ? theme.palette.primary.main + "20" : "transparent",
  transition: "all 0.15s ease",

  // "&:hover": {
  //   backgroundColor: active
  //     ? theme.palette.primary.light
  //     : theme.palette.action.hover,
  // },
}));
