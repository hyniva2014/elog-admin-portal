import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { StyledForm, requiredSelectSx } from "./DeviceModelManagement.styled.jsx";
import CommonTextField from "../../../common/CommonTextField";
import {
  DEVICE_MODEL_ASSET_OPTIONS,
  DEVICE_MODEL_ELOG_OPTIONS,
  DEVICE_MODEL_STATUS_OPTIONS,
} from "./Constants";

const validationSchema = yup.object({
  modelName: yup.string().required("Model Name is required"),
  description: yup.string().required("Description is required"),
  assetType: yup.string().required("Asset Type is required"),
  eLogs: yup.string().required("E-Logs is required"),
  status: yup.string().nullable(),
});

const initialValues = {
  modelName: "",
  description: "",
  assetType: "",
  eLogs: "",
  status: "Active",
};

export const ADD_DEVICE_MODEL_FORM_ID = "addDeviceModelForm";

const AddDeviceModelForm = ({
  formId,
  defaultValues,
  isEditing,
  isEditMode,
  onSubmit,
}) => {
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

  return (
    <StyledForm id={formId} onSubmit={handleSubmit(submitHandler)}>
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
                disabled={isDisabled}
                error={!!errors.modelName}
                helperText={errors.modelName?.message}
                fullWidth
                size="small"
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
                disabled={isDisabled}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
                size="small"
                multiline
                rows={2}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="assetType"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Asset Type"
                disabled={isDisabled}
                error={!!errors.assetType}
                helperText={errors.assetType?.message}
                fullWidth
                size="small"
                InputLabelProps={{ required: true }}
                sx={requiredSelectSx}
              >
                {DEVICE_MODEL_ASSET_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="eLogs"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="E-Logs"
                disabled={isDisabled}
                error={!!errors.eLogs}
                helperText={errors.eLogs?.message}
                fullWidth
                size="small"
                InputLabelProps={{ required: true }}
                sx={requiredSelectSx}
              >
                {DEVICE_MODEL_ELOG_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {isEditMode && (
          <Grid item xs={12}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Status"
                  disabled={isDisabled}
                  fullWidth
                  size="small"
                >
                  {DEVICE_MODEL_STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        )}
      </Grid>
    </StyledForm>
  );
};

export default AddDeviceModelForm;
