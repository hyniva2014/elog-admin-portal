import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "@src/common/PageContainer";
import CommonLoading from "@src/common/CommonLoading";
import CommonSnackbar from "@src/common/CommonSnackbar";
import DeviceModelManagementHeader from "./DeviceModelManagementHeader";
import AddDeviceModelDialog from "./AddDeviceModelDialog";
import {
  EditButton,
  CancelEditButton,
  GridContainer,
} from "./DeviceModelManagement.styled.jsx";
import {
  ASSET_TYPE_MAP,
  ELOGS_MAP,
  STATUS_MAP,
  ASSET_TYPE_REVERSE_MAP,
  STATUS_REVERSE_MAP,
  mapApiDataToComponent,
  mapComponentDataToApi,
  buildUpdatePayload,
} from "./Constants";
import { useServices } from "@src/services/services";
import {
  getColumns,
  getRowHeight,
} from "./DeviceModelManagementTable.utils";

const getOptions = (rows, key) =>
  Array.from(new Set(rows.map((row) => row[key]).filter(Boolean))).map(
    (value) => ({
      value,
      label: value,
    }),
  );

const isApiSuccess = (response) =>
  response?.statusCode === 200 ||
  response?.statusCode === 201 ||
  response?.body?.statusCode === 200 ||
  response?.body?.statusCode === 201;

const DeviceModelManagement = () => {
  const { fetchApi, createApi } = useServices();
  const { setLoading, LoadingContainer } = CommonLoading();
  const userId = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.userdetails?.user_id ?? null,
  );

  const [allDeviceModels, setAllDeviceModels] = useState([]);
  const [data, setData] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    search: "",
    sortModel: [],
    fromDate: null,
    toDate: null,
    assetType: "",
    model: "",
    status: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [isAddDeviceModelOpen, setIsAddDeviceModelOpen] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDeviceModel, setSelectedDeviceModel] = useState(null);

  const [defaultValues, setDefaultValues] = useState({
    modelName: "",
    description: "",
    assetType: "",
    eLogs: "",
    status: "",
  });

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

  const fetchApiRef = useRef(fetchApi);
  fetchApiRef.current = fetchApi;

  const setLoadingRef = useRef(setLoading);
  setLoadingRef.current = setLoading;

  const handleSnackbarRef = useRef(handleSnackbar);
  handleSnackbarRef.current = handleSnackbar;

  const filterKey = useMemo(
    () => `${data.page}|${data.pageSize}|${data.search}|${data.assetType}|${data.status}|${data.model}`,
    [data.page, data.pageSize, data.search, data.assetType, data.status, data.model],
  );

  const fetchDeviceModels = useCallback(async () => {
    const [page, pageSize, search, assetType, status, model] = filterKey.split("|");
    try {
      setLoadingRef.current(true);
      const queryParams = new URLSearchParams({
        page: page || "1",
        limit: pageSize || "10",
        ...(search && { search }),
        ...(model && { search: model }),
        ...(assetType && { asset_type: ASSET_TYPE_REVERSE_MAP[assetType] }),
        ...(status && { status: STATUS_REVERSE_MAP[status] }),
      });

      const response = await fetchApiRef.current(`/masteradmin/get-device-model?${queryParams.toString()}`);

      const apiData = response?.body?.data?.data || response?.body?.data || [];
      const pagination = response?.body?.data?.pagination;

      const rows = mapApiDataToComponent(apiData);
      setAllDeviceModels(rows);
      setData((prev) => ({
        ...prev,
        total: pagination?.total_records || rows.length,
      }));
      setLoadingRef.current(false);
    } catch (error) {
      console.error("Fetch Device Models Error:", error);
      setLoadingRef.current(false);
      handleSnackbarRef.current("Failed to fetch device models", "error");
    }
  }, [filterKey]);

  useEffect(() => {
    fetchDeviceModels();
  }, [filterKey, fetchDeviceModels]);

  const handleAddClick = useCallback(() => {
    setIsEditMode(false);
    setIsEditing(false);
    setSelectedDeviceModel(null);
    setDefaultValues({
      modelName: "",
      description: "",
      assetType: "",
      eLogs: "",
      status: "Active",
    });
    setIsAddDeviceModelOpen(true);
  }, []);

  const fetchDeviceModelById = useCallback(async (deviceModelId) => {
    try {
      setLoading(true);

      const response = await fetchApi(
        `/masteradmin/get-device-model?device_model_id=${deviceModelId}`,
      );

      const body = response?.body;
      const deviceData = body?.data?.[0] || body?.[0] || (body?.device_model_id ? body : null);

      if (deviceData) {
        setSelectedDeviceModel({
          device_model_id: deviceData.device_model_id,
          device_code: deviceData.device_code,
        });
        setDefaultValues({
          modelName: deviceData.model_name || "",
          description: deviceData.description || "",
          assetType: ASSET_TYPE_MAP[deviceData.asset_type] ?? "",
          eLogs: ELOGS_MAP[deviceData.supports_elogs] ?? "",
          status: STATUS_MAP[deviceData.status] ?? "",
        });
        setIsAddDeviceModelOpen(true);
      } else {
        handleSnackbar("Failed to fetch device model details", "error");
      }

      setLoading(false);
    } catch (error) {
      console.error("Fetch Device Model By Id Error:", error);
      setLoading(false);
      handleSnackbar("Failed to fetch device model details", "error");
    }
  }, [fetchApi, handleSnackbar, setLoading]);

  const handleViewClick = useCallback(async (row) => {
    setIsEditMode(true);
    setIsEditing(false);
    await fetchDeviceModelById(row.device_model_id);
  }, [fetchDeviceModelById]);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const noOp = useCallback(() => {}, []);

  const handleCloseDialog = useCallback(() => {
    setIsAddDeviceModelOpen(false);
    setIsEditMode(false);
    setIsEditing(false);
    setSelectedDeviceModel(null);
    setDefaultValues({
      modelName: "",
      description: "",
      assetType: "",
      eLogs: "",
      status: "",
    });
  }, []);

  const handleSubmit = useCallback(
    async (formValues) => {
      try {
        setIsCreateLoading(true);

        let payload;
        if (isEditMode && selectedDeviceModel) {
          payload = buildUpdatePayload(selectedDeviceModel, formValues, userId);
        } else {
          payload = mapComponentDataToApi(formValues, userId);
        }

        const response = await createApi(payload, "/masteradmin/device-model");

        if (isApiSuccess(response)) {
          handleSnackbar(
            isEditMode ? "Device model updated successfully" : "Device model created successfully",
            "success",
          );
          setIsAddDeviceModelOpen(false);
          fetchDeviceModels();
          setIsEditing(false);
          setSelectedDeviceModel(null);
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
        setIsCreateLoading(false);
      }
    },
    [createApi, fetchDeviceModels, handleSnackbar, isEditMode, selectedDeviceModel, userId],
  );

  const columns = useMemo(() => getColumns(handleViewClick), [handleViewClick]);

  const assetTypeOptions = useMemo(
    () => getOptions(allDeviceModels, "assetType"),
    [allDeviceModels],
  );

  const modelOptions = useMemo(
    () => getOptions(allDeviceModels, "model"),
    [allDeviceModels],
  );

  const statusOptions = useMemo(
    () => getOptions(allDeviceModels, "status"),
    [allDeviceModels],
  );

  const gridData = {
    ...data,
    rows: allDeviceModels,
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
          setMode={noOp}
          handleClick={handleAddClick}
          assetTypeOptions={assetTypeOptions}
          modelOptions={modelOptions}
          statusOptions={statusOptions}
        />
        <GridContainer>
          <CommonDataGrid
            columnsData={columns}
            rowData={allDeviceModels}
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

      <AddDeviceModelDialog
        open={isAddDeviceModelOpen}
        onClose={handleCloseDialog}
        mode={dialogMode}
        title={dialogTitle}
        submitButtonText={submitButtonLabel}
        loading={isCreateLoading}
        isEditMode={isEditMode}
        isEditing={isEditing}
        defaultValues={defaultValues}
        headerActions={headerActionsElement}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default DeviceModelManagement;