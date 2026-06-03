import React from "react";
import FormTextField from "./FormTextField";
import FormDateSelector from "./FormDateSelector";
import FormAutocomplete from "./FormAutocomplete";
import FormMultiSelect from "./FormMultiSelect";
import FormFileUpload from "./FormFileUpload";

const FieldRenderer = ({ fieldConfig, commonProps, fieldOptions }) => {
  const { type, name } = fieldConfig;

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
};

const FieldsList = ({ filteredFields, additionalProps, optionsMap, commonPropsBase }) => (
  <>
    {filteredFields.map((fieldConfig) => {
      const { type, name, condition, ...restProps } = fieldConfig;
      const fieldAdditionalProps = additionalProps[name] || {};
      const fieldOptions = optionsMap[fieldConfig.options] || [];

      const commonProps = {
        name,
        ...commonPropsBase,
        ...restProps,
        ...fieldAdditionalProps,
      };

      return (
        <FieldRenderer
          key={name}
          fieldConfig={fieldConfig}
          commonProps={commonProps}
          fieldOptions={fieldOptions}
        />
      );
    })}
  </>
);

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

  const commonPropsBase = {
    control,
    errors,
    disabled,
  };

  return (
    <FieldsList
      filteredFields={filteredFields}
      additionalProps={additionalProps}
      optionsMap={optionsMap}
      commonPropsBase={commonPropsBase}
    />
  );
};

export default FormFieldsSection;
