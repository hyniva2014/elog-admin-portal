import { Box, Grid } from "@mui/material";
import CommonTextField from "../../../../common/CommonTextField";
import CommonSingleDateSelector from "../../../../common/CommonSingleDateSelector";
import { CategoryTitle } from "../CareerManagement.styled";
import FormSection from "../HeaderComponents/FormSection";
import { Button, IconButton } from "@mui/material";
import { Controller } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
const EmploymentHistorySection = ({
  control,
  watch,
  errors,
  editMode,
  handleAddEmployment,
  handleRemoveEmployment,
  setValue,
}) => {
  return (
    <FormSection
      id="prior-employment-history"
      title="Prior Employment History"
      subtitle="Previous employment details and durartion history"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <CategoryTitle>Prior Employment History</CategoryTitle>

            <Button
              onClick={handleAddEmployment}
              disabled={!editMode || (watch("emp_history")?.length || 0) >= 3}
            >
              Add Employment
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="total_years_of_experince"
            control={control}
            render={({ field }) => (
              <CommonTextField
                label="Total Experience"
                disabled={!editMode}
                {...field}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9.]/g, "");
                  const parts = value.split(".");
                  if (parts.length > 2) {
                    value = parts[0] + "." + parts.slice(1).join("");
                  }
                  if (parts.length === 2) {
                    value = parts[0].slice(0, 2) + "." + parts[1].slice(0, 2);
                  } else {
                    value = value.slice(0, 2);
                  }
                  field.onChange(value);
                }}
                error={!!errors.total_years_of_experince}
                helperText={errors.total_years_of_experince?.message}
              />
            )}
          />
        </Grid>

        {watch("emp_history")?.map((item, index) => (
          <Grid container spacing={2} item={12} key={index}>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <CategoryTitle>Employment {index + 1}</CategoryTitle>
                {index !== 0 && (
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveEmployment(index)}
                    disabled={!editMode}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name={`emp_history.${index}.emp_history_details`}
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    label="Employer Details"
                    disabled={!editMode}
                    {...field}
                    error={!!errors?.emp_history?.[index]?.emp_history_details}
                    helperText={
                      errors?.emp_history?.[index]?.emp_history_details?.message
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name={`emp_history.${index}.emp_history_start_date`}
                control={control}
                render={({ field }) => (
                  <CommonSingleDateSelector
                    label="Start Date"
                    value={field.value ?? null}
                    disabled={!editMode}
                    onChange={(value) => {
                      field.onChange(value);

                      const to = watch(
                        `emp_history.${index}.emp_history_end_date`,
                      );

                      if (value && to) {
                        const start = dayjs(value);
                        const end = dayjs(to);

                        if (end.isAfter(start) || end.isSame(start)) {
                          const years = end.diff(start, "year");
                          const months = end.diff(
                            start.add(years, "year"),
                            "month",
                          );
                          const days = end.diff(
                            start.add(years, "year").add(months, "month"),
                            "day",
                          );

                          const duration = `${years}Y ${months}M ${days}D`;

                          setValue(
                            `emp_history.${index}.emp_history_duration`,
                            duration,
                          );
                        }
                      }
                    }}
                    maxDate={watch(`emp_history.${index}.emp_history_end_date`)}
                    error={
                      !!errors?.emp_history?.[index]?.emp_history_start_date
                    }
                    helperText={
                      errors?.emp_history?.[index]?.emp_history_start_date
                        ?.message
                    }
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
                name={`emp_history.${index}.emp_history_end_date`}
                control={control}
                render={({ field }) => (
                  <CommonSingleDateSelector
                    label="End Date"
                    value={field.value ?? null}
                    disabled={!editMode}
                    onChange={(value) => {
                      field.onChange(value);

                      const from = watch(
                        `emp_history.${index}.emp_history_start_date`,
                      );

                      if (from && value) {
                        const start = dayjs(from);
                        const end = dayjs(value);

                        if (end.isAfter(start) || end.isSame(start)) {
                          const years = end.diff(start, "year");
                          const months = end.diff(
                            start.add(years, "year"),
                            "month",
                          );
                          const days = end.diff(
                            start.add(years, "year").add(months, "month"),
                            "day",
                          );

                          const duration = `${years}Y ${months}M ${days}D`;

                          setValue(
                            `emp_history.${index}.emp_history_duration`,
                            duration,
                          );
                        } else {
                          setValue(
                            `emp_history.${index}.emp_history_duration`,
                            "",
                          );
                        }
                      }
                    }}
                    minDate={watch(
                      `emp_history.${index}.emp_history_start_date`,
                    )}
                    error={!!errors?.emp_history?.[index]?.emp_history_end_date}
                    helperText={
                      errors?.emp_history?.[index]?.emp_history_end_date
                        ?.message
                    }
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
                name={`emp_history.${index}.emp_history_duration`}
                control={control}
                render={({ field }) => (
                  <CommonTextField label="Duration" disabled {...field} />
                )}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </FormSection>
  );
};

export default EmploymentHistorySection;
