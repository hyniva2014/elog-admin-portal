export const AddHeaderContainerSx = {
  width: "100%",
};

export const AddHeaderTopSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 3,
  width: "100%",
};

export const AddHeaderLeftSx = {
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
  px: 2,
  py: 0.75,
  minWidth: "auto",
  fontSize: "14px",
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[100],
  },
});

export const BackIconSx = (theme) => ({
  fontSize: 20,
  color: theme.palette.text.primary,
});

export const ActiveStatusSx = (theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  px: 1.5,
  py: 0.5,
  borderRadius: "16px",
  fontSize: "12px",
  fontWeight: 500,
  background: theme.palette.success.light,
  color: theme.palette.success.dark,
});

export const ActiveStatusDotSx = (theme) => ({
  width: 6,
  height: 6,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
});

export const CardContainerSx = (theme) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  p: 3,
  mb: 1,
  backgroundColor: theme.palette.background.paper,
});

export const ProgressWrapperSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
};

export const ProgressTextSx = (theme) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  mb: 1,
});

export const ProgressBarSx = (theme) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  "& .MuiLinearProgress-bar": {
    backgroundColor: theme.palette.brand.main,
    borderRadius: 4,
  },
});

export const ProgressValueSx = (theme) => ({
  fontWeight: 600,
  color: theme.palette.brand.main,
  fontSize: "14px",
  minWidth: 40,
});

export const StatusItemsSx = {
  display: "flex",
  gap: 2,
  flexWrap: "wrap",
  alignItems: "center",
};

export const StatusItemSx = (completed) => (theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  px: 2,
  py: 0.75,
  borderRadius: "999px",
  backgroundColor: completed ? theme.palette.success.light : theme.palette.common.white,
  border: completed ? `1px solid ${theme.palette.success.main}` : `1px solid ${theme.palette.divider}`,
});

export const StatusItemTextSx = (completed) => (theme) => ({
  fontSize: "13px",
  fontWeight: 500,
  color: completed ? theme.palette.success.main : theme.palette.text.secondary,
});

export const StepperWrapperSx = (theme) => ({
  width: "98%",
  borderBottom: `2px solid ${theme.palette.divider}`,
  pb: 0,
  ml: 1,
});

export const StepListSx = {
  display: "flex",
  gap: { xs: 2, sm: 4, md: 6, lg: 9 },
  alignItems: "center",
  flexWrap: "wrap",
};

export const StepItemSx = (isActive) => (theme) => ({
  borderBottom: isActive ? `2px solid ${theme.palette.brand.main}` : "none",
  pb: isActive ? 0.5 : 0,
  cursor: "pointer",
});

export const StepTextSx = (isActive) => (theme) => ({
  fontSize: "14px",
  fontWeight: isActive ? 600 : 400,
  color: isActive ? theme.palette.brand.main : theme.palette.text.secondary,
  "&:hover": {
    color: isActive ? theme.palette.brand.main : theme.palette.text.primary,
  },
});
