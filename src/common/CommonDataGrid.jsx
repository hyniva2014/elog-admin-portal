import { Box, Collapse, Tooltip, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "./CustomPagination";
import { useEffect, useRef, useState } from "react";
import {
  tooltipLabelSx,
  getHeaderWrapperSx,
  headerLabelSx,
  containerSx,
  gridSx,
  getContainerSx,
  NoRowsOverlayContainer,
  FooterInfoContainerSx,
  FooterPoweredBySx,
  FooterBrandSx,
  FooterCopyrightSx,
} from "./CommonDataGrid.styles";

const withHeaderTooltip = (columns) =>
  columns.map((col) => {
    if (!col.headerTooltip) return col;

    return {
      ...col,
      renderHeader: (params) => {
        const originalHeader = col.renderHeader
          ? col.renderHeader(params)
          : params.colDef.headerName;

        return (
          <Tooltip title={params.colDef.headerName} placement="right">
            <Box sx={tooltipLabelSx}>{originalHeader}</Box>
          </Tooltip>
        );
      },
    };
  });

const NoRowsOverlay = () => (
  <NoRowsOverlayContainer>No rows</NoRowsOverlayContainer>
);

const CommonDataGrid = ({
  columnsData = [],
  rowData = [],
  data = {},
  setData = () => {},
  hideFooter = false,
  getRowHeight = false,
  checkboxSelection = false,
  rowSelectionModel = [],
  onRowSelectionModelChange = () => {},
  showMuiLoading = true,
  useAutoHeight = false,
  isRowSelectable = null,
  showColumnSeparator = true,
  disableStickyColumns = false,
}) => {
  const pagePaginationModel = {
    page: (data.page || 1) - 1,
    pageSize: data.pageSize || 10,
  };

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const containerRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const [localRows, setLocalRows] = useState(rowData || []);
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: "asc",
  });

  useEffect(() => {
    setLocalRows(rowData || []);
  }, [rowData]);
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    let virtualScroller = null;
    let scrollHandler = null;
    let frame = null;

    const applyTransforms = () => {
      frame = null;
      if (!virtualScroller) return;
      const scrollLeft = virtualScroller.scrollLeft;
      const stickyHeaders = root.querySelectorAll(
        ".MuiDataGrid-columnHeaderCheckbox, \
        .MuiDataGrid-columnHeader.sticky-col-left-1, \
        .MuiDataGrid-columnHeader.sticky-col-left-2",
      );
      stickyHeaders.forEach((el) => {
        el.style.setProperty(
          "transform",
          `translate3d(${scrollLeft}px, 0, 0)`,
          "important",
        );
      });
    };

    const requestApply = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(applyTransforms);
      }
    };

    const attachScrollListener = () => {
      const nextScroller = root.querySelector(".MuiDataGrid-virtualScroller");
      if (nextScroller && nextScroller !== virtualScroller) {
        if (virtualScroller && scrollHandler) {
          virtualScroller.removeEventListener("scroll", scrollHandler);
        }
        virtualScroller = nextScroller;
        scrollHandler = requestApply;
        virtualScroller.addEventListener("scroll", scrollHandler, {
          passive: true,
        });
        requestApply();
      }
    };

    // Initial attach + handle elements that mount asynchronously.
    attachScrollListener();
    const observer = new MutationObserver(() => {
      attachScrollListener();
      requestApply();
    });
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (virtualScroller && scrollHandler) {
        virtualScroller.removeEventListener("scroll", scrollHandler);
      }
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const handleSort = (field) => {
    let direction = "asc";

    if (sortConfig.field === field && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedRows = [...localRows].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;

      return 0;
    });

    setSortConfig({ field, direction });
    setLocalRows(sortedRows);
  };

  const stickyWidth = { width: 150, minWidth: 150, maxWidth: 150 };

  const applyEqualWidth = (columns) => {
    return columns.map((col, index) =>
      index === 0
        ? {
            ...col,
            ...stickyWidth,
            cellClassName: "sticky-col-left-1",
            headerClassName: "sticky-col-left-1",
          }
        : index === 1
          ? {
              ...col,
              ...stickyWidth,
              cellClassName: "sticky-col-left-2",
              headerClassName: "sticky-col-left-2",
            }
          : { ...col, flex: 1, minWidth: 150, width: 500, maxWidth: 500 },
    );
  };

  const updatedColumns = disableStickyColumns
    ? columnsData
    : applyEqualWidth(columnsData);

  const enhancedColumns = updatedColumns.map((col) => {
    const isSortable = col.sortable !== false;

    return {
      ...col,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={getHeaderWrapperSx(isSortable)}
          onClick={() => {
            if (isSortable) handleSort(col.field);
          }}
        >
          <Box sx={headerLabelSx}>{col.headerName}</Box>
          {isSortable &&
            sortConfig.field === col.field &&
            (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
        </Box>
      ),
    };
  });

  const footerContent = collapsed ? (
    <Box sx={FooterInfoContainerSx}>
      <Typography variant="inherit" sx={FooterPoweredBySx}>
        Powered by{" "}
        <Box component="span" sx={FooterBrandSx}>
          Trackpulse
        </Box>
      </Typography>

      <Box />

      <Typography variant="inherit" sx={FooterCopyrightSx}>
        © 2026 Trackpulse Pvt Ltd. All Rights Reserved.
      </Typography>
    </Box>
  ) : null;

  return (
    <Box
      ref={containerRef}
      sx={getContainerSx(localRows.length > 0, useAutoHeight)}
    >
      <DataGrid
        autoHeight={useAutoHeight || localRows.length === 0}
        rows={localRows}
        columns={withHeaderTooltip(enhancedColumns)}
        rowCount={data.total || 0}
        loading={showMuiLoading && Boolean(data.isLoading)}
        paginationModel={pagePaginationModel}
        paginationMode="server"
        disableColumnMenu
        disableColumnSorting
        disableColumnResize={showColumnSeparator}
        pageSizeOptions={[10]}
        disableVirtualization
        disableRowSelectionOnClick
        hideFooter={hideFooter}
        getRowHeight={getRowHeight}
        checkboxSelection={checkboxSelection}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={onRowSelectionModelChange}
        isRowSelectable={isRowSelectable}
        onPaginationModelChange={(model) =>
          setData((prev) => ({
            ...prev,
            page: model.page + 1,
            pageSize: model.pageSize,
          }))
        }
        components={{
          NoRowsOverlay,
        }}
        slots={{
          pagination: () => (
            <CustomPagination
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          ),
          noRowsOverlay: NoRowsOverlay,
        }}
        sx={(theme) => ({
          ...gridSx(theme),
          ...(!showColumnSeparator && {
            "& .MuiDataGrid-columnSeparator": {
              display: "none !important",
              visibility: "hidden !important",
            },
            "& .MuiDataGrid-columnSeparator--resizable": {
              display: "none !important",
            },
            "& .MuiDataGrid-iconSeparator": {
              display: "none !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              position: "sticky",
              top: 0,
              zIndex: 4,
            },
          }),
        })}
      />
      <Collapse in={collapsed} timeout={400}>
        {footerContent}
      </Collapse>
    </Box>
  );
};

export default CommonDataGrid;
