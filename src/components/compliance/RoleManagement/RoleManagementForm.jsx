import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CommonTextField from "../../../common/CommonTextField";
import { STATUS_OPTIONS } from "../DeviceAssetManagement/Constants";

const validationSchema = yup.object({
  title: yup.string().required("Role Title is required"),

  description: yup.string().required("Description is required"),

  status: yup.number().nullable(),
});

const initialValues = {
  title: "",
  description: "",
  status: 1,
};

const RoleManagementForm = ({
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
    const payload = {
      id: defaultValues?.id,
      title: data.title,
      description: data.description,
      status: data.status,
    };

    onSubmit(payload);
  };

  const renderStatusOptions = () => {
    return STATUS_OPTIONS.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };

  const handleStatusChange = (event) => {
    field.onChange(Number(event.target.value));
  };

  const renderStatusField = () => {
    if (!isEditMode) return null;

    return (
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
              value={field.value ?? ""}
              onChange={handleStatusChange}
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              {renderStatusOptions()}
            </TextField>
          )}
        />
      </Grid>
    );
  };

  return (
    <form id={formId} onSubmit={handleSubmit(submitHandler)}>
      <Grid container spacing={2}>
        <Grid item xs={12} mt={2}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <CommonTextField
                {...field}
                label="Role Title"
                required
                disabled={isDisabled}
                error={!!errors.title}
                helperText={errors.title?.message}
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
                multiline
                rows={2}
                disabled={isDisabled}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
                size="small"
              />
            )}
          />
        </Grid>
        {renderStatusField()}
      </Grid>
    </form>
  );
};

export default RoleManagementForm;
