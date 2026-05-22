import React, { useEffect } from "react";
import { Grid, MenuItem, FormControl, InputLabel, Select, FormHelperText } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonDialogForm from "@src/common/CommonDialogForm";
import CommonTextField from "@src/common/CommonTextField";
import { DialogFormContainer } from "./DeviceModelManagement.styled.jsx";
import {
  DEVICE_MODEL_ASSET_OPTIONS,
  DEVICE_MODEL_ELOG_OPTIONS,
} from "./Constants";

const ADD_DEVICE_MODEL_FORM_ID = "add-device-model-form";

const validationSchema = yup.object({
  modelName: yup
    .string()
    .trim()
    .required("Model Name is required")
    .min(2, "Model Name must be at least 2 characters")
    .max(100, "Model Name must not exceed 100 characters"),

  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must not exceed 500 characters"),

  assetType: yup
    .string()
    .required("Asset Type is required"),

  eLogs: yup
    .string()
    .required("E-Logs is required"),

  status: yup
    .string()
    .when('$isEditMode', {
      is: true,
      then: (schema) => schema.required("Status is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

const getDefaultValues = (selectedDeviceModel, isEditMode) => {
  if (isEditMode && selectedDeviceModel) {
    return {
      modelName: selectedDeviceModel.model || "",
      description: selectedDeviceModel.description || "",
      assetType: selectedDeviceModel.assetType || "",
      eLogs: selectedDeviceModel.eLogs || "",
      status: selectedDeviceModel.status || "Active",
    };
  }
  return {
    modelName: "",
    description: "",
    assetType: "",
    eLogs: "",
    status: "Active",
  };
};

const AddDeviceModelDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  isEditMode = false,
  isEditing = false,
  selectedDeviceModel,
  headerActions,
}) => {
  const isDisabled = isEditMode && !isEditing;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: getDefaultValues(selectedDeviceModel, isEditMode),
    context: { isEditMode },
  });

  useEffect(() => {
    if (open) {
      reset(getDefaultValues(selectedDeviceModel, isEditMode));
    }
  }, [open, selectedDeviceModel, isEditMode, reset]);

  const handleCancel = () => {
    // Always close the popup when Cancel button is clicked
    reset(getDefaultValues(null, false));
    onClose();
  };

  const submitHandler = (data) => {
    onSubmit(data);
    reset(getDefaultValues(null, false));
  };

  const renderModelNameField = ({ field }) => (
    <CommonTextField
      {...field}
      label="Model Name"
      required
      disabled={loading || isDisabled}
      error={!!errors.modelName}
      helperText={errors.modelName?.message}
      fullWidth
      size="small"
      placeholder="Enter model name"
    />
  );

  const renderDescriptionField = ({ field }) => (
    <CommonTextField
      {...field}
      label="Description"
      required
      disabled={loading || isDisabled}
      error={!!errors.description}
      helperText={errors.description?.message}
      fullWidth
      size="small"
      multiline
      rows={3}
      placeholder="Enter description"
    />
  );

  const renderAssetTypeField = ({ field }) => (
    <FormControl fullWidth size="small" error={!!errors.assetType} disabled={loading || isDisabled}>
      <InputLabel id="asset-type-label" required>Asset Type</InputLabel>
      <Select
        {...field}
        labelId="asset-type-label"
        label="Asset Type"
      >
        {DEVICE_MODEL_ASSET_OPTIONS.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {errors.assetType && <FormHelperText>{errors.assetType.message}</FormHelperText>}
    </FormControl>
  );

  const renderELogsField = ({ field }) => (
    <FormControl fullWidth size="small" error={!!errors.eLogs} disabled={loading || isDisabled}>
      <InputLabel id="elogs-label" required>E-Logs</InputLabel>
      <Select
        {...field}
        labelId="elogs-label"
        label="E-Logs"
      >
        {DEVICE_MODEL_ELOG_OPTIONS.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {errors.eLogs && <FormHelperText>{errors.eLogs.message}</FormHelperText>}
    </FormControl>
  );

  const renderStatusField = ({ field }) => (
    <FormControl fullWidth size="small" error={!!errors.status} disabled={loading || isDisabled}>
      <InputLabel id="status-label" required>Status</InputLabel>
      <Select
        {...field}
        labelId="status-label"
        label="Status"
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </Select>
      {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
    </FormControl>
  );

  const formContent = (
    <form id={ADD_DEVICE_MODEL_FORM_ID} onSubmit={handleSubmit(submitHandler)}>
      <DialogFormContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="modelName"
              control={control}
              render={renderModelNameField}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={renderDescriptionField}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="assetType"
              control={control}
              render={renderAssetTypeField}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="eLogs"
              control={control}
              render={renderELogsField}
            />
          </Grid>

          {isEditMode && (
            <Grid item xs={12}>
              <Controller
                name="status"
                control={control}
                render={renderStatusField}
              />
            </Grid>
          )}
        </Grid>
      </DialogFormContainer>
    </form>
  );

  const getTitle = () => {
    if (isEditMode) return "View Device Model";
    return "Add Device Model";
  };

  const getSubmitButtonText = () => {
    if (isEditMode) {
      return isEditing ? "Update" : "Save";
    }
    return "Add Device";
  };

  return (
    <CommonDialogForm
      open={open}
      title={getTitle()}
      content={formContent}
      formId={ADD_DEVICE_MODEL_FORM_ID}
      onCancel={handleCancel}
      loading={loading}
      submitButtonText={getSubmitButtonText()}
      maxWidth="sm"
      headerActions={headerActions}
      hideActions={isEditMode && !isEditing}
    />
  );
};

export default AddDeviceModelDialog;
