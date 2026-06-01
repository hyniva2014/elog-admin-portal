import { Box, Typography, IconButton } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useId } from "react";
import {
  getUploadAreaSx,
  HiddenInputStyle,
  LabelSx,
  UploadContentSx,
  UploadIconSx,
  UploadTextRowSx,
  UploadPrimaryTextSx,
  UploadSecondaryTextSx,
  UploadHintTextSx,
  FilesWrapperSx,
  FilePreviewContainerSx,
  FilePreviewInnerSx,
  FileNameTypographySx,
  RemoveButtonSx,
  ErrorTextSx,
  ImagePreviewSx,
  PdfIconSx,
  TableIconSx,
  DocIconSx,
  TextIconSx,
  CsvIconSx,
} from "./CommonFileUpload.styled";

const iconStyles = {
  pdf: PdfIconSx,
  xls: TableIconSx,
  xlsx: TableIconSx,
  doc: DocIconSx,
  docx: DocIconSx,
  txt: TextIconSx,
  csv: CsvIconSx,
  jpg: TableIconSx,
  jpeg: TableIconSx,
  png: TableIconSx,
  gif: TableIconSx,
};

const CommonFileUpload = ({
  accept = "*/*",
  multiple = true,
  onFileChange,
  files = [],
  existingFiles = [],
  onRemoveExistingFile,
  size = "medium",
  disabled = false,
  error = false,
  helperText = "",
  onPreview,
  maxSize = 10 * 1024 * 1024,
  allowedFileTypes = [],
  showFileTypeInfo = true,
  hideUploadAreaWhenFilesExist = false,
}) => {
  const inputId = useId();

  const getFileIcon = (fileName) => {
    const extension = fileName?.split(".").pop()?.toLowerCase() || "";
    const iconSx = iconStyles[extension] || TextIconSx;

    if (extension === "pdf") {
      return <PictureAsPdfIcon sx={iconSx} />;
    }

    if (extension === "xls" || extension === "xlsx") {
      return <TableChartIcon sx={iconSx} />;
    }

    if (extension === "doc" || extension === "docx") {
      return <DescriptionIcon sx={iconSx} />;
    }

    if (extension === "txt") {
      return <DescriptionIcon sx={iconSx} />;
    }

    if (extension === "csv") {
      return <TableChartIcon sx={iconSx} />;
    }

    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return <DescriptionIcon sx={iconSx} />;
    }

    return <InsertDriveFileIcon sx={iconSx} />;
  };

  const isImageFile = (fileName) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
    const extension = fileName?.split(".").pop()?.toLowerCase() || "";
    return imageExtensions.includes(extension);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isValidFileType = (file) => {
    if (allowedFileTypes.length === 0) return true;

    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    return allowedFileTypes.includes(fileExtension);
  };

  const getAcceptString = () => {
    if (accept !== "*/*") return accept;
    if (allowedFileTypes.length > 0) {
      return allowedFileTypes.join(",");
    }
    return "*/*";
  };

  const getReadableFileTypes = () => {
    if (allowedFileTypes.length > 0) {
      return allowedFileTypes
        .map((type) => type.toUpperCase().replace(".", ""))
        .join(", ");
    }
    return "All files";
  };

  const handleChange = (e) => {
    if (disabled) return;
    const selectedFiles = Array.from(e.target.files);

    const invalidTypeFiles = selectedFiles.filter((file) => !isValidFileType(file));
    if (invalidTypeFiles.length > 0) {
      const invalidNames = invalidTypeFiles.map((f) => f.name).join(", ");
      alert(`Invalid file type(s): ${invalidNames}. Allowed types: ${getReadableFileTypes()}`);
      return;
    }

    const oversizedFiles = selectedFiles.filter((file) => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      alert(`Some files exceed the maximum size of ${formatFileSize(maxSize)}`);
      return;
    }

    onFileChange([...files, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    if (disabled) return;
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    const invalidTypeFiles = droppedFiles.filter((file) => !isValidFileType(file));
    if (invalidTypeFiles.length > 0) {
      const invalidNames = invalidTypeFiles.map((f) => f.name).join(", ");
      alert(`Invalid file type(s): ${invalidNames}. Allowed types: ${getReadableFileTypes()}`);
      return;
    }

    const oversizedFiles = droppedFiles.filter((file) => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      alert(`Some files exceed the maximum size of ${formatFileSize(maxSize)}`);
      return;
    }

    onFileChange([...files, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onFileChange(updatedFiles);
  };

  const handlePreviewClick = (event) => {
    const fileUrl = event.currentTarget.dataset.fileUrl;
    if (fileUrl && onPreview) {
      onPreview(fileUrl);
    }
  };

  const handleRemoveClick = (event) => {
    const index = Number(event.currentTarget.dataset.index);
    const isExisting = event.currentTarget.dataset.isExisting === "true";

    if (isExisting) {
      const file = existingFiles?.[index];
      onRemoveExistingFile?.(file, index);
      return;
    }

    handleRemoveFile(index);
  };

  const renderFilePreview = (file, index, isExisting = false) => {
    const fileName = file.name;
    const fileUrl = isExisting
      ? file.url
      : file instanceof File
      ? URL.createObjectURL(file)
      : file;
    const isImage = isImageFile(fileName);

    return (
      <Box key={`${isExisting ? "existing" : "new"}-${index}`} sx={FilePreviewContainerSx}>
        {isImage ? (
          <Box
            component="img"
            src={fileUrl}
            alt={fileName}
            sx={ImagePreviewSx}
            data-file-url={fileUrl}
            onClick={handlePreviewClick}
          />
        ) : (
          <Box
            component="div"
            data-file-url={fileUrl}
            onClick={handlePreviewClick}
            sx={FilePreviewInnerSx}
          >
            {getFileIcon(fileName)}
            <Typography variant="caption" sx={FileNameTypographySx}>
              {fileName}
            </Typography>
          </Box>
        )}

        <IconButton
          size="small"
          data-index={index}
          data-is-existing={String(isExisting)}
          onClick={handleRemoveClick}
          sx={RemoveButtonSx}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  const hasFiles = existingFiles?.length > 0 || files?.length > 0;
  const shouldHideUploadArea = hideUploadAreaWhenFilesExist && hasFiles;

  return (
    <>
      {!shouldHideUploadArea && (
        <Box
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          sx={getUploadAreaSx({ disabled, error, size })}
        >
          <Box
            component="input"
            type="file"
            accept={getAcceptString()}
            multiple={multiple}
            id={inputId}
            sx={HiddenInputStyle}
            onChange={handleChange}
            disabled={disabled}
          />

          <Box component="label" htmlFor={inputId} sx={LabelSx}>
            <Box sx={UploadContentSx}>
              <CloudUploadOutlinedIcon sx={UploadIconSx(size)} />

              <Box sx={UploadTextRowSx}>
                <Typography sx={UploadPrimaryTextSx(size)}>
                  Click to upload
                </Typography>
                <Typography sx={UploadSecondaryTextSx(size)}>
                  or drag and drop
                </Typography>
              </Box>

              {showFileTypeInfo && (
                <Typography sx={UploadHintTextSx(size)}>
                  Supported formats: {getReadableFileTypes()}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}

      {hasFiles && (
        <Box sx={FilesWrapperSx(hasFiles, shouldHideUploadArea)}>
          {existingFiles?.map((file, index) => renderFilePreview(file, index, true))}
          {files?.map((file, index) => renderFilePreview(file, index, false))}
        </Box>
      )}

      {error && helperText && (
        <Box mt={1}>
          <Typography variant="caption" sx={[ErrorTextSx, { color: "error.main", fontSize: 12 }]}> 
            {helperText}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default CommonFileUpload;
