import React, { useCallback } from "react";
import { Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import { StyledForm } from "./DeviceModelManagement.styled";
import CommonTextField from "@src/common/CommonTextField";
import CommonTextFieldStyled from "@src/common/CommonTextField.styles";
import { ASSET_TYPE_FILTER_OPTIONS, ELOGS_FILTER_OPTIONS, DEVICE_MODEL_STATUS_FILTER_OPTIONS } from "./Constants";

const validationSchema = yup.object({
  modelName: yup.string().required("Model Name is required"),
  description: yup.string().required("Description is required"),
  assetType: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Asset Type is required"),
  supportsElogs: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("E-Logs is required"),
  status: yup.number().nullable(),
});

const initialValues = {
  deviceCode: "",
  modelName: "",
  description: "",
  assetType: "",
  supportsElogs: "",
  status: 1,
};

const assetTypeOptions = ASSET_TYPE_FILTER_OPTIONS.map((option) => (
  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
));

const elogsOptions = ELOGS_FILTER_OPTIONS.map((option) => (
  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
));

const statusOptions = DEVICE_MODEL_STATUS_FILTER_OPTIONS.map((option) => (
  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
));

const DeviceModelManagementForm = ({
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || initialValues,
  });

  const renderModelNameField = useCallback(
    ({ field }) => (
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
    ),
    [isDisabled, errors.modelName],
  );

  const renderDescriptionField = useCallback(
    ({ field }) => (
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
        rows={3}
      />
    ),
    [isDisabled, errors.description],
  );

  const renderAssetTypeField = useCallback(
    ({ field }) => (
      <CommonTextFieldStyled
        {...field}
        size="small"
        label="Asset Type"
        select
        required
        disabled={isDisabled}
        error={!!errors.assetType}
        helperText={errors.assetType?.message}
        fullWidth
        InputLabelProps={{ shrink: Boolean(field.value) || isDisabled }}
      >
        {assetTypeOptions}
      </CommonTextFieldStyled>
    ),
    [isDisabled, errors.assetType],
  );

  const renderSupportsElogsField = useCallback(
    ({ field }) => (
      <CommonTextFieldStyled
        {...field}
        size="small"
        label="E-Logs"
        select
        required
        disabled={isDisabled}
        error={!!errors.supportsElogs}
        helperText={errors.supportsElogs?.message}
        fullWidth
        InputLabelProps={{ shrink: Boolean(field.value !== "") || isDisabled }}
      >
        {elogsOptions}
      </CommonTextFieldStyled>
    ),
    [isDisabled, errors.supportsElogs],
  );

  const renderStatusField = useCallback(
    ({ field }) => (
      <CommonTextFieldStyled
        {...field}
        size="small"
        label="Status"
        select
        disabled={isDisabled}
        fullWidth
        InputLabelProps={{ shrink: Boolean(field.value !== "") || isDisabled }}
      >
        {statusOptions}
      </CommonTextFieldStyled>
    ),
    [isDisabled],
  );

  return (
    <StyledForm id={formId} onSubmit={handleSubmit(onSubmit)}>
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
            name="supportsElogs"
            control={control}
            render={renderSupportsElogsField}
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
    </StyledForm>
  );
};

export default DeviceModelManagementForm;
