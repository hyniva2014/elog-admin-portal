export const FormSectionContainerSx = (theme) => ({
  background: theme.palette.background.paper,
  borderRadius: "12px",
  mt: 2,
  mb: 2,
  border: `1px solid ${theme.palette.divider}`,
});

export const FormSectionHeaderSx = (theme) => ({
  p: 2.5,
  backgroundColor: theme.palette.grey[100],
});

export const FormSectionContentSx = (contentPadding) => (theme) => ({
  p: contentPadding ?? 2.5,
});

export const FormSectionTitleSx = (theme) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
});

export const FormSectionSubtitleSx = (theme) => ({
  color: theme.palette.text.secondary,
});
