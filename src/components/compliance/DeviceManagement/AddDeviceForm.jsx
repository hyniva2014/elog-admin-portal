import { useCallback } from "react";
import { Divider, Grid } from "@mui/material";
import { Controller } from "react-hook-form";

import CommonTextField from "../../../common/CommonTextField";
import CommonAutocompleteDropdown from "../../../common/CommonAutocompleteDropdown";
import { DialogFormContainer, SectionHeader } from "./DeviceManagement.styles";

import {
  ADD_DEVICE_FORM_ID,
  DEVICE_CARRIER_ID_FILTER_OPTIONS,
  DEVICE_MODEL_FILTER_OPTIONS,
  DEVICE_STATUS_FILTER_OPTIONS,
  DEVICE_TRUCK_FILTER_OPTIONS,
  GVWR_OPTIONS,
  MAKE_OPTIONS,
  STATE_OPTIONS,
} from "./Constants";

// ─── AddDeviceForm ────────────────────────────────────────────────────────────
// Each Controller render prop is a stable named component defined via
// useCallback so React receives a function reference, never a call result.

const AddDeviceForm = ({
  control,
  errors,
  loading,
  onSubmit,
  onCarrierIdChange,
  onDeviceModelChange,
  onStatusChange,
  onTruckNumberChange,
  onMakeChange,
  onGvwrChange,
  onRegistrationStateChange,
}) => {

  // ── Device Information fields ──────────────────────────────────────────────

  const CarrierIdField = useCallback(
    ({ field }) => (
      <CommonAutocompleteDropdown
        label="Carrier ID"
        value={field.value}
        options={DEVICE_CARRIER_ID_FILTER_OPTIONS}
        onChange={onCarrierIdChange}
        required
        error={!!errors.carrierId}
        helperText={errors.carrierId?.message}
        disabled={loading}
      />
    ),
    [errors.carrierId, onCarrierIdChange, loading]
  );

  const SerialNumberField = useCallback(
    ({ field }) => (
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
    ),
    [errors.serialNumber, loading]
  );

  const CarrierNameField = useCallback(
    ({ field }) => (
      <CommonTextField
        {...field}
        label="Carrier Name"
        disabled
        fullWidth
        size="small"
      />
    ),
    []
  );

  const DeviceModelField = useCallback(
    ({ field }) => (
      <CommonAutocompleteDropdown
        label="Device Model"
        value={field.value}
        options={DEVICE_MODEL_FILTER_OPTIONS}
        onChange={onDeviceModelChange}
        disabled={loading}
      />
    ),
    [onDeviceModelChange, loading]
  );

  const FirmwareVersionField = useCallback(
    ({ field }) => (
      <CommonTextField
        {...field}
        label="Firmware Version"
        disabled={loading}
        fullWidth
        size="small"
        placeholder="v2.4.1"
      />
    ),
    [loading]
  );

  const CurrentStatusField = useCallback(
    ({ field }) => (
      <CommonTextField
        {...field}
        label="Current Status"
        disabled={loading}
        fullWidth
        size="small"
        placeholder="In Stock"
      />
    ),
    [loading]
  );

  // ── Current Status fields ──────────────────────────────────────────────────

  const StatusField = useCallback(
    ({ field }) => (
      <CommonAutocompleteDropdown
        label="Status"
        value={field.value}
        options={DEVICE_STATUS_FILTER_OPTIONS}
        onChange={onStatusChange}
        required
        error={!!errors.status}
        helperText={errors.status?.message}
        disabled={loading}
      />
    ),
    [errors.status, onStatusChange, loading]
  );

  // ── Vehicle Detail fields ──────────────────────────────────────────────────

  const TruckNumberField = useCallback(
    ({ field }) => (
      <CommonAutocompleteDropdown
        label="Truck No"
        value={field.value}
        options={DEVICE_TRUCK_FILTER_OPTIONS}
        onChange={onTruckNumberChange}
        required
        error={!!errors.truckNumber}
        helperText={errors.truckNumber?.message}
        disabled={loading}
      />
    ),
    [errors.truckNumber, onTruckNumberChange, loading]
  );

  const VinNoField = useCallback(
    ({ field }) => (
      <CommonTextField
        {...field}
        label="VIN No"
        disabled={loading}
        fullWidth
        size="small"
        placeholder="1HGBH41JXMN109186"
      />
    ),
    [loading]
  );

  const PlateNumberField = useCallback(
    ({ field }) => (
      <CommonTextField
        {...field}
        label="Plate Number"
        disabled={loading}
        fullWidth
        size="small"
        placeholder="FL-01-201"
      />
    ),
    [loading]
  );

  const MakeField = useCallback(
    ({ field }) => (
      <CommonAutocompleteDropdown
        label="Make"
        value={field.value}
        options={MAKE_OPTIONS}
        onChange={onMakeChange}
        disabled={loading}
      />
    ),
    [onMakeChange, loading]
  );

  const ModelField = useCallback(
    ({ field }) => (
      <CommonTextField
        {...field}
        label="Model"
        disabled={loading}
        fullWidth
        size="small"
        placeholder="Freightliner"
      />
    ),
    [loading]
  );

  const YearField = useCallback(
    ({ field }) => (
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
    ),
    [errors.year, loading]
  );

  const GvwrField = useCallback(
    ({ field }) => (
      <CommonAutocompleteDropdown
        label="GVWR"
        value={field.value}
        options={GVWR_OPTIONS}
        onChange={onGvwrChange}
        disabled={loading}
      />
    ),
    [onGvwrChange, loading]
  );

  const RegistrationStateField = useCallback(
    ({ field }) => (
      <CommonAutocompleteDropdown
        label="Registration State"
        value={field.value}
        options={STATE_OPTIONS}
        onChange={onRegistrationStateChange}
        disabled={loading}
      />
    ),
    [onRegistrationStateChange, loading]
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <form id={ADD_DEVICE_FORM_ID} onSubmit={onSubmit}>
      <DialogFormContainer>
        <Grid container spacing={2}>

          {/* ── Device Information ── */}
          <Grid item xs={12}>
            <SectionHeader>DEVICE INFORMATION</SectionHeader>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller name="carrierId" control={control} render={CarrierIdField} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller name="serialNumber" control={control} render={SerialNumberField} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller name="carrierName" control={control} render={CarrierNameField} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller name="deviceModel" control={control} render={DeviceModelField} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller name="firmwareVersion" control={control} render={FirmwareVersionField} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller name="currentStatus" control={control} render={CurrentStatusField} />
          </Grid>

          {/* ── Current Status ── */}
          <Grid item xs={12}>
            <SectionHeader>CURRENT STATUS</SectionHeader>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller name="status" control={control} render={StatusField} />
          </Grid>

          {/* ── Vehicle Details ── */}
          <Grid item xs={12}>
            <SectionHeader>VEHICLE DETAILS</SectionHeader>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller name="truckNumber" control={control} render={TruckNumberField} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller name="vinNo" control={control} render={VinNoField} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller name="plateNumber" control={control} render={PlateNumberField} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller name="make" control={control} render={MakeField} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller name="model" control={control} render={ModelField} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller name="year" control={control} render={YearField} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller name="gvwr" control={control} render={GvwrField} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller name="registrationState" control={control} render={RegistrationStateField} />
          </Grid>

        </Grid>
      </DialogFormContainer>
    </form>
  );
};

export default AddDeviceForm;
