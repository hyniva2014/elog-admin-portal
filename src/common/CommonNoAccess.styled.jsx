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
  fontSize: "20px !important",
  fontWeight: 600,
  color: theme.palette.text.secondary,
});

export const NoAccessSubtitleSx = (theme) => ({
  fontSize: "15px !important",
  color: theme.palette.text.secondary,
  mt: 1,
});
