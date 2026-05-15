import React, { useEffect } from "react";
import { Grid, MenuItem } from "@mui/material";
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

const SelectMenuItem = ({ value, label }) => (
  <MenuItem key={value} value={value}>
    {label}
  </MenuItem>
);

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
});

const defaultValues = {
  modelName: "",
  description: "",
  assetType: "",
  eLogs: "",
};

const AddDeviceModelDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
    }
  }, [open, reset]);

  const handleCancel = () => {
    reset(defaultValues);
    onClose();
  };

  const submitHandler = (data) => {
    onSubmit(data);
    reset(defaultValues);
  };

  const formContent = (
    <form id={ADD_DEVICE_MODEL_FORM_ID} onSubmit={handleSubmit(submitHandler)}>
      <DialogFormContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="modelName"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Model Name"
                  required
                  disabled={loading}
                  error={!!errors.modelName}
                  helperText={errors.modelName?.message}
                  fullWidth
                  size="small"
                  placeholder="Enter model name"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Description"
                  required
                  disabled={loading}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                  placeholder="Enter description"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="assetType"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Asset Type"
                  required
                  disabled={loading}
                  error={!!errors.assetType}
                  helperText={errors.assetType?.message}
                  fullWidth
                  size="small"
                  select
                >
                  {DEVICE_MODEL_ASSET_OPTIONS.map(({ value, label }) => (
                    <SelectMenuItem key={value} value={value} label={label} />
                  ))}
                </CommonTextField>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="eLogs"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="E-Logs"
                  required
                  disabled={loading}
                  error={!!errors.eLogs}
                  helperText={errors.eLogs?.message}
                  fullWidth
                  size="small"
                  select
                >
                  {DEVICE_MODEL_ELOG_OPTIONS.map(({ value, label }) => (
                    <SelectMenuItem key={value} value={value} label={label} />
                  ))}
                </CommonTextField>
              )}
            />
          </Grid>
        </Grid>
      </DialogFormContainer>
    </form>
  );

  return (
    <CommonDialogForm
      open={open}
      title="Add Device Model"
      content={formContent}
      formId={ADD_DEVICE_MODEL_FORM_ID}
      onCancel={handleCancel}
      loading={loading}
      submitButtonText="Add Device"
      maxWidth="sm"
    />
  );
};

export default AddDeviceModelDialog;
