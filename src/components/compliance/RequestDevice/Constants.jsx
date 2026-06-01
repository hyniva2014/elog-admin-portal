import React, { useCallback, useMemo } from "react";
import eyeIcon from "../../../assets/images/svg/eyeicon.png";
import { IconButton, useTheme } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import dayjs from "dayjs";
import { StatusText } from "./RequestDevice.styled";

const formatDate = (iso) => {
  return iso ? dayjs(iso).format("MMM DD, YYYY") : "-";
};

const StatusCell = ({ value }) => {
  return <StatusText status={value}>{value || "-"}</StatusText>;
};

const ActionCell = ({ row, colDef }) => {
  const theme = useTheme();

  const handleClick = useCallback(() => {
    colDef.onView?.(row);
  }, [row, colDef]);

  if (row.status === "Pending") {
    return (
      <IconButton size="small" color="primary">
        <AssignmentIcon fontSize="small" />
      </IconButton>
    );
  }

  return (
    <IconButton size="small" color="primary" onClick={handleClick}>
      <img src={eyeIcon} alt="view" width={16} height={16} />
    </IconButton>
  );
};

export const columns = [
  {
    field: "carrierName",
    headerName: "Carrier Name",
    flex: 1,
    headerTooltip: true,
  },
  {
    field: "requestedDevices",
    headerName: "Requested Devices",
    flex: 1,
    headerTooltip: true,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    headerTooltip: true,
  },
  {
    field: "requestedBy",
    headerName: "Requested By",
    flex: 1,
    headerTooltip: true,
  },
  {
    field: "requestedOn",
    headerName: "Requested On",
    flex: 1,
    headerTooltip: true,
  },
  {
    field: "approvedBy",
    headerName: "Approved By",
    flex: 1,
    headerTooltip: true,
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
    renderCell: ActionCell,
  },
];

export const transformRequestedDevicesData = (data = []) => {
  return data.map((item, index) => ({
    id: item.id || index,
    carrierName: item.company_name || item.carrier_name || "-",
    requestedDevices: item.requested_devices_count || "-",
    description: item.description || "-",
    requestedBy: item.requested_by_name || "-",
    requestedOn: formatDate(
      item.requested_on || item.created_at || item.created_on,
    ),
    approvedBy: item.approved_by || "-",
    status:
      item.status === 1 || item.status === "Pending"
        ? "Pending"
        : item.status === 2 || item.status === "Approved"
          ? "Approved"
          : item.status || "-",
  }));
};

export const statusOptions = [
  { label: "Pending", value: "1" },
  { label: "Approved", value: "2" },
];
