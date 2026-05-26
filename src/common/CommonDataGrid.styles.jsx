import { Box, styled } from "@mui/material";

export const tooltipLabelSx = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",
  display: "block",
};

export const NoRowsOverlayContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

export const getHeaderWrapperSx = (isSortable) => ({
  cursor: isSortable ? "pointer" : "default",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  width: "100%",
  gap: 0.5,
  overflow: "hidden",
});

export const headerLabelSx = {
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontWeight: 500,
};

export const containerSx = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  width: "100%",
};

export const gridSx = (theme) => ({
  flex: 1,

  "& .MuiDataGrid-virtualScrollerRenderZone": {
    transform: "none !important",
  },
  "& .MuiDataGrid-row": {
    transform: "none !important",
  },

  "& .MuiDataGrid-cell": {
    paddingTop: "8px",
    paddingBottom: "8px",
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
  },

  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.grey[50],
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  "& .MuiDataGrid-columnHeader": {
    backgroundColor: theme.palette.grey[50],
    fontWeight: 600,
  },

  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
  },

  "& .MuiDataGrid-row": {
    fontSize: "14px",
    fontWeight: 400,
  },

  "& .MuiDataGrid-overlay": {
    height: "100%",
  },

  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
    {
      outline: "none",
    },

  "& .MuiDataGrid-cell.sticky-col-left-1": {
    position: "sticky",
    left: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 3,
  },
  "& .MuiDataGrid-cell.sticky-col-left-2": {
    position: "sticky",
    left: 150,
    backgroundColor: theme.palette.background.paper,
    zIndex: 3,
    borderRight: `1.5px solid ${theme.palette.divider}`,
  },

  "& .MuiDataGrid-columnHeader.sticky-col-left-1": {
    zIndex: 1000,
    backgroundColor: theme.palette.grey[50],
    willChange: "transform",
  },

  "& .MuiDataGrid-columnHeader.sticky-col-left-2": {
    zIndex: 1000,
    backgroundColor: theme.palette.grey[50],
    borderRight: `1.5px solid ${theme.palette.divider}`,
    willChange: "transform",
  },

  "& .MuiDataGrid-row:hover": {
    backgroundColor: theme.palette.grey[100],
  },

  "& .MuiDataGrid-row:hover .MuiDataGrid-cell": {
    backgroundColor: theme.palette.grey[100],
  },

  "& .MuiDataGrid-row:hover .sticky-col-left-1, & .MuiDataGrid-row:hover .sticky-col-left-2":
    {
      backgroundColor: theme.palette.grey[100],
    },

  "& .MuiDataGrid-main": {
    overflow: "auto",
  },
  "& .MuiDataGrid-virtualScroller": {
    overflowX: "auto",
  },
});

export const getContainerSx = (hasRows, useAutoHeight = false) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  width: "100%",
  ...(useAutoHeight
    ? { height: "auto" }
    : hasRows
      ? { height: "auto" }
      : { minHeight: 240 }),
});
