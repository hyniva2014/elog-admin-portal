import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonDataGrid from "../../../common/CommonDataGrid";
import {
  ActionBox,
  BackButton,
  CreatedDateText,
  CreatedOnWrapper,
  CreatedTimeText,
  DataGridWrapper,
} from "./UserManagementGroupDialog.styles";

const columns = [
  {
    field: "createdBy",
    headerName: "Created By",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "createdOn",
    headerName: "Created On",
    flex: 1,
    minWidth: 200,
    renderCell: (params) => (
      <CreatedOnWrapper>
        <CreatedDateText>{params.row.createdDate}</CreatedDateText>
        <CreatedTimeText>{params.row.createdTime}</CreatedTimeText>
      </CreatedOnWrapper>
    ),
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 1,
    minWidth: 200,
  },
];

const GroupDialogContent = ({ auditData, setAuditData, onClose }) => {
  const data = {
    page: auditData.page,
    pageSize: auditData.pageSize,
    total: auditData.total,
    isLoading: auditData.isLoading,
  };

  return (
    <DataGridWrapper>
      <CommonDataGrid
        columnsData={columns}
        rowData={auditData.rows}
        data={data}
        setData={setAuditData}
        useAutoHeight
        showMuiLoading={auditData.isLoading}
        paginationMode="server"
      />
      <ActionBox>
        <BackButton variant="contained" onClick={onClose}>
          Back
        </BackButton>
      </ActionBox>
    </DataGridWrapper>
  );
};

const UserManagementGroupDialog = ({ open, onClose, auditData, setAuditData }) => {
  const dialogContent = open ? (
    <GroupDialogContent
      auditData={auditData}
      setAuditData={setAuditData}
      onClose={onClose}
    />
  ) : null;

  return (
    <CommonDialogForm
      open={open}
      title="Carrier Users Audit History"
      content={dialogContent}
      onCancel={onClose}
      onClose={onClose}
      mode="view"
      maxWidth="md"
    />
  );
};

export default UserManagementGroupDialog;
