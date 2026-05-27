import React, { useCallback, useMemo, useState, useEffect } from "react";
import dayjs from "dayjs";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonSnackbar from "../../../common/CommonSnackbar";
import DeviceAssetManagementHeader from "./DeviceAssetManagementHeader";
import DeviceAssetManagementForm from "./DeviceAssetManagementForm";
import { EditButton, CancelEditButton } from "./DeviceAssetManagement.styles";
import { GridContainer } from "../AccountManagement/AccountManagement.styled";
import { useServices } from "../../../services/services";
import { DEVICE_ASSET_STATUS_FILTER_OPTIONS } from "./Constants";
import {
  getColumns,
  getRowHeight,
  transformDeviceAssetData,
} from "./DeviceAssetManagementTable.utils";
import BulkUploadForm from "./BulkUploadForm";

const DeviceAssetManagement = () => {
  const { fetchApi, createApi } = useServices();
  const { loading,setLoading, LoadingContainer } = CommonLoading();
  const [allRows, setAllRows] = useState([]);
  const [deviceModelOptions, setDeviceModelOptions] = useState([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [data, setData] = useState({
    total: 0,
    page: 1,
    pageSize: 25,
    search: "",
    deviceId: "",
    serialNumber: "",
    sortModel: [],
    fromDate: null,
    toDate: null,
    deviceModel: "",
    status: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    deviceId: "",
    modelName: "",
    serialNumber: "",
    firmware: "",
    manufacturerName: "",
    simNumber: "",
    iccid: "",
    hardwareVersion: "",
    providerDeviceId: "",
    integrationType: "",
    networkStatus: "",
    status: "1",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);

  // ── Bulk Upload ────────────────────────────────────────────────────────────────
  const handleBulkClick = useCallback(() => {
    setIsBulkModalOpen(true);
  }, []);

  const handleBulkCancel = useCallback(() => {
    setIsBulkModalOpen(false);
  }, []);

  // ── Snackbar ────────────────────────────────────────────────────────────────
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
    fetchDeviceAssets();
  }, [
    data.page,
    data.pageSize,
    data.search,
    data.deviceId,
    data.serialNumber,
    data.deviceModel,
    data.status,
    data.fromDate,
  ]);
  useEffect(() => {
    fetchDeviceModelDropdown();
  }, []);

  const fetchDeviceModelDropdown = async () => {
    try {
      const response = await fetchApi("/masteradmin/get-device-model-dropdown");
      const dropdownData = response?.body?.data || [];
      const formattedOptions = dropdownData.map((item) => ({
        value: item.model_name,
        label: item.model_name,
      }));

      setDeviceModelOptions(formattedOptions);
    } catch (error) {
      console.error("Device Model Dropdown Error:", error);
    }
  };

  const fetchDeviceAssets = async () => {
    try {
      setLoading(true);
      let endUrl = `/masteradmin/get-eld-devices?page=${data.page}&limit=${data.pageSize}`;
      if (data.search) {
        endUrl += `&search=${data.search}`;
      }
      if (data.deviceModel) {
        endUrl += `&device_model_id=${data.deviceModel}`;
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
      const apiData = response?.body?.data || [];

      const rows = transformDeviceAssetData(apiData);
      setAllRows(rows);
      setData((prev) => ({
        ...prev,
        total: response?.body?.pagination?.total_records || 0,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Fetch Device Assets Error:", error);
      setLoading(false);
      handleSnackbar("Failed to fetch device assets", "error");
    }
  };

  const handleClick = useCallback(() => {
    setIsEditMode(false);

    setDefaultValues({
      deviceId: "",
      modelName: "",
      serialNumber: "",
      firmware: "",
      manufacturerName: "",
      simNumber: "",
      iccid: "",
      hardwareVersion: "",
      providerDeviceId: "",
      integrationType: "",
      networkStatus: "",
      status: "1",
    });

    setIsAddModalOpen(true);
  }, []);

  const handleViewClick = useCallback(async (row) => {
    setIsEditMode(true);

    setIsEditing(false);

    await fetchDeviceById(row.id);
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
        device_serial_number: formValues.serialNumber,
        device_model_id: formValues.modelName,
        status: formValues.status || "1",
      };
      if (formValues.deviceId) {
        payload.device_id = formValues.deviceId;
      }
      const response = await createApi(
        payload,
        "/masteradmin/onboard-eld-device",
      );

      if (response?.statusCode === 200) {
        handleSnackbar(
          formValues.deviceId
            ? "Asset updated successfully"
            : "Asset created successfully",
          "success",
        );
        setIsAddModalOpen(false);
        fetchDeviceAssets();
      } else {
        handleSnackbar(
          response?.body?.message || "Something went wrong",
          "warning",
        );
      }
    } catch (error) {
      console.error("Create/Update Device Error:", error);

      handleSnackbar("Unexpected error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchDeviceById = async (deviceId) => {
    try {
      setLoading(true);

      const response = await fetchApi(
        `/masteradmin/get-eld-devices?device_id=${deviceId}`,
      );

      const deviceData = response?.body;
      setDefaultValues({
        deviceId: deviceData?.device_id || "",
        modelName: deviceData?.device_model_id || "",
        serialNumber: deviceData?.device_serial_number || "",
        firmware: deviceData?.firmware || "",
        manufacturerName: deviceData?.manufacturer_name || "",
        simNumber: deviceData?.sim_number || "",
        iccid: deviceData?.iccid || "",
        hardwareVersion: deviceData?.hardware_version || "",
        providerDeviceId: deviceData?.provider_device_id || "",
        integrationType: deviceData?.integration_type || "",
        networkStatus: deviceData?.network_status || "",
        status:
          deviceData?.status === 0 || deviceData?.status === "0"
            ? "0"
            : deviceData?.status === 1 || deviceData?.status === "1"
              ? "1"
              : "",
      });

      setIsAddModalOpen(true);

      setLoading(false);
    } catch (error) {
      console.error("Fetch Device By Id Error:", error);

      setLoading(false);

      handleSnackbar("Failed to fetch device details", "error");
    }
  };

  const handleBulkSubmit = async (formValues) => {
    try {
      setLoading(true);

      const formData = new FormData();

      // files comes from BulkUploadForm
      formData.append("file", formValues.files);

      const response = await createApi(
        formData,
        "/masteradmin/bulk-onboard-eld-device",
      );

      if (response?.statusCode === 200) {
        handleSnackbar("Bulk asset uploaded successfully", "success");

        setIsBulkModalOpen(false);

        // refresh grid
        fetchDeviceAssets();
      } else {
        handleSnackbar(response?.body?.message || "Upload failed", "warning");
      }
    } catch (error) {
      console.error("Bulk Upload Error:", error);

      handleSnackbar("Unexpected error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCancel = useCallback(() => {
    setIsAddModalOpen(false);

    setDefaultValues({
      deviceId: "",
      modelName: "",
      serialNumber: "",
      firmware: "",
      manufacturerName: "",
      simNumber: "",
      iccid: "",
      hardwareVersion: "",
      providerDeviceId: "",
      integrationType: "",
      networkStatus: "",
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
      ? "Edit Asset"
      : "View Asset"
    : "Add Asset";

  const submitButtonLabel = isEditMode
    ? isEditing
      ? "Update"
      : "Save"
    : "Add Asset";

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <DeviceAssetManagementHeader
          data={gridData}
          setData={setData}
          searchKey={0}
          summaryCards={[]}
          mode=""
          setMode={handleSetMode}
          handleClick={handleClick}
          handleAddAsset={handleBulkClick}
          modelOptions={deviceModelOptions}
          statusOptions={DEVICE_ASSET_STATUS_FILTER_OPTIONS}
          // isAssetAllocationEnabled={selectedRows.length > 0}
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
        formId="addAssetForm"
        loading={false}
        isEditing={isEditing}
        headerActions={headerActionsElement}
        submitButtonText={submitButtonLabel}
        content={
          <DeviceAssetManagementForm
            formId="addAssetForm"
            defaultValues={defaultValues}
            isEditing={isEditing}
            isEditMode={isEditMode}
            onSubmit={handleAddSubmit}
          />
        }
      />

      <CommonDialogForm
        open={isBulkModalOpen}
        onCancel={handleBulkCancel}
        mode="add"
        title="Add Bulk Asset"
        formId="bulkAssetForm"
        loading={false}
        submitButtonText="Upload"
        maxWidth="xs"
        content={
          <BulkUploadForm formId="bulkAssetForm" onSubmit={handleBulkSubmit} />
        }
      />
    </>
  );
};

export default DeviceAssetManagement;
