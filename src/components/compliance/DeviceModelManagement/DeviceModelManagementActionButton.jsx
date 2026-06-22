import React, { useCallback, useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { StyledActionIcon, actionContainer } from "./DeviceModelManagement.styled";
import GroupIcon from "../../../assets/images/svg/Group.png";
import DeviceModelAuditDialog from "./DeviceModelAuditDialog";
import { useServices } from "../../../services/services";
import { getFormattedDateTime } from "../../../common/CommonUtils";

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

const DeviceModelManagementActionButton = React.memo(
  ({ row, onView, canView = true }) => {
    const { fetchApi } = useServices();
    const [auditDialogOpen, setAuditDialogOpen] = useState(false);
    const [auditData, setAuditData] = useState(INITIAL_AUDIT_DATA);

    const handleViewClick = useCallback(() => {
      if (canView) {
        onView(row);
      }
    }, [onView, row, canView]);

    const fetchAuditLogs = useCallback(async () => {
      if (!row.id) return;
      setAuditData((prev) => ({ ...prev, isLoading: true }));
      try {
        const { page, pageSize } = auditData;
        const endUrl = `/masteradmin/device-model/audit-logs?device_model_id=${row.id}&page=${page}&limit=${pageSize}`;
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
        console.error("Error fetching device model audit logs:", err);
        setAuditData({ ...INITIAL_AUDIT_DATA });
      }
    }, [fetchApi, row.id, auditData.page, auditData.pageSize]);

    // Re-fetch whenever dialog is open and page/pageSize changes
    useEffect(() => {
      if (auditDialogOpen && row.id) {
        fetchAuditLogs();
      }
    }, [auditData.page, auditData.pageSize, auditDialogOpen, row.id]);

    const handleOpenAuditLog = useCallback(() => {
      setAuditData(INITIAL_AUDIT_DATA);
      setAuditDialogOpen(true);
    }, []);

    const handleCloseAuditLog = useCallback(() => {
      setAuditDialogOpen(false);
      setAuditData(INITIAL_AUDIT_DATA);
    }, []);

    const viewTitle = canView ? "View" : "No permission to view";

    return (
      <>
        <Box sx={actionContainer}>
          <Tooltip title="Audit History" placement="top">
            <IconButton size="small" onClick={handleOpenAuditLog}>
              <img src={GroupIcon} alt="audit history" width={16} height={16} />
            </IconButton>
          </Tooltip>

          <Tooltip title={viewTitle} placement="top">
            <span>
              <IconButton
                size="small"
                onClick={handleViewClick}
                disabled={!canView}
              >
                <StyledActionIcon canView={canView} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        <DeviceModelAuditDialog
          open={auditDialogOpen}
          onClose={handleCloseAuditLog}
          auditData={auditData}
          setAuditData={setAuditData}
        />
      </>
    );
  },
);

DeviceModelManagementActionButton.displayName =
  "DeviceModelManagementActionButton";

export default DeviceModelManagementActionButton;
