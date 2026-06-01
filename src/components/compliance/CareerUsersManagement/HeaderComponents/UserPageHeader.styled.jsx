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

export const BackButtonSx = {
  color: "#111",
  borderColor: "#d1d5db",
  textTransform: "none",
  fontWeight: 500,
  borderRadius: "8px",
  px: 1.5,
  "&:hover": {
    borderColor: "#9ca3af",
    backgroundColor: "#f9fafb",
  },
};

export const StatusChipSx = (isActive) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  px: 1.5,
  py: 0.5,
  borderRadius: "16px",
  fontSize: "12px",
  fontWeight: 500,
  background: isActive ? "#e6f4ea" : "#fdecea",
  color: isActive ? "#2e7d32" : "#d32f2f",
});

export const StatusDotSx = (isActive) => ({
  width: 6,
  height: 6,
  borderRadius: "50%",
  backgroundColor: isActive ? "#2e7d32" : "#d32f2f",
});

export const HeaderButtonsSx = {
  display: "flex",
  gap: 1,
};
