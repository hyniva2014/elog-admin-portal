import React from "react";
import { Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
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
            <InputLabel>{label}</InputLabel>
            <Select {...field} label={label} disabled={disabled}>
              {renderOptions()}
            </Select>
          </FormControl>
        )}
      />
    </Grid>
  );
};

export default FormSelect;
