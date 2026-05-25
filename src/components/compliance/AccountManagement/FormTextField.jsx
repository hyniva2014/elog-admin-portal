import React from "react";
import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import CommonTextField from "../../../common/CommonTextField";
import { formatTaxId, formatPhoneNumber } from "./utils";

const createFormatChangeHandler = (field, formatter) => (event) => {
  field.onChange(formatter(event.target.value));
};

const FormTextField = ({ 
  name, 
  label, 
  control, 
  errors, 
  disabled, 
  required, 
  type, 
  placeholder, 
  formatter,
  xs = 12,
  sm = 6 
}) => {
  const getFormatter = () => {
    if (formatter === "taxId") return formatTaxId;
    if (formatter === "phone") return formatPhoneNumber;
    return null;
  };

  const getChangeHandler = (field, formatter) => {
    if (!formatter) return undefined;
    return createFormatChangeHandler(field, formatter);
  };

  return (
    <Grid item xs={xs} sm={sm}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const formatter = getFormatter();
          const changeHandler = getChangeHandler(field, formatter);
          
          const textFieldProps = {
            ...field,
            label,
            required,
            disabled,
            error: !!errors[name],
            helperText: errors[name]?.message,
            fullWidth: true,
            size: "small",
            type: type || "text",
            placeholder,
          };

          if (changeHandler) {
            textFieldProps.onChange = changeHandler;
          }
          
          return <CommonTextField {...textFieldProps} />;
        }}
      />
    </Grid>
  );
};

export default FormTextField;
