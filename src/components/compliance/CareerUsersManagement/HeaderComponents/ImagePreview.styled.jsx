export const PreviewContainerSx = (fieldName) => ({
  marginTop:
    fieldName === "files" || fieldName.includes("additional_licenses")
      ? -2
      : 0,
});

export const PreviewLabelSx = (theme) => ({
  fontWeight: 400,
  fontSize: 12,
  color: theme.palette.text.primary,
});

export const PreviewImageContainerSx = (fieldName) => (theme) => ({
  width:
    fieldName === "files" || fieldName.includes("additional_licenses")
      ? "100%"
      : 120,
  height:
    fieldName === "files" || fieldName.includes("additional_licenses")
      ? 120
      : 120,
  border: `1px solid ${theme.palette.divider}`,
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

export const PreviewSubtitleSx = (theme) => ({
  fontWeight: 400,
  fontSize: 12,
  color: theme.palette.text.primary,
  marginTop: 0,
});

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

export const OcrCaptionSx = (theme) => ({
  fontSize: 10,
  textAlign: "center",
  color: theme.palette.text.secondary,
});

export const OcrProgressSx = (theme) => ({
  fontSize: 9,
  color: theme.palette.text.secondary,
});

export const RemoveImageButtonSx = (theme) => ({
  position: "absolute",
  top: -8,
  right: -8,
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
});

export const CloseIconSx = {
  fontSize: "small",
};

export const PreviewBackIconSx = (theme) => ({
  fontSize: 20,
  color: theme.palette.text.primary,
});

export const PreviewCaptionSx = {
  fontSize: 10,
  textAlign: "center",
};

export const PreviewProgressSx = (theme) => ({
  fontSize: 9,
  color: theme.palette.text.secondary,
});
