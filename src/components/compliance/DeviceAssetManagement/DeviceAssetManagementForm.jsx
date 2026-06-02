import React, { useEffect, useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { StyledForm } from "./DeviceAssetManagement.styles";

import { DEVICE_ASSET_STATUS_FILTER_OPTIONS } from "./Constants";
import CommonAutocompleteDropdown from "../../../common/CommonAutocompleteDropdown";
import CommonTextField from "../../../common/CommonTextField";
import { useServices } from "../../../services/services";

const validationSchema = yup.object({
  modelName: yup.string().required("Model Name is required"),
  serialNumber: yup.string().required("Serial Number is required"),
  status: yup.string().nullable(),
});

const initialValues = {
  modelName: "",
  serialNumber: "",
  imei: "",
  iccid: "",
  bleMacAddress: "",
  status: "",
};

const renderStatusOptions = () => {
  return DEVICE_ASSET_STATUS_FILTER_OPTIONS.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));
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
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || initialValues,
  });
  const [modelOptions, setModelOptions] = useState([]);
  const { fetchApi } = useServices();

  useEffect(() => {
    reset(defaultValues || initialValues);
  }, [defaultValues, reset]);

  const submitHandler = (data) => {
    onSubmit(data);
  };

  const fetchDeviceModels = async () => {
    try {
      const response = await fetchApi("/masteradmin/get-device-model-dropdown");
      if (response?.statusCode === 200) {
        const formattedOptions = (response?.body?.data || []).map((item) => ({
          label: item.model_name,
          value: item.device_model_id,
        }));

        setModelOptions(formattedOptions);
      }
    } catch (error) {
      console.error("Failed to fetch model dropdown", error);
    }
  };
  useEffect(() => {
    fetchDeviceModels();
  }, []);

  const handleStatusChange = (event) => {
    setValue("status", event.target.value, {
      shouldValidate: true,
    });
  };

  return (
    <StyledForm id={formId} onSubmit={handleSubmit(submitHandler)}>
      <Grid container spacing={2}>
        {/* Model Name Dropdown */}
        <Grid item xs={12}>
          <CommonAutocompleteDropdown
            name="modelName"
            label="Model Name"
            value={watch("modelName")}
            options={modelOptions}
            onChange={(value) =>
              setValue("modelName", value, {
                shouldValidate: true,
              })
            }
            disabled={isDisabled}
            error={!!errors.modelName}
            helperText={errors.modelName?.message}
            required
          />
        </Grid>

        {/* Serial Number */}
        <Grid item xs={12}>
          <CommonTextField
            name="serialNumber"
            label="Serial Number"
            register={register}
            error={!!errors.serialNumber}
            helperText={errors.serialNumber?.message}
            required
            disabled={isDisabled}
            shrinkLabel={!!watch("serialNumber")}
          />
        </Grid>

        <Grid item xs={12}>
          <CommonTextField
            name="imei"
            label="IMEI"
            register={register}
            error={!!errors.imei}
            helperText={errors.imei?.message}
            disabled={isDisabled}
            shrinkLabel={!!watch("imei")}
          />
        </Grid>

        <Grid item xs={12}>
          <CommonTextField
            name="iccid"
            label="ICCID"
            register={register}
            error={!!errors.iccid}
            helperText={errors.iccid?.message}
            disabled={isDisabled}
            shrinkLabel={!!watch("iccid")}
          />
        </Grid>

        <Grid item xs={12}>
          <CommonTextField
            name="bleMacAddress"
            label="BLE_MAC_ADDRESS"
            register={register}
            error={!!errors.bleMacAddress}
            helperText={errors.bleMacAddress?.message}
            disabled={isDisabled}
            shrinkLabel={!!watch("bleMacAddress")}
          />
        </Grid>

        {/* Status Dropdown */}
        {isEditMode && (
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              size="small"
              label="Status"
              value={watch("status")}
              disabled={isDisabled}
              onChange={handleStatusChange}
            >
              {renderStatusOptions()}
            </TextField>
          </Grid>
        )}
      </Grid>
    </StyledForm>
  );
};

export default DeviceAssetManagementForm;
