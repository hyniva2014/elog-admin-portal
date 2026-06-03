import { useState, useCallback } from "react";
import dayjs from "dayjs";
import { useServices } from "../services/services";
import { REQUEST_DEVICE_ENDPOINTS } from "../components/compliance/RequestDevice/ApiEndpoints";
import { getFormattedDateTime } from "../common/CommonUtils";

const formatDate = (iso) => {
  return iso ? dayjs(iso).format("MMM DD, YYYY") : "-";
};

const STATUS_LABELS = {
  0: "Pending",
  1: "Approved",
  2: "REJECTED",
  3: "PARTIAL_APPROVED",
};

const getStatusLabel = (status) => STATUS_LABELS[status] || status || "-";

const transformRequestedDevicesData = (data = []) => {
  return data.map((item, index) => {
    const {
      id,
      company_id,
      carrier_id,
      company_name,
      carrier_name,
      requested_devices_count,
      description,
      requested_by_name,
      requested_on,
      created_at,
      created_on,
      approved_by,
      status,
    } = item;

    return {
      id: id || index,
      company_id: company_id || carrier_id || null,
      carrierName: company_name || carrier_name || "-",
      requestedDevices: requested_devices_count || "-",
      description: description || "-",
      requestedBy: requested_by_name || "-",
      // requestedOn: formatDate(requested_on || created_at || created_on),
      requestedDate: getFormattedDateTime(
        item.requested_on || item.created_at || item.created_on,
      ).date,
      requestedTime: getFormattedDateTime(
        item.requested_on || item.created_at || item.created_on,
      ).time,
      approvedBy: approved_by || "-",
      status: getStatusLabel(status),
    };
  });
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

        const endUrl = `${REQUEST_DEVICE_ENDPOINTS.GET_REQUESTED_DEVICES}?${queryParams}`;

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
