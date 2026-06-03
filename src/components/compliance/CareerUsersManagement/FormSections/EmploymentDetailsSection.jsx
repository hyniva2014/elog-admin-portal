import { Grid } from "@mui/material";
import FormSection from "../HeaderComponents/FormSection";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import {
  DRIVER_STATUS_FORM,
  employment_type_options,
  EMPLOYMENT_DETAILS_FIELDS,
} from "../Constants";
import FormFieldsSection from "../FormFields/FormFieldsSection";

const getTerminationMinDate = (hireDate) => {
  return hireDate ? dayjs(hireDate).add(1, "day") : dayjs().startOf("day");
};

const EmploymentDetailsSection = ({
  control,
  errors,
  editMode,
  filteredRoles,
  selectedEmploymentType,
  selectedStatus,
  watch,
}) => {
  const optionsMap = {
    DRIVER_STATUS_FORM,
    employment_type_options,
  };

  const additionalProps = {
    role: {
      options: filteredRoles,
    },
    termination_date: {
      minDate: getTerminationMinDate(watch("hire_date")),
    },
  };

  const conditionContext = {
    selectedStatus,
    selectedEmploymentType,
  };

  return (
    <Grid item xs={12}>
      <FormSection
        id="employment-details"
        title="Employment Details"
        subtitle="Carrier, dates and employment status"
      >
        <Grid container spacing={2}>
          <FormFieldsSection
            fields={EMPLOYMENT_DETAILS_FIELDS}
            control={control}
            errors={errors}
            disabled={!editMode}
            optionsMap={optionsMap}
            additionalProps={additionalProps}
            conditionContext={conditionContext}
          />
        </Grid>
      </FormSection>
    </Grid>
  );
};

export default EmploymentDetailsSection;
