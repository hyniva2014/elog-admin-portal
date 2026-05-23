import React, { useCallback, useMemo, useState, useEffect } from "react";
import dayjs from "dayjs";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonSnackbar from "../../../common/CommonSnackbar";
import DeviceModelManagementHeader from "./DeviceModelManagementHeader";
import DeviceModelManagementForm from "./DeviceModelManagementForm";
import {
  EditButton,
  CancelEditButton,
} from "./DeviceModelManagement.styles";
import {
  GridContainer,
} from "../AccountManagement/AccountManagement.styled";
import { useServices } from "../../../services/services";
import { DEVICE_MODEL_STATUS_FILTER_OPTIONS, ASSET_TYPE_FILTER_OPTIONS } from "./Constants";
import {
  getColumns,
  getRowHeight,
  transformDeviceModelData,
} from "./DeviceModelManagementTable.utils";

const DeviceModelManagement = () => {
  const { fetchApi, createApi, updateApi } = useServices();
  const { setLoading, LoadingContainer } = CommonLoading();
  const [allRows, setAllRows] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    deviceModelId: "",
    deviceCode: "",
    modelName: "",
    description: "",
    assetType: "",
    supportsElogs: "",
    status: 1,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  useEffect(() => {
    fetchDeviceModels();
  }, [
    data.page,
    data.pageSize,
    data.search,
    data.model,
    data.assetType,
    data.supportsElogs,
    data.status,
    data.fromDate,
  ]);

  useEffect(() => {
    fetchModelDropdown();
  }, []);

  const fetchModelDropdown = async () => {
    try {
      const response = await fetchApi("/masteradmin/get-device-model");
      console.log("Dropdown API Response:", response);

      // Handle response structure: response.body.data is directly the array
      let dropdownData = [];
      if (response?.body?.data && Array.isArray(response.body.data)) {
        dropdownData = response.body.data;
      } else if (response?.body?.data?.data && Array.isArray(response.body.data.data)) {
        dropdownData = response.body.data.data;
      }

      const formattedOptions = dropdownData.map((item) => ({
        value: item.model_name,
        label: item.model_name,
      }));

      console.log("Formatted Options:", formattedOptions);
      setModelOptions(formattedOptions);
    } catch (error) {
      console.error("Device Model Dropdown Error:", error);
    }
  };

  const fetchDeviceModels = async () => {
    try {
      setLoading(true);
      let endUrl = `/masteradmin/get-device-model?page=${data.page}&limit=${data.pageSize}`;
      if (data.search) {
        endUrl += `&search=${data.search}`;
      }
      if (data.model) {
        endUrl += `&model_name=${data.model}`;
      }
      if (data.assetType) {
        endUrl += `&asset_type=${data.assetType}`;
      }
      if (
        data.supportsElogs !== null &&
        data.supportsElogs !== undefined &&
        data.supportsElogs !== ""
      ) {
        endUrl += `&supports_elogs=${String(data.supportsElogs)}`;
      }
      if (
        data.status !== null &&
        data.status !== undefined &&
        data.status !== ""
      ) {
        endUrl += `&status=${String(data.status)}`;
      }
      if (data.fromDate) {
        endUrl += `&created_at=${dayjs(data.fromDate).format("YYYY-MM-DD")}`;
      }

      const response = await fetchApi(endUrl);
      console.log("List API Response:", response);
      console.log("List API response.body:", response?.body);
      console.log("List API response.body.data:", response?.body?.data);

      // Handle both response structures
      let apiData = [];
      if (response?.body?.data?.data && Array.isArray(response.body.data.data)) {
        apiData = response.body.data.data;
      } else if (response?.body?.data && Array.isArray(response.body.data)) {
        apiData = response.body.data;
      }
      console.log("List API Data extracted:", apiData);

      const rows = transformDeviceModelData(apiData);
      setAllRows(rows);
      setData((prev) => ({
        ...prev,
        total: response?.body?.data?.pagination?.total_records || 0,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Fetch Device Models Error:", error);
      setLoading(false);
      handleSnackbar("Failed to fetch device models", "error");
    }
  };

  const handleClick = useCallback(() => {
    setIsEditMode(false);

    setDefaultValues({
      deviceModelId: "",
      deviceCode: "",
      modelName: "",
      description: "",
      assetType: "",
      supportsElogs: "",
      status: 1,
    });

    setIsAddModalOpen(true);
  }, []);

  const handleViewClick = useCallback(async (row) => {
    setIsEditMode(true);
    setIsEditing(false);
    await fetchDeviceModelById(row.id);
  }, []);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleAddSubmit = async (formValues) => {
    try {
      setLoading(true);

      const payload = {
        device_code: formValues.deviceCode,
        model_name: formValues.modelName,
        description: formValues.description,
        asset_type: formValues.assetType,
        supports_elogs: formValues.supportsElogs,
        status: formValues.status ?? 1,
      };

      let response;
      if (formValues.deviceModelId) {
        payload.device_model_id = formValues.deviceModelId;
      }
      response = await createApi(payload, "/masteradmin/device-model");

      if (response?.statusCode === 200) {
        handleSnackbar(
          formValues.deviceModelId
            ? "Device model updated successfully"
            : "Device model created successfully",
          "success",
        );
        setIsAddModalOpen(false);
        fetchDeviceModels();
      } else {
        handleSnackbar(
          response?.body?.message || "Something went wrong",
          "warning",
        );
      }
    } catch (error) {
      console.error("Create/Update Device Model Error:", error);
      handleSnackbar("Unexpected error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchDeviceModelById = async (deviceModelId) => {
    try {
      setLoading(true);

      const response = await fetchApi(
        `/masteradmin/get-device-model?device_model_id=${deviceModelId}`,
      );

      const modelData = response?.body;
      setDefaultValues({
        deviceModelId: modelData?.device_model_id || "",
        deviceCode: modelData?.device_code || "",
        modelName: modelData?.model_name || "",
        description: modelData?.description || "",
        assetType: modelData?.asset_type ?? "",
        supportsElogs: modelData?.supports_elogs ?? "",
        status: modelData?.status ?? 1,
      });

      setIsAddModalOpen(true);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Device Model By Id Error:", error);
      setLoading(false);
      handleSnackbar("Failed to fetch device model details", "error");
    }
  };

  const handleAddCancel = useCallback(() => {
    setIsAddModalOpen(false);

    setDefaultValues({
      deviceModelId: "",
      deviceCode: "",
      modelName: "",
      description: "",
      assetType: "",
      supportsElogs: "",
      status: 1,
    });

    setIsEditMode(false);
    setIsEditing(false);
  }, []);

  const handleSetMode = useCallback(() => {}, []);

  const columns = useMemo(() => getColumns(handleViewClick), [handleViewClick]);

  const gridData = {
    ...data,
    rows: allRows,
    columns,
    total: data.total,
  };

  let headerActionsElement = null;

  if (isEditMode && !isEditing) {
    headerActionsElement = (
      <EditButton variant="contained" onClick={handleEditClick}>
        Edit
      </EditButton>
    );
  } else if (isEditMode && isEditing) {
    headerActionsElement = (
      <CancelEditButton variant="outlined" onClick={handleCancelEdit}>
        Cancel Edit
      </CancelEditButton>
    );
  }

  const dialogMode = isEditMode ? "edit" : "add";

  const dialogTitle = isEditMode
    ? isEditing
      ? "Edit Device Model"
      : "View Device Model"
    : "Add Device Model";

  const submitButtonLabel = isEditMode
    ? isEditing
      ? "Update"
      : "Save"
    : "Add Device";

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <DeviceModelManagementHeader
          data={gridData}
          setData={setData}
          searchKey={0}
          summaryCards={[]}
          mode=""
          setMode={handleSetMode}
          handleClick={handleClick}
          modelOptions={modelOptions}
          statusOptions={DEVICE_MODEL_STATUS_FILTER_OPTIONS}
          assetTypeOptions={ASSET_TYPE_FILTER_OPTIONS}
        />
        <GridContainer>
          <CommonDataGrid
            columnsData={columns}
            rowData={allRows}
            data={gridData}
            setData={setData}
            paginationMode="server"
            getRowHeight={getRowHeight}
          />
        </GridContainer>
      </PageContainer>

      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />

      <CommonDialogForm
        open={isAddModalOpen}
        onCancel={handleAddCancel}
        mode={dialogMode}
        title={dialogTitle}
        formId="addDeviceModelForm"
        loading={false}
        isEditing={isEditing}
        headerActions={headerActionsElement}
        submitButtonText={submitButtonLabel}
        content={
          <DeviceModelManagementForm
            formId="addDeviceModelForm"
            defaultValues={defaultValues}
            isEditing={isEditing}
            isEditMode={isEditMode}
            onSubmit={handleAddSubmit}
          />
        }
      />
    </>
  );
};

export default DeviceModelManagement;
