import { useCallback } from "react";
import eyeIcon from "../../../assets/images/svg/eye.svg";
import pencilLight from "../../../assets/images/svg/pencil.png";
import pencilDark from "../../../assets/images/svg/pencildark.png";
import trashLight from "../../../assets/images/svg/trash.png";
import trashDark from "../../../assets/images/svg/trashdark.png";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { USER_STATUS, USER_STATUS_COL_CONFIG } from "./Constants";
import { formatDateTime } from "../../../common/CommonUtils";
import { EllipsisTextSx, getActionButtonSx } from "./CommonRowColumnUtils.styled";

const CreatedAtCell = ({ row }) => (
  <Box>
    <Typography fontSize={14}>{row.createdDate}</Typography>
    <Typography fontSize={14} color="text.secondary">
      {row.createdTime}
    </Typography>
  </Box>
);

const StatusCell = ({ value, row }) => (
  <Typography sx={{ color: row.statusColor, fontWeight: 400 }}>
    {value}
  </Typography>
);

const ActionsCell = ({ row, handleOpenEdit, handleDeleteClick, canDelete, eyeIcon, trashIcon }) => {
  const handleViewClick = useCallback(() => {
    handleOpenEdit(row);
  }, [handleOpenEdit, row]);

  const handleDeleteAction = useCallback(() => {
    if (!canDelete) return;
    handleDeleteClick?.(row);
  }, [canDelete, handleDeleteClick, row]);

  return (
    <Box width="100%" display="flex" justifyContent="center" gap={1}>
      <Tooltip title="View" placement="right">
        <IconButton size="small" onClick={handleViewClick}>
          <img src={eyeIcon} alt="view" width={16} height={16} />
        </IconButton>
      </Tooltip>

      <Tooltip title={canDelete ? "Delete" : "No permission"} placement="right">
        <span>
          <IconButton
            size="small"
            disabled={!canDelete}
            onClick={handleDeleteAction}
            sx={getActionButtonSx(canDelete)}
          >
            <img src={trashIcon} alt="delete" width={16} height={16} />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

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
      renderCell: ({ value }) => (
        <Tooltip title={value || ""} placement="right">
          <Typography
            fontSize={13}
            sx={EllipsisTextSx}
          >
            {value || "-"}
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
      renderCell: ({ value }) => (
        <Typography fontSize={13} sx={{ textTransform: "capitalize" }}>
          {value || "-"}
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
      renderCell: ({ value }) => (
        <Tooltip title={value || ""} placement="right">
          <Typography
            fontSize={13}
            color="text.secondary"
            sx={EllipsisTextSx}
          >
            {value || "-"}
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
      renderCell: ({ row }) => <CreatedAtCell row={row} />,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 180,
      maxWidth: 250,
      flex: 1,
      headerTooltip: true,
      renderCell: ({ value, row }) => <StatusCell value={value} row={row} />,
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
      renderCell: ({ row }) => (
        <ActionsCell
          row={row}
          handleOpenEdit={handleOpenEdit}
          handleDeleteClick={handleDeleteClick}
          canDelete={canDelete}
          eyeIcon={eyeIcon}
          trashIcon={trashIcon}
        />
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