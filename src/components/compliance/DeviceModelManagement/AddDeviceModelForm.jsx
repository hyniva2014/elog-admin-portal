import React, { useEffect } from "react";
import { Grid, MenuItem } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonTextField from "@src/common/CommonTextField";
import { DialogFormContainer } from "./DeviceModelManagement.styled.jsx";
import {
  DEVICE_MODEL_ASSET_OPTIONS,
  DEVICE_MODEL_ELOG_OPTIONS,
  DEVICE_MODEL_STATUS_OPTIONS,
} from "./Constants";

const assetOptionElements = DEVICE_MODEL_ASSET_OPTIONS.map(({ value, label }) => (
  <MenuItem key={value} value={value}>{label}</MenuItem>
));

const elogOptionElements = DEVICE_MODEL_ELOG_OPTIONS.map(({ value, label }) => (
  <MenuItem key={value} value={value}>{label}</MenuItem>
));

const statusOptionElements = DEVICE_MODEL_STATUS_OPTIONS.map(({ value, label }) => (
  <MenuItem key={value} value={value}>{label}</MenuItem>
));

export const ADD_DEVICE_MODEL_FORM_ID = "add-device-model-form";

export const validationSchema = yup.object({
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

  assetType: yup.string().required("Asset Type is required"),

  eLogs: yup.string().required("E-Logs is required"),

  status: yup.string().nullable(),
});

export const initialValues = {
  modelName: "",
  description: "",
  assetType: "",
  eLogs: "",
  status: "",
};

const AddDeviceModelForm = ({ formId, defaultValues, isEditing, isEditMode, loading, onSubmit }) => {
  const isDisabled = isEditMode && !isEditing;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || initialValues,
  });

  useEffect(() => {
    reset(defaultValues || initialValues);
  }, [defaultValues, reset]);

  const submitHandler = (data) => {
    onSubmit(data);
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

  return (
    <form id={formId} onSubmit={handleSubmit(submitHandler)}>
      <DialogFormContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller name="modelName" control={control} render={renderModelNameField} />
          </Grid>

          <Grid item xs={12}>
            <Controller name="description" control={control} render={renderDescriptionField} />
          </Grid>

          <Grid item xs={12}>
            <CommonTextField
              name="assetType"
              control={control}
              label="Asset Type"
              required
              disabled={loading || isDisabled}
              error={!!errors.assetType}
              helperText={errors.assetType?.message}
            >
              {assetOptionElements}
            </CommonTextField>
          </Grid>

          <Grid item xs={12}>
            <CommonTextField
              name="eLogs"
              control={control}
              label="E-Logs"
              required
              disabled={loading || isDisabled}
              error={!!errors.eLogs}
              helperText={errors.eLogs?.message}
            >
              {elogOptionElements}
            </CommonTextField>
          </Grid>

          {isEditMode && (
            <Grid item xs={12}>
              <CommonTextField
                name="status"
                control={control}
                label="Status"
                disabled={loading || isDisabled}
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                {statusOptionElements}
              </CommonTextField>
            </Grid>
          )}
        </Grid>
      </DialogFormContainer>
    </form>
  );
};

export default AddDeviceModelForm;
