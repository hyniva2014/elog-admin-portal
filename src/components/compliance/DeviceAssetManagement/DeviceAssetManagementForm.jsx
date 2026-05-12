import React from "react";
import { Box, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormBox } from "./DeviceAssetManagement.styles";

const schema = yup.object().shape({
  modelName: yup.string().required("Model Name is required"),
  imeiNumber: yup
    .string()
    .required("IMEI Number is required")
    .matches(/^[0-9]{15}$/, "IMEI Number must be 15 digits"),
});

const DeviceAssetManagementForm = ({ formId, defaultValues, isEditing, isEditMode, onSubmit }) => {
  const isDisabled = isEditMode && !isEditing;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      modelName: "",
      imeiNumber: "",
    },
  });

  return (
    <FormBox component="form" id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Model Name"
            {...register("modelName")}
            variant="outlined"
            size="small"
            error={!!errors.modelName}
            helperText={errors.modelName?.message}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="IMEI Number"
            {...register("imeiNumber")}
            variant="outlined"
            size="small"
            error={!!errors.imeiNumber}
            helperText={errors.imeiNumber?.message}
            disabled={isDisabled}
          />
        </Grid>
      </Grid>
    </FormBox>
  );
};

export default DeviceAssetManagementForm;
