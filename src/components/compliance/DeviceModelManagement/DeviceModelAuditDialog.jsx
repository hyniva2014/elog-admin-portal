import { useMemo } from "react";
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

const renderCreatedOnCell = ({ row }) => (
  <CreatedOnWrapper>
    <CreatedDateText>{row.createdDate}</CreatedDateText>
    <CreatedTimeText>{row.createdTime}</CreatedTimeText>
  </CreatedOnWrapper>
);

const getAuditColumns = () => [
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
    renderCell: renderCreatedOnCell,
  },
  {
    field: "notes",
    headerName: "Notes",
    sortable: false,
    flex: 2,
    minWidth: 200,
  },
];

const AUDIT_COLUMNS = getAuditColumns();

const getAutoRowHeight = () => "auto";

const AuditDialogContent = ({ auditData, setAuditData, onClose }) => {
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
    <DataGridWrapper>
      <CommonDataGrid
        columnsData={AUDIT_COLUMNS}
        rowData={auditData.rows}
        data={data}
        setData={setAuditData}
        useAutoHeight
        showMuiLoading={auditData.isLoading}
        showColumnSeparator={false}
        disableStickyColumns
        getRowHeight={getAutoRowHeight}
      />
      <ActionBox>
        <BackButton variant="contained" onClick={onClose}>
          Back
        </BackButton>
      </ActionBox>
    </DataGridWrapper>
  );
};

const DeviceModelAuditDialog = ({ open, onClose, auditData, setAuditData }) => {
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
      title="Device Model Audit History"
      content={dialogContent}
      onCancel={onClose}
      onClose={onClose}
      mode="view"
      maxWidth="md"
    />
  );
};

export default DeviceModelAuditDialog;
