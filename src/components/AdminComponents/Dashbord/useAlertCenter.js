import { useCallback } from "react";
import { AlertCenterRowData } from "./AlertCenterUtils";

export const useAlertCenter = (setAlertData, fetchApi) => {
  const buildFetchUrl = useCallback((limit = 20) => {
    return `/masteradmin/alert-center-notifications?page=1&limit=${limit}`;
  }, []);

  const fetchData = useCallback(
    async (limit = 20) => {
      setAlertData((prev) => ({
        ...prev,
        isLoading: true,
      }));

      try {
        const endUrl = buildFetchUrl(limit);

        const response = await fetchApi(endUrl);

        const records = Array.isArray(response?.body?.data)
          ? response.body.data
          : [];

        const rowData = AlertCenterRowData(records);

        setAlertData((prev) => ({
          ...prev,
          alerts: rowData,
          isLoading: false,
        }));
      } catch (error) {
        console.error("Error fetching alert center notifications:", error);

        setAlertData((prev) => ({
          ...prev,
          alerts: [],
          isLoading: false,
        }));
      }
    },
    [buildFetchUrl, fetchApi, setAlertData],
  );

  return {
    fetchData,
  };
};
