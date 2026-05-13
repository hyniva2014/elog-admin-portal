import React, { useState } from "react";
import { 
  Grid, 
  Typography, 
  Box, 
  Button, 
  TextField, 
  InputAdornment,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack
} from "@mui/material";
import { 
  ComponentContainerCard, 
  PageBreadcrumb 
} from "@src/components";
import { PageContainer } from "@src/common/PageContainer";
import CommonDataGrid from "@src/common/CommonDataGrid";
import CommonSearch from "@src/common/CommonSearch";
import CommonDateRangeSelector from "@src/common/CommonDateRangeSelector";
import DeviceModelManagementHeader from "./DeviceModelManagementHeader";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import { Search, Close } from "@mui/icons-material";
import eyeIcon from "../../../assets/images/svg/eyeicon.png";
import FormInput from "@src/components/form/FormInput";
import SelectInput from "@src/components/form/SelectInput";
import CustomPagination from "@src/common/CustomPagination";

const DeviceModelManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [assetTypeFilter, setAssetTypeFilter] = useState("");
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  const mockData = [
    { id: 1, deviceId: "DEV001", model: "iPhone 14", assetType: "Mobile", description: "Apple iPhone 14 Pro", eLogs: "Enabled", purchasedOn: "2023-01-15", status: "Active" },
    { id: 2, deviceId: "DEV002", model: "Samsung Galaxy S23", assetType: "Mobile", description: "Samsung Galaxy S23 Ultra", eLogs: "Enabled", purchasedOn: "2023-02-20", status: "Active" },
    { id: 3, deviceId: "DEV003", model: "iPad Pro", assetType: "Tablet", description: "Apple iPad Pro 12.9 inch", eLogs: "Disabled", purchasedOn: "2023-03-10", status: "Active" },
    { id: 4, deviceId: "DEV004", model: "MacBook Pro", assetType: "Laptop", description: "Apple MacBook Pro 16 inch", eLogs: "Enabled", purchasedOn: "2023-01-25", status: "Active" },
    { id: 5, deviceId: "DEV005", model: "Dell XPS 15", assetType: "Laptop", description: "Dell XPS 15 9530", eLogs: "Enabled", purchasedOn: "2023-02-15", status: "Active" },
  ];

  const [data, setData] = useState({
    isLoading: false,
  });


  const [tableData, setTableData] = useState({
    page: 1,
    pageSize: 10,
    total: 50,
    isLoading: false,
    data: [
      { id: 1, deviceId: "DEV001", model: "iPhone 14", assetType: "Mobile", description: "Apple iPhone 14 Pro", eLogs: "Enabled", purchasedOn: "2023-01-15", status: "Active" },
      { id: 2, deviceId: "DEV002", model: "Samsung Galaxy S23", assetType: "Mobile", description: "Samsung Galaxy S23 Ultra", eLogs: "Enabled", purchasedOn: "2023-02-20", status: "Active" },
      { id: 3, deviceId: "DEV003", model: "iPad Pro", assetType: "Tablet", description: "Apple iPad Pro 12.9 inch", eLogs: "Disabled", purchasedOn: "2023-03-10", status: "Active" },
      { id: 4, deviceId: "DEV004", model: "MacBook Pro", assetType: "Laptop", description: "Apple MacBook Pro 16 inch", eLogs: "Enabled", purchasedOn: "2023-01-25", status: "Active" },
      { id: 5, deviceId: "DEV005", model: "Dell XPS 15", assetType: "Laptop", description: "Dell XPS 15 9530", eLogs: "Enabled", purchasedOn: "2023-02-15", status: "Active" },
    ]
  });

  const columns = [
    {
      field: "deviceId",
      headerName: "Serial ID",
      flex: 1,
      minWidth: 150,
    },
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
      field: "purchasedOn",
      headerName: "Purchased On",
      flex: 1,
      minWidth: 150,
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
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => handleEdit(params.row)}
          sx={{
            color: "#284495",
            "&:hover": {
              backgroundColor: "rgba(40, 68, 149, 0.04)",
              color: "#1a2e6b"
            }
          }}
        >
          <img src={eyeIcon} alt="view" width={16} height={16} />
        </IconButton>
      ),
    },
  ];

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
  };

  const handleEdit = (row) => {
    console.log("Edit row:", row);
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // Add the new device model to the table
    const newDevice = {
      id: tableData.data.length + 1,
      deviceId: `DEV${String(tableData.data.length + 1).padStart(3, '0')}`,
      model: data.modelName,
      assetType: data.assetType,
      description: data.description,
      eLogs: data.eLogs,
      purchasedOn: new Date().toISOString().split('T')[0],
      status: "Active"
    };
    
    setTableData(prev => ({
      ...prev,
      data: [...prev.data, newDevice],
      total: prev.total + 1
    }));
    
    handleCloseDialog();
  };

  return (
    <>
      <PageContainer>
        {/* Header using DeviceModelManagementHeader */}
        <DeviceModelManagementHeader
          data={tableData}
          setData={setTableData}
          searchKey={searchText}
          handleClick={handleOpenDialog}
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
          slots={{
            pagination: CustomPagination,
          }}
        />
      </PageContainer>

      {/* Add Device Model Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3
          }
        }}
      >
        <DialogTitle sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          pb: 2
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add Device Model
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pt: 0 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormInput
                  name="modelName"
                  label="Model Name"
                  control={control}
                  rules={{ required: "Model Name is required" }}
                  placeholder="Enter model name"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field, fieldState }) => (
                    <Box>
                      <Typography 
                        component="label" 
                        sx={{ 
                          fontWeight: "medium", 
                          fontSize: "14px",
                          color: fieldState.error ? "error.main" : "text.primary"
                        }}
                      >
                        Description
                      </Typography>
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Enter your Description"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <SelectInput
                  name="assetType"
                  label="Asset Type"
                  control={control}
                  rules={{ required: "Asset Type is required" }}
                >
                  <MenuItem value="">Select Asset Type</MenuItem>
                  <MenuItem value="Mobile">Mobile</MenuItem>
                  <MenuItem value="Tablet">Tablet</MenuItem>
                  <MenuItem value="Laptop">Laptop</MenuItem>
                  <MenuItem value="Desktop">Desktop</MenuItem>
                </SelectInput>
              </Grid>

              <Grid item xs={12}>
                <SelectInput
                  name="eLogs"
                  label="E-Logs"
                  control={control}
                  rules={{ required: "E-Logs is required" }}
                >
                  <MenuItem value="">Select E-Logs</MenuItem>
                  <MenuItem value="Enabled">Enabled</MenuItem>
                  <MenuItem value="Disabled">Disabled</MenuItem>
                </SelectInput>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={handleCloseDialog}
              variant="outlined"
              sx={{ 
                borderColor: "#284495",
                color: "#284495",
                "&:hover": {
                  borderColor: "#1a2e6b",
                  backgroundColor: "rgba(40, 68, 149, 0.04)"
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#284495",
                "&:hover": {
                  backgroundColor: "#1a2e6b"
                }
              }}
            >
              Add Device
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default DeviceModelManagement;
