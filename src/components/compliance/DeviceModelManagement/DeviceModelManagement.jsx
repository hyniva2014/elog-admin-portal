import { useCallback, useEffect, useMemo, useState } from "react";
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
} from "./Constants";
import { useServices } from "@src/services/services";

const assetTypeMap = {
  1: "Truck",
  2: "Trailer",
};

const assetTypeReverseMap = {
  "Truck": 1,
  "Trailer": 2,
};

const eLogsMap = {
  1: "Yes",
  0: "No",
};

const eLogsReverseMap = {
  "Yes": 1,
  "No": 0,
};

const statusMap = {
  1: "Active",
  2: "Inactive",
};

const statusReverseMap = {
  "Active": 1,
  "Inactive": 2,
};

const mapApiDataToComponent = (apiData) => {
  return apiData.map((item, index) => ({
    id: item.device_model_id,
    device_model_id: item.device_model_id,
    device_code: item.device_code,
    model: item.model_name,
    modelName: item.model_name,
    assetType: assetTypeMap[item.asset_type] || item.asset_type,
    description: item.description,
    eLogs: eLogsMap[item.supports_elogs] || (item.supports_elogs ? "Yes" : "No"),
    status: statusMap[item.status] || item.status,
    createdOn: new Date(item.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).replace(/,/g, ''),
    updatedOn: new Date(item.updated_at).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).replace(/,/g, ''),
    created_by: item.created_by,
    updated_by: item.updated_by,
  }));
};

const mapComponentDataToApi = (componentData) => {
  // Generate device_code from model_name (e.g., "Samsara G2" -> "SG2")
  const words = componentData.modelName.split(/\s+/);
  const deviceCode = words.map(word => word[0]).join('').toUpperCase() + 
                     (words[words.length - 1].match(/\d+/) || '');

  return {
    device_code: deviceCode,
    model_name: componentData.modelName,
    asset_type: assetTypeReverseMap[componentData.assetType],
    description: componentData.description,
    supports_elogs: eLogsReverseMap[componentData.eLogs],
    status: 2,
    created_by: 9,
    updated_by: 9,
  };
};

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

const DeviceModelManagement = () => {
  const { fetchApi, createApi } = useServices();
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

  const fetchDeviceModels = useCallback(async (page, pageSize, search, assetType, status, model) => {
    setData((prev) => ({ ...prev, isLoading: true }));
    try {
      // Combine search and model filter (model takes precedence if both exist)
      const searchValue = model || search;
      
      const queryParams = new URLSearchParams({
        page: page || 1,
        limit: pageSize || 10,
        ...(searchValue && { search: searchValue }),
        ...(assetType && { asset_type: assetTypeReverseMap[assetType] }),
        ...(status && { status: statusReverseMap[status] }),
      });

      const response = await fetchApi(`/masteradmin/get-device-model?${queryParams.toString()}`);

      if (response?.body?.data) {
        const apiData = Array.isArray(response.body.data) ? response.body.data : response.body.data.data || [];
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
    fetchDeviceModels(data.page, data.pageSize, data.search, data.assetType, data.status, data.model);
  }, [data.page, data.pageSize, data.search, data.assetType, data.status, data.model]);

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
        const apiPayload = mapComponentDataToApi(deviceModel);
        const response = await createApi(apiPayload, '/masteradmin/device-model');

        if (response?.statusCode === 200 || response?.statusCode === 201 || response?.body?.statusCode === 200 || response?.body?.statusCode === 201) {
          await fetchDeviceModels(data.page, data.pageSize, data.search, data.assetType, data.status, data.model);
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
    [createApi, fetchDeviceModels, data.page, data.pageSize, data.search, data.assetType, data.status, data.model],
  );

  const handleUpdateDeviceModel = useCallback(
    async (deviceModel) => {
      setIsCreateLoading(true);
      try {
        const apiPayload = {
          device_model_id: selectedDeviceModel.device_model_id,
          device_code: selectedDeviceModel.device_code,
          model_name: deviceModel.modelName,
          asset_type: assetTypeReverseMap[deviceModel.assetType],
          description: deviceModel.description,
          supports_elogs: eLogsReverseMap[deviceModel.eLogs],
          status: statusReverseMap[deviceModel.status] || 2,
          updated_by: 9,
        };
        
        const response = await createApi(apiPayload, '/masteradmin/device-model');

        if (response?.statusCode === 200 || response?.statusCode === 201 || response?.body?.statusCode === 200 || response?.body?.statusCode === 201) {
          await fetchDeviceModels(data.page, data.pageSize, data.search, data.assetType, data.status, data.model);
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
    [createApi, fetchDeviceModels, data.page, data.pageSize, data.search, data.assetType, data.status, data.model, selectedDeviceModel],
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

  // Pre-computed header actions element (same pattern as Device Asset Management)
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