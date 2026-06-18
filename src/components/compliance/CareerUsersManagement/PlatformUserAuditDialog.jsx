import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonDataGrid from "../../../common/CommonDataGrid";
import {
  getAuditColumns,
  tableContainerSx,
  backButtonWrapperSx,
  backButtonSx,
} from "./PlatformUserAuditDialog.styled";

// ─── Static data ─────────────────────────────────────────────────────────────
const STATIC_GROUP_DATA = [
  { id: 1, createdBy: "John Miller", createdDate: "Dec 11, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
  { id: 2, createdBy: "John Miller", createdDate: "Dec 12, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
  { id: 3, createdBy: "John Miller", createdDate: "Dec 12, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
  { id: 4, createdBy: "John Miller", createdDate: "Dec 12, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
  { id: 5, createdBy: "John Miller", createdDate: "Dec 15, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
];

// ─── Dialog content ───────────────────────────────────────────────────────────
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

// ─── Main dialog ──────────────────────────────────────────────────────────────
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
