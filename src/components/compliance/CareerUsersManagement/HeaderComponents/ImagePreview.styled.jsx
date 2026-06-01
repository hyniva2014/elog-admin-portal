export const PreviewContainerSx = (fieldName) => ({
  marginTop:
    fieldName === "files" || fieldName.includes("additional_licenses")
      ? -2
      : 0,
});

export const PreviewLabelSx = {
  fontWeight: 400,
  fontSize: 12,
  color: "#000000",
};

export const PreviewImageContainerSx = (fieldName) => ({
  width:
    fieldName === "files" || fieldName.includes("additional_licenses")
      ? "100%"
      : 120,
  height:
    fieldName === "files" || fieldName.includes("additional_licenses")
      ? 120
      : 120,
  border: "1px solid #ddd",
  borderRadius: 1,
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
});

export const PreviewImageSx = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

export const OcrOverlaySx = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
};

export const OcrCaptionSx = {
  fontSize: 10,
  textAlign: "center",
};

export const OcrProgressSx = {
  fontSize: 9,
  color: "#666",
};

export const RemoveImageButtonSx = {
  position: "absolute",
  top: -8,
  right: -8,
  backgroundColor: "white",
  border: "1px solid #ddd",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
};

export const PreviewBackIconSx = {
  fontSize: 20,
  color: "#111",
};

export const PreviewCaptionSx = {
  fontSize: 10,
  textAlign: "center",
};

export const PreviewProgressSx = {
  fontSize: 9,
  color: "#666",
};
