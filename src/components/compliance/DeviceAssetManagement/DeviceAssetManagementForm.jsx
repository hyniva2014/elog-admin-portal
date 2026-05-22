import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { FormBox, StyledForm } from "./DeviceAssetManagement.styles";
import CommonTextField from "../../../common/CommonTextField";
import { DEVICE_ASSET_STATUS_FILTER_OPTIONS } from "./Constants";

const validationSchema = yup.object({
  modelName: yup.string().required("Model Name is required"),
  serialNumber: yup.string().required("Serial Number is required"),
  status: yup.string().nullable(),
});

const initialValues = {
  modelName: "",
  serialNumber: "",
  status: "",
};

const DeviceAssetManagementForm = ({
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
            name="serialNumber"
            control={control}
            render={({ field }) => (
              <CommonTextField
                {...field}
                label="Serial Number"
                required
                disabled={isDisabled}
                error={!!errors.serialNumber}
                helperText={errors.serialNumber?.message}
                fullWidth
                size="small"
              />
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
                  {DEVICE_ASSET_STATUS_FILTER_OPTIONS.map((option) => (
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

export default DeviceAssetManagementForm;
