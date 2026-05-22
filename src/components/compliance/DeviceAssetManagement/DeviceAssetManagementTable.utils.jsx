import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import dayjs from "dayjs";
import { StatusTypography } from "./DeviceAssetManagement.styles";
import { actionIconSx } from "../AccountManagement/AccountManagement.styled";

export const formatDate = (value) =>
  value ? dayjs(value).format("MMM DD, YYYY") : "-";

export const getRowHeight = () => "auto";

const StatusCell = (params) => (
  <StatusTypography variant="body2" value={params.value}>
    {params.value}
  </StatusTypography>
);

const ActionCell = (onView) => {
  return (params) => (
    <Tooltip title="View">
      <IconButton size="small" onClick={() => onView(params.row)}>
        <VisibilityOutlinedIcon sx={actionIconSx} />
      </IconButton>
    </Tooltip>
  );
};

export const getColumns = (onView) => [
  {
    field: "serialNumber",
    headerName: "Serial Number",
    width: 250,
    minWidth: 250,
    maxWidth: 280,
    headerTooltip: true,
    cellClassName: "sticky-col-left-1",
    headerClassName: "sticky-col-left-1",
  },

  {
    field: "deviceModel",
    headerName: "Device Model",
    width: 250,
    minWidth: 250,
    maxWidth: 280,
    headerTooltip: true,
    cellClassName: "sticky-col-left-2",
    headerClassName: "sticky-col-left-2",
  },

  {
    field: "createdOn",
    headerName: "Created On",
    minWidth: 180,  
    maxWidth: 250,
    headerTooltip: true,
    renderCell: (params) => formatDate(params.value),
  },

  {
    field: "updatedOn",
    headerName: "Updated On",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
    renderCell: (params) => formatDate(params.value),
  },

  {
    field: "status",
    headerName: "Status",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
    renderCell: StatusCell,
  },

  {
    field: "action",
    headerName: "Action",
    minWidth: 180,
    maxWidth: 250,
    sortable: false,
    headerTooltip: true,
    renderCell: ActionCell(onView),
  },
];
