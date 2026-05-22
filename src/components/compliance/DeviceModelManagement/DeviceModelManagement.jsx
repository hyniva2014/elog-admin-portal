import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "@src/common/PageContainer";
import DeviceModelManagementHeader from "./DeviceModelManagementHeader";
import CommonLoading from "@src/common/CommonLoading";
import AddDeviceModelDialog from "./AddDeviceModelDialog";
import {
  StatusText,
  GridContainer,
  ActionCell,
  EditButton,
  CancelEditButton,
} from "./DeviceModelManagement.styled.jsx";
import {
  DEVICE_MODEL_SEED_DATA,
  DEVICE_MODEL_ASSET_OPTIONS,
  DEVICE_MODEL_ELOG_OPTIONS,
  ASSET_TYPE_REVERSE_MAP,
  STATUS_REVERSE_MAP,
  mapApiDataToComponent,
  mapComponentDataToApi,
  buildUpdatePayload,
} from "./Constants";
import { useServices } from "@src/services/services";

const buildDeviceModelRows = () =>
  DEVICE_MODEL_SEED_DATA.map((seed, index) => ({
    ...seed,
    id: index + 1,
  }));

const getOptions = (rows, key) =>
  Array.from(new Set(rows.map((row) => row[key]).filter(Boolean))).map(
    (value) => ({
      value,
      label: value,
    }),
  );

const getRowHeight = () => "auto";

const getDeviceModelColumns = (onViewDeviceModel) => [
  {
    field: "model",
    headerName: "Model",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "assetType",
    headerName: "Asset Type",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "eLogs",
    headerName: "E-Logs",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "createdOn",
    headerName: "Created On",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "updatedOn",
    headerName: "Updated On",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <StatusText variant="body2" status={params.value}>
        {params.value}
      </StatusText>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    sortable: false,
    renderCell: (params) => (
      <ActionCell row={params.row} onView={onViewDeviceModel} />
    ),
  },
];

const isApiSuccess = (response) =>
  response?.statusCode === 200 ||
  response?.statusCode === 201 ||
  response?.body?.statusCode === 200 ||
  response?.body?.statusCode === 201;

const DeviceModelManagement = () => {
  const { fetchApi, createApi } = useServices();
  const userId = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.userdetails?.user_id ?? null,
  );
  const [data, setData] = useState({
    isLoading: false,
    rows: [],
    columns: [],
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
  const [isAddDeviceModelOpen, setIsAddDeviceModelOpen] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDeviceModel, setSelectedDeviceModel] = useState(null);

  const [allDeviceModels, setAllDeviceModels] = useState([]);

  const filtersRef = useRef({ page: data.page, pageSize: data.pageSize, search: data.search, assetType: data.assetType, status: data.status, model: data.model });
  filtersRef.current = { page: data.page, pageSize: data.pageSize, search: data.search, assetType: data.assetType, status: data.status, model: data.model };

  const fetchDeviceModels = useCallback(async () => {
    const { page, pageSize, search, assetType, status, model } = filtersRef.current;
    setData((prev) => ({ ...prev, isLoading: true }));
    try {
      const searchValue = model || search;
      const queryParams = new URLSearchParams({
        page: page || 1,
        limit: pageSize || 10,
        ...(searchValue && { search: searchValue }),
        ...(assetType && { asset_type: ASSET_TYPE_REVERSE_MAP[assetType] }),
        ...(status && { status: STATUS_REVERSE_MAP[status] }),
      });

      const response = await fetchApi(`/masteradmin/get-device-model?${queryParams.toString()}`);

      if (response?.body?.data) {
        const apiData = Array.isArray(response.body.data)
          ? response.body.data
          : response.body.data.data || [];
        const pagination = Array.isArray(response.body.data) ? null : response.body.data.pagination;
        const mappedData = mapApiDataToComponent(apiData);
        setAllDeviceModels(mappedData);
        setData((prev) => ({
          ...prev,
          total: pagination?.total_records || mappedData.length,
        }));
      }
    } catch (error) {
      console.error("Error fetching device models:", error);
    } finally {
      setData((prev) => ({ ...prev, isLoading: false }));
    }
  }, [fetchApi]);

  useEffect(() => {
    fetchDeviceModels();
  }, [fetchDeviceModels, data.page, data.pageSize, data.search, data.assetType, data.status, data.model]);

  const handleAddDeviceModel = useCallback(() => {
    setIsEditMode(false);
    setIsEditing(false);
    setSelectedDeviceModel(null);
    setIsAddDeviceModelOpen(true);
  }, []);

  const handleViewDeviceModel = useCallback((row) => {
    setIsEditMode(true);
    setIsEditing(false);
    setSelectedDeviceModel(row);
    setIsAddDeviceModelOpen(true);
  }, []);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleCloseAddDeviceModel = useCallback(() => {
    setIsAddDeviceModelOpen(false);
    setIsEditMode(false);
    setIsEditing(false);
    setSelectedDeviceModel(null);
  }, []);

  const handleCreateDeviceModel = useCallback(
    async (deviceModel) => {
      setIsCreateLoading(true);
      try {
        const apiPayload = mapComponentDataToApi(deviceModel, userId);
        const response = await createApi(apiPayload, "/masteradmin/device-model");

        if (isApiSuccess(response)) {
          await fetchDeviceModels();
          setIsAddDeviceModelOpen(false);
        } else {
          console.error("Error creating device model:", response);
        }
      } catch (error) {
        console.error("Error creating device model:", error);
      } finally {
        setIsCreateLoading(false);
      }
    },
    [createApi, fetchDeviceModels, userId],
  );

  const handleUpdateDeviceModel = useCallback(
    async (deviceModel) => {
      setIsCreateLoading(true);
      try {
        const apiPayload = buildUpdatePayload(selectedDeviceModel, deviceModel, userId);
        const response = await createApi(apiPayload, "/masteradmin/device-model");

        if (isApiSuccess(response)) {
          await fetchDeviceModels();
          setIsAddDeviceModelOpen(false);
          setIsEditing(false);
          setSelectedDeviceModel(null);
        } else {
          console.error("Error updating device model:", response);
        }
      } catch (error) {
        console.error("Error updating device model:", error);
      } finally {
        setIsCreateLoading(false);
      }
    },
    [createApi, fetchDeviceModels, selectedDeviceModel, userId],
  );

  const columns = useMemo(
    () => getDeviceModelColumns(handleViewDeviceModel),
    [handleViewDeviceModel],
  );

  const filteredRows = useMemo(() => {
    return allDeviceModels;
  }, [allDeviceModels]);

  const gridData = {
    ...data,
    rows: filteredRows,
    columns,
    total: data.total,
  };

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

  const { setLoading, LoadingContainer } = CommonLoading();

  const headerActionsElement = useMemo(() => {
    if (!isEditMode) return null;
    if (isEditing) {
      return (
        <CancelEditButton variant="outlined" onClick={handleCancelEdit}>
          Cancel Edit
        </CancelEditButton>
      );
    }
    return (
      <EditButton variant="contained" onClick={handleEditClick}>
        Edit
      </EditButton>
    );
  }, [isEditMode, isEditing, handleEditClick, handleCancelEdit]);

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <DeviceModelManagementHeader
          data={gridData}
          setData={setData}
          searchKey={0}
          handleClick={handleAddDeviceModel}
          assetTypeOptions={assetTypeOptions}
          modelOptions={modelOptions}
          statusOptions={statusOptions}
        />

        <GridContainer>
          <CommonDataGrid
            columnsData={columns}
            rowData={filteredRows}
            data={gridData}
            setData={setData}
            paginationMode="server"
            getRowHeight={getRowHeight}
          />
        </GridContainer>

        <AddDeviceModelDialog
          open={isAddDeviceModelOpen}
          onClose={handleCloseAddDeviceModel}
          onSubmit={isEditMode ? handleUpdateDeviceModel : handleCreateDeviceModel}
          loading={isCreateLoading}
          isEditMode={isEditMode}
          isEditing={isEditing}
          selectedDeviceModel={selectedDeviceModel}
          headerActions={headerActionsElement}
        />
      </PageContainer>
    </>
  );
};

export default DeviceModelManagement;