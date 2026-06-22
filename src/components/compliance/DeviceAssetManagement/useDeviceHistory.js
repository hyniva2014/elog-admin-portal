import { useState, useCallback } from "react";

const transformAuditLogs = (apiData) =>
  apiData.map((item) => ({
    id: item.id,
    created_by: item.created_by || "-",
    created_date: item.created_at ? new Date(item.created_at).toLocaleDateString() : "-",
    created_time: item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
    notes: item.description || "-",
  }));

const INITIAL_AUDIT_LOG_DATA = {
  rows: [],
  total: 0,
  page: 1,
  pageSize: 20,
  isLoading: false,
};

const useDeviceHistory = (fetchApi, setLoading) => {
  const [auditLogData, setAuditLogData] = useState(INITIAL_AUDIT_LOG_DATA);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const fetchHistory = useCallback(
    async (row, page = 1, pageSize = 20) => {
      try {
        setLoading(true);
        setAuditLogData(prev => ({ ...prev, isLoading: true }));
        
        const response = await fetchApi(
          `/masteradmin/eld-device/audit-logs?page=${page}&limit=${pageSize}`
        );
        
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
        
        setCurrentRow(row);
        setIsHistoryModalOpen(true);
        setLoading(false);
      } catch (error) {
        console.error("Fetch Device History Error:", error);
        setLoading(false);
        setAuditLogData(INITIAL_AUDIT_LOG_DATA);
        setCurrentRow(row);
        setIsHistoryModalOpen(true);
      }
    },
    [fetchApi, setLoading],
  );

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setCurrentRow(null);
    setAuditLogData(INITIAL_AUDIT_LOG_DATA);
  };

  const handlePageChange = (newPage) => {
    fetchHistory(currentRow, newPage, auditLogData.pageSize);
  };

  return { auditLogData, isHistoryModalOpen, fetchHistory, closeHistoryModal, handlePageChange };
};

export default useDeviceHistory;
