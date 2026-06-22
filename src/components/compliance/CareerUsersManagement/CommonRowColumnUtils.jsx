import { useCallback, useEffect, useState } from "react";
import eyeIcon from "../../../assets/images/svg/eye.svg";
import GroupIcon from "../../../assets/images/svg/Group.png";
import trashLight from "../../../assets/images/svg/trash.png";
import trashDark from "../../../assets/images/svg/trashdark.png";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import PlatformUserAuditDialog from "./PlatformUserAuditDialog";
import dayjs from "dayjs";
import { USER_STATUS, USER_STATUS_COL_CONFIG } from "./Constants";
import { getFormattedDateTime } from "../../../common/CommonUtils";
import { useServices } from "../../../services/services";
import {
  EllipsisTextSx,
  getActionButtonSx,
  CreatedDateTypographySx,
  CreatedTimeTypographySx,
  getStatusCellSx,
  UserNameTypographySx,
  RoleCellSx,
  EmailTypographySx,
  actionContainerSx,
} from "./CommonRowColumnUtils.styled";

const CreatedAtCell = ({ row }) => (
  <Box>
    <Typography sx={CreatedDateTypographySx}>{row.createdDate}</Typography>
    <Typography sx={CreatedTimeTypographySx}>{row.createdTime}</Typography>
  </Box>
);

const StatusCell = ({ value, row }) => (
  <Typography sx={getStatusCellSx(row.statusColor)}>{value}</Typography>
);

const INITIAL_AUDIT_DATA = {
  rows: [],
  total: 0,
  page: 1,
  pageSize: 10,
  isLoading: false,
};

const transformAuditLogs = (logs = []) =>
  logs.map((entry) => {
    const { date, time } = getFormattedDateTime(entry.created_at);
    return {
      id: entry.id,
      createdBy: entry.created_by || "-",
      createdDate: date,
      createdTime: time,
      notes: entry.description || "-",
    };
  });

const ActionsCell = ({
  row,
  handleOpenEdit,
  handleDeleteClick,
  canDelete,
  canView,
  eyeIcon,
  trashIcon,
}) => {
  const { fetchApi } = useServices();
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [auditData, setAuditData] = useState(INITIAL_AUDIT_DATA);

  const handleViewClick = useCallback(() => {
    if (!canView) return;
    handleOpenEdit(row);
  }, [handleOpenEdit, row, canView]);

  const handleDeleteAction = useCallback(() => {
    if (!canDelete) return;
    handleDeleteClick?.(row);
  }, [canDelete, handleDeleteClick, row]);

  const fetchAuditLogs = useCallback(async () => {
    if (!row.id) return;
    setAuditData((prev) => ({ ...prev, isLoading: true }));
    try {
      const { page, pageSize } = auditData;
      const params = new URLSearchParams({
        platform_user_id: row.id,
        page,
        limit: pageSize,
      });
      const endUrl = `/masteradmin/superuser/audit-logs?${params.toString()}`;
      const response = await fetchApi(endUrl);
      if (response?.statusCode === 200 && response?.body?.audit_logs) {
        const auditLogs = response.body.audit_logs;
        const records = Array.isArray(auditLogs) ? auditLogs : [auditLogs];
        const pagination = response.body.pagination;
        setAuditData({
          rows: transformAuditLogs(records),
          total: pagination?.total_records || 0,
          page: pagination?.current_page || 1,
          pageSize: pagination?.limit || 10,
          isLoading: false,
        });
      } else {
        setAuditData({ ...INITIAL_AUDIT_DATA });
      }
    } catch (err) {
      console.error("Error fetching platform user audit logs:", err);
      setAuditData({ ...INITIAL_AUDIT_DATA });
    }
  }, [fetchApi, row.id, auditData.page, auditData.pageSize]);

  // Re-fetch whenever the dialog is open and page/pageSize changes
  useEffect(() => {
    if (groupDialogOpen && row.id) {
      fetchAuditLogs();
    }
  }, [auditData.page, auditData.pageSize, groupDialogOpen, row.id]);

  const handleOpenAuditLog = useCallback(() => {
    setAuditData(INITIAL_AUDIT_DATA);
    setGroupDialogOpen(true);
  }, []);

  const handleCloseAuditLog = useCallback(() => {
    setGroupDialogOpen(false);
    setAuditData(INITIAL_AUDIT_DATA);
  }, []);

  const viewTitle = canView ? "View" : "No permission";

  return (
    <>
      <Box sx={actionContainerSx}>
        <Tooltip title="Group" placement="right">
          <IconButton size="small" onClick={handleOpenAuditLog}>
            <img src={GroupIcon} alt="group" width={16} height={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title={viewTitle} placement="right">
          <span>
            <IconButton
              size="small"
              disabled={!canView}
              onClick={handleViewClick}
              sx={getActionButtonSx(canView)}
            >
              <img src={eyeIcon} alt="view" width={16} height={16} />
            </IconButton>
          </span>
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

      <PlatformUserAuditDialog
        open={groupDialogOpen}
        onClose={handleCloseAuditLog}
        auditData={auditData}
        setAuditData={setAuditData}
      />
    </>
  );
};

export const UserManagementTableData = (
  response = [],
  handleOpenEdit,
  handleDeleteClick,
  isDarkMode,
  permissions = {},
) => {
  const trashIcon = isDarkMode ? trashDark : trashLight;

  const { canDelete, canView } = permissions || {};

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
          <Typography sx={[UserNameTypographySx, EllipsisTextSx]}>
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
        <Typography sx={RoleCellSx}>{value || "-"}</Typography>
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
          <Typography sx={[EmailTypographySx, EllipsisTextSx]}>
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
    // {
    //   field: "createdBy",
    //   headerName: "Created By",
    //   minWidth: 180,
    //   maxWidth: 250,
    //   flex: 1,
    //   headerTooltip: true,
    // },
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
          canView={canView}
          eyeIcon={eyeIcon}
          trashIcon={trashIcon}
        />
      ),
    },
  ];

  const UserManagementRowData = response.map((item, index) => {
    const statusCode = Number(item.status_id) || Number(item.status);
    const rawStatus = USER_STATUS[statusCode] || "-";

    const created = getFormattedDateTime(item.created_at);
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
