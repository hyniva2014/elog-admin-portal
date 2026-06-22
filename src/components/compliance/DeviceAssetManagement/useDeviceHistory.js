import { useState, useCallback } from "react";
import { formatDateTime } from "../../../common/CommonUtils";

const INITIAL_AUDIT_LOG_DATA = {
  rows: [],
  total: 0,
  page: 1,
  pageSize: 20,
  isLoading: false,
};

const transformAuditLogs = (records) =>
  records.map((record) => {
    const { date, time } = formatDateTime(record.created_at);
    return {
      id: record.id,
      createdBy: record.created_by || "-",
      createdDate: date,
      createdTime: time,
      notes: record.description || "-",
    };
  });

const useDeviceHistory = (fetchApi, setLoading) => {
  const [auditLogData, setAuditLogData] = useState(INITIAL_AUDIT_LOG_DATA);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const fetchHistory = useCallback(
    async (row, page, pageSize) => {
      const currentPage = page ?? auditLogData.page;
      const currentPageSize = pageSize ?? auditLogData.pageSize;
      try {
        setLoading(true);
        const response = await fetchApi(
          `/masteradmin/eld-device/audit-logs?page=${currentPage}&limit=${currentPageSize}`,
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
          setAuditLogData({ ...INITIAL_AUDIT_LOG_DATA });
        }
        setIsHistoryModalOpen(true);
      } catch (error) {
        console.error("Fetch Device Audit Log Error:", error);
        setAuditLogData({ ...INITIAL_AUDIT_LOG_DATA });
        setIsHistoryModalOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [fetchApi, setLoading, auditLogData.page, auditLogData.pageSize],
  );

  const openHistory = useCallback(
    async (row) => {
      setSelectedDeviceId(row.id);
      await fetchHistory(row, 1, auditLogData.pageSize);
    },
    [fetchHistory, auditLogData.pageSize],
  );

  const closeHistoryModal = useCallback(() => {
    setIsHistoryModalOpen(false);
    setAuditLogData({ ...INITIAL_AUDIT_LOG_DATA });
    setSelectedDeviceId(null);
  }, []);

  return {
    auditLogData,
    setAuditLogData,
    isHistoryModalOpen,
    selectedDeviceId,
    fetchHistory,
    openHistory,
    closeHistoryModal,
  };
};

export default useDeviceHistory;
