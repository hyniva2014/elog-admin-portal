import React, { useCallback } from "react";
import eyeIcon from "../../../assets/images/svg/eyeicon.png";
import { IconButton } from "@mui/material";
import { StatusText } from "./CommonRowColumnUtils.styled";
import { USER_STATUS, USER_STATUS_COL_CONFIG } from "./Constants";
import dayjs from "dayjs";

const formatDate = (iso) => (iso ? dayjs(iso).format("DD-MM-YYYY") : "-");

const StatusCell = (params) => {
  const color =
    USER_STATUS_COL_CONFIG[params.value]?.colorKey || "text.primary";
  return <StatusText statuscolor={color}>{params.value || "-"}</StatusText>;
};

const ActionCell = (params) => {
  const handleClick = useCallback(() => {
    params.colDef.onView?.(params.row);
  }, [params]);

  return (
    <IconButton size="small" color="primary" onClick={handleClick}>
      <img src={eyeIcon} alt="view" width={16} height={16} />
    </IconButton>
  );
};

export const UserManagementColumnData = [
  {
    field: "carrierId",
    headerName: "Carrier ID",
    minWidth: 120,
    maxWidth: 160,
    headerTooltip: true,
    cellClassName: "sticky-col-left-1",
    headerClassName: "sticky-col-left-1",
  },
  {
    field: "carrierName",
    headerName: "Carrier Name",
    minWidth: 160,
    maxWidth: 220,
    headerTooltip: true,
    cellClassName: "sticky-col-left-2",
    headerClassName: "sticky-col-left-2",
  },
  {
    field: "userProfile",
    headerName: "User Profile",
    flex: 1,
    minWidth: 140,
    maxWidth: 200,
    headerTooltip: true,
  },
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1,
    minWidth: 140,
    maxWidth: 200,
    headerTooltip: true,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 1,
    minWidth: 140,
    maxWidth: 200,
    headerTooltip: true,
  },
  {
    field: "primaryContactEmail",
    headerName: "Email",
    flex: 1,
    minWidth: 200,
    maxWidth: 280,
    headerTooltip: true,
  },
  {
    field: "createdOn",
    headerName: "Created On",
    flex: 1,
    minWidth: 140,
    maxWidth: 180,
    headerTooltip: true,
  },
  {
    field: "updatedOn",
    headerName: "Updated On",
    flex: 1,
    minWidth: 140,
    maxWidth: 180,
    headerTooltip: true,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    maxWidth: 160,
    headerTooltip: true,
    renderCell: StatusCell,
  },
  {
    field: "action",
    headerName: "Action",
    minWidth: 80,
    maxWidth: 100,
    sortable: false,
    renderCell: ActionCell,
  },
];

export const mapUserToRow = (user) => ({
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
  createdOn: formatDate(user.created_at ?? user.createdOn),
  updatedOn: formatDate(user.updated_at ?? user.updatedOn),
  status: USER_STATUS[String(user.status_id)] || user.status || "-",
  status_id: user.status_id ?? "",
  user_name: (
    user.user_name ?? `${user.first_name ?? ""} ${user.last_name ?? ""}`
  ).trim(),
});
