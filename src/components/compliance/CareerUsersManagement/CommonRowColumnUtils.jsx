

import eyeIcon from "../../../assets/images/svg/eye.svg";
import pencilLight from "../../../assets/images/svg/pencil.png";
import pencilDark from "../../../assets/images/svg/pencildark.png";
import trashLight from "../../../assets/images/svg/trash.png";
import trashDark from "../../../assets/images/svg/trashdark.png";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { USER_STATUS, USER_STATUS_COL_CONFIG } from "./Constants";
import { formatDateTime } from "../../../common/CommonUtils";

export const UserManagementTableData = (
  response = [],
  handleOpenEdit,
  handleDeleteClick,
  isDarkMode,
  permissions = {},
) => {
  const pencilIcon = isDarkMode ? pencilDark : pencilLight;
  const trashIcon = isDarkMode ? trashDark : trashLight;
  const { canDelete } = permissions || {};

  const UserManagementColumnData = [
    {
      field: "username",
      headerName: "User Name",
      width: 180,
      minWidth: 120,
      maxWidth: 180,
      headerTooltip: true,
      cellClassName: "sticky-col-left-1",
      headerClassName: "sticky-col-left-1",
      renderCell: (params) => (
        <Tooltip title={params.value || ""} placement="right">
          <Typography
            fontSize={13}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {params.value || "-"}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
      width: 180,
      minWidth: 150,
      maxWidth: 220,
      cellClassName: "sticky-col-left-2",
      headerClassName: "sticky-col-left-2",
      headerTooltip: true,
    },
    {
      field: "role",
      headerName: "User Role",
      flex: 1,
      width: 180,
      minWidth: 150,
      maxWidth: 220,
      headerTooltip: true,
      renderCell: (params) => (
        <Typography fontSize={13} sx={{ textTransform: "capitalize" }}>
          {params.value || "-"}
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email ID",
      width: 180,
      minWidth: 150,
      maxWidth: 220,
      headerTooltip: true,
      renderCell: (params) => (
        <Tooltip title={params.value || ""} placement="right">
          <Typography
            fontSize={13}
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {params.value || "-"}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "phone",
      headerName: "Phone No",
      flex: 1,
      minWidth: 180,
      maxWidth: 250,
      headerTooltip: true,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      minWidth: 180,
      maxWidth: 250,
      headerTooltip: true,
    },
    {
      field: "joiningdate",
      headerName: "Onboard Date",
      minWidth: 180,
      maxWidth: 250,
      flex: 1,
      headerTooltip: true,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      minWidth: 180,
      maxWidth: 250,
      flex: 1,
      headerTooltip: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 180,
      maxWidth: 250,
      flex: 1,
      headerTooltip: true,
      renderCell: (params) => (
        <Box>
          <Typography fontSize={14}>{params.row.createdDate}</Typography>
          <Typography fontSize={14} color="text.secondary">
            {params.row.createdTime}
          </Typography>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 180,
      maxWidth: 250,
      flex: 1,
      headerTooltip: true,
      renderCell: (params) => (
        <Typography sx={{ color: params.row.statusColor, fontWeight: 400 }}>
          {params.value}
        </Typography>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 180,
      maxWidth: 250,
      flex: 1,
      sortable: false,
      headerTooltip: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box width="100%" display="flex" justifyContent="center" gap={1}>
          <Tooltip title="View" placement="right">
            <IconButton size="small" onClick={() => handleOpenEdit(params.row)}>
              <img src={eyeIcon} alt="view" width={16} height={16} />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={canDelete ? "Delete" : "No permission"}
            placement="right"
          >
            <span>
              <IconButton
                size="small"
                disabled={!canDelete}
                onClick={(e) => {
                  if (!canDelete) return;
                  handleDeleteClick?.(params.row);
                }}
                sx={{
                  opacity: canDelete ? 1 : 0.5,
                  cursor: canDelete ? "pointer" : "not-allowed",
                }}
              >
                <img src={trashIcon} alt="delete" width={16} height={16} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const UserManagementRowData = response.map((item, index) => {
    const statusCode = Number(item.status_id) || Number(item.status);
    const rawStatus = USER_STATUS[statusCode] || "-";

    const created = formatDateTime(item.created_at);
    const statusLabel =
      rawStatus?.trim()?.toUpperCase() === "ACTIVE"
        ? "Active"
        : rawStatus?.trim()?.toUpperCase() === "DEACTIVATE"
          ? "Inactive"
          : rawStatus?.trim()?.toLowerCase() === "active"
            ? "Active"
            : rawStatus?.trim()?.toLowerCase() === "inactive"
              ? "Inactive"
              : "-";
    const statusColor =
      USER_STATUS_COL_CONFIG[statusLabel]?.colorKey || "text.primary";
    // const roleName =
    //   item.role || getRoleName(Number(item.role_id)) || item.role || "-";
    return {
      ...item,
      id: item.user_id ?? index,
      username: item.user_name || "-",
      userId: item.user_id || "-",
      email: item.email || "-",
      phone: item.phone || "-",
      role: item.role,
      licences: item.licences_number || "-",
      country: item.primary_address?.country || "-",
      createdBy: item.created_by || "-",
      status: statusLabel,
      statusColor: statusColor,
      statusId: statusCode,
      joiningdate: item.hire_date
        ? dayjs(item.hire_date).format("MMM DD, YYYY")
        : "-",
      createdDate: created.date || "-",
      createdTime: created.time || "-",
    };
  });

  return { UserManagementColumnData, UserManagementRowData };
};