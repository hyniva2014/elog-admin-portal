import { Grid } from "@mui/material";
import FormSection from "../HeaderComponents/FormSection";

import {
  RegistrationState,
  CONTACT_INFO_FIELDS,
  PRIMARY_ADDRESS_FIELDS,
  SECONDARY_ADDRESS_FIELDS,
} from "../Constants";
import { CategoryTitle } from "../CareerManagement.styled";
import { Controller } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";
import FormField from "./FormField";
import FormFieldsSection from "../FormFields/FormFieldsSection";

const getStateOptions = (selectedCountry, dynamicStates) => {
  return selectedCountry ? dynamicStates : [];
};

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
  const optionsMap = {
    RegistrationState,
    dynamicStates,
    secondaryDynamicStates,
  };

  const additionalProps = {
    address_line1: {
      onChange: (e, field) => {
        field.onChange(e);
        handleAddressChange(e.target.value);
      },
    },
    country: {
      onChange: (newValue, field) => {
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
      },
    },
    states: {
      options: getStateOptions(selectedCountry, dynamicStates),
      loading: loadingStates,
      onChange: (newValue, field) => {
        field.onChange(newValue);
        if (sameAsPrimary && !isInitializing) {
          setValue("secondary_states", newValue);
        }
      },
    },
    secondary_address_line: {
      onChange: (e, field) => {
        field.onChange(e);
        handleSecondaryAddressChange(e.target.value);
      },
    },
    secondary_country: {
      onChange: (newValue, field) => {
        field.onChange(newValue);
        if ((!newValue || newValue === "") && !isInitializing) {
          setValue("secondary_states", "");
        }
      },
    },
    secondary_states: {
      options: getStateOptions(selectedSecondaryCountry, secondaryDynamicStates),
      loading: loadingSecondaryStates,
    },
  };

  return (
    <FormSection
      id="contact-information"
      title="Contact Information"
      subtitle="Email, phone and address details"
    >
      <Grid container spacing={2}>
        <FormFieldsSection
          fields={CONTACT_INFO_FIELDS}
          control={control}
          errors={errors}
          disabled={!editMode}
        />

        <Grid item xs={12}>
          <CategoryTitle>Primary Mailing Address</CategoryTitle>
        </Grid>

        <FormFieldsSection
          fields={PRIMARY_ADDRESS_FIELDS}
          control={control}
          errors={errors}
          disabled={!editMode}
          optionsMap={optionsMap}
          additionalProps={additionalProps}
        />

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

        <FormFieldsSection
          fields={SECONDARY_ADDRESS_FIELDS}
          control={control}
          errors={errors}
          disabled={!editMode}
          optionsMap={optionsMap}
          additionalProps={additionalProps}
        />
      </Grid>
    </FormSection>
  );
};

export default ContactInformationSection;
