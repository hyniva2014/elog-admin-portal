export const NoAccessWrapperSx = (height) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  px: 2,
  height,
});

export const NoAccessTitleSx = (theme) => ({
  fontSize: theme.typography.h5.fontSize,
  fontWeight: 600,
  color: theme.palette.text.secondary,
});

export const NoAccessSubtitleSx = (theme) => ({
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
});
