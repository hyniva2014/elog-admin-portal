import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FiltersContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100%",
  display: "flex",
  alignItems: "center",
  // gap: theme.spacing(1),
  flexWrap: "wrap",
}));

export const SearchWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "25%",
    minWidth: 300,
  },
  flexShrink: 0,
}));

export const RightFiltersContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  flexWrap: "wrap",
  flex: 1,
  justifyContent: "flex-start",
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
  },
}));

export const DateRangeWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "calc(50% - 6px)",
  },
  [theme.breakpoints.up("md")]: {
    width: "auto",
  },
  minWidth: 180,
}));

export const FilterWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "calc(50% - 6px)",
  },
  [theme.breakpoints.up("md")]: {
    width: "auto",
    maxWidth: 180,
  },
  minWidth: 140,
}));

export const ActionButtonWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));
