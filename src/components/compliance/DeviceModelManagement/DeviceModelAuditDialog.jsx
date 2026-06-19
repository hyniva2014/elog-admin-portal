import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonDataGrid from "../../../common/CommonDataGrid";
import {
  DataGridWrapper,
  ActionBox,
  BackButton,
  CreatedOnWrapper,
  CreatedDateText,
  CreatedTimeText,
} from "./DeviceModelAuditDialog.styled";
import { STATIC_GROUP_DATA } from "../DeviceModelManagement/Constants";

const getAuditColumns = () => [
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
      <CreatedOnWrapper>
        <CreatedDateText>{row.createdDate}</CreatedDateText>
        <CreatedTimeText>{row.createdTime}</CreatedTimeText>
      </CreatedOnWrapper>
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

const AUDIT_COLUMNS = getAuditColumns();

const AuditDialogContent = ({ onClose }) => (
  <DataGridWrapper>
    <CommonDataGrid
      columnsData={AUDIT_COLUMNS}
      rowData={STATIC_GROUP_DATA}
      hideFooter
      useAutoHeight
      showMuiLoading={false}
      showColumnSeparator={false}
      disableStickyColumns
      getRowHeight={() => "auto"}
      data={{}}
    />
    <ActionBox>
      <BackButton variant="contained" onClick={onClose}>
        Back
      </BackButton>
    </ActionBox>
  </DataGridWrapper>
);

const DeviceModelAuditDialog = ({ open, onClose }) => (
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

export default DeviceModelAuditDialog;
