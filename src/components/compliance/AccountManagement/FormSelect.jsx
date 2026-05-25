import React from "react";
import { Grid, MenuItem, Select, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const FormSelect = ({
  name,
  label,
  control,
  errors,
  disabled,
  required,
  options,
  xs = 12,
  sm = 6
}) => {
  const renderOptions = () => options.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

  return (
    <Grid item xs={xs} sm={sm}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth size="small" error={!!errors[name]}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              labelId={`${name}-label`}
              {...field}
              label={label}
              disabled={disabled}
            >
              {renderOptions()}
            </Select>
            {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
          </FormControl>
        )}
      />
    </Grid>
  );
};

export default FormSelect;
