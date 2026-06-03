import { Box, Grid } from "@mui/material";
import { CategoryTitle } from "../CareerManagement.styled";
import FormSection from "../HeaderComponents/FormSection";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { useCallback } from "react";
import {
  EMPLOYMENT_ENTRY_FIELDS,
  EMPLOYMENT_HISTORY_FIELDS,
} from "../Constants";
import FormFieldsSection from "../FormFields/FormFieldsSection";

const DeleteEmploymentButton = ({ index, handleRemoveClick, editMode }) => {
  if (index === 0) return null;

  return (
    <IconButton
      color="error"
      data-index={index}
      onClick={handleRemoveClick}
      disabled={!editMode}
    >
      <DeleteIcon />
    </IconButton>
  );
};

const EmploymentHistoryEntry = ({
  index,
  control,
  errors,
  editMode,
  handleRemoveEmployment,
  setValue,
  watch,
}) => {
  const handleRemoveClick = useCallback(
    (event) => {
      const selectedIndex = Number(event.currentTarget.dataset.index);
      handleRemoveEmployment(selectedIndex);
    },
    [handleRemoveEmployment],
  );

  const calculateDuration = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (!end.isAfter(start) && !end.isSame(start)) {
      return "";
    }

    const years = end.diff(start, "year");
    const months = end.diff(start.add(years, "year"), "month");
    const days = end.diff(start.add(years, "year").add(months, "month"), "day");

    return `${years}Y ${months}M ${days}D`;
  };

  const getEmploymentEntryFields = () => {
    return EMPLOYMENT_ENTRY_FIELDS.map((fieldConfig) => ({
      ...fieldConfig,
      name: `emp_history.${index}.${fieldConfig.name}`,
    }));
  };

  const additionalProps = {
    [`emp_history.${index}.emp_history_start_date`]: {
      maxDate: watch(`emp_history.${index}.emp_history_end_date`),
      onChange: (value, field) => {
        field.onChange(value);

        const endDate = watch(`emp_history.${index}.emp_history_end_date`);

        if (value && endDate) {
          setValue(
            `emp_history.${index}.emp_history_duration`,
            calculateDuration(value, endDate),
          );
        }
      },
    },
    [`emp_history.${index}.emp_history_end_date`]: {
      minDate: watch(`emp_history.${index}.emp_history_start_date`),
      onChange: (value, field) => {
        field.onChange(value);

        const startDate = watch(`emp_history.${index}.emp_history_start_date`);

        if (startDate && value) {
          setValue(
            `emp_history.${index}.emp_history_duration`,
            calculateDuration(startDate, value),
          );
        }
      },
    },
  };

  return (
    <Grid container spacing={2} item={12} key={index}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <CategoryTitle>Employment {index + 1}</CategoryTitle>
          <DeleteEmploymentButton
            index={index}
            handleRemoveClick={handleRemoveClick}
            editMode={editMode}
          />
        </Box>
      </Grid>

      <FormFieldsSection
        fields={getEmploymentEntryFields()}
        control={control}
        errors={errors}
        disabled={!editMode}
        additionalProps={additionalProps}
      />
    </Grid>
  );
};

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

        <FormFieldsSection
          fields={EMPLOYMENT_HISTORY_FIELDS}
          control={control}
          errors={errors}
          disabled={!editMode}
        />

        {watch("emp_history")?.map((item, index) => (
          <EmploymentHistoryEntry
            key={index}
            index={index}
            control={control}
            errors={errors}
            editMode={editMode}
            handleRemoveEmployment={handleRemoveEmployment}
            setValue={setValue}
            watch={watch}
          />
        ))}
      </Grid>
    </FormSection>
  );
};

export default EmploymentHistorySection;
