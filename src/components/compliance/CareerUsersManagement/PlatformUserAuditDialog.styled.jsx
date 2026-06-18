import { Box, Typography } from "@mui/material";

// ─── DataGrid column definitions ─────────────────────────────────────────────
export const getAuditColumns = (theme) => [
  {
    field: "createdBy",
    headerName: "Created By",
    sortable: false,
    flex: 1,
    minWidth: 0,
    width: undefined,
    maxWidth: undefined,
  },
  {
    field: "createdDate",
    headerName: "Created On",
    sortable: false,
    flex: 1,
    minWidth: 0,
    width: undefined,
    maxWidth: undefined,
    renderCell: ({ row }) => (
      <Box>
        <Typography
          sx={{
            fontSize: "0.875rem",
            fontWeight: 500,
            lineHeight: 1,
            color: theme.palette.text.primary,
          }}
        >
          {row.createdDate}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.75rem",
            color: theme.palette.text.secondary,
            lineHeight: 1.4,
          }}
        >
          {row.createdTime}
        </Typography>
      </Box>
    ),
  },
  {
    field: "notes",
    headerName: "Notes",
    sortable: false,
    flex: 1,
    minWidth: 0,
    width: undefined,
    maxWidth: undefined,
  },
];

// ─── Table container ─────────────────────────────────────────────────────────
export const tableContainerSx = {
  width: "100%",
  mt: 1,
};

// ─── Back button wrapper ──────────────────────────────────────────────────────
export const backButtonWrapperSx = {
  pt: 2,
  mt: 1,
  display: "flex",
  justifyContent: "center",
};

// ─── Back button ─────────────────────────────────────────────────────────────
export const backButtonSx = {
  minWidth: 200,
  backgroundColor: "#1a3a6b",
  "&:hover": { backgroundColor: "#14306a" },
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 1,
};
