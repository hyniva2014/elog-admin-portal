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
import CommonDialogForm from "../../../common/CommonDialogForm";
import DeviceAssetManagementHeader from "./DeviceAssetManagementHeader";
import DeviceAssetManagementForm from "./DeviceAssetManagementForm";
import {
  StatusTypography,
  EditButton,
  CancelEditButton,
} from "./DeviceAssetManagement.styles";

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    modelName: "",
    imeiNumber: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditMode(false);
    setDefaultValues({ modelName: "", imeiNumber: "" });
    setIsAddModalOpen(true);
  };

  const handleViewClick = (row) => {
    setIsEditMode(true);
    setIsEditing(false);
    setDefaultValues({
      modelName: row.deviceModel,
      imeiNumber: row.imei,
    });
    setIsAddModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleAddSubmit = (data) => {
    console.log("Form submitted:", data);
    setIsAddModalOpen(false);
    setDefaultValues({ modelName: "", imeiNumber: "" });
    setIsEditMode(false);
    setIsEditing(false);
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    setDefaultValues({ modelName: "", imeiNumber: "" });
    setIsEditMode(false);
    setIsEditing(false);
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
      renderCell: (params) => (
        <IconButton size="small" color="primary" onClick={() => handleViewClick(params.row)}>
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
    <CommonDialogForm
      open={isAddModalOpen}
      title={isEditMode ? "View Asset" : "Add Asset"}
      mode={isEditMode ? "edit" : "add"}
      formId="addAssetForm"
      onSubmit={handleAddSubmit}
      onCancel={handleAddCancel}
      submitButtonText={isEditMode ? (isEditing ? "Update" : "Save") : "Add Asset"}
      headerActions={
        isEditMode && !isEditing ? (
          <EditButton variant="contained" onClick={handleEditClick}>
            Edit
          </EditButton>
        ) : isEditMode && isEditing ? (
          <CancelEditButton variant="outlined" onClick={handleCancelEdit}>
            Cancel Edit
          </CancelEditButton>
        ) : null
      }
      content={
        <DeviceAssetManagementForm
          formId="addAssetForm"
          defaultValues={defaultValues}
          isEditing={isEditing}
          isEditMode={isEditMode}
          onSubmit={handleAddSubmit}
        />
      }
    />
    </>
  );
};

export default DeviceAssetManagement;
