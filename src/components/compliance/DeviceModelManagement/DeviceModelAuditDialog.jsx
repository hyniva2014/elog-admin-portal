import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonDataGrid from "../../../common/CommonDataGrid";
import {
  getAuditColumns,
  tableContainerSx,
  backButtonWrapperSx,
  backButtonSx,
} from "./DeviceModelAuditDialog.styled";

const STATIC_AUDIT_DATA = [
  {
    id: 1,
    createdBy: "John Miller",
    createdDate: "Dec 11, 2025",
    createdTime: "06:15 AM",
    notes: "Account Created",
  },
  {
    id: 2,
    createdBy: "John Miller",
    createdDate: "Dec 12, 2025",
    createdTime: "06:15 AM",
    notes: "Note Content Here",
  },
  {
    id: 3,
    createdBy: "John Miller",
    createdDate: "Dec 12, 2025",
    createdTime: "06:15 AM",
    notes: "carrier requested 100 devices",
  },
  {
    id: 4,
    createdBy: "John Miller",
    createdDate: "Dec 12, 2025",
    createdTime: "06:15 AM",
    notes: " 100 Devices assigned ",
  },
  {
    id: 5,
    createdBy: "John Miller",
    createdDate: "Dec 15, 2025",
    createdTime: "06:15 AM",
    notes: "Note Content Here",
  },
];

const AuditDialogContent = ({ onClose }) => {
  const theme = useTheme();
  const columns = getAuditColumns(theme);

  return (
    <Box sx={tableContainerSx}>
      <CommonDataGrid
        columnsData={columns}
        rowData={STATIC_AUDIT_DATA}
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

const DeviceModelAuditDialog = ({ open, onClose }) => {
  return (
    <CommonDialogForm
      open={open}
      title="Device Model Audit History"
      content={<AuditDialogContent onClose={onClose} />}
      onCancel={onClose}
      onClose={onClose}
      mode="view"
      maxWidth="md"
    />
  );
};

export default DeviceModelAuditDialog;
