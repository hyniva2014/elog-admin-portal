import { useCallback } from "react";
import { AlertCenterRowData } from "./AlertCenterUtils";

export const useAlertCenter = (setAlertData, fetchApi) => {
  const buildFetchUrl = useCallback(() => {
    return "/masteradmin/alert-center-notifications";
  }, []);

  const fetchData = useCallback(async () => {
    setAlertData((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      const endUrl = buildFetchUrl();

      const response = await fetchApi(endUrl);

      const records = Array.isArray(response?.body) ? response.body : [];

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
  }, [buildFetchUrl, fetchApi, setAlertData]);

  return {
    fetchData,
  };
};
