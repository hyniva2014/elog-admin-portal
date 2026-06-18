
export const getHeaderCellSx = (theme) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1e2a3a" : "#F6F6F6",
  fontWeight: 600,
  fontSize: "0.875rem",
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
  py: 1.5,
  px: 2,
});


export const getBodyCellSx = (theme) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
  py: 1.5,
  px: 2,
  verticalAlign: "top",
});

export const dateTextSx = {
  fontSize: "0.875rem",
  fontWeight: 500,
  lineHeight: 1,
};

export const getTimeTextSx = (theme) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.4,
});

export const tableContainerSx = {
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
