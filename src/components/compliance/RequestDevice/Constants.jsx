import React, { useCallback, useMemo } from "react";
import eyeIcon from "../../../assets/images/svg/eyeicon.png";
import { IconButton, useTheme, Box, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { StatusText } from "./RequestDevice.styled";

const StatusCell = ({ value }) => {
  return <StatusText status={value}>{value || "-"}</StatusText>;
};

// Status checking utility - exported for reuse
export const isRequestApproved = (status) => status === "Approved";

const ActionCell = (params) => {
  const { row, colDef } = params;
  const isApproved = isRequestApproved(row.status);

  const handleClick = useCallback(() => {
    if (!isApproved) {
      colDef.onView?.(row);
    }
  }, [row, colDef, isApproved]);

  return (
    <IconButton
      size="small"
      color="primary"
      onClick={handleClick}
      disabled={isApproved}
    >
      <AssignmentIcon fontSize="small" />
    </IconButton>
  );
};

export const columns = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    headerTooltip: true,
  },
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
    align: "center",
    headerAlign: "center",
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
    renderCell: (params) => (
      <Box>
        <Typography fontSize={14} fontWeight={400}>
          {params.row.requestedDate}
        </Typography>
        <Typography fontSize={14} fontWeight={400} color="#6E7079">
          {params.row.requestedTime}
        </Typography>
      </Box>
    ),
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
  { label: "Pending", value: "0" },
  { label: "Approved", value: "1" },
];

// Dialog configuration constants
export const DIALOG_CONFIG = {
  REQUEST_DEVICE: {
    TITLE: "Request Devices",
    SUBMIT_TEXT: "Request Devices",
    FORM_ID: "request-device-form",
  },
  ASSIGN_ASSET: {
    TITLE: "Assign Asset",
    SUBMIT_TEXT: "Assign Asset",
    FORM_ID: "assign-asset-form",
  },
};
export const CONFIRMATION_DIALOG_TITLE = "Device Allocation Confirmation";