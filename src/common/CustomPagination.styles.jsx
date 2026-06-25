import { Box, styled, Pagination, Typography, IconButton } from "@mui/material";

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  padding: theme.spacing(1, 2),
  paddingBottom: theme.spacing(1),
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
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
  alignItems: "center",
  width: "100%",
  height: 40,     
  cursor: "pointer",
}));

export const PaginationToggleButton = styled(IconButton)(({ theme }) => ({
  width: 80,
  height: 20,
  borderRadius: "6px 6px 0 0",
  backgroundColor: theme.palette.grey[200],
  border: `1px solid ${theme.palette.divider}`,
  borderBottom: "none",
  transform: "translateY(17px)",

  "&:hover": {
    backgroundColor: theme.palette.grey[100],
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
  transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
});