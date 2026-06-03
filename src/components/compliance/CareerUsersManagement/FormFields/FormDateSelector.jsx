import React from "react";
import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import CommonSingleDateSelector from "../../../../common/CommonSingleDateSelector";
import dayjs from "dayjs";

const getNestedError = (errors, name) => {
  return name.split(".").reduce((current, key) => current?.[key], errors);
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
          const dateSelectorProps = {
            ...field,
            label: required ? `${label} *` : label,
            value: field.value || null,
            onChange: onChange
              ? (value) => onChange(value, field)
              : field.onChange,
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
