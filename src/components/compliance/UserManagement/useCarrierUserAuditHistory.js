import { useState, useCallback } from "react";
import dayjs from "dayjs";
import { getUserAuditLogs } from "./userManagementService";

const transformAuditLogs = (apiData) =>
  apiData.map((item) => {
    const createdDateTime = item.created_at ? dayjs(item.created_at) : null;
    return {
      id: item.id,
      createdBy: item.created_by || "-",
      createdDate: createdDateTime ? createdDateTime.format("DD MMM YYYY") : "-",
      createdTime: createdDateTime ? createdDateTime.format("hh:mm A") : "-",
      notes: item.description || "-",
    };
  });

const INITIAL_AUDIT_LOG_DATA = {
  rows: [],
  total: 0,
  page: 1,
  pageSize: 20,
  isLoading: false,
};

const useCarrierUserAuditHistory = (fetchApi, setLoading) => {
  const [auditLogData, setAuditLogData] = useState(INITIAL_AUDIT_LOG_DATA);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const fetchHistory = useCallback(
    async (userId, page = 1, pageSize = 20) => {
      try {
        setLoading(true);
        setAuditLogData((prev) => ({ ...prev, isLoading: true }));

        const params = {
          page,
          limit: pageSize,
          user_id: userId,
        };

        const response = await getUserAuditLogs(fetchApi, params);

        if (response?.statusCode === 200 && response?.body?.audit_logs) {
          const records = Array.isArray(response.body.audit_logs)
            ? response.body.audit_logs
            : [response.body.audit_logs];
          const pagination = response.body.pagination;

          setAuditLogData({
            rows: transformAuditLogs(records),
            total: pagination?.total_records || 0,
            page: pagination?.current_page || 1,
            pageSize: pagination?.limit || 20,
            isLoading: false,
          });
        } else {
          setAuditLogData(INITIAL_AUDIT_LOG_DATA);
        }

        setCurrentUserId(userId);
        setIsHistoryModalOpen(true);
        setLoading(false);
      } catch (error) {
        console.error("Fetch Carrier User Audit History Error:", error);
        setLoading(false);
        setAuditLogData(INITIAL_AUDIT_LOG_DATA);
        setCurrentUserId(userId);
        setIsHistoryModalOpen(true);
      }
    },
    [fetchApi, setLoading],
  );

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setCurrentUserId(null);
    setAuditLogData(INITIAL_AUDIT_LOG_DATA);
  };

  const handlePageChange = (newPage) => {
    fetchHistory(currentUserId, newPage, auditLogData.pageSize);
  };

  return {
    auditLogData,
    isHistoryModalOpen,
    fetchHistory,
    closeHistoryModal,
    handlePageChange,
  };
};

export default useCarrierUserAuditHistory;
