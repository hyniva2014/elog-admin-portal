export const getUploadAreaSx = ({ disabled, error, size }) => (theme) => ({
  mt: size === "small" ? 1 : 2,
  p: size === "small" ? 1.5 : 3,
  border: error ? `2px solid ${theme.palette.error.main}` : `1px dashed ${theme.palette.divider}`,
  borderRadius: 2,
  textAlign: "center",
  opacity: disabled ? 0.6 : 1,
  pointerEvents: disabled ? "none" : "auto",
  cursor: disabled ? "not-allowed" : "pointer",
  backgroundColor: disabled ? theme.palette.grey[100] : error ? theme.palette.error.light : "transparent",
  borderColor: disabled ? theme.palette.divider : error ? theme.palette.error.main : theme.palette.divider,
});

export const HiddenInputStyle = {
  display: "none",
};

export const LabelSx = {
  width: "100%",
  cursor: "pointer",
};

export const UploadContentSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export const UploadIconSx = (size) => ({
  fontSize: size === "small" ? 10 : 40,
  color: "grey.600",
});

export const UploadTextRowSx = {
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  flexWrap: "wrap",
  justifyContent: "center",
};

export const UploadPrimaryTextSx = (size) => ({
  color: "brand.main",
  fontWeight: 500,
  fontSize: size === "small" ? 12 : 14,
});

export const UploadSecondaryTextSx = (size) => ({
  color: "text.secondary",
  fontSize: size === "small" ? 11 : 13,
});

export const UploadHintTextSx = (size) => ({
  fontSize: size === "small" ? "10px" : "12px",
  color: "text.secondary",
  mt: 0.5,
});

export const FilesWrapperSx = (hasFiles, shouldHideUploadArea) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
  mt: shouldHideUploadArea ? 0 : 2,
});

export const FilePreviewContainerSx = (theme) => ({
  position: "relative",
  width: 70,
  height: 70,
  borderRadius: 1,
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const FilePreviewInnerSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  p: 1,
};

export const FileNameTypographySx = {
  mt: 0.5,
  maxWidth: "80px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "10px",
};

export const RemoveButtonSx = (theme) => ({
  position: "absolute",
  top: -8,
  right: -8,
  background: theme.palette.common.white,
});

export const ImagePreviewSx = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const PdfIconSx = {
  fontSize: 30,
  color: "error.main",
};

export const TableIconSx = {
  fontSize: 30,
  color: "success.main",
};

export const DocIconSx = {
  fontSize: 30,
  color: "info.main",
};

export const TextIconSx = {
  fontSize: 30,
  color: "text.secondary",
};

export const CsvIconSx = {
  fontSize: 30,
  color: "warning.main",
};

export const ErrorTextSx = {
  display: "block",
  mt: 0.5,
  color: "error.main",
  fontSize: 12,
};
