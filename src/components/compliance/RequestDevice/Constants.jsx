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

const ActionCell = (params) => {
  const { row, colDef } = params;
  const theme = useTheme();

  const handleClick = useCallback(() => {
    colDef.onView?.(row);
  }, [row, colDef]);

  if (row.status === "Pending") {
    return (
      <IconButton size="small" color="primary" onClick={handleClick}>
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

export const statusOptions = [
  { label: "Pending", value: "1" },
  { label: "Approved", value: "0" },
];

