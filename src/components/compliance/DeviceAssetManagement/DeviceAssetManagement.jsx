import React, { useCallback, useMemo, useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import dayjs from "dayjs";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonSnackbar from "../../../common/CommonSnackbar";
import DeviceAssetManagementHeader from "./DeviceAssetManagementHeader";
import DeviceAssetManagementForm from "./DeviceAssetManagementForm";
import {
  StatusTypography,
  EditButton,
  CancelEditButton,
} from "./DeviceAssetManagement.styles";
import {
  actionIconSx,
  GridContainer,
} from "../AccountManagement/AccountManagement.styled";
import { useServices } from "../../../services/services";
import { getColumns, getRowHeight } from "./DeviceAssetManagementTable.utils";
import { DEVICE_ASSET_STATUS_FILTER_OPTIONS } from "./Constants";

const DeviceAssetManagement = () => {
  const { fetchApi, createApi } = useServices();
  const { setLoading, LoadingContainer } = CommonLoading();
  const [allRows, setAllRows] = useState([]);
  const [deviceModelOptions, setDeviceModelOptions] = useState([]);
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

      const rows = apiData.map((item) => ({
        id: item.device_id,
        serialNumber: item.device_serial_number || "-",
        deviceModel: item.device_model_id || "-",
        createdOn: item.created_at || null,
        updatedOn: item.updated_at || null,
        status:
          item.status === "1"
            ? "Active"
            : item.status === "0"
              ? "Inactive"
              : "-",
        imeiNumber: item.imei_number || "-",
        firmware: item.firmware || "-",
        manufacturerName: item.manufacturer_name || "-",
        simNumber: item.sim_number || "-",
        iccid: item.iccid || "-",
        hardwareVersion: item.hardware_version || "-",
        providerDeviceId: item.provider_device_id || "-",
        integrationType: item.integration_type || "-",
        networkStatus: item.network_status || "-",
        activationDate: item.activation_date || null,
      }));
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
          modelOptions={deviceModelOptions}
          statusOptions={DEVICE_ASSET_STATUS_FILTER_OPTIONS}
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
    </>
  );
};

export default DeviceAssetManagement;
