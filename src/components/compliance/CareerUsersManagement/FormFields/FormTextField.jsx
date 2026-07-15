import React, { useRef } from "react";
import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import CommonTextField from "../../../../common/CommonTextField";
import {
  filterNameInput,
  formatZipCode,
  formatPassportVisa,
  formatCountryName,
} from "../Constants";
import { formatPhoneNumber } from "../../AccountManagement/utils";
import { formatSSN } from "../../../../common/CommonUtils";

const createFormatChangeHandler = (field, formatter, previousValueRef) => (event) => {
  const previousValue = previousValueRef.current;
  const formattedValue = formatter(event.target.value, previousValue);
  previousValueRef.current = formattedValue;
  field.onChange(formattedValue);
};

const getNestedError = (errors, name) => {
  return name.split(".").reduce((current, key) => current?.[key], errors);
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
  sm = 6,
  md = 4,
  lg,
  xl,
  onChange,
  inputProps,
  shrinkLabel,
  ...restProps
}) => {
  const getFormatter = () => {
    if (formatter === "name") return filterNameInput;
    if (formatter === "zipCode") return formatZipCode;
    if (formatter === "ssn") return formatSSN;
    if (formatter === "phone") return formatPhoneNumber;
    if (formatter === "passportVisa") return formatPassportVisa;
    if (formatter === "countryName") return formatCountryName;
    if (formatter === "experience")
      return (value) => {
        let formattedValue = value.replace(/[^0-9.]/g, "");
        const parts = formattedValue.split(".");
        if (parts.length > 2) {
          formattedValue = parts[0] + "." + parts.slice(1).join("");
        }
        if (parts.length === 2) {
          formattedValue = parts[0].slice(0, 2) + "." + parts[1].slice(0, 2);
        } else {
          formattedValue = formattedValue.slice(0, 2);
        }
        return formattedValue;
      };
    return null;
  };

  const getChangeHandler = (field, previousValueRef) => {
    if (onChange) {
      return (e) => {
        onChange(e, field);
      };
    }
    const formatter = getFormatter();
    if (!formatter) return undefined;
    return createFormatChangeHandler(field, formatter, previousValueRef);
  };

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const previousValueRef = useRef(field.value);
          const changeHandler = getChangeHandler(field, previousValueRef);
          const error = getNestedError(errors, name);

          const textFieldProps = {
            ...field,
            label,
            required,
            disabled,
            error: !!error,
            helperText: error?.message,
            placeholder,
            inputProps,
            shrinkLabel,
            ...restProps,
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
