import React from "react";
import FormTextField from "./FormTextField";

const FormFieldsSection = ({ fields, control, errors, disabled }) => (
  <>
    {fields.map((fieldConfig) => (
      <FormTextField
        key={fieldConfig.name}
        {...fieldConfig}
        control={control}
        errors={errors}
        disabled={disabled}
      />
    ))}
  </>
);

export default FormFieldsSection;
