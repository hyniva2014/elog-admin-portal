import { useState, useCallback, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { useServices } from "../services/services";

const formatDate = (iso) => {
  return iso ? dayjs(iso).format("MMM DD, YYYY") : "-";
};

const STATUS_LABELS = {
  0: "Pending",
  1: "Approved",
  3: "REJECTED",
  4: "PARTIAL_APPROVED",
};

const getStatusLabel = (status) => STATUS_LABELS[status] || status || "-";

const transformRequestedDevicesData = (data = []) => {
  return data.map((item, index) => ({
    id: item.id || index,
    company_id: item.company_id || item.carrier_id || null,
    carrierName: item.company_name || item.carrier_name || "-",
    requestedDevices: item.requested_devices_count || "-",
    description: item.description || "-",
    requestedBy: item.requested_by_name || "-",
    requestedOn: formatDate(
      item.requested_on || item.created_at || item.created_on,
    ),
    approvedBy: item.approved_by || "-",
    status: getStatusLabel(item.status),
  }));
};

export const useRequestDevices = () => {
  const { fetchApi } = useServices();
  const [allRows, setAllRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRequestedDevices = useCallback(
    async ({
      page = 1,
      pageSize = 25,
      search = "",
      status = "",
      fromDate = null,
      toDate = null,
    } = {}) => {
      try {
        setIsLoading(true);

        const queryParams = [
          `page=${page}`,
          `limit=${pageSize}`,
          search && `search=${encodeURIComponent(search)}`,
          status && `status=${status}`,
          fromDate && `from_date=${dayjs(fromDate).format("YYYY-MM-DD")}`,
          toDate && `to_date=${dayjs(toDate).format("YYYY-MM-DD")}`,
        ]
          .filter(Boolean)
          .join("&");

        const endUrl = `/masteradmin/requested-devices?${queryParams}`;

        const response = await fetchApi(endUrl);
        const apiData = response?.body?.data || [];
        setAllRows(transformRequestedDevicesData(apiData));

        setTotal(
          response?.body?.pagination?.total_records || apiData.length || 0,
        );
      } catch (error) {
        console.error("Error fetching requested devices:", error);
        setAllRows([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchApi],
  );

  return {
    allRows,
    total,
    isLoading,
    fetchRequestedDevices,
  };
};
