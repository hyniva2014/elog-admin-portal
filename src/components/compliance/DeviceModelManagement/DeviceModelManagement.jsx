import { useCallback, useMemo, useState } from "react";
import { IconButton } from "@mui/material";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "@src/common/PageContainer";
import DeviceModelManagementHeader from "./DeviceModelManagementHeader";
import CommonLoading from "@src/common/CommonLoading";
import AddDeviceModelDialog from "./AddDeviceModelDialog";
import eyeIcon from "../../../assets/images/svg/eyeicon.png";
import {
  StatusText,
  ActionIcon,
  GridContainer,
} from "./DeviceModelManagement.styled.jsx";
import {
  DEVICE_MODEL_ASSET_OPTIONS,
  DEVICE_MODEL_ELOG_OPTIONS,
} from "./Constants";

const deviceModelSeedData = [
  {
    model: "Geotab GO9",
    assetType: "Truck",
    description: "HSPA",
    eLogs: "Yes",
    createdOn: "05 05 2026",
    updatedOn: "05 05 2026",
    status: "Active",
  },
  {
    model: "Samsara VG34",
    assetType: "Truck",
    description: "HSPA",
    eLogs: "Yes",
    createdOn: "05 05 2026",
    updatedOn: "05 05 2026",
    status: "Active",
  },
];

const buildDeviceModelRows = () =>
  deviceModelSeedData.map((seed, index) => ({
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
    renderCell: (params) => {
      const handleViewClick = () => onViewDeviceModel(params.row);
      return (
        <IconButton
          size="small"
          onClick={handleViewClick}
        >
          <ActionIcon src={eyeIcon} alt="view" />
        </IconButton>
      );
    },
  },
];

const DeviceModelManagement = () => {
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

  const [allDeviceModels, setAllDeviceModels] = useState(() => buildDeviceModelRows());

  const handleAddDeviceModel = useCallback(() => {
    setIsAddDeviceModelOpen(true);
  }, []);

  const handleCloseAddDeviceModel = useCallback(() => {
    setIsAddDeviceModelOpen(false);
  }, []);

  const handleCreateDeviceModel = useCallback(
    (deviceModel) => {
      const today = new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }).replace(/\//g, ' ');

      setAllDeviceModels((prev) => {
        const nextId = Math.max(...prev.map((row) => row.id)) + 1;

        return [
          {
            ...deviceModel,
            id: nextId,
            model: deviceModel.modelName,
            createdOn: today,
            updatedOn: today,
            status: "Active",
          },
          ...prev,
        ];
      });

      setData((prev) => ({
        ...prev,
        page: 1,
      }));
      setIsAddDeviceModelOpen(false);
    },
    [],
  );

  const handleViewDeviceModel = useCallback(
    (row) => {
      console.log("View device model:", row);
    },
    [],
  );

  const columns = useMemo(
    () => getDeviceModelColumns(handleViewDeviceModel),
    [handleViewDeviceModel],
  );

  const filteredRows = useMemo(() => {
    const searchValue = data.search.trim().toLowerCase();

    return allDeviceModels.filter((deviceModel) => {
      const matchesSearch =
        !searchValue ||
        [
          deviceModel.model,
          deviceModel.assetType,
          deviceModel.description,
          deviceModel.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchValue);

      return (
        matchesSearch &&
        (!data.assetType || deviceModel.assetType === data.assetType) &&
        (!data.model || deviceModel.model === data.model) &&
        (!data.status || deviceModel.status === data.status)
      );
    });
  }, [allDeviceModels, data]);

  const paginatedRows = useMemo(() => {
    const startIndex = (data.page - 1) * data.pageSize;
    return filteredRows.slice(startIndex, startIndex + data.pageSize);
  }, [filteredRows, data.page, data.pageSize]);

  const gridData = {
    ...data,
    rows: paginatedRows,
    columns,
    total: filteredRows.length,
  };

  const { setLoading, LoadingContainer } = CommonLoading();

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <DeviceModelManagementHeader
          data={gridData}
          setData={setData}
          searchKey={0}
          handleClick={handleAddDeviceModel}
          assetTypeOptions={getOptions(allDeviceModels, "assetType")}
          modelOptions={getOptions(allDeviceModels, "model")}
          statusOptions={getOptions(allDeviceModels, "status")}
        />

        <GridContainer>
          <CommonDataGrid
            columnsData={columns}
            rowData={paginatedRows}
            data={gridData}
            setData={setData}
            paginationMode="server"
            getRowHeight={getRowHeight}
          />
        </GridContainer>

        <AddDeviceModelDialog
          open={isAddDeviceModelOpen}
          onClose={handleCloseAddDeviceModel}
          onSubmit={handleCreateDeviceModel}
        />
      </PageContainer>
    </>
  );
};

export default DeviceModelManagement;