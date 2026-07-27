import React, { useCallback, useEffect, useState } from "react";
import { Grid, Box, Typography, styled, IconButton, Tooltip } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";

import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonTextField from "../../../common/CommonTextField";
import CommonAutocompleteDropdown from "../../../common/CommonAutocompleteDropdown";
import useUnsavedChangesDialog from "../useUnsavedChangesDialog";
import { MODULE_OPTIONS } from "./Constants";
import {
  UploadZone,
  PreviewContainer,
  PreviewVideo,
  RemoveButton,
  UploadIcon,
  UploadPrimaryText,
  UploadSecondaryText,
  UploadSupportText,
  ErrorText,
} from "./UploadVideoDialog.styles";

const UPLOAD_VIDEO_FORM_ID = "upload-video-form";

const validationSchema = yup.object({
  title: yup
    .string()
    // .required("Video title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  
  module: yup
    .number()
    .typeError("Module is required")
    .required("Module is required"),
  
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  
  videoFile: yup
    .mixed(),
    // .required("Video file is required"),
});

const defaultValues = {
  title: "",
  module: null,
  description: "",
  videoFile: null,
};






const UploadVideoDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  mode = "add",
  isEditing = false,
  initialData = null,
  onCancelEdit,
  headerActions,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const isFieldDisabled = loading || isViewMode || (isEditMode && !isEditing);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset(initialData);
        setSelectedFile(initialData.videoFile);
        setShowPreview(!!initialData.videoUrl);
      } else {
        reset(defaultValues);
        setSelectedFile(null);
        setShowPreview(false);
      }
    }
  }, [open, initialData, reset]);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setShowPreview(true);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(initialData?.videoUrl || null);
    }
  }, [selectedFile, initialData]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("video/")) {
        setSelectedFile(file);
        setValue("videoFile", file, { shouldValidate: true, shouldDirty: true });
      }
    }
  }, [setValue]);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("videoFile", file, { shouldValidate: true, shouldDirty: true });
    }
  }, [setValue]);

  const { handleCancel: handleUnsavedCancel, UnsavedChangesDialog } =
    useUnsavedChangesDialog(() => {
      if (isEditMode && isEditing && onCancelEdit) {
        onCancelEdit();
        reset(initialData);
        setSelectedFile(initialData?.videoFile || null);
      } else {
        reset(defaultValues);
        setSelectedFile(null);
        onClose();
      }
    });

  const handleCancel = useCallback(() => {
    if (isEditMode && isEditing) {
      handleUnsavedCancel(isDirty);
      return;
    }

    reset(defaultValues);
    setSelectedFile(null);
    setShowPreview(false);
    onClose();
  }, [isEditMode, isEditing, isDirty, handleUnsavedCancel, onClose, reset, initialData]);

  const submitHandler = useCallback(
    (data) => {
      onSubmit({
        ...data,
        videoFile: selectedFile,
      });
      reset(defaultValues);
      setSelectedFile(null);
      setShowPreview(false);
    },
    [onSubmit, selectedFile, reset],
  );

  const renderTitleField = useCallback(
    ({ field, fieldState: { error } }) => (
      <CommonTextField
        value={field.value}
        onChange={field.onChange}
        label="Enter video title"
        error={!!error}
        helperText={error?.message}
        disabled={isFieldDisabled}
        // required
      />
    ),
    [isFieldDisabled],
  );

  const renderModuleField = useCallback(
    ({ field, fieldState: { error } }) => (
      <CommonAutocompleteDropdown
        value={field.value}
        onChange={field.onChange}
        label="Module"
        options={MODULE_OPTIONS}
        error={!!error}
        helperText={error?.message}
        disabled={isFieldDisabled}
        required
      />
    ),
    [isFieldDisabled],
  );

  const renderDescriptionField = useCallback(
    ({ field, fieldState: { error } }) => (
      <CommonTextField
        value={field.value}
        onChange={field.onChange}
        label="Description"
        multiline
        rows={3}
        error={!!error}
        helperText={error?.message}
        disabled={isFieldDisabled}
        // required
      />
    ),
    [isFieldDisabled],
  );

  const dialogTitle = mode === "edit" ? "Edit Training Video" : "Upload Training Video";
  const submitButtonText = mode === "edit" ? "Update Video" : "Upload Video";

  const formContent = (
    <form id={UPLOAD_VIDEO_FORM_ID} onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ p: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              render={renderTitleField}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="module"
              control={control}
              render={renderModuleField}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={renderDescriptionField}
            />
          </Grid>

          <Grid item xs={12}>
            {showPreview ? (
              <PreviewContainer>
                <PreviewVideo src={previewUrl} controls />
                {!isFieldDisabled && (
                  <Tooltip title="Remove Video">
                    <RemoveButton
                      onClick={() => {
                        setShowPreview(false);
                        setSelectedFile(null);
                      }}
                    >
                      <CloseIcon />
                    </RemoveButton>
                  </Tooltip>
                )}
              </PreviewContainer>
            ) : (
              <>
                <input
                  type="file"
                  accept="video/mp4,video/mov,video/avi,video/mkv"
                  style={{ display: "none" }}
                  id="video-file-input"
                  onChange={handleFileSelect}
                  disabled={isFieldDisabled}
                />
                <label htmlFor="video-file-input" style={{ pointerEvents: isFieldDisabled ? "none" : "auto" }}>
                  <UploadZone
                    isDragging={isDragging && !isFieldDisabled}
                    isFieldDisabled={isFieldDisabled}
                    onDragEnter={isFieldDisabled ? undefined : handleDragEnter}
                    onDragLeave={isFieldDisabled ? undefined : handleDragLeave}
                    onDragOver={isFieldDisabled ? undefined : handleDragOver}
                    onDrop={isFieldDisabled ? undefined : handleDrop}
                    component="div"
                  >
                    <UploadIcon />
                    <UploadPrimaryText>
                      {selectedFile ? selectedFile.name : "Drag & drop a video file here"}
                    </UploadPrimaryText>
                    <UploadSecondaryText>
                      or click to browse
                    </UploadSecondaryText>
                    <UploadSupportText>
                      Supported: mp4, mov, avi, mkv
                    </UploadSupportText>
                  </UploadZone>
                </label>
                {errors.videoFile && (
                  <ErrorText variant="caption">
                    {errors.videoFile.message}
                  </ErrorText>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </form>
  );

  return (
    <>
      <CommonDialogForm
        open={open}
        title={dialogTitle}
        content={formContent}
        formId={UPLOAD_VIDEO_FORM_ID}
        onCancel={handleCancel}
        onSubmit={handleSubmit(submitHandler)}
        loading={loading}
        maxWidth="sm"
        submitButtonText={submitButtonText}
        mode={mode}
        isEditing={isEditing}
        disableSubmit={mode === "edit" && !isDirty}
        headerActions={headerActions}
      />
      {UnsavedChangesDialog}
    </>
  );
};

export default UploadVideoDialog;
