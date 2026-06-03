import React from "react";
import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import CommonFileUpload from "../../../../common/CommonFileUpload";

const getNestedError = (errors, name) => {
  return name.split(".").reduce((current, key) => current?.[key], errors);
};

const getFileValue = (value) => {
  return Array.isArray(value) ? value : [];
};

const FormFileUpload = ({
  name,
  control,
  errors,
  disabled,
  xs = 12,
  sm = 6,
  md = 12,
  existingFiles = [],
  onFileChange,
  onPreview,
  maxSize,
  allowedFileTypes,
  onRemoveExistingFile,
}) => {
  return (
    <Grid item xs={xs} sm={sm} md={md}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const error = getNestedError(errors, name);

          return (
            <CommonFileUpload
              files={getFileValue(field.value)}
              existingFiles={existingFiles}
              onFileChange={(files) => {
                field.onChange(files);
                if (onFileChange) {
                  onFileChange(files);
                }
              }}
              onPreview={onPreview}
              maxSize={maxSize}
              allowedFileTypes={allowedFileTypes}
              error={!!error}
              helperText={error?.message}
              onRemoveExistingFile={onRemoveExistingFile}
              disabled={disabled}
            />
          );
        }}
      />
    </Grid>
  );
};

export default FormFileUpload;
