export const auditCreatedDateSx = (theme) => ({
  fontSize: "0.875rem",
  fontWeight: 500,
  lineHeight: 1,
  color: theme.palette.text.primary,
});

export const auditCreatedTimeSx = (theme) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.4,
});

export const tableContainerSx = {
  width: "100%",
  mt: 1,
};

export const backButtonWrapperSx = {
  pt: 2,
  mt: 1,
  display: "flex",
  justifyContent: "center",
};

export const backButtonSx = {
  minWidth: 200,
  backgroundColor: "#1a3a6b",
  "&:hover": { backgroundColor: "#14306a" },
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 1,
};
