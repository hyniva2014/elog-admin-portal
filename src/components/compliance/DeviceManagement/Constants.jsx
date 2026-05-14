import eyeIcon from "../../../assets/images/svg/eyeicon.png";
import DevicesIcon from "@mui/icons-material/Devices";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import {
  Typography,
  IconButton,
} from "@mui/material";
import { StatusTypography } from "./DeviceManagement.styles";
export const DEVICE_STATUS_FILTER_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Warning", label: "Warning" },
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
  { value: "C-06", label: "C-06" }
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

  export const mockData = [
    {
      id: 1,
      deviceId: "DEV-1001",
      carrierId: "C-01",
      carrierName: "Swift Transportation",
      deviceModel: "Geotab GO9",
      serialNumber: "SN-ABC12345",
      truckNumber: "TRK-089",
      latitude: "30.250661",
      longitude: "-97.735925",
      ignition: "ON",
      speed: "80",
      createdOn: "05 05 2026",
      lastSync: "05 05 2026",
      status: "Active",
    },
    {
      id: 2,
      deviceId: "DEV-1002",
      carrierId: "C-03",
      carrierName: "J.B. Hunt",
      deviceModel: "Samsara VG34",
      serialNumber: "SN-ABC12346",
      truckNumber: "TRK-045",
      latitude: "31.924816",
      longitude: "-97.102912",
      ignition: "ON",
      speed: "60",
      createdOn: "05 05 2026",
      lastSync: "05 05 2026",
      status: "Active",
    },
    {
      id: 3,
      deviceId: "DEV-1003",
      carrierId: "C-03",
      carrierName: "Schneider National",
      deviceModel: "KeepTruckin K5",
      serialNumber: "HSN-ABC12347",
      truckNumber: "TRK-102",
      latitude: "27.490996",
      longitude: "-99.460743",
      ignition: "OFF",
      speed: "0",
      createdOn: "05 05 2026",
      lastSync: "05 05 2026",
      status: "Warning",
    },
    {
      id: 4,
      deviceId: "DEV-1004",
      carrierId: "C-04",
      carrierName: "Werner Enterprises",
      deviceModel: "Omnitracs IVG",
      serialNumber: "SN-ABC12348",
      truckNumber: "TRK-067",
      latitude: "30.250661",
      longitude: "-97.102912",
      ignition: "ON",
      speed: "30",
      createdOn: "05 05 2026",
      lastSync: "05 05 2026",
      status: "Active",
    }
  ];

  export const columns = [
    {
      field: "carrierId",
      headerName: "Carrier ID",
      width: 120,
      minWidth: 150,
      maxWidth: 180,
      headerTooltip: true,
      flex: 1,
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
      cellClassName: "sticky-col-left-2",
      headerClassName: "sticky-col-left-2",
    },
    {
      field: "deviceModel",
      headerName: "Device Model",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "truckNumber",
      headerName: "Truck Number",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "latitude",
      headerName: "Latitude",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "ignition",
      headerName: "Ignition",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "speed",
      headerName: "Speed",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "createdOn",
      headerName: "Created On",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "lastSync",
      headerName: "Last Sync",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 90,
      renderCell: (params) => (
              <StatusTypography variant="body2" value={params.value}>
                {params.value}
              </StatusTypography>
            ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: () => (
        <IconButton size="small" color="primary">
          <img src={eyeIcon} alt="view" width={16} height={16} />
        </IconButton>
      ),
    },
  ];

  export const summaryCards = [
      {
        id: "total_devices",
        title: "Total Devices",
        value: "1095",
        accentcolor: "#284495",
        icon: (
          <DevicesIcon
            sx={{
              fontSize: 28,
              color: "#284495",
            }}
          />
        ),
      },
      {
        id: "online_devices",
        title: "Online Devices",
        value: "1077",
        accentcolor: "#008236",
        icon: (
          <WifiIcon
            sx={{
              fontSize: 28,
              color: "#008236",
            }}
          />
        ),
      },
      {
        id: "offline_devices",
        title: "Offline Devices",
        value: "18",
        accentcolor: "#FF0000",
        icon: (
          <WifiOffIcon
            sx={{
              fontSize: 28,
              color: "#FF0000",
            }}
          />
        ),
      },
      {
        id: "unassigned_devices",
        title: "Unassigned Devices",
        value: "34",
        accentcolor: "#E69500",
        icon: (
          <Inventory2OutlinedIcon
            sx={{
              fontSize: 28,
              color: "#E69500",
            }}
          />
        ),
      },
    ];