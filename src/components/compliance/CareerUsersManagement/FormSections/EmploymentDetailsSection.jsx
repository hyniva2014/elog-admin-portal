// sections/EmploymentDetailsSection.jsx

import { Grid } from "@mui/material";
import FormSection from "../HeaderComponents/FormSection";
import CommonAutocompleteDropdown from "../../../../common/CommonAutocompleteDropdown";
import CommonSingleDateSelector from "../../../../common/CommonSingleDateSelector";
import CommonTextField from "../../../../common/CommonTextField";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { DRIVER_STATUS_FORM, employment_type_options } from "../Constants";

const EmploymentDetailsSection = ({
  control,
  errors,
  editMode,
  filteredRoles,
  selectedEmploymentType,
  selectedStatus,
  watch,
}) => {
  return (
    <Grid item xs={12}>
      <FormSection
        id="employment-details"
        title="Employment Details"
        subtitle="Carrier, dates and employment status"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <CommonAutocompleteDropdown
                  label="Role"
                  required
                  value={field.value}
                  options={filteredRoles}
                  dataKey="role"
                  setData={(callback) => {
                    const result = callback({ role: field.value });
                    field.onChange(result.role);
                  }}
                  disabled={!editMode}
                  error={!!errors.role}
                  helperText={errors.role?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="hire_date"
              control={control}
              render={({ field }) => (
                <CommonSingleDateSelector
                  label={"Hire Date"}
                  required
                  value={field.value || null}
                  onChange={(value) => field.onChange(value)}
                  hideBorder={false}
                  disabled={!editMode}
                  error={!!errors.hire_date}
                  helperText={errors.hire_date?.message}
                  customSx={{
                    width: "100%",
                    minWidth: "unset",
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <CommonAutocompleteDropdown
                  label="Status"
                  required
                  value={field.value}
                  options={DRIVER_STATUS_FORM}
                  dataKey="status"
                  setData={(callback) => {
                    const result = callback({ status: field.value });
                    field.onChange(result.status);
                  }}
                  disabled={!editMode}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                />
              )}
            />
          </Grid>

          {selectedStatus === 2 && (
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="termination_date"
                control={control}
                render={({ field }) => (
                  <CommonSingleDateSelector
                    label="Termination Date *"
                    value={field.value || null}
                    onChange={(value) => field.onChange(value)}
                    hideBorder={false}
                    disabled={!editMode}
                    error={!!errors.termination_date}
                    helperText={errors.termination_date?.message}
                    minDate={
                      watch("hire_date")
                        ? dayjs(watch("hire_date")).add(1, "day")
                        : dayjs().startOf("day")
                    }
                    customSx={{
                      width: "100%",
                      minWidth: "unset",
                    }}
                  />
                )}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="employment_type"
              control={control}
              render={({ field }) => (
                <CommonAutocompleteDropdown
                  label="Employment Type"
                  required
                  value={field.value}
                  options={employment_type_options}
                  dataKey="employment_type"
                  setData={(callback) => {
                    const result = callback({
                      employment_type: field.value,
                    });
                    field.onChange(result.employment_type);
                  }}
                  disabled={!editMode}
                  error={!!errors.employment_type}
                  helperText={errors.employment_type?.message}
                />
              )}
            />
          </Grid>

          {selectedEmploymentType === 2 && (
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="contract_information"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    label="Contractor Information"
                    disabled={!editMode}
                    {...field}
                    error={!!errors.contract_information}
                    helperText={errors.contract_information?.message}
                  />
                )}
              />
            </Grid>
          )}
        </Grid>
      </FormSection>
    </Grid>
  );
};

export default EmploymentDetailsSection;
