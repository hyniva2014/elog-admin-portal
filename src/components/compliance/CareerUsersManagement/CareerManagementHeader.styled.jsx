export const HeaderContainerSx = (theme) => ({
  mb: theme.spacing(2),
});

export const getAddButtonSx = (canCreate) => (theme) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.brand.main,
  opacity: canCreate ? 1 : 0.5,
  cursor: canCreate ? "pointer" : "not-allowed",
});
