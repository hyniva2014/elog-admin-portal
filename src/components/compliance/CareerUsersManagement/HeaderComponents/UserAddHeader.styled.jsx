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

export const BackButtonSx = {
  color: "#111",
  borderColor: "#d1d5db",
  textTransform: "none",
  fontWeight: 500,
  borderRadius: "8px",
  px: 2,
  py: 0.75,
  minWidth: "auto",
  fontSize: "14px",
  backgroundColor: "#ffffff",
  "&:hover": {
    borderColor: "#9ca3af",
    backgroundColor: "#f9fafb",
  },
};

export const BackIconSx = {
  fontSize: 20,
  color: "#111",
};

export const ActiveStatusSx = {
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  px: 1.5,
  py: 0.5,
  borderRadius: "16px",
  fontSize: "12px",
  fontWeight: 500,
  background: "#dcfce7",
  color: "#166534",
};

export const ActiveStatusDotSx = {
  width: 6,
  height: 6,
  borderRadius: "50%",
  backgroundColor: "#166534",
};

export const CardContainerSx = {
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  p: 3,
  mb: 1,
  backgroundColor: "#ffffff",
};

export const ProgressWrapperSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
};

export const ProgressTextSx = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#6b7280",
  mb: 1,
};

export const ProgressBarSx = {
  height: 8,
  borderRadius: 4,
  backgroundColor: "#e5e7eb",
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#284495",
    borderRadius: 4,
  },
};

export const ProgressValueSx = {
  fontWeight: 600,
  color: "#284495",
  fontSize: "14px",
  minWidth: 40,
};

export const StatusItemsSx = {
  display: "flex",
  gap: 2,
  flexWrap: "wrap",
  alignItems: "center",
};

export const StatusItemSx = (completed) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  px: 2,
  py: 0.75,
  borderRadius: "999px",
  backgroundColor: completed ? "#ecfdf5" : "#ffffff",
  border: completed ? "1px solid #B8E8CA" : "1px solid #d1d5db",
});

export const StatusItemTextSx = (completed) => ({
  fontSize: "13px",
  fontWeight: 500,
  color: completed ? "#27AE60" : "#9ca3af",
});

export const StepperWrapperSx = {
  width: "98%",
  borderBottom: "2px solid #e5e7eb",
  pb: 0,
  ml: 1,
};

export const StepListSx = {
  display: "flex",
  gap: { xs: 2, sm: 4, md: 6, lg: 9 },
  alignItems: "center",
  flexWrap: "wrap",
};

export const StepItemSx = (isActive) => ({
  borderBottom: isActive ? "2px solid #284495" : "none",
  pb: isActive ? 0.5 : 0,
  cursor: "pointer",
});

export const StepTextSx = (isActive) => ({
  fontSize: "14px",
  fontWeight: isActive ? 600 : 400,
  color: isActive ? "#284495" : "#9ca3af",
  "&:hover": {
    color: isActive ? "#284495" : "#6b7280",
  },
});
