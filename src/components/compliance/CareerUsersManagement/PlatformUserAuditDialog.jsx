import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonDataGrid from "../../../common/CommonDataGrid";
import { STATIC_GROUP_DATA } from "./Constants"
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
        <Typography sx={auditCreatedDateSx(theme)}>{row.createdDate}</Typography>
        <Typography sx={auditCreatedTimeSx(theme)}>{row.createdTime}</Typography>
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





const GroupDialogContent = ({ onClose }) => {
  const theme = useTheme();
  const columns = getAuditColumns(theme);

  return (
    <Box sx={tableContainerSx}>
      <CommonDataGrid
        columnsData={columns}
        rowData={STATIC_GROUP_DATA}
        hideFooter
        useAutoHeight
        showMuiLoading={false}
        showColumnSeparator={false}
        disableStickyColumns
        getRowHeight={() => "auto"}
        data={{}}
      />

      <Box sx={backButtonWrapperSx}>
        <Button variant="contained" onClick={onClose} sx={backButtonSx}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

const PlatformUserAuditDialog = ({ open, onClose }) => {
  return (
    <CommonDialogForm
      open={open}
      title="Platform User Audit History"
      content={<GroupDialogContent onClose={onClose} />}
      onCancel={onClose}
      onClose={onClose}
      mode="view"
      maxWidth="md"
    />
  );
};

export default PlatformUserAuditDialog;
