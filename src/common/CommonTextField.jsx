import { Controller } from "react-hook-form";
import CommonTextFieldStyled from "./CommonTextField.styles";

const CommonTextField = ({
  name,
  label,
  control,
  register,
  isEdit,
  multiline = false,
  rows = 1,
  disabled = false,
  placeholder,
  fullWidth = true,
  type = "text",
  error = false,
  helperText = "",
  children,
  value,
  onChange,
  shrinkLabel = false,
  required,
  ...rest
}) => {
  if (children && control) {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <CommonTextFieldStyled
            size="small"
            {...field}
            label={label}
            select
            InputLabelProps={{
              shrink: Boolean(field.value) || shrinkLabel || disabled,
              required: required,
            }}
            multiline={multiline}
            rows={multiline ? rows : undefined}
            disabled={disabled}
            isEdit={isEdit}
            placeholder={placeholder}
            fullWidth={fullWidth}
            error={error}
            helperText={helperText}
            slotProps={{
              select: {
                MenuProps: {
                  PaperProps: {
                    sx: {
                      maxHeight: 30 * 5,
                    },
                  },
                },
              },
            }}
          >
            {children}
          </CommonTextFieldStyled>
        )}
      />
    );
  }

  if (register && name) {
    return (
      <CommonTextFieldStyled
        size="small"
        label={label}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        InputLabelProps={{
          shrink: Boolean(value) || shrinkLabel || disabled,
          required: required,
        }}
        disabled={disabled}
        isEdit={isEdit}
        placeholder={placeholder}
        fullWidth={fullWidth}
        type={type}
        error={error}
        helperText={helperText}
        {...register(name)}
        {...rest}
      />
    );
  }

  return (
    <CommonTextFieldStyled
      size="small"
      label={label}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      InputLabelProps={{
        shrink: Boolean(value) || shrinkLabel,
        required: required,
      }}
      disabled={disabled}
      isEdit={isEdit}
      placeholder={placeholder}
      fullWidth={fullWidth}
      type={type}
      error={error}
      helperText={helperText}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default CommonTextField;
