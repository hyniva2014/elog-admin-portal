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

  // Make checkbox column sticky when present
  "& .MuiDataGrid-cellCheckbox": {
    position: "sticky",
    left: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 3,
  },

  "& .MuiDataGrid-columnHeaderCheckbox": {
    position: "sticky",
    left: 0,
    backgroundColor: theme.palette.grey[50],
    zIndex: 1000,
    willChange: "transform",
  },

  "& .MuiCheckbox-root.Mui-disabled": {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "16px",
      height: "16px",
      backgroundColor: theme.palette.action.disabledBackground,
      borderRadius: "2px",
      zIndex: 0,
    },
    "& svg": {
      position: "relative",
      zIndex: 1,
    },
  },

  // Disable vertical scrollbar
  "& .MuiDataGrid-virtualScroller": {
    overflowY: "hidden", // Hide vertical scrollbar
    overflowX: "auto", // Keep horizontal scrollbar if needed
  },

  // Or completely remove scrollbar while keeping functionality
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
    display: "none", // Hide scrollbar (Chrome, Safari, Edge)
  },
  "& .MuiDataGrid-virtualScroller": {
    scrollbarWidth: "none", // Hide scrollbar (Firefox)
    msOverflowStyle: "none", // Hide scrollbar (IE/Edge)
  },

  "& .MuiDataGrid-cell.sticky-col-left-1": {
    position: "sticky",
    left: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 3,
  },

  // Adjust left position for sticky-col-left-1 when checkbox is present
  "&:has(.MuiDataGrid-cellCheckbox) .MuiDataGrid-cell.sticky-col-left-1": {
    left: 50,
  },

  "& .MuiDataGrid-cell.sticky-col-left-2": {
    position: "sticky",
    left: 150,
    backgroundColor: theme.palette.background.paper,
    zIndex: 3,
    borderRight: `1.5px solid ${theme.palette.divider}`,
  },

  // Adjust left position for sticky-col-left-2 when checkbox is present
  "&:has(.MuiDataGrid-cellCheckbox) .MuiDataGrid-cell.sticky-col-left-2": {
    left: 200, 
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
