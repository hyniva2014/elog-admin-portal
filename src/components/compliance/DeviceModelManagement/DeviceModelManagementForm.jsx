import React, { useCallback, useEffect } from "react";
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
  deviceCode: yup.string().required("Model Code is required"),
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

const createMenuItems = (options) =>
  options.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

const getShrinkValue = (fieldValue, isDisabled) => {
  return (fieldValue !== "" && fieldValue != null) || isDisabled;
};

const assetTypeOptions = createMenuItems(ASSET_TYPE_FILTER_OPTIONS);
const elogsOptions = createMenuItems(ELOGS_FILTER_OPTIONS);
const statusOptions = createMenuItems(DEVICE_MODEL_STATUS_FILTER_OPTIONS);

const DeviceModelManagementForm = ({
  formId,
  defaultValues,
  isEditing,
  isEditMode,
  onSubmit,
  onDirtyChange,
}) => {
  const isDisabled = isEditMode && !isEditing;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || initialValues,
  });

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  useEffect(() => {
    reset(defaultValues || initialValues);
  }, [defaultValues, reset]);

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

  const renderModelCodeField = useCallback(
    ({ field }) => (
      <CommonTextField
        {...field}
        label="Model Code"
        required
        disabled={isDisabled}
        error={!!errors.deviceCode}
        helperText={errors.deviceCode?.message}
        fullWidth
        size="small"
      />
    ),
    [isDisabled, errors.deviceCode],
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
    ({ field }) => {
      const assetTypeLabel = ASSET_TYPE_FILTER_OPTIONS.find(
        (option) => String(option.value) === String(field.value),
      )?.label;

      if (isDisabled) {
        return (
          <CommonTextField
            {...field}
            value={assetTypeLabel || ""}
            label="Asset Type"
            required
            disabled
            fullWidth
            size="small"
            shrinkLabel={Boolean(assetTypeLabel)}
          />
        );
      }

      return (
        <CommonTextFieldStyled
          {...field}
          size="small"
          label="Asset Type"
          select
          required
          error={!!errors.assetType}
          helperText={errors.assetType?.message}
          fullWidth
          InputLabelProps={{
            shrink: getShrinkValue(field.value, false),
            required: true,
          }}
        >
          {assetTypeOptions}
        </CommonTextFieldStyled>
      );
    },
    [isDisabled, errors.assetType],
  );

  const renderSupportsElogsField = useCallback(
    ({ field }) => {
      const elogsLabel = ELOGS_FILTER_OPTIONS.find(
        (option) => String(option.value) === String(field.value),
      )?.label;

      if (isDisabled) {
        return (
          <CommonTextField
            {...field}
            value={elogsLabel || ""}
            label="Select E-Log"
            required
            disabled
            fullWidth
            size="small"
            shrinkLabel={Boolean(elogsLabel)}
          />
        );
      }

      return (
        <CommonTextFieldStyled
          {...field}
          size="small"
          label="Select E-Log"
          select
          required
          error={!!errors.supportsElogs}
          helperText={errors.supportsElogs?.message}
          fullWidth
          InputLabelProps={{
            shrink: getShrinkValue(field.value, false),
            required: true,
          }}
        >
          {elogsOptions}
        </CommonTextFieldStyled>
      );
    },
    [isDisabled, errors.supportsElogs],
  );

  const renderStatusField = useCallback(
    ({ field }) => {
      const statusLabel = DEVICE_MODEL_STATUS_FILTER_OPTIONS.find(
        (option) => String(option.value) === String(field.value),
      )?.label;

      if (isDisabled) {
        return (
          <CommonTextField
            {...field}
            value={statusLabel || ""}
            label="Status"
            disabled
            fullWidth
            size="small"
            shrinkLabel={Boolean(statusLabel)}
          />
        );
      }

      return (
        <CommonTextFieldStyled
          {...field}
          size="small"
          label="Status"
          select
          fullWidth
          InputLabelProps={{ shrink: getShrinkValue(field.value, false) }}
        >
          {statusOptions}
        </CommonTextFieldStyled>
      );
    },
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
            name="deviceCode"
            control={control}
            render={renderModelCodeField}
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
