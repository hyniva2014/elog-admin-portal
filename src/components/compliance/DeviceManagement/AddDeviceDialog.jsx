import { useEffect } from "react";
import { Divider, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonTextField from "../../../common/CommonTextField";
import CommonAutocompleteDropdown from "../../../common/CommonAutocompleteDropdown";
import { DialogFormContainer, SectionHeader } from "./DeviceManagement.styles";

import {
  DEVICE_CARRIER_ID_FILTER_OPTIONS,
  DEVICE_MODEL_FILTER_OPTIONS,
  DEVICE_STATUS_FILTER_OPTIONS,
  DEVICE_TRUCK_FILTER_OPTIONS,
} from "./Constants";

const ADD_DEVICE_FORM_ID = "add-device-form";

const GVWR_OPTIONS = [
  { value: "26,001 lbs", label: "26,001 lbs" },
  { value: "33,001 lbs", label: "33,001 lbs" },
  { value: "60,000 lbs", label: "60,000 lbs" },
  { value: "80,000 lbs", label: "80,000 lbs" },
];

const MAKE_OPTIONS = [
  { value: "Daimler", label: "Daimler" },
  { value: "Freightliner", label: "Freightliner" },
  { value: "Kenworth", label: "Kenworth" },
  { value: "Peterbilt", label: "Peterbilt" },
  { value: "Volvo", label: "Volvo" },
];

const STATE_OPTIONS = [
  { value: "Alabama", label: "Alabama" },
  { value: "Alaska", label: "Alaska" },
  { value: "Arizona", label: "Arizona" },
  { value: "California", label: "California" },
  { value: "Florida", label: "Florida" },
  { value: "Texas", label: "Texas" },
];

const validationSchema = yup.object({
  carrierId: yup.string().required("Carrier ID is required"),
  serialNumber: yup.string().required("Serial Number is required"),
  carrierName: yup.string().nullable(),
  deviceModel: yup.string().nullable(),
  firmwareVersion: yup.string().nullable(),
  currentStatus: yup.string().nullable(),
  status: yup.string().required("Status is required"),
  truckNumber: yup.string().required("Truck No is required"),
  vinNo: yup.string().nullable(),
  plateNumber: yup.string().nullable(),
  make: yup.string().nullable(),
  model: yup.string().nullable(),
  year: yup
    .string()
    .matches(/^\d{4}$/, "Year must be 4 digits")
    .nullable(),
  gvwr: yup.string().nullable(),
  registrationState: yup.string().nullable(),
});

const defaultValues = {
  carrierId: "",
  serialNumber: "",
  carrierName: "",
  deviceModel: "",
  firmwareVersion: "",
  currentStatus: "",
  status: "",
  truckNumber: "",
  vinNo: "",
  plateNumber: "",
  make: "",
  model: "",
  year: "",
  gvwr: "",
  registrationState: "",
};

const AddDeviceDialog = ({ open, onClose, onSubmit, loading = false }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
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

  const submitHandler = (formData) => {
    onSubmit(formData);
    reset(defaultValues);
  };

  const handleDropdownChange = (field) => (value) => {
    setValue(field, value, { shouldValidate: true });
  };

  const formContent = (
    <form id={ADD_DEVICE_FORM_ID} onSubmit={handleSubmit(submitHandler)}>
      <DialogFormContainer>
        <Grid container spacing={2}>

          {/* ── DEVICE INFORMATION ── */}
          <Grid item xs={12}>
            <SectionHeader>DEVICE INFORMATION</SectionHeader>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="carrierId"
              control={control}
              render={({ field }) => (
                <CommonAutocompleteDropdown
                  label="Carrier ID"
                  value={field.value}
                  options={DEVICE_CARRIER_ID_FILTER_OPTIONS}
                  onChange={handleDropdownChange("carrierId")}
                  required
                  error={!!errors.carrierId}
                  helperText={errors.carrierId?.message}
                  disabled={loading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="serialNumber"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Serial Number"
                  required
                  disabled={loading}
                  error={!!errors.serialNumber}
                  helperText={errors.serialNumber?.message}
                  fullWidth
                  size="small"
                  placeholder="SN-ABC12345"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="carrierName"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Carrier Name"
                  disabled
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="deviceModel"
              control={control}
              render={({ field }) => (
                <CommonAutocompleteDropdown
                  label="Device Model"
                  value={field.value}
                  options={DEVICE_MODEL_FILTER_OPTIONS}
                  onChange={handleDropdownChange("deviceModel")}
                  disabled={loading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="firmwareVersion"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Firmware Version"
                  disabled={loading}
                  fullWidth
                  size="small"
                  placeholder="v2.4.1"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="currentStatus"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Current Status"
                  disabled={loading}
                  fullWidth
                  size="small"
                  placeholder="In Stock"
                />
              )}
            />
          </Grid>

          {/* ── CURRENT STATUS ── */}
          <Grid item xs={12}>
            <SectionHeader>CURRENT STATUS</SectionHeader>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <CommonAutocompleteDropdown
                  label="Status"
                  value={field.value}
                  options={DEVICE_STATUS_FILTER_OPTIONS}
                  onChange={handleDropdownChange("status")}
                  required
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  disabled={loading}
                />
              )}
            />
          </Grid>

          {/* ── VEHICLE DETAILS ── */}
          <Grid item xs={12}>
            <SectionHeader>VEHICLE DETAILS</SectionHeader>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="truckNumber"
              control={control}
              render={({ field }) => (
                <CommonAutocompleteDropdown
                  label="Truck No"
                  value={field.value}
                  options={DEVICE_TRUCK_FILTER_OPTIONS}
                  onChange={handleDropdownChange("truckNumber")}
                  required
                  error={!!errors.truckNumber}
                  helperText={errors.truckNumber?.message}
                  disabled={loading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="vinNo"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="VIN No"
                  disabled={loading}
                  fullWidth
                  size="small"
                  placeholder="1HGBH41JXMN109186"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="plateNumber"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Plate Number"
                  disabled={loading}
                  fullWidth
                  size="small"
                  placeholder="FL-01-201"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="make"
              control={control}
              render={({ field }) => (
                <CommonAutocompleteDropdown
                  label="Make"
                  value={field.value}
                  options={MAKE_OPTIONS}
                  onChange={handleDropdownChange("make")}
                  disabled={loading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Model"
                  disabled={loading}
                  fullWidth
                  size="small"
                  placeholder="Freightliner"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Year"
                  disabled={loading}
                  fullWidth
                  size="small"
                  placeholder="2025"
                  error={!!errors.year}
                  helperText={errors.year?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="gvwr"
              control={control}
              render={({ field }) => (
                <CommonAutocompleteDropdown
                  label="GVWR"
                  value={field.value}
                  options={GVWR_OPTIONS}
                  onChange={handleDropdownChange("gvwr")}
                  disabled={loading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="registrationState"
              control={control}
              render={({ field }) => (
                <CommonAutocompleteDropdown
                  label="Registration State"
                  value={field.value}
                  options={STATE_OPTIONS}
                  onChange={handleDropdownChange("registrationState")}
                  disabled={loading}
                />
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
      title="Assign Device to Carrier"
      content={formContent}
      formId={ADD_DEVICE_FORM_ID}
      onCancel={handleCancel}
      loading={loading}
      submitButtonText="Save"
      maxWidth="md"
    />
  );
};

export default AddDeviceDialog;
