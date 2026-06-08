import React, { useCallback, useMemo, useState, useEffect } from "react";
import dayjs from "dayjs";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonSnackbar from "../../../common/CommonSnackbar";
import CommonConfirmDialog from "../../../common/CommonConfirmDialog";
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
import AssignDevicesToCarriers from "../DeviceManagement/AssignDevicesToCarriers";

const isDeviceAssetSelectable = (params) => {
  return params.row.status?.toLowerCase() === "in stock";
};

const DeviceAssetManagement = () => {
  const { fetchApi, createApi } = useServices();
  const { loading, setLoading, LoadingContainer } = CommonLoading();
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
    imei_number: "",
    firmware: "",
    manufacturerName: "",
    simNumber: "",
    iccid: "",
    BLE_MAC_ADDRESS: "",
    hardwareVersion: "",
    providerDeviceId: "",
    integrationType: "",
    networkStatus: "",
    status: "1",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);

  const handleBulkClick = useCallback(() => {
    setIsBulkModalOpen(true);
  }, []);

  const handleBulkCancel = useCallback(() => {
    setIsBulkModalOpen(false);
  }, []);

  const handleSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

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
        endUrl += `&from_date=${dayjs(data.fromDate).format("YYYY-MM-DD")}`;
      }
      if (data.toDate) {
        endUrl += `&to_date=${dayjs(data.toDate).format("YYYY-MM-DD")}`;
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
      imei_number: "",
      firmware: "",
      manufacturerName: "",
      simNumber: "",
      iccid: "",
      BLE_MAC_ADDRESS: "",
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
        device_model_id: Number(formValues.modelName),
        status:
          formValues.status !== undefined && formValues.status !== ""
            ? String(formValues.status)
            : "1",
      };
      if (formValues.imei_number?.trim()) {
        payload.imei_number = formValues.imei_number.trim();
      }
      if (formValues.iccid?.trim()) {
        payload.iccid = formValues.iccid.trim();
      }
      if (formValues.BLE_MAC_ADDRESS?.trim()) {
        payload.BLE_MAC_ADDRESS = formValues.BLE_MAC_ADDRESS.trim();
      }
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
          response?.body?.message || "serial number should be Unique",
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
        imei_number: deviceData?.imei_number || "",
        firmware: deviceData?.firmware || "",
        manufacturerName: deviceData?.manufacturer_name || "",
        simNumber: deviceData?.sim_number || "",
        iccid: deviceData?.iccid || "",
        BLE_MAC_ADDRESS: deviceData?.BLE_MAC_ADDRESS || "",
        hardwareVersion: deviceData?.hardware_version || "",
        providerDeviceId: deviceData?.provider_device_id || "",
        integrationType: deviceData?.integration_type || "",
        networkStatus: deviceData?.network_status || "",
        status:
          deviceData?.status !== undefined && deviceData?.status !== null
            ? String(deviceData.status)
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

  const handleDeleteClick = useCallback((row) => {
    setDeviceToDelete(row);
    setIsDeleteConfirmOpen(true);
  }, []);

  const handleCloseDeleteConfirm = useCallback(() => {
    setIsDeleteConfirmOpen(false);
    setDeviceToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deviceToDelete) return;

    try {
      setLoading(true);

      const getResponse = await fetchApi(
        `/masteradmin/get-eld-devices?device_id=${deviceToDelete.id}`,
      );
      const deviceData = getResponse?.body;

      if (!deviceData) {
        handleSnackbar("Failed to fetch device details", "error");
        setLoading(false);
        handleCloseDeleteConfirm();
        return;
      }

      const payload = {
        device_id: deviceData.device_id,
        device_serial_number: deviceData.device_serial_number,
        device_model_id: deviceData.device_model_id,
        status: 3,
      };

      if (deviceData.imei_number?.trim()) {
        payload.imei_number = deviceData.imei_number.trim();
      }
      if (deviceData.iccid?.trim()) {
        payload.iccid = deviceData.iccid.trim();
      }
      if (deviceData.BLE_MAC_ADDRESS?.trim()) {
        payload.BLE_MAC_ADDRESS = deviceData.BLE_MAC_ADDRESS.trim();
      }

      const response = await createApi(
        payload,
        "/masteradmin/onboard-eld-device",
      );

      if (response?.statusCode === 200) {
        handleSnackbar("Asset status updated to Out of Service", "success");
        fetchDeviceAssets();
      } else {
        handleSnackbar(
          response?.body?.message || "Failed to update asset status",
          "error",
        );
      }
    } catch (error) {
      console.error("Delete Device Error:", error);
      handleSnackbar("Unexpected error occurred", "error");
    } finally {
      setLoading(false);
      handleCloseDeleteConfirm();
    }
  }, [
    deviceToDelete,
    fetchApi,
    createApi,
    fetchDeviceAssets,
    handleSnackbar,
    setLoading,
    handleCloseDeleteConfirm,
  ]);

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
        const {
          total = 0,
          success_count = 0,
          failure_count = 0,
        } = response?.body?.data || {};

        const message = `Bulk ELD device onboarding completed.
                            Out of ${total} devices, 
                            ${success_count} were successfully onboarded 
                            and ${failure_count} failed.`;

        handleSnackbar(message, "success");
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
      imei_number: "",
      firmware: "",
      manufacturerName: "",
      simNumber: "",
      iccid: "",
      BLE_MAC_ADDRESS: "",
      hardwareVersion: "",
      providerDeviceId: "",
      integrationType: "",
      networkStatus: "",
    });

    setIsEditMode(false);
    setIsEditing(false);
  }, []);

  const handleSetMode = useCallback(() => {}, []);
  const handleRowSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const columns = useMemo(
    () => getColumns(handleViewClick, handleDeleteClick),
    [handleViewClick, handleDeleteClick],
  );

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

  const handleAssignCancel = () => {
    setIsAssignDialogOpen(false);
  };

  const handleAssignSubmit = async (selectedCompanyId) => {
    const deviceIds = allRows
      .filter((row) => selectedRows.includes(row.id))
      .map((row) => row.id);

    const payload = {
      company_id: selectedCompanyId,
      device_ids: deviceIds,
    };

    try {
      const endurl = "/masteradmin/assign-devices";
      const response = await createApi(payload, endurl);
      if (response?.statusCode === 200) {
        showSnackbar(
          response.body?.data?.message || "Devices assigned successfully",
        );
        setSelectedRows([]);
        fetchDeviceAssets();
      } else {
        showSnackbar(
          response?.body?.data?.message || "Failed to assign devices",
          "error",
        );
      }
    } catch (error) {
      showSnackbar("Failed to assign devices", "error");
    }
    setIsAssignDialogOpen(false);
  };

  const handleAssignDevices = useCallback(() => {
    if (selectedRows.length === 0) {
      handleSnackbar("Please select at least one device", "warning");
      return;
    }
    setIsAssignDialogOpen(true);
  }, [selectedRows, handleSnackbar]);

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
          handleAssignDevices={handleAssignDevices}
          statusOptions={DEVICE_ASSET_STATUS_FILTER_OPTIONS}
          isAssignDeviceEnabled={selectedRows.length > 0}
        />
        <GridContainer>
          <CommonDataGrid
            columnsData={columns}
            rowData={allRows}
            data={gridData}
            setData={setData}
            paginationMode="server"
            getRowHeight={getRowHeight}
            checkboxSelection
            rowSelectionModel={selectedRows}
            onRowSelectionModelChange={handleRowSelectionChange}
            isRowSelectable={isDeviceAssetSelectable}
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

      <AssignDevicesToCarriers
        open={isAssignDialogOpen}
        handleCancel={handleAssignCancel}
        handleSubmit={handleAssignSubmit}
        loading={false}
      />

      <CommonConfirmDialog
        open={isDeleteConfirmOpen}
        title="Delete Asset"
        message={`Are you sure you want to delete ${deviceToDelete?.serialNumber || "this asset"}?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteConfirm}
      />
    </>
  );
};

export default DeviceAssetManagement;
