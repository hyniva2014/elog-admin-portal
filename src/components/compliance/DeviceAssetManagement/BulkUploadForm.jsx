import React from "react";
import { Box, Typography, IconButton } from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  CsvIcon,
  ErrorText,
  ExcelIcon,
  FileInfoWrapper,
  FileNameText,
  FilePreviewContainer,
  UploadCloudIcon,
  UploadContainer,
  UploadHighlightText,
  UploadIconWrapper,
  UploadSubText,
  UploadText,
} from "./bulkUpload.styles";

import { StyledForm } from "./DeviceAssetManagement.styles";

const SUPPORTED_FORMATS = [".csv", ".xls", ".xlsx"];

const bulkUploadSchema = yup.object().shape({
  files: yup
    .mixed()
    .required("Please upload a file")
    .test("fileType", "Only CSV or Excel files are allowed", (value) => {
      if (!value) return false;

      const fileName = value.name?.toLowerCase();

      return SUPPORTED_FORMATS.some((ext) => fileName.endsWith(ext));
    }),
});

const BulkUploadForm = ({ formId, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bulkUploadSchema),
    defaultValues: {
      files: null,
    },
  });

  const submitHandler = (data) => {
    onSubmit(data);
  };

  const handleFileChange = (event, onChange) => {
    const file = event.target.files?.[0] || null;

    onChange(file);
  };

  const createFileChangeHandler = (onChange) => (event) => {
    handleFileChange(event, onChange);
  };

  const createRemoveHandler = (onChange) => (event) => {
    event.preventDefault();
    onChange(null);
  };

  const isCsvFile = (file) => {
    return file?.name?.endsWith(".csv");
  };

  const renderFileIcon = (file) => {
    if (isCsvFile(file)) {
      return (
        <CsvIcon>
          <DescriptionOutlinedIcon />
        </CsvIcon>
      );
    }

    return (
      <ExcelIcon>
        <TableChartOutlinedIcon />
      </ExcelIcon>
    );
  };

  const renderUploadBox = () => {
    return (
      <label htmlFor="bulk-upload-input">
        <UploadContainer>
          <UploadIconWrapper>
            <UploadCloudIcon />
          </UploadIconWrapper>

          <UploadText>
            <UploadHighlightText>Click to upload</UploadHighlightText>
          </UploadText>

          <UploadSubText variant="body2">CSV, XLS, XLSX</UploadSubText>
        </UploadContainer>
      </label>
    );
  };

  const renderFilePreview = (field) => {
    return (
      <FilePreviewContainer>
        <FileInfoWrapper>
          {renderFileIcon(field.value)}

          <Box>
            <FileNameText>{field.value.name}</FileNameText>

            <Typography variant="caption" color="text.secondary">
              {(field.value.size / 1024).toFixed(1)} KB
            </Typography>
          </Box>
        </FileInfoWrapper>

        <IconButton onClick={createRemoveHandler(field.onChange)} size="small">
          <CloseIcon />
        </IconButton>
      </FilePreviewContainer>
    );
  };

  const renderUploadContent = (field) => {
    return field.value ? renderFilePreview(field) : renderUploadBox();
  };

  const renderError = () => {
    if (!errors.files) return null;

    return (
      <ErrorText color="error" variant="caption">
        {errors.files.message}
      </ErrorText>
    );
  };

  const renderFileInput = (field) => {
    return (
      <input
        id="bulk-upload-input"
        type="file"
        hidden
        accept=".csv,.xls,.xlsx"
        onChange={createFileChangeHandler(field.onChange)}
      />
    );
  };

  return (
    <StyledForm id={formId} onSubmit={handleSubmit(submitHandler)}>
      <Controller
        name="files"
        control={control}
        render={({ field }) => (
          <Box>
            {renderFileInput(field)}

            {renderUploadContent(field)}

            {renderError()}
          </Box>
        )}
      />
    </StyledForm>
  );
};

export default BulkUploadForm;