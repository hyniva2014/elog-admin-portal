import { Grid } from "@mui/material";
import FormSection from "../HeaderComponents/FormSection";
import CommonTextField from "../../../../common/CommonTextField";
import { formatPhoneNumber } from "../../AccountManagement/utils";
import {
  filterNameInput,
  formatZipCode,
  RegistrationState,
} from "../Constants";
import CommonAutocompleteDropdown from "../../../../common/CommonAutocompleteDropdown";
import { CategoryTitle } from "../CareerManagement.styled";
import { Controller } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";
const ContactInformationSection = ({
  control,
  errors,
  editMode,
  watch,
  handleAddressChange,
  handleSecondaryAddressChange,
  setValue,
  sameAsPrimary,
  isInitializing,
  dynamicStates,
  loadingStates,
  selectedCountry,
  selectedSecondaryCountry,
  secondaryDynamicStates,
  loadingSecondaryStates,
  handleSameAddressToggle,
}) => {
  return (
    <FormSection
      id="contact-information"
      title="Contact Information"
      subtitle="Email, phone and address details"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CommonTextField
                label="Email"
                required
                disabled={!editMode}
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <CommonTextField
                label="Phone Number"
                required
                disabled={!editMode}
                {...field}
                onChange={(e) => {
                  const formattedValue = formatPhoneNumber(e.target.value);
                  field.onChange(formattedValue);
                }}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                placeholder="(XXX) XXX-XXXX"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="alternate_contact_number"
            control={control}
            render={({ field }) => (
              <CommonTextField
                label="Alternative Phone Number"
                disabled={!editMode}
                {...field}
                onChange={(e) => {
                  const formattedValue = formatPhoneNumber(e.target.value);
                  field.onChange(formattedValue);
                }}
                error={!!errors.alternate_contact_number}
                helperText={errors.alternate_contact_number?.message}
                placeholder="(XXX) XXX-XXXX"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <CategoryTitle>Primary Mailing Address</CategoryTitle>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="address_line1"
            control={control}
            render={({ field }) => (
              <CommonTextField
                label="Address Line"
                required
                disabled={!editMode}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleAddressChange(e.target.value);
                }}
                error={!!errors.address_line1}
                helperText={errors.address_line1?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <CommonTextField
                label="City"
                required
                disabled={!editMode}
                {...field}
                onChange={(e) => {
                  const filteredValue = filterNameInput(e.target.value);
                  field.onChange(filteredValue);
                }}
                shrinkLabel={Boolean(field.value)}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <CommonAutocompleteDropdown
                label="Country"
                value={field.value}
                options={RegistrationState}
                required
                disabled={!editMode}
                {...field}
                onChange={(newValue) => {
                  field.onChange(newValue);
                  if (!newValue || newValue === "") {
                    setValue("states", "");
                    if (sameAsPrimary && !isInitializing) {
                      setValue("secondary_country", "");
                      setValue("secondary_states", "");
                    }
                  } else {
                    setValue("states", "");
                    if (sameAsPrimary) {
                      setValue("secondary_country", newValue);
                      setValue("secondary_states", "");
                    }
                  }
                }}
                shrinkLabel={Boolean(field.value)}
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="states"
            control={control}
            render={({ field }) => (
              <CommonAutocompleteDropdown
                label="State"
                value={field.value}
                options={selectedCountry ? dynamicStates : []}
                required
                disabled={!editMode || loadingStates}
                loading={loadingStates}
                {...field}
                onChange={(newValue) => {
                  field.onChange(newValue);
                  if (sameAsPrimary) {
                    if (newValue) {
                      setValue("secondary_states", newValue);
                    } else {
                      setValue("secondary_states", "");
                    }
                  }
                }}
                shrinkLabel={Boolean(field.value)}
                error={!!errors.states}
                helperText={errors.states?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="zip_code"
            control={control}
            render={({ field }) => (
              <CommonTextField
                label="Zip Code"
                required
                disabled={!editMode}
                {...field}
                onChange={(e) => {
                  const formattedValue = formatZipCode(e.target.value);
                  field.onChange(formattedValue);
                }}
                error={!!errors.zip_code}
                helperText={errors.zip_code?.message}
                inputProps={{ maxLength: 10 }}
              />
            )}
          />
        </Grid>

        {/* <Grid size={12} mb={-1}> */}
        <Grid item xs={12} mb={-1}>
          <Controller
            name="same_as_primary"
            control={control}
            defaultValue={false}
            disabled={!editMode}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      handleSameAddressToggle(e.target.checked);
                    }}
                  />
                }
                label="Secondary address same as primary"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <CategoryTitle>Secondary Mailing Address</CategoryTitle>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="secondary_address_line"
            control={control}
            render={({ field }) => (
              <CommonTextField
                label="Address Line"
                disabled={!editMode}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleSecondaryAddressChange(e.target.value);
                }}
                error={!!errors.secondary_address_line}
                helperText={errors.secondary_address_line?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="secondary_city"
            control={control}
            render={({ field }) => (
              <CommonTextField
                label="City"
                disabled={!editMode}
                {...field}
                onChange={(e) => {
                  const filteredValue = filterNameInput(e.target.value);
                  field.onChange(filteredValue);
                }}
                shrinkLabel={Boolean(field.value)}
                error={!!errors.secondary_city}
                helperText={errors.secondary_city?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="secondary_country"
            control={control}
            render={({ field }) => (
              <CommonAutocompleteDropdown
                label="Country"
                value={field.value}
                options={RegistrationState}
                onChange={(newValue) => {
                  field.onChange(newValue);
                  if ((!newValue || newValue === "") && !isInitializing) {
                    setValue("secondary_states", "");
                  }
                }}
                disabled={!editMode}
                {...field}
                shrinkLabel={Boolean(field.value)}
                error={!!errors.secondary_country}
                helperText={errors.secondary_country?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="secondary_states"
            control={control}
            render={({ field }) => (
              <CommonAutocompleteDropdown
                label="State"
                value={field.value}
                options={selectedSecondaryCountry ? secondaryDynamicStates : []}
                disabled={!editMode || loadingSecondaryStates}
                loading={loadingSecondaryStates}
                {...field}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                shrinkLabel={Boolean(field.value)}
                error={!!errors.secondary_states}
                helperText={errors.secondary_states?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="secondary_zip_code"
            control={control}
            render={({ field }) => (
              <CommonTextField
                label="Zip Code"
                disabled={!editMode}
                {...field}
                onChange={(e) => {
                  const formattedValue = formatZipCode(e.target.value);
                  field.onChange(formattedValue);
                }}
                error={!!errors.secondary_zip_code}
                helperText={errors.secondary_zip_code?.message}
                inputProps={{ maxLength: 10 }}
              />
            )}
          />
        </Grid>
      </Grid>
    </FormSection>
  );
};

export default ContactInformationSection;
