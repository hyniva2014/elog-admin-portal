import React from "react";
import { Box, Typography } from "@mui/material";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonDataGrid from "../../../common/CommonDataGrid";
import { ActionBox, BackButton, CreatedDateText, CreatedOnWrapper, CreatedTimeText, DataGridWrapper } from "./UserManagementGroupDialog.styles";
import { STATIC_GROUP_DATA } from "../DeviceAssetManagement/Constants";

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

const GroupDialogContent = ({ onClose }) => {
  return (
    <DataGridWrapper>
      <CommonDataGrid
        columnsData={columns}
        rowData={STATIC_GROUP_DATA}
        hideFooter
        useAutoHeight
      />
      <ActionBox>
        <BackButton variant="contained" onClick={onClose}>
          Back
        </BackButton>
      </ActionBox>
    </DataGridWrapper>
  );
};

const UserManagementGroupDialog = ({ open, onClose }) => {
  return (
    <CommonDialogForm
      open={open}
      title="Carrier Users Audit History"
      content={<GroupDialogContent onClose={onClose} />}
      onCancel={onClose}
      onClose={onClose}
      mode="view"
      maxWidth="md"
    />
  );
};

export default UserManagementGroupDialog;
