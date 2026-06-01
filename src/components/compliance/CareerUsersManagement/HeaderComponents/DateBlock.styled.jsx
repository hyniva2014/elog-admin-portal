export const DateBlockContainerSx = {
  textAlign: "center",
};

export const DateBlockValueSx = (highlight) => (theme) => ({
  fontSize: "20px",
  fontWeight: 700,
  color: highlight ? theme.palette.warning.main : theme.palette.common.white,
});

export const DateBlockLabelSx = (theme) => ({
  opacity: 0.8,
  fontSize: "10px",
  letterSpacing: "0.5px",
  fontWeight: 400,
  color: theme.palette.common.white,
});
