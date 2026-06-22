import { useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonDataGrid from "../../../common/CommonDataGrid";
import {
  auditCreatedDateSx,
  auditCreatedTimeSx,
  tableContainerSx,
  backButtonWrapperSx,
  backButtonSx,
} from "./PlatformUserAuditDialog.styled";

const getAuditColumns = (theme) => [
  {
    field: "createdBy",
    headerName: "Created By",
    sortable: false,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "createdDate",
    headerName: "Created On",
    sortable: false,
    flex: 1,
    minWidth: 150,
    renderCell: ({ row }) => (
      <Box>
        <Typography sx={auditCreatedDateSx(theme)}>{row.createdDate}</Typography>
        <Typography sx={auditCreatedTimeSx(theme)}>{row.createdTime}</Typography>
      </Box>
    ),
  },
  {
    field: "notes",
    headerName: "Notes",
    sortable: false,
    flex: 2,
    minWidth: 200,
  },
];

const AuditDialogContent = ({ auditData, setAuditData, onClose }) => {
  const theme = useTheme();
  const columns = getAuditColumns(theme);

  const data = useMemo(
    () => ({
      page: auditData.page,
      pageSize: auditData.pageSize,
      total: auditData.total,
      isLoading: auditData.isLoading,
    }),
    [auditData],
  );

  return (
    <Box sx={tableContainerSx}>
      <CommonDataGrid
        columnsData={columns}
        rowData={auditData.rows}
        data={data}
        setData={setAuditData}
        useAutoHeight
        showMuiLoading={auditData.isLoading}
        showColumnSeparator={false}
        disableStickyColumns
        getRowHeight={() => "auto"}
      />
      <Box sx={backButtonWrapperSx}>
        <Button variant="contained" onClick={onClose} sx={backButtonSx}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

const PlatformUserAuditDialog = ({ open, onClose, auditData, setAuditData }) => {
  const dialogContent = open ? (
    <AuditDialogContent
      auditData={auditData}
      setAuditData={setAuditData}
      onClose={onClose}
    />
  ) : null;

  return (
    <CommonDialogForm
      open={open}
      title="Platform User Audit History"
      content={dialogContent}
      onCancel={onClose}
      onClose={onClose}
      mode="view"
      maxWidth="md"
    />
  );
};

export default PlatformUserAuditDialog;
