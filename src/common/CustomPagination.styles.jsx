import { Box, styled, Pagination, Typography, IconButton } from "@mui/material";

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  padding: theme.spacing(1, 2),
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  position: "sticky",
  bottom: 0,
  zIndex: 1,
}));

export const PaginationCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const PaginationButtonWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));

export const PaginationToggleButton = styled(IconButton)(() => ({
  width: 36,
  height: 36,
  borderRadius: 8,
  backgroundColor: "#EBEFF6",

  "&:hover": {
    backgroundColor: "#EBEFF6",
  },
}));

export const PaginationActions = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
}));

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    borderRadius: 6,
    minWidth: 32,
    height: 32,
    fontSize: 13,
  },

  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: theme.palette.brand.main,
    color: theme.palette.common.white,
    fontWeight: 600,
  },

  "& .MuiPaginationItem-page.Mui-selected:hover": {
    backgroundColor: theme.palette.brand.main,
  },

  "& .MuiPaginationItem-previousNext": {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 6,
    backgroundColor: "#EBEFF6",
    margin: "0 4px",
  },
}));

export const ExpandIconSx = (collapsed) => ({
  transition: "transform 0.2s",
  transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
});