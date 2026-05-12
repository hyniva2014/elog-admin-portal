import React from "react";
import { Box, Typography, Pagination } from "@mui/material";
import {
  gridPageSelector,
  gridPageSizeSelector,
  gridRowCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

const CustomPagination = () => {
  const apiRef = useGridApiContext();

  const page = useGridSelector(apiRef, gridPageSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const rowCount = useGridSelector(apiRef, gridRowCountSelector);

  const start = rowCount === 0 ? 0 : page * pageSize + 1;
  const end = Math.min(rowCount, (page + 1) * pageSize);

  const handlePageChange = (_, value) => {
    apiRef.current.setPage(value - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        py: 1,
        width: "100%",
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="body2">
        {`${start}-${end} of ${rowCount}`}
      </Typography>

      <Pagination
        color="primary"
        page={page + 1}
        count={Math.ceil(rowCount / pageSize)}
        onChange={handlePageChange}
        size="small"
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: 1.5,
            minWidth: 32,
            height: 32,
            fontSize: 13,
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "#284495",
            color: "#fff",
            fontWeight: 600,
          },
          "& .MuiPaginationItem-page.Mui-selected:hover": {
            backgroundColor: "primary.dark",
          },

          "& .MuiPaginationItem-previousNext": {
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1.5,
            backgroundColor: "#EBEFF6",
            mx: 0.5,
          },

          "& .MuiPaginationItem-previousNext:hover": {
            backgroundColor: "#EBEFF6",
          },
        }}
      />
    </Box>
  );
};

export default CustomPagination;
