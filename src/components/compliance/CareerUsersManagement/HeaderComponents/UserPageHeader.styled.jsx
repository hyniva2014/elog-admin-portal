export const PageHeaderContainerSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
};

export const PageHeaderLeftSx = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

export const BackButtonSx = (theme) => ({
  color: theme.palette.text.primary,
  borderColor: theme.palette.divider,
  textTransform: "none",
  fontWeight: 500,
  borderRadius: "8px",
  px: 1.5,
  "&:hover": {
    borderColor: theme.palette.grey[500],
    backgroundColor: theme.palette.grey[100],
  },
});

export const StatusChipSx = (isActive) => (theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  px: 1.5,
  py: 0.5,
  borderRadius: "16px",
  fontSize: "12px",
  fontWeight: 500,
  background: isActive
    ? theme.palette.success.light
    : theme.palette.error.light,
  color: isActive ? theme.palette.success.dark : theme.palette.error.main,
});

export const StatusDotSx = (isActive) => (theme) => ({
  width: 6,
  height: 6,
  borderRadius: "50%",
  backgroundColor: isActive
    ? theme.palette.success.main
    : theme.palette.error.main,
});

export const HeaderButtonsSx = {
  display: "flex",
  gap: 1,
};

export const PageHeaderTitleSx = {
  fontWeight: 700,
  fontSize: 17,
};
