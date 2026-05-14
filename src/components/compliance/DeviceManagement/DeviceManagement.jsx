import React, { useState } from "react";
import {
  Typography,
  IconButton,
} from "@mui/material";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import eyeIcon from "../../../assets/images/svg/eyeicon.png";
import CommonLoading from "../../../common/CommonLoading";
import DeviceManagementHeader from "./DeviceManagementHeader";
import DevicesIcon from "@mui/icons-material/Devices";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
const DeviceManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setLoading, LoadingContainer } = CommonLoading();
  const [data, setData] = useState({
    isLoading: false,
  });
  const [mode, setMode] = useState("");

  const handleClick = () => {
  
    console.log("Add device asset clicked");
  };
  const summaryCards = [
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
  const mockData = [
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
    },
    {
      id: 5,
      deviceId: "DEV-1005",
      carrierId: "C-05",
      carrierName: "Knight Transportation",
      deviceModel: "KeepTruckin K5",
      serialNumber: "SN-ABC12350",
      truckNumber: "TRK-088",
      latitude: "27.490996",
      longitude: "-97.735925",
      ignition: "ON",
      speed: "99",
      createdOn: "05 05 2026",
      lastSync: "05 05 2026",
      status: "Active",
    },
    {
      id: 6,
      deviceId: "DEV-1006",
      carrierId: "C-06",
      carrierName: "Swift Transportation",
      deviceModel: "VG34",
      serialNumber: "8SN-ABC12351",
      truckNumber: "TRK-091",
      latitude: "30.250661",
      longitude: "-99.460743",
      ignition: "ON",
      speed: "66",
      createdOn: "05 05 2026",
      lastSync: "05 05 2026",
      status: "Active",
    },
    {
      id: 7,
      deviceId: "DEV-1007",
      carrierId: "C-07",
      carrierName: "J.B. Hunt",
      deviceModel: "Samsara VG34",
      serialNumber: "SN-ABC12354",
      truckNumber: "TRK-054",
      latitude: "31.924816",
      longitude: "-78.393921",
      ignition: "ON",
      speed: "76",
      createdOn: "05 05 2026",
      lastSync: "05 05 2026",
      status: "Active",
    },
  ];

  const columns = [
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
        <Typography
          variant="body2"
          sx={{
            color: params.value === "Active" ? "#2e7d32" : "#ed6c02",
          }}
        >
          {params.value}
        </Typography>
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
  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <DeviceManagementHeader
          data={data}
          setData={setData}
          searchKey={searchQuery}
          summaryCards={summaryCards}
          mode={mode}
          setMode={setMode}
          handleClick={handleClick}
        />
        <CommonDataGrid
          columnsData={columns}
          rowData={mockData}
          data={{
            ...data,
            total: data.total,
            isLoading: data.isLoading,
          }}
          setData={setData}
          paginationMode="server"
          getRowHeight={() => "auto"}
        />
      </PageContainer>
    </>
  );
};

export default DeviceManagement;
