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

// ─── Named render functions (V1 fix: no inline functions in JSX props) ────────

const renderCarrierIdField =
  ({ errors, onCarrierIdChange, loading }) =>
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
  );

const renderSerialNumberField =
  ({ errors, loading }) =>
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
  );

const renderCarrierNameField = () => ({ field }) => (
  <CommonTextField {...field} label="Carrier Name" disabled fullWidth size="small" />
);

const renderDeviceModelField =
  ({ onDeviceModelChange, loading }) =>
  ({ field }) => (
    <CommonAutocompleteDropdown
      label="Device Model"
      value={field.value}
      options={DEVICE_MODEL_FILTER_OPTIONS}
      onChange={onDeviceModelChange}
      disabled={loading}
    />
  );

const renderFirmwareVersionField =
  ({ loading }) =>
  ({ field }) => (
    <CommonTextField
      {...field}
      label="Firmware Version"
      disabled={loading}
      fullWidth
      size="small"
      placeholder="v2.4.1"
    />
  );

const renderCurrentStatusField =
  ({ loading }) =>
  ({ field }) => (
    <CommonTextField
      {...field}
      label="Current Status"
      disabled={loading}
      fullWidth
      size="small"
      placeholder="In Stock"
    />
  );

const renderStatusField =
  ({ errors, onStatusChange, loading }) =>
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
  );

const renderTruckNumberField =
  ({ errors, onTruckNumberChange, loading }) =>
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
  );

const renderVinNoField =
  ({ loading }) =>
  ({ field }) => (
    <CommonTextField
      {...field}
      label="VIN No"
      disabled={loading}
      fullWidth
      size="small"
      placeholder="1HGBH41JXMN109186"
    />
  );

const renderPlateNumberField =
  ({ loading }) =>
  ({ field }) => (
    <CommonTextField
      {...field}
      label="Plate Number"
      disabled={loading}
      fullWidth
      size="small"
      placeholder="FL-01-201"
    />
  );

const renderMakeField =
  ({ onMakeChange, loading }) =>
  ({ field }) => (
    <CommonAutocompleteDropdown
      label="Make"
      value={field.value}
      options={MAKE_OPTIONS}
      onChange={onMakeChange}
      disabled={loading}
    />
  );

const renderModelField =
  ({ loading }) =>
  ({ field }) => (
    <CommonTextField
      {...field}
      label="Model"
      disabled={loading}
      fullWidth
      size="small"
      placeholder="Freightliner"
    />
  );

const renderYearField =
  ({ errors, loading }) =>
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
  );

const renderGvwrField =
  ({ onGvwrChange, loading }) =>
  ({ field }) => (
    <CommonAutocompleteDropdown
      label="GVWR"
      value={field.value}
      options={GVWR_OPTIONS}
      onChange={onGvwrChange}
      disabled={loading}
    />
  );

const renderRegistrationStateField =
  ({ onRegistrationStateChange, loading }) =>
  ({ field }) => (
    <CommonAutocompleteDropdown
      label="Registration State"
      value={field.value}
      options={STATE_OPTIONS}
      onChange={onRegistrationStateChange}
      disabled={loading}
    />
  );

// ─── AddDeviceForm Component ──────────────────────────────────────────────────

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
}) => (
  <form id={ADD_DEVICE_FORM_ID} onSubmit={onSubmit}>
    <DialogFormContainer>
      <Grid container spacing={2}>

        {/* ── Device Information ── */}
        <Grid item xs={12}>
          <SectionHeader>DEVICE INFORMATION</SectionHeader>
          <Divider />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="carrierId"
            control={control}
            render={renderCarrierIdField({ errors, onCarrierIdChange, loading })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="serialNumber"
            control={control}
            render={renderSerialNumberField({ errors, loading })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="carrierName"
            control={control}
            render={renderCarrierNameField()}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="deviceModel"
            control={control}
            render={renderDeviceModelField({ onDeviceModelChange, loading })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="firmwareVersion"
            control={control}
            render={renderFirmwareVersionField({ loading })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="currentStatus"
            control={control}
            render={renderCurrentStatusField({ loading })}
          />
        </Grid>

        {/* ── Current Status ── */}
        <Grid item xs={12}>
          <SectionHeader>CURRENT STATUS</SectionHeader>
          <Divider />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="status"
            control={control}
            render={renderStatusField({ errors, onStatusChange, loading })}
          />
        </Grid>

        {/* ── Vehicle Details ── */}
        <Grid item xs={12}>
          <SectionHeader>VEHICLE DETAILS</SectionHeader>
          <Divider />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="truckNumber"
            control={control}
            render={renderTruckNumberField({ errors, onTruckNumberChange, loading })}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="vinNo"
            control={control}
            render={renderVinNoField({ loading })}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="plateNumber"
            control={control}
            render={renderPlateNumberField({ loading })}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="make"
            control={control}
            render={renderMakeField({ onMakeChange, loading })}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="model"
            control={control}
            render={renderModelField({ loading })}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="year"
            control={control}
            render={renderYearField({ errors, loading })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="gvwr"
            control={control}
            render={renderGvwrField({ onGvwrChange, loading })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="registrationState"
            control={control}
            render={renderRegistrationStateField({ onRegistrationStateChange, loading })}
          />
        </Grid>

      </Grid>
    </DialogFormContainer>
  </form>
);

export default AddDeviceForm;
