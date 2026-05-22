import dayjs from "dayjs";
import { StatusTypography } from "./DeviceAssetManagement.styles";
import DeviceAssetManagementActionButton from "./DeviceAssetManagementActionButton";

export const formatDate = (value) =>
  value ? dayjs(value).format("MMM DD, YYYY") : "-";

export const getRowHeight = () => "auto";

const StatusCell = (params) => (
  <StatusTypography variant="body2" value={params.value}>
    {params.value}
  </StatusTypography>
);

const ActionCell = (onView) => {
  return (params) => (
    <DeviceAssetManagementActionButton row={params.row} onView={onView} />
  );
};

export const getColumns = (onView) => [
  {
    field: "serialNumber",
    headerName: "Serial Number",
    width: 250,
    minWidth: 250,
    maxWidth: 280,
    headerTooltip: true,
    cellClassName: "sticky-col-left-1",
    headerClassName: "sticky-col-left-1",
  },

  {
    field: "deviceModel",
    headerName: "Device Model",
    width: 250,
    minWidth: 250,
    maxWidth: 280,
    headerTooltip: true,
    cellClassName: "sticky-col-left-2",
    headerClassName: "sticky-col-left-2",
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

export const transformDeviceAssetData = (apiData) => {
  return apiData.map((item) => ({
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
};