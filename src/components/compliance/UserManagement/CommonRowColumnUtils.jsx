import React, { useCallback } from "react";
import dayjs from "dayjs";
import { Box, IconButton, Typography, Tooltip } from "@mui/material";

import eyeIcon from "../../../assets/images/svg/eyeicon.png";
import GroupIcon from "../../../assets/images/svg/Group.png";

import { StatusText } from "./CommonRowColumnUtils.styled";
import { USER_STATUS, USER_STATUS_COL_CONFIG } from "./Constants";
import { getFormattedDateTime } from "../../../common/CommonUtils";
import { ActionContainer, GroupIconImage } from "./UserManagementGroupDialog.styles";

const formatDate = (iso) => (iso ? dayjs(iso).format("DD-MM-YYYY") : "-");

const StatusCell = (params) => {
  const color =
    USER_STATUS_COL_CONFIG[params.value]?.colorKey || "text.primary";

  return <StatusText statuscolor={color}>{params.value || "-"}</StatusText>;
};

const ActionCellComponent = ({ params, canView, onAuditHistory }) => {
  const handleViewClick = useCallback(() => {
    if (canView) {
      params.colDef.onView?.(params.row);
    }
  }, [params, canView]);

  const handleAuditHistoryClick = useCallback(() => {
    if (onAuditHistory) {
      onAuditHistory(params.row.user_id);
    }
  }, [onAuditHistory, params.row.user_id]);

  return (
    <>
      <ActionContainer>
        <Tooltip title="Group">
          <IconButton size="small" onClick={handleAuditHistoryClick}>
            <GroupIconImage component="img" src={GroupIcon} alt="group" />
          </IconButton>
        </Tooltip>

        <Tooltip title={canView ? "View" : "No permission"} placement="right">
          <span>
            <IconButton
              size="small"
              disabled={!canView}
              onClick={handleViewClick}
            >
              <img src={eyeIcon} alt="view" width={16} height={16} />
            </IconButton>
          </span>
        </Tooltip>
      </ActionContainer>
    </>
  );
};

const ActionCell = (canView, onAuditHistory) => (params) => (
  <ActionCellComponent params={params} canView={canView} onAuditHistory={onAuditHistory} />
);

export const UserManagementColumnData = (canView = true, onAuditHistory) => [
  {
    field: "carrierId",
    headerName: "Carrier ID",
    minWidth: 120,
    maxWidth: 160,
    headerTooltip: true,
    flex: 1,
    align: "center",
    headerAlign: "center",
    cellClassName: "sticky-col-left-1",
    headerClassName: "sticky-col-left-1",
  },
  {
    field: "carrierName",
    headerName: "Carrier Name",
    minWidth: 160,
    maxWidth: 220,
    flex: 1,
    headerTooltip: true,
    cellClassName: "sticky-col-left-2",
    headerClassName: "sticky-col-left-2",
  },
  {
    field: "userProfile",
    headerName: "User Profile",
    flex: 1,
    headerTooltip: true,
  },
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1,
    headerTooltip: true,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 1,
    headerTooltip: true,
  },
  {
    field: "primaryContactEmail",
    headerName: "Email",
    flex: 1,
    headerTooltip: true,
  },
  {
    field: "createdOn",
    headerName: "Created On",
    flex: 1,
    headerTooltip: true,
    renderCell: (params) => (
      <Box>
        <Typography fontSize={14} fontWeight={400}>
          {params.row.createdDate}
        </Typography>
        <Typography fontSize={14} fontWeight={400} color="#6E7079">
          {params.row.createdTime}
        </Typography>
      </Box>
    ),
  },
  {
    field: "updatedOn",
    headerName: "Updated On",
    flex: 1,
    headerTooltip: true,
    renderCell: (params) => (
      <Box>
        <Typography fontSize={14} fontWeight={400}>
          {params.row.updatedDate}
        </Typography>
        <Typography fontSize={14} fontWeight={400} color="#6E7079">
          {params.row.updatedTime}
        </Typography>
      </Box>
    ),
  },

  {
    field: "status",
    headerName: "Status",
    flex: 1,
    headerTooltip: true,
    renderCell: StatusCell,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    sortable: false,
    renderCell: ActionCell(canView, onAuditHistory),
  },
];

export const mapUserToRow = (user) => {
  const createdInfo = getFormattedDateTime(user.created_at);
  const updatedInfo = getFormattedDateTime(user.updated_at);

  return {
    id: user.user_id,
    user_id: user.user_id,
    company_id: user.company_id ?? "",
    role_id: user.role_id ?? "",
    // status_id: user.status_id,
    carrierId: user.company_id ?? "-",
    carrierName: user.company_name ?? "-",
    userProfile: user.role_name ?? user.user_profile ?? "-",
    firstName: user.first_name ?? "-",
    lastName: user.last_name ?? "-",
    primaryContactEmail: user.email ?? "-",
    createdDate: createdInfo.date,
    createdTime: createdInfo.time,
    updatedOn: user.updated_at || null,
    updatedDate: updatedInfo.date,
    updatedTime: updatedInfo.time,
    status: USER_STATUS[String(user.status_id)] || user.status || "-",
    status_id: user.status_id ?? "",
    user_name: (
      user.user_name ?? `${user.first_name ?? ""} ${user.last_name ?? ""}`
    ).trim(),
  };
};
