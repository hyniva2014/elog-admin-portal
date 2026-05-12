import { Box, Tooltip, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "./CustomPagination";
import { useEffect, useState } from "react";

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
            <Box
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                display: "block",
              }}
            >
              {originalHeader}
            </Box>
          </Tooltip>
        );
      },
    };
  });

const CommonDataGrid = ({
  columnsData = [],
  rowData = [],
  data = {},
  setData = () => {},
  hideFooter = false,
  getRowHeight = false,
  checkboxSelection = false,
}) => {
  const pagePaginationModel = {
    page: (data.page || 1) - 1,
    pageSize: data.pageSize || 10,
  };

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [localRows, setLocalRows] = useState(rowData || []);

  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: "asc",
  });

  useEffect(() => {
    setLocalRows(rowData || []);
  }, [rowData]);

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

  const applyEqualWidth = (columns) => {
    return columns.map((col, index) => {
      // keep first 2 sticky columns as it is
      if (index < 2) return col;

      return {
        ...col,
        flex: 1,
        minWidth: 150,
        width: 500,
        maxWidth: 500,
      };
    });
  };

  const updatedColumns = applyEqualWidth(columnsData);

  const enhancedColumns = updatedColumns.map((col) => {
    const isSortable = col.sortable !== false;

    return {
      ...col,
      sortable: false,

      renderHeader: () => (
        <Box
          sx={{
            cursor: isSortable ? "pointer" : "default",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 0.5,
          }}
          onClick={() => {
            if (isSortable) handleSort(col.field);
          }}
        >
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: 500,
            }}
          >
            {col.headerName}
          </Box>
          {isSortable &&
            sortConfig.field === col.field &&
            (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
        </Box>
      ),
    };
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <DataGrid
        rows={localRows}
        columns={withHeaderTooltip(enhancedColumns)}
        rowCount={data.total || 0}
        loading={data.isLoading}
        paginationModel={pagePaginationModel}
        paginationMode="server"
        disableColumnMenu
        disableColumnSorting
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        hideFooter={hideFooter}
        getRowHeight={getRowHeight}
        disableVirtualization
        onPaginationModelChange={(model) =>
          setData((prev) => ({
            ...prev,
            page: model.page + 1,
            pageSize: model.pageSize,
          }))
        }
        slots={{
          pagination: CustomPagination,
        }}
        checkboxSelection={checkboxSelection}
        sx={{
          flex: 1,
          "& .MuiDataGrid-cell": {
            paddingTop: "8px",
            paddingBottom: "8px",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.grey[isDark ? 100 : 100],
            fontSize: "14px",
            width: "100%",
            position: "sticky",
            top: 0,
            zIndex: 4,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 500,
          },
          "& .MuiDataGrid-row": {
            fontSize: "14px",
            fontWeight: 400,
          },
          "& .MuiDataGrid-columnHeadersInner": {
            backgroundColor: theme.palette.grey[isDark ? 100 : 100],
          },

          "& .MuiDataGrid-columnHeader": {
            backgroundColor: isDark ? theme.palette.grey[100] : "#F6F6F6",
          },
          "& .MuiDataGrid-overlay": {
            height: "100%",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
          "& .sticky-col-left-1": {
            position: "sticky",
            left: 0,
            backgroundColor: "#fff",
            zIndex: 2,
          },

          "& .sticky-col-left-2": {
            position: "sticky",
            left: 150,
            backgroundColor: "#fff",
            zIndex: 2,
            borderRight: "1.5px solid rgba(0, 0, 0, 0.2)",
          },

          "& .MuiDataGrid-row:hover .sticky-col-left-1": {
            backgroundColor: "inherit !important",
          },

          "& .MuiDataGrid-row:hover .sticky-col-left-2": {
            backgroundColor: "inherit !important",
          },

          "& .sticky-col-right": {
            position: "sticky",
            right: 0,
            backgroundColor: "#fff",
            zIndex: 2,
            borderLeft: "2px solid rgba(0, 0, 0, 0.2)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          },
          "& .MuiDataGrid-columnHeader.sticky-col-left-1": {
            position: "sticky",
            left: 0,
            backgroundColor: "#F6F6F6",
            zIndex: 5,
            borderRight: "none !important",
          },

          "& .MuiDataGrid-columnHeader.sticky-col-left-2": {
            position: "sticky",
            left: 150,
            backgroundColor: "#F6F6F6",
            zIndex: 5,
            borderRight: "none !important",
          },

          "& .MuiDataGrid-columnHeaders .sticky-col-right": {
            backgroundColor: "#F6F6F6",
            zIndex: 5,
          },
          "& .MuiDataGrid-virtualScroller": {
            overflowX: "auto",
          },
          "& .MuiDataGrid-virtualScrollerRenderZone": {
            transform: "none !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            position: "sticky",
            top: 0,
            zIndex: 4,
          },
          "& .MuiDataGrid-row": {
            transform: "none !important",
          },
        }}
      />
    </Box>
  );
};

export default CommonDataGrid;