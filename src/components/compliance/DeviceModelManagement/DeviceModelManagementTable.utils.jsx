import dayjs from "dayjs";
import { StatusText } from "./DeviceModelManagement.styled.jsx";
import DeviceModelManagementActionButton from "./DeviceModelManagementActionButton";

export const formatDate = (value) =>
  value ? dayjs(value).format("MMM DD, YYYY") : "-";

export const getRowHeight = () => "auto";

const StatusCell = (params) => (
  <StatusText variant="body2" status={params.value}>
    {params.value}
  </StatusText>
);

const ActionCell = (onView) => {
  return (params) => (
    <DeviceModelManagementActionButton row={params.row} onView={onView} />
  );
};

export const getColumns = (onView) => [
  {
    field: "model",
    headerName: "Model",
    width: 250,
    minWidth: 250,
    maxWidth: 280,
    headerTooltip: true,
    cellClassName: "sticky-col-left-1",
    headerClassName: "sticky-col-left-1",
  },
  {
    field: "assetType",
    headerName: "Asset Type",
    width: 200,
    minWidth: 200,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    minWidth: 200,
    maxWidth: 300,
    headerTooltip: true,
  },
  {
    field: "eLogs",
    headerName: "E-Logs",
    width: 150,
    minWidth: 150,
    maxWidth: 200,
    headerTooltip: true,
  },
  {
    field: "createdOn",
    headerName: "Created On",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
    renderCell: (params) => formatDate(params.value),
  },
  {
    field: "updatedOn",
    headerName: "Updated On",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
    renderCell: (params) => formatDate(params.value),
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
    renderCell: StatusCell,
  },
  {
    field: "action",
    headerName: "Action",
    minWidth: 180,
    maxWidth: 250,
    sortable: false,
    headerTooltip: true,
    renderCell: ActionCell(onView),
  },
];

export const transformDeviceModelData = (apiData) => {
  return apiData.map((item) => ({
    id: item.device_model_id,
    device_model_id: item.device_model_id,
    device_code: item.device_code,
    model: item.model_name || "-",
    modelName: item.model_name || "",
    assetType: item.asset_type === 1 ? "Truck" : item.asset_type === 2 ? "Trailer" : "-",
    description: item.description || "-",
    eLogs: item.supports_elogs === 1 ? "Yes" : item.supports_elogs === 0 ? "No" : "-",
    status: item.status === 1 ? "Active" : item.status === 2 ? "Inactive" : "-",
    createdOn: item.created_at || null,
    updatedOn: item.updated_at || null,
    created_by: item.created_by,
    updated_by: item.updated_by,
  }));
};
