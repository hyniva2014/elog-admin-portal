import { useState, useCallback, useRef } from "react";
import { useServices } from "../services/services";

/**
 * Custom hook to manage request device operations
 * Handles dialog state, API calls, and form submissions
 */
export const useRequestDeviceManager = (userDetails, setLoading, fetchRequestedDevices) => {
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
        const response = await fetchApi(`/masteradmin/requested-devices?id=${row.id}`);
        if (response?.statusCode === 200) {
          const fullData = response?.body?.data || {};
          setSelectedRequest({
            ...row,
            ...fullData,
            status: row.status,
            requestedDevices: fullData.requested_devices_count || row.requestedDevices,
            company_id: fullData.company_id || row.company_id,
          });
          setIsAssignDialogOpen(true);
        } else {
          showSnackbar("Failed to fetch request details", "error");
        }
      } catch (error) {
        console.error("Error fetching request details:", error);
        showSnackbar("Failed to fetch request details", "error");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, fetchApi, showSnackbar]
  );

  const handleCloseAssignDialog = useCallback(() => {
    setSelectedRequest(null);
    setIsAssignDialogOpen(false);
    setIsStockAvailable(true);
  }, []);

  const submitRequestDevice = useCallback(
    async (values) => {
      try {
        setLoading(true);
        const endUrl = "/admin/requested-device/create";
        const payload = {
          company_id: userDetails?.company_id,
          requested_devices_count: Number(values.numberOfDevices),
          description: values.description?.trim(),
          requested_by: userDetails?.user_id,
        };

        const response = await createApi(payload, endUrl);
        if (response?.statusCode === 200) {
          showSnackbar(
            response?.body?.data?.message || "Device request submitted successfully",
            "success"
          );
          setIsRequestDialogOpen(false);
          fetchRequestedDevices();
          return;
        }

        showSnackbar(
          response?.body?.message ||
            response?.body?.data?.message ||
            "Failed to submit request",
          "error"
        );
      } catch (error) {
        console.error("Request Device submit error:", error);
        showSnackbar("Failed to submit request", "error");
      } finally {
        setLoading(false);
      }
    },
    [userDetails, setLoading, createApi, showSnackbar, fetchRequestedDevices]
  );

  const submitAssignAsset = useCallback(
    async (values) => {
      try {
        setLoading(true);
        const companyId = selectedRequest?.company_id || userDetails?.company_id;
        const payload = {
          company_id: companyId,
          device_ids: values.deviceIds || [],
        };
        const response = await createApi(payload, "/masteradmin/assign-devices");
        if (response?.statusCode === 200) {
          showSnackbar(
            response?.body?.data?.message || "Devices assigned successfully",
            "success"
          );
          setIsAssignDialogOpen(false);
          fetchRequestedDevices();
          return;
        }
        showSnackbar(
          response?.body?.message ||
            response?.body?.data?.message ||
            "Failed to assign devices",
          "error"
        );
      } catch (error) {
        console.error("Assign asset submit error:", error);
        showSnackbar("Failed to assign asset", "error");
      } finally {
        setLoading(false);
      }
    },
    [selectedRequest, userDetails, setLoading, createApi, showSnackbar, fetchRequestedDevices]
  );

  const handleDialogSubmit = useCallback(() => {
    submitRef.current?.();
  }, []);

  const handleAssignDialogSubmit = useCallback(() => {
    assignSubmitRef.current?.();
  }, []);

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
  };
};
