import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import CommonDataGrid from "../../../common/CommonDataGrid";
import CommonDialogForm from "../../../common/CommonDialogForm";
import {
  BackButton,
  BackButtonContainer,
  CreatedOnCellContainer,
} from "./RoleManagement.styled";

const ROLE_AUDIT_HISTORY_TITLE = "Role Audit History";
const BACK_BUTTON_TEXT = "Back";

const getRowHeight = () => "auto";

const CreatedOnCell = ({ params }) => {
  return (
    <CreatedOnCellContainer>
      <Typography variant="body2">{params.row.createdDate}</Typography>
      <Typography variant="body2" color="text.primary">
        {params.row.createdTime}
      </Typography>
    </CreatedOnCellContainer>
  );
};

const AuditLogModal = ({
  open,
  onClose,
  auditData = {},
  setAuditData = () => {},
}) => {
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
        field: "createdDate",
        headerName: "Created On",
        flex: 2,
        minWidth: 150,
        headerTooltip: "Created On",
        renderCell: (params) => <CreatedOnCell params={params} />,
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
      auditData.rows?.map((entry, index) => ({
        id: index,
        createdBy: entry.createdBy,
        createdDate: entry.createdDate,
        createdTime: entry.createdTime,
        notes: entry.notes,
      })) || [],
    [auditData.rows],
  );

  const gridData = useMemo(
    () => ({
      rows,
      columns,
      total: auditData.total || 0,
      page: auditData.page || 1,
      pageSize: auditData.pageSize || 10,
      isLoading: auditData.isLoading || false,
    }),
    [rows, columns, auditData],
  );

  const content = useMemo(
    () => (
      <>
        <CommonDataGrid
          columnsData={columns}
          rowData={rows}
          data={gridData}
          setData={setAuditData}
          hideFooter={false}
          useAutoHeight={true}
          disableStickyColumns={true}
          getRowHeight={getRowHeight}
        />
        <BackButtonContainer>
          <BackButton variant="contained" onClick={onClose}>
            {BACK_BUTTON_TEXT}
          </BackButton>
        </BackButtonContainer>
      </>
    ),
    [columns, rows, gridData, setAuditData],
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
