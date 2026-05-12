import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  IconButton,
  Stack,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { ComponentContainerCard } from "@src/components";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import eyeIcon from "../../../assets/images/svg/eyeicon.png";
import CommonLoading from "../../../common/CommonLoading";
import DeviceAssetManagementHeader from "./DeviceAssetManagementHeader";

const DeviceAssetManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modelType, setModelType] = useState("");
  const [status, setStatus] = useState("");
  const { setLoading, LoadingContainer } = CommonLoading();
  const [data, setData] = useState({
    isLoading: false,
  });
  const [mode, setMode] = useState("");
  const [summaryCards, setSummaryCards] = useState([]);

  const handleClick = () => {
    // Handle add button click
    console.log("Add device asset clicked");
  };

  const mockData = [
    {
      id: 1,
      imei: "356938090123456",
      deviceModel: "Geotab GO9",
      ignition: "ON",
      status: "Active",
    },
    {
      id: 2,
      imei: "356938090123457",
      deviceModel: "Samsara VG34",
      ignition: "OFF",
      status: "In Active",
    },
    {
      id: 3,
      imei: "356938090123458",
      deviceModel: "KeepTruckin K5",
      ignition: "ON",
      status: "Active",
    },
    {
      id: 4,
      imei: "356938090123459",
      deviceModel: "Omnitracs IVG",
      ignition: "OFF",
      status: "Active",
    },
    {
      id: 5,
      imei: "356938090123460",
      deviceModel: "VG34",
      ignition: "ON",
      status: "In Active",
    },
  ];

  const columns = [
    {
      field: "imei",
      headerName: "IMEI Number",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "deviceModel",
      headerName: "Device Model",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "ignition",
      headerName: "Ignition",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            color: params.value === "Active" ? "#2e7d32" : "#c62828",
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
      <DeviceAssetManagementHeader
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

export default DeviceAssetManagement;
