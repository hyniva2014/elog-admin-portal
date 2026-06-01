import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { Controller } from "react-hook-form";
import CommonFileUpload from "../../../../common/CommonFileUpload";
import { Close as CloseIcon } from "@mui/icons-material";
import { extractCDLFromImage } from "../../../../utils/cdlOCR";
import { useState } from "react";
import CommonSnackbar from "../../../../common/CommonSnackbar";
import {
  PreviewContainerSx,
  PreviewLabelSx,
  PreviewSubtitleSx,
  PreviewImageContainerSx,
  PreviewImageSx,
  OcrOverlaySx,
  OcrCaptionSx,
  OcrProgressSx,
  RemoveImageButtonSx,
} from "./ImagePreview.styled";

const ProfilePhotoPreview = ({
  control,
  errors,
  existingFiles,
  setExistingFiles,
  uploaded,
  setUploaded,
  handleImagePreview,
  disabled,
  onFileChange,
  fieldName = "profile_photo",
  labelText = "Upload Photo",
  setValue,
  onCDLExtracted,
  trigger,
}) => {
  const [isOCRProcessing, setIsOCRProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [fileSizeError, setFileSizeError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validateFileSize = (files) => {
    if (!files || files.length === 0) return { valid: true, error: "" };

    const maxSizeInBytes = 2 * 1024 * 1024;
    const oversizedFiles = files.filter((file) => file.size > maxSizeInBytes);

    if (oversizedFiles.length > 0) {
      const oversizedFile = oversizedFiles[0];
      const fileSizeInMB = (oversizedFile.size / (1024 * 1024)).toFixed(2);
      const errorMessage = `File size must be less than 2MB. ${oversizedFile.name} is ${fileSizeInMB}MB.`;
      console.error(
        `File too large: ${oversizedFile.name} (${fileSizeInMB}MB)`,
      );
      return { valid: false, error: errorMessage };
    }

    return { valid: true, error: "" };
  };

  const getPreviewText = () => {
    if (fieldName === "profile_photo") return "";
    if (fieldName === "files") return "CDL Image Preview";
    if (fieldName.includes("additional_licenses")) return "CDL Image Preview";
    if (fieldName.includes("medical")) return "Medical Document Preview";
    return "Image Preview";
  };

  const hasFilesToShow = (field) => {
    return uploaded || existingFiles.length > 0 || (Array.isArray(field.value) && field.value.length > 0);
  };

  const getPreviewImageUrl = (field) => {
    const imageToShow = existingFiles[0] || (field.value && field.value[0]);
    return imageToShow?.url ||
      (imageToShow instanceof File ? URL.createObjectURL(imageToShow) : imageToShow) || "";
  };

  const handleFileUpload = async (files, field) => {
    const validation = validateFileSize(files);
    setFileSizeError(validation.error);

    if (!validation.valid) {
      setSnackbar({
        open: true,
        message: "This image is larger than 2 MB. Try uploading a smaller image.",
        severity: "error",
      });

      field.onChange([]);
      setUploaded(false);
      setExistingFiles([]);
      return;
    }

    setFileSizeError("");
    field.onChange(files);

    if (files && files.length > 0) {
      setUploaded(true);
      setExistingFiles([]);

      if (
        (fieldName === "files" || fieldName.includes("additional_licenses")) &&
        files[0] &&
        setValue &&
        onCDLExtracted
      ) {
        setIsOCRProcessing(true);
        setOcrProgress(0);

        try {
          const extractedData = await extractCDLFromImage(files[0], (progress) => {
            setOcrProgress(progress);
          });
          console.log("Extracted CDL data:", extractedData);
          onCDLExtracted(extractedData, fieldName);
        } catch (error) {
          console.error("CDL OCR failed:", error);
        } finally {
          setIsOCRProcessing(false);
          setOcrProgress(0);
        }
      }
    }

    if (onFileChange) {
      onFileChange(files);
    }
  };

  const handleRemoveExistingFile = (_, index) => {
    setExistingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePreviewClick = (event) => {
    const previewUrl = event.currentTarget.dataset.previewUrl;
    if (previewUrl) {
      handleImagePreview(previewUrl);
    }
  };

  const handleRemoveImageClick = (event, field) => {
    event.stopPropagation();
    field.onChange([]);
    setUploaded(false);
    setExistingFiles([]);
    if (trigger) {
      trigger(fieldName);
    }
  };

  return (
    <>
      {!uploaded && existingFiles.length === 0 && (
        <Box sx={PreviewContainerSx(fieldName)}>
          <Typography variant="subtitle1" sx={PreviewLabelSx}>
            {labelText}
          </Typography>

          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
              const uploadFieldChange = (files) => handleFileUpload(files, field);
              const removeFileHandler = (file, index) => handleRemoveExistingFile(file, index);

              return (
                <CommonFileUpload
                  files={Array.isArray(field.value) ? field.value : []}
                  existingFiles={existingFiles}
                  onFileChange={uploadFieldChange}
                  size="small"
                  disabled={disabled}
                  allowedFileTypes={[".jpg", ".jpeg", ".png"]}
                  error={!!errors[fieldName] || !!fileSizeError}
                  helperText={errors[fieldName]?.message}
                  onRemoveExistingFile={removeFileHandler}
                />
              );
            }}
          />
        </Box>
      )}

      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => {
          if (!hasFilesToShow(field)) {
            return null;
          }

          const previewUrl = getPreviewImageUrl(field);
          const previewLabel = getPreviewText();
          const isOcrActive = isOCRProcessing &&
            (fieldName === "files" || fieldName.includes("additional_licenses"));

          const removeImageButtonClick = (event) => handleRemoveImageClick(event, field);

          return (
            <Box sx={PreviewContainerSx(fieldName)}>
              <Typography variant="subtitle1" sx={PreviewSubtitleSx}>
                {previewLabel}
              </Typography>
              <Box
                sx={PreviewImageContainerSx(fieldName)}
                data-preview-url={previewUrl}
                onClick={handlePreviewClick}
              >
                <Box component="img" src={previewUrl} alt="Preview" sx={PreviewImageSx} />

                {isOcrActive && (
                  <Box sx={OcrOverlaySx}>
                    <CircularProgress size={24} />
                    <Typography variant="caption" sx={OcrCaptionSx}>
                      Extracting CDL data...
                    </Typography>
                    {ocrProgress > 0 && (
                      <Typography variant="caption" sx={OcrProgressSx}>
                        {ocrProgress}%
                      </Typography>
                    )}
                  </Box>
                )}

                <IconButton
                  size="small"
                  sx={RemoveImageButtonSx}
                  onClick={removeImageButtonClick}
                  disabled={disabled}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          );
        }}
      />

      <CommonSnackbar
        open={snackbar.open}
        autoHideDuration={3000}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

const ImagePreview = ({
  control,
  errors,
  existingFiles,
  setExistingFiles,
  uploaded,
  setUploaded,
  handleImagePreview,
  labelText = "Upload Photo",
  fieldName = "files",
  disabled,
  onFileChange,
  setValue,
  onCDLExtracted,
  trigger,
}) => {
  return (
    <ProfilePhotoPreview
      control={control}
      errors={errors}
      existingFiles={existingFiles}
      setExistingFiles={setExistingFiles}
      uploaded={uploaded}
      setUploaded={setUploaded}
      handleImagePreview={handleImagePreview}
      disabled={disabled}
      onFileChange={onFileChange}
      fieldName={fieldName}
      labelText={labelText}
      setValue={setValue}
      onCDLExtracted={onCDLExtracted}
      trigger={trigger}
    />
  );
};

export default ImagePreview;
