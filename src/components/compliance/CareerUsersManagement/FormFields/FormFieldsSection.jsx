import React from "react";
import FormTextField from "./FormTextField";
import FormDateSelector from "./FormDateSelector";
import FormAutocomplete from "./FormAutocomplete";
import FormMultiSelect from "./FormMultiSelect";
import FormFileUpload from "./FormFileUpload";

const FormFieldsSection = ({
  fields,
  control,
  errors,
  disabled,
  optionsMap = {},
  additionalProps = {},
  conditionContext = null,
}) => {
  const filteredFields = fields.filter((fieldConfig) => {
    if (!fieldConfig.condition) return true;
    if (!conditionContext) return true;
    return fieldConfig.condition(conditionContext);
  });

  return (
    <>
      {filteredFields.map((fieldConfig) => {
        const { type, name, condition, ...restProps } = fieldConfig;
        const fieldAdditionalProps = additionalProps[name] || {};
        const fieldOptions = optionsMap[fieldConfig.options] || [];

        const commonProps = {
          name,
          control,
          errors,
          disabled,
          ...restProps,
          ...fieldAdditionalProps,
        };

        if (type === "date") {
          return <FormDateSelector key={name} {...commonProps} />;
        }

        if (type === "autocomplete") {
          return (
            <FormAutocomplete
              key={name}
              {...commonProps}
              options={fieldOptions}
            />
          );
        }

        if (type === "multiselect") {
          return (
            <FormMultiSelect
              key={name}
              {...commonProps}
              options={fieldOptions}
            />
          );
        }

        if (type === "file") {
          return <FormFileUpload key={name} {...commonProps} />;
        }

        // Default to text field
        return <FormTextField key={name} {...commonProps} />;
      })}
    </>
  );
};

export default FormFieldsSection;
