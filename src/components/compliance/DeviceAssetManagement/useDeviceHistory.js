import { useState, useCallback } from "react";
const transformHistoryData = (apiData) =>
  apiData.map((item, index) => ({
    id: item.id ?? index,
    created_by: item.created_by || item.user_name || "-",
    created_date: item.created_date || "-",
    created_time: item.created_time || "",
    notes: item.notes || "-",
  }));
  const resolveApiData = (response) => {
  const raw = response?.body?.data || response?.data || response?.body || [];
  return Array.isArray(raw) ? raw : [];

};

const useDeviceHistory = (fetchApi, setLoading) => {
   const [historyData, setHistoryData] = useState([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const fetchHistory = useCallback(
    async (row)=>{
      try {
        setLoading(true);
        const response = await fetchApi(
 `/masteradmin/get-device-history?device_id=${row.id}`, 
       );
        const apiData = resolveApiData(response);
        setHistoryData(transformHistoryData(apiData));
        // if (response?.statusCode === 200 && response?.body?.audit_logs) {
        //   const records = Array.isArray(response.body.audit_logs)
        //     ? response.body.audit_logs
        //     : [response.body.audit_logs];
        //   const pagination = response.body.pagination;
        //   setAuditLogData({
        //     rows: transformAuditLogs(records),
        //     total: pagination?.total_records || 0,
        //     page: pagination?.current_page || 1,
        //     pageSize: pagination?.limit || 20,
        //     isLoading: false,
        //   });
        // } else {
        //   setAuditLogData({ ...INITIAL_AUDIT_LOG_DATA });
        // }
        setIsHistoryModalOpen(true);
         setLoading(false);
      } catch (error) {
        console.error("Fetch Device History Error:", error);
        setLoading(false);
        setHistoryData([]);
        setIsHistoryModalOpen(true);
      }
    },
    [fetchApi, setLoading],
  );

  const closeHistoryModal = useCallback(() => {
    setIsHistoryModalOpen(false);
        setHistoryData([]);
  }, []);

    return { historyData, isHistoryModalOpen, fetchHistory, closeHistoryModal };
};

export default useDeviceHistory;
