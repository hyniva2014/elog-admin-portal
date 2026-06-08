import { useState, useCallback, useRef } from "react";
import { useServices } from "../services/services";
import { REQUEST_DEVICE_ENDPOINTS } from "../components/compliance/RequestDevice/ApiEndpoints";

/**
 * Custom hook to manage request device operations
 * Handles dialog state, API calls, and form submissions
 */
export const useRequestDeviceManager = (
  userDetails,
  setLoading,
  fetchRequestedDevices,
) => {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isStockAvailable, setIsStockAvailable] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const submitRef = useRef(null);
  const assignSubmitRef = useRef(null);
  const { createApi, fetchApi } = useServices();

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const handleOpenRequestDialog = useCallback(() => {
    setIsRequestDialogOpen(true);
  }, []);

  const handleCloseRequestDialog = useCallback(() => {
    setIsRequestDialogOpen(false);
  }, []);

  const handleOpenAssignDialog = useCallback(
    async (row) => {
      try {
        setLoading(true);
        const response = await fetchApi(
          `${REQUEST_DEVICE_ENDPOINTS.GET_REQUESTED_DEVICES}?id=${row.id}`,
        );

        // Guard clause: early return on failure
        if (response?.statusCode !== 200) {
          showSnackbar("Failed to fetch request details", "error");
          return;
        }

        const fullData = response?.body?.data || {};
        setSelectedRequest({
          ...row,
          ...fullData,
          status: row.status,
          requestedDevices:
            fullData.requested_devices_count || row.requestedDevices,
          company_id: fullData.company_id || row.company_id,
        });
        setIsAssignDialogOpen(true);
      } catch (error) {
        console.error("Error fetching request details:", error);
        showSnackbar("Failed to fetch request details", "error");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, fetchApi, showSnackbar],
  );

  const handleCloseAssignDialog = useCallback(() => {
    setSelectedRequest(null);
    setIsAssignDialogOpen(false);
    setIsStockAvailable(true);
  }, []);

  const submitRequestDevice = useCallback(
    async (values) => {
      const { companyId, numberOfDevices, description } = values;
      const { user_id } = userDetails || {};

      try {
        setLoading(true);
        const payload = {
          company_id: Number(companyId),
          requested_devices_count: Number(numberOfDevices),
          description: description?.trim(),
          requested_by: user_id,
        };

        const response = await createApi(
          payload,
          REQUEST_DEVICE_ENDPOINTS.CREATE_REQUEST,
        );

        // Guard clause: early return on failure
        if (response?.statusCode !== 200) {
          showSnackbar(
            response?.body?.message ||
              response?.body?.data?.message ||
              "Failed to submit request",
            "error",
          );
          return;
        }

        showSnackbar(
          response?.body?.data?.message ||
            "Device request submitted successfully",
          "success",
        );
        setIsRequestDialogOpen(false);
        fetchRequestedDevices();
      } catch (error) {
        console.error("Request Device submit error:", error);
        showSnackbar("Failed to submit request", "error");
      } finally {
        setLoading(false);
      }
    },
    [userDetails, setLoading, createApi, showSnackbar, fetchRequestedDevices],
  );

  const submitAssignAsset = useCallback(
    async (values) => {
      const { deviceIds = [] } = values;
      const companyId = selectedRequest?.company_id || userDetails?.company_id;

      try {
        setLoading(true);
        const payload = {
          company_id: companyId,
          device_ids: deviceIds,
        };
        const response = await createApi(
          payload,
          REQUEST_DEVICE_ENDPOINTS.ASSIGN_DEVICES,
        );

        // Guard clause: early return on failure
        if (response?.statusCode !== 200) {
          showSnackbar(
            response?.body?.message ||
              response?.body?.data?.message ||
              "Failed to assign devices",
            "error",
          );
          return;
        }

        showSnackbar(
          response?.body?.data?.message || "Devices assigned successfully",
          "success",
        );
        setIsAssignDialogOpen(false);
        fetchRequestedDevices();
      } catch (error) {
        console.error("Assign asset submit error:", error);
        showSnackbar("Failed to assign asset", "error");
      } finally {
        setLoading(false);
      }
    },
    [
      selectedRequest,
      userDetails,
      setLoading,
      createApi,
      showSnackbar,
      fetchRequestedDevices,
    ],
  );

  const handleDialogSubmit = useCallback(() => {
    submitRef.current?.();
  }, []);

  const handleAssignDialogSubmit = useCallback(() => {
    assignSubmitRef.current?.();
  }, []);

  const checkDeviceStock = useCallback(
    async (requestedDevicesCount) => {
      try {
        setLoading(true);

        const response = await fetchApi(
          `${REQUEST_DEVICE_ENDPOINTS.CHECK_DEVICE_STOCK}?requested_devices_count=${requestedDevicesCount}`,
        );

        return response;
      } catch (error) {
        console.error("Check stock error:", error);
        showSnackbar("Failed to check device stock", "error");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchApi, setLoading, showSnackbar],
  );

  const approveDeviceAllocation = useCallback(
    async (payload) => {
      try {
        setLoading(true);

        const response = await createApi(
          payload,
          REQUEST_DEVICE_ENDPOINTS.ASSIGN_DEVICES,
        );

        if (response?.statusCode !== 200) {
          showSnackbar(
            response?.body?.message || "Failed to allocate devices",
            "error",
          );
          return null;
        }

        showSnackbar("Devices allocated successfully");

        return response;
      } catch (error) {
        console.error("Allocate devices error:", error);
        showSnackbar("Failed to allocate devices", "error");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [createApi, setLoading, showSnackbar],
  );

  const getCompanyOptions = useCallback(async () => {
    try {
      const response = await fetchApi(
        REQUEST_DEVICE_ENDPOINTS.GET_COMPANY_DROPDOWN,
      );

      const companies = response?.body?.data || [];

      return companies.map((company) => ({
        label: company.company_name,
        value: String(company.company_id),
      }));
    } catch (error) {
      console.error("COMPANY DROPDOWN ERROR =>", error);

      showSnackbar("Failed to fetch companies", "error");
      return [];
    }
  }, [fetchApi, showSnackbar]);
  return {
    // Dialog state
    isRequestDialogOpen,
    isAssignDialogOpen,
    selectedRequest,
    isStockAvailable,
    setIsStockAvailable,

    // Refs
    submitRef,
    assignSubmitRef,

    // Dialog handlers
    handleOpenRequestDialog,
    handleCloseRequestDialog,
    handleOpenAssignDialog,
    handleCloseAssignDialog,

    // Form submission handlers
    submitRequestDevice,
    submitAssignAsset,
    handleDialogSubmit,
    handleAssignDialogSubmit,

    // Snackbar
    snackbar,
    handleSnackbarClose,

    checkDeviceStock,
    approveDeviceAllocation,
    getCompanyOptions,
  };
};
