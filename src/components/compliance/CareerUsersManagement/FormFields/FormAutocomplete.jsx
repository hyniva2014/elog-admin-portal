import React from "react";
import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import CommonAutocompleteDropdown from "../../../../common/CommonAutocompleteDropdown";

const getShrinkLabel = (shrinkLabel, value) => {
  return shrinkLabel !== undefined ? shrinkLabel : Boolean(value);
};

const getHandleChange = (onChange, name, field) => {
  return (newValue) => {
    if (onChange) {
      onChange(newValue, field);
    } else {
      const result = { [name]: newValue };
      field.onChange(result[name]);
    }
  };
};

const FormAutocomplete = ({
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
  options,
  dataKey,
  loading,
  onChange,
  shrinkLabel,
  ...restProps
}) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const handleChange = getHandleChange(onChange, name, field);

          const autocompleteProps = {
            label,
            required,
            value: field.value,
            options: options || [],
            dataKey: dataKey || name,
            setData: (cb) => {
              const result = cb({ [name]: field.value });
              handleChange(result[name]);
            },
            disabled: disabled || loading,
            loading,
            error: !!errors[name],
            helperText: errors[name]?.message,
            shrinkLabel: getShrinkLabel(shrinkLabel, field.value),
            ...restProps,
          };

          return <CommonAutocompleteDropdown {...autocompleteProps} />;
        }}
      />
    </Grid>
  );
};

export default FormAutocomplete;
