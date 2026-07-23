import React from "react";
import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import CommonSingleDateSelector from "../../../../common/CommonSingleDateSelector";
import CommonTextField from "../../../../common/CommonTextField";
import dayjs from "dayjs";

const getNestedError = (errors, name) => {
  return name.split(".").reduce((current, key) => current?.[key], errors);
};

const getLabel = (label, required) => {
  return required ? `${label} *` : label;
};

const getOnChangeHandler = (onChange, field) => {
  return onChange ? (value) => onChange(value, field) : field.onChange;
};

const FormDateSelector = ({
  name,
  label,
  control,
  errors,
  disabled,
  required,
  xs = 12,
  sm = 6,
  md = 4,
  lg,
  xl,
  minDate,
  maxDate,
  disablePast,
  customSx,
  onChange,
  ...restProps
}) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const error = getNestedError(errors, name);
          
          if (disabled) {
            const displayValue = field.value ? dayjs(field.value).format("MM/DD/YYYY") : "";
            return (
              <CommonTextField
                name={name}
                label={getLabel(label, required)}
                value={displayValue}
                disabled={true}
                shrinkLabel={Boolean(displayValue)}
                error={!!error}
                helperText={error?.message}
              />
            );
          }

          const dateSelectorProps = {
            ...field,
            label: getLabel(label, required),
            value: field.value || null,
            onChange: getOnChangeHandler(onChange, field),
            hideBorder: false,
            disabled,
            error: !!error,
            helperText: error?.message,
            customSx: customSx || {
              width: "100%",
              minWidth: "unset",
            },
            ...restProps,
          };

          if (minDate) {
            dateSelectorProps.minDate = minDate;
          }

          if (maxDate) {
            dateSelectorProps.maxDate = maxDate;
          }

          if (disablePast) {
            dateSelectorProps.disablePast = true;
          }

          return <CommonSingleDateSelector {...dateSelectorProps} />;
        }}
      />
    </Grid>
  );
};

export default FormDateSelector;
