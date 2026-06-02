import dayjs from "dayjs";
import eyeIcon from "../../../assets/images/svg/eyeicon.png";
import DevicesIcon from "@mui/icons-material/Devices";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { IconButton } from "@mui/material";
import { StatusTypography } from "./DeviceManagement.styles";

const formatDate = (value) =>
  value ? dayjs(value).format("MMM DD, YYYY") : "-";

export const DEVICE_STATUS_FILTER_OPTIONS = [
  { value: "1", label: "Allocated" },
  { value: "2", label: "Assigned" },
];

export const DEVICE_IGNITION_FILTER_OPTIONS = [
  { value: "ON", label: "ON" },
  { value: "OFF", label: "OFF" },
];

export const DEVICE_MODEL_FILTER_OPTIONS = [
  { value: "Geotab GO9", label: "Geotab GO9" },
  { value: "Samsara VG34", label: "Samsara VG34" },
  { value: "KeepTruckin K5", label: "KeepTruckin K5" },
  { value: "Omnitracs IVG", label: "Omnitracs IVG" },
  { value: "VG34", label: "VG34" },
];

export const DEVICE_CARRIER_ID_FILTER_OPTIONS = [
  { value: "C-01", label: "C-01" },
  { value: "C-03", label: "C-03" },
  { value: "C-04", label: "C-04" },
  { value: "C-05", label: "C-05" },
  { value: "C-06", label: "C-06" },
];

export const DEVICE_ASSET_CARRIER_NAME_FILTER_OPTIONS = [
  { value: "Swift Transportation", label: "Swift Transportation" },
  { value: "J.B. Hunt", label: "J.B. Hunt" },
  { value: "Schneider National", label: "Schneider National" },
  { value: "Werner Enterprises", label: "Werner Enterprises" },
  { value: "Knight Transportation", label: "Knight Transportation" },
];

export const DEVICE_TRUCK_FILTER_OPTIONS = [
  { value: "TRK-089", label: "TRK-089" },
  { value: "TRK-045", label: "TRK-045" },
  { value: "TRK-102", label: "TRK-102" },
  { value: "TRK-067", label: "TRK-067" },
  { value: "TRK-088", label: "TRK-088" },
];

const StatusCell = ({ value }) => (
  <StatusTypography variant="body2" value={value}>
    {value}
  </StatusTypography>
);

const ActionCell = () => (
  <IconButton size="small" color="primary">
    <img src={eyeIcon} alt="view" width={16} height={16} />
  </IconButton>
);

export const columns = [
  {
    field: "carrierId",
    headerName: "Carrier ID",
    width: 120,
    minWidth: 150,
    maxWidth: 180,
    headerTooltip: true,
    flex: 1,
    align: "center",
    headerAlign: "center",
    cellClassName: "sticky-col-left-1",
    headerClassName: "sticky-col-left-1",
  },
  {
    field: "carrierName",
    headerName: "Carrier Name",
    width: 120,
    minWidth: 150,
    maxWidth: 180,
    headerTooltip: true,
    flex: 1,
    align: "center",
    headerAlign: "center",
    align: "center",
    headerAlign: "center",
    cellClassName: "sticky-col-left-2",
    headerClassName: "sticky-col-left-2",
  },
  {
    field: "deviceModel",
    headerName: "Device Model",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 90,
  },
  {
    field: "serialNumber",
    headerName: "Serial Number",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 90,
  },
  {
    field: "truckNumber",
    headerName: "Truck Number",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 90,
  },
  {
    field: "latitude",
    headerName: "Latitude",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 90,
  },
  {
    field: "longitude",
    headerName: "Longitude",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 90,
  },
  {
    field: "ignition",
    headerName: "Ignition",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 90,
  },
  {
    field: "speed",
    headerName: "Speed",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 90,
  },
  {
    field: "createdOn",
    headerName: "Created On",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 120,
    renderCell: (params) => formatDate(params.value),
  },
  {
    field: "updatedOn",
    headerName: "Updated On",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 120,
    renderCell: (params) => formatDate(params.value),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 90,
    renderCell: (params) => <StatusCell value={params.value} />,
  },
];

const DEVICE_STATUS_MAP = {
  1: "Allocated",
  2: "Assigned",
};

export const getDeviceStatus = (status) =>
  DEVICE_STATUS_MAP[Number(status)] || "-";

export const transformDeviceData = (data = []) =>
  data.map((item) => ({
    id: item.device_id,
    deviceId: item.device_id,
    carrierId: item.carrier_id ?? "-",
    carrierName: item.carrier_name ?? "-",
    deviceModel: item.device_model_name ?? "-",
    serialNumber: item.serial_number ?? "-",
    truckNumber: item.truck_number ?? "-",
    latitude: item.latitude ?? "-",
    longitude: item.longitude ?? "-",
    ignition: item.ignition ?? "-",
    speed: item.speed ?? 0,
    createdOn: item.created_at,
    updatedOn: item.updated_at,
    status: getDeviceStatus(item.status),
  }));

export const DEVICE_SUMMARY_CARDS = {
  totalDevices: {
    id: "totalDevices",
    title: "Total Active Devices",
    accentcolor: "brand",
    icon: <DevicesIcon fontSize="small" color="brand" />,
  },
  onlineDevices: {
    id: "onlineDevices",
    title: "Online Devices",
    accentcolor: "success",
    icon: <WifiIcon sfontSize="small" color="success" />,
  },
  offlineDevices: {
    id: "offlineDevices",
    title: "Offline Devices",
    accentcolor: "error",
    icon: <WifiOffIcon fontSize="small" color="error" />,
  },
  // unassignedDevices: {
  //   id: "unassignedDevices",
  //   title: "Unassigned Devices",
  //   accentcolor: "warning",
  //   icon: <Inventory2OutlinedIcon fontSize="small" a color="warning" />,
  // },
};

export const GVWR_OPTIONS = [
  { value: "26,001 lbs", label: "26,001 lbs" },
  { value: "33,001 lbs", label: "33,001 lbs" },
  { value: "60,000 lbs", label: "60,000 lbs" },
  { value: "80,000 lbs", label: "80,000 lbs" },
];

export const MAKE_OPTIONS = [
  { value: "Daimler", label: "Daimler" },
  { value: "Freightliner", label: "Freightliner" },
  { value: "Kenworth", label: "Kenworth" },
  { value: "Peterbilt", label: "Peterbilt" },
  { value: "Volvo", label: "Volvo" },
];

export const STATE_OPTIONS = [
  { value: "Alabama", label: "Alabama" },
  { value: "Alaska", label: "Alaska" },
  { value: "Arizona", label: "Arizona" },
  { value: "California", label: "California" },
  { value: "Florida", label: "Florida" },
  { value: "Texas", label: "Texas" },
];

export const ADD_DEVICE_FORM_ID = "add-device-form";
