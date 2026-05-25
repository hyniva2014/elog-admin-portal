import { useCallback, useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useServices } from "@src/services/services";
import { useAuthContext } from "@src/states/useAuthContext";
import { transformDeviceModelData, generateDeviceCode } from "@src/helpers/deviceModelHelpers";

const EMPTY_FORM_VALUES = {
  deviceModelId: "",
  deviceCode: "",
  modelName: "",
  description: "",
  assetType: "",
  supportsElogs: "",
  status: 1,
};

const useDeviceModelManagement = () => {
  const { fetchApi, createApi } = useServices();
  const { user } = useAuthContext();

  const [allRows, setAllRows] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    search: "",
    model: "",
    sortModel: [],
    fromDate: null,
    toDate: null,
    assetType: "",
    supportsElogs: "",
    status: "",
  });
  const dataRef = useRef(data);
  dataRef.current = data;

  const fetchDeviceModelsRef = useRef(null);
  const fetchModelDropdownRef = useRef(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formDefaultValues, setFormDefaultValues] = useState(EMPTY_FORM_VALUES);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const fetchModelDropdown = useCallback(async () => {
    try {
      const response = await fetchApi("/masteradmin/get-device-model");
      let dropdownData = [];
      if (response?.body?.data && Array.isArray(response.body.data)) {
        dropdownData = response.body.data;
      } else if (response?.body?.data?.data && Array.isArray(response.body.data.data)) {
        dropdownData = response.body.data.data;
      }
      const formattedOptions = dropdownData.map((item) => ({
        value: item.device_model_id,
        label: item.model_name,
      }));
      setModelOptions(formattedOptions);
    } catch (error) {
      console.error("Device Model Dropdown Error:", error);
    }
  }, [fetchApi]);

  fetchModelDropdownRef.current = fetchModelDropdown;

  const fetchDeviceModels = useCallback(async () => {
    const current = dataRef.current;
    try {
      setIsLoading(true);
      let endUrl = `/masteradmin/get-device-model?page=${current.page}&limit=${current.pageSize}`;
      if (current.search) endUrl += `&search=${current.search}`;
      if (current.model) endUrl += `&device_model_id=${current.model}`;
      if (current.assetType) endUrl += `&asset_type=${current.assetType}`;
      if (current.supportsElogs !== null && current.supportsElogs !== undefined && current.supportsElogs !== "") {
        endUrl += `&supports_elogs=${String(current.supportsElogs)}`;
      }
      if (current.status !== null && current.status !== undefined && current.status !== "") {
        endUrl += `&status=${String(current.status)}`;
      }
      if (current.fromDate) {
        endUrl += `&created_at=${dayjs(current.fromDate).format("YYYY-MM-DD")}`;
      }

      const response = await fetchApi(endUrl);

      let apiData = [];
      if (response?.body?.data?.data && Array.isArray(response.body.data.data)) {
        apiData = response.body.data.data;
      } else if (response?.body?.data && Array.isArray(response.body.data)) {
        apiData = response.body.data;
      } else if (response?.body?.data && typeof response.body.data === "object" && response.body.data !== null) {
        apiData = [response.body.data];
      } else if (response?.body?.device_model_id) {
        apiData = [response.body];
      }

      setAllRows(transformDeviceModelData(apiData));
      setData((prev) => ({
        ...prev,
        total: response?.body?.data?.pagination?.total_records || 0,
      }));
    } catch (error) {
      console.error("Fetch Device Models Error:", error);
      handleSnackbar("Failed to fetch device models", "error");
    } finally {
      setIsLoading(false);
    }
  }, [fetchApi, handleSnackbar]);

  fetchDeviceModelsRef.current = fetchDeviceModels;

  const handleAddSubmit = useCallback(
    async (formValues) => {
      try {
        setIsLoading(true);
        const deviceCode = formValues.deviceCode || generateDeviceCode(formValues.modelName);
        const payload = {
          device_code: deviceCode,
          model_name: formValues.modelName,
          description: formValues.description,
          asset_type: formValues.assetType,
          supports_elogs: formValues.supportsElogs,
          status: formValues.status ?? 1,
          created_by: user?.id,
          updated_by: user?.id,
        };
        if (formValues.deviceModelId) {
          payload.device_model_id = formValues.deviceModelId;
        }
        const response = await createApi(payload, "/masteradmin/device-model");
        if (response?.statusCode >= 200 && response?.statusCode < 300) {
          handleSnackbar(
            formValues.deviceModelId ? "Asset updated successfully" : "Asset created successfully",
            "success",
          );
          setIsAddModalOpen(false);
          fetchDeviceModels();
        } else {
          handleSnackbar(response?.body?.message || "Something went wrong", "warning");
        }
      } catch (error) {
        console.error("Create/Update Device Model Error:", error);
        handleSnackbar("Unexpected error occurred", "error");
      } finally {
        setIsLoading(false);
      }
    },
    [createApi, fetchDeviceModels, handleSnackbar, user?.id],
  );

  const handleClick = useCallback(() => {
    setIsEditMode(false);
    setFormDefaultValues(EMPTY_FORM_VALUES);
    setIsAddModalOpen(true);
  }, []);

  const handleViewClick = useCallback((row) => {
    setIsEditMode(true);
    setIsEditing(false);
    setFormDefaultValues({
      deviceModelId: row.deviceModelId || "",
      deviceCode: row.deviceCode || "",
      modelName: row.model || "",
      description: row.description === "-" ? "" : row.description || "",
      assetType: row.assetTypeValue != null ? Number(row.assetTypeValue) : "",
      supportsElogs: row.supportsElogs != null ? Number(row.supportsElogs) : "",
      status: row.status != null ? Number(row.status) : 1,
    });
    setIsAddModalOpen(true);
  }, []);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleAddCancel = useCallback(() => {
    setIsAddModalOpen(false);
    setFormDefaultValues(EMPTY_FORM_VALUES);
    setIsEditMode(false);
    setIsEditing(false);
  }, []);

  useEffect(() => {
    fetchDeviceModelsRef.current();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.page, data.pageSize, data.search, data.model, data.assetType, data.supportsElogs, data.status, data.fromDate]);

  useEffect(() => {
    fetchModelDropdownRef.current();
  }, []);

  return {
    allRows,
    modelOptions,
    isLoading,
    data,
    setData,
    snackbar,
    isAddModalOpen,
    formDefaultValues,
    isEditMode,
    isEditing,
    handleSnackbarClose,
    handleClick,
    handleViewClick,
    handleEditClick,
    handleCancelEdit,
    handleAddSubmit,
    handleAddCancel,
  };
};

export default useDeviceModelManagement;
