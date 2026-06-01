export const getUploadAreaSx = ({ disabled, error, size }) => ({
  mt: size === "small" ? 1 : 2,
  p: size === "small" ? 1.5 : 3,
  border: error ? "2px solid #d32f2f" : "1px dashed #ccc",
  borderRadius: 2,
  textAlign: "center",
  opacity: disabled ? 0.6 : 1,
  pointerEvents: disabled ? "none" : "auto",
  cursor: disabled ? "not-allowed" : "pointer",
  backgroundColor: disabled ? "#f5f5f5" : error ? "#fef2f2" : "transparent",
  borderColor: disabled ? "#ddd" : error ? "#d32f2f" : "#ccc",
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
  color: "#284495",
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

export const FilePreviewContainerSx = {
  position: "relative",
  width: 70,
  height: 70,
  borderRadius: 1,
  overflow: "hidden",
  border: "1px solid #ddd",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

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

export const RemoveButtonSx = {
  position: "absolute",
  top: -8,
  right: -8,
  background: "#fff",
};

export const ImagePreviewSx = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const PdfIconSx = {
  fontSize: 30,
  color: "#f44336",
};

export const TableIconSx = {
  fontSize: 30,
  color: "#4caf50",
};

export const DocIconSx = {
  fontSize: 30,
  color: "#2196f3",
};

export const TextIconSx = {
  fontSize: 30,
  color: "#757575",
};

export const CsvIconSx = {
  fontSize: 30,
  color: "#ff9800",
};

export const ErrorTextSx = {
  display: "block",
  mt: 0.5,
};
