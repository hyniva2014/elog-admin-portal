import { useState, useCallback, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { useServices } from "../services/services";

const formatDate = (iso) => {
  return iso ? dayjs(iso).format("MMM DD, YYYY") : "-";
};

const transformRequestedDevicesData = (data = []) => {
  return data.map((item, index) => ({
    id: item.id || index,
    carrierName: item.company_name || item.carrier_name || "-",
    requestedDevices: item.requested_devices_count || "-",
    description: item.description || "-",
    requestedBy: item.requested_by_name || "-",
    requestedOn: formatDate(
      item.requested_on || item.created_at || item.created_on,
    ),
    approvedBy: item.approved_by || "-",
    status:
      item.status === 1 || item.status === "Pending"
        ? "Pending"
        : item.status === 2 || item.status === "Approved"
          ? "Approved"
          : item.status || "-",
  }));
};

export const useRequestDevices = () => {
  const { fetchApi } = useServices();
  const [allRows, setAllRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFunctionRef = useRef(null);

  const createFetchFunction = useCallback(() => {
    return async ({
      page = 1,
      pageSize = 25,
      search = "",
      status = "",
      fromDate = null,
      toDate = null,
    } = {}) => {
      try {
        setIsLoading(true);

        let endUrl = `/masteradmin/requested-devices?page=${page}&limit=${pageSize}`;
        if (search) endUrl += `&search=${search}`;
        if (status) endUrl += `&status=${status}`;
        if (fromDate)
          endUrl += `&fromDate=${dayjs(fromDate).format("YYYY-MM-DD")}`;
        if (toDate) endUrl += `&toDate=${dayjs(toDate).format("YYYY-MM-DD")}`;

        const response = await fetchApi(endUrl);

        if (response?.body?.data) {
          const data = response.body.data;
          const items = Array.isArray(data) ? data : data.items || [];
          const totalRecords = data.totalRecords || data.total || items.length;

          const transformedItems = transformRequestedDevicesData(items);
          setAllRows(transformedItems);
          setTotal(totalRecords);
        } else if (response?.data) {
          const { items = [], totalRecords = 0 } = response.data;

          const transformedItems = transformRequestedDevicesData(items);
          setAllRows(transformedItems);
          setTotal(totalRecords);
        } else {
          setAllRows([]);
          setTotal(0);
        }
      } catch (error) {
        console.error("Error fetching requested devices:", error);
        setAllRows([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };
  }, [fetchApi]);

  useEffect(() => {
    fetchFunctionRef.current = createFetchFunction();
  }, [createFetchFunction]);

  const fetchRequestedDevices = useCallback((params) => {
    if (fetchFunctionRef.current) {
      return fetchFunctionRef.current(params);
    }
  }, []);

  return {
    allRows,
    total,
    isLoading,
    fetchRequestedDevices,
  };
};
