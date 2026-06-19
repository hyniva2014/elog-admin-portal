import React, { useMemo } from "react";
import CommonDataGrid from "../../../common/CommonDataGrid";
import CommonDialogForm from "../../../common/CommonDialogForm";
import { BackButton, BackButtonContainer } from "./RoleManagement.styled";

const ROLE_AUDIT_HISTORY_TITLE = "Role Audit History";
const BACK_BUTTON_TEXT = "Back";

const AuditLogModal = ({ open, onClose, auditData = [] }) => {
  const columns = useMemo(
    () => [
      {
        field: "createdBy",
        headerName: "Created By",
        flex: 2,
        minWidth: 150,
        headerTooltip: "Created By",
      },
      {
        field: "createdOn",
        headerName: "Created On",
        flex: 2,
        minWidth: 150,
        headerTooltip: "Created On",
      },
      {
        field: "notes",
        headerName: "Notes",
        flex: 3,
        minWidth: 200,
        headerTooltip: "Notes",
      },
    ],
    [],
  );

  const rows = useMemo(
    () =>
      auditData.map((entry, index) => ({
        id: index,
        createdBy: entry.createdBy,
        createdOn: entry.createdOn,
        notes: entry.notes,
      })),
    [auditData],
  );

  const gridData = useMemo(
    () => ({
      rows,
      columns,
      total: rows.length,
      isLoading: false,
    }),
    [rows, columns],
  );

  const content = useMemo(
    () => (
      <>
        <CommonDataGrid
          columnsData={columns}
          rowData={rows}
          data={gridData}
          setData={() => {}}
          hideFooter={true}
          useAutoHeight={true}
          disableStickyColumns
          getRowHeight={() => "auto"}
        />
        <BackButtonContainer>
          <BackButton variant="contained" onClick={onClose}>
            {BACK_BUTTON_TEXT}
          </BackButton>
        </BackButtonContainer>
      </>
    ),
    [columns, rows, gridData],
  );

  return (
    <CommonDialogForm
      open={open}
      title={ROLE_AUDIT_HISTORY_TITLE}
      content={content}
      onClose={onClose}
      mode="view"
      maxWidth="md"
    />
  );
};

export default AuditLogModal;
