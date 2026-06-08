export const DialogActionsSx = {
  px: 3,
  pb: 2,
};

export const ActionButtonSx = {
  minWidth: 100,
};

export const MessageTypographySx = {
  fontSize: 14,
  color: "error.main"
};

export const DialogPaperSx = (theme) => ({
  background: "rgba(255, 255, 255, 0.78)",
  backdropFilter: "blur(4px)",
  border: `1.5px solid ${theme.palette.primary.main}`,
  borderRadius: "14px",
  boxShadow: theme.shadows[1],
});

export const DialogBackdropSx = {
  background: "transparent",
  // backdropFilter: "blur(1px)",
};

export const ReasonTextFieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
  },
  "& .MuiInputBase-input": {
    fontSize: 14,
    fontWeight: "bold",
  },
};

// export const DialogActionsSx = {
//   // Your existing styles
// };

// export const ActionButtonSx = {
//   // Your existing styles
// };

// export const MessageTypographySx = {
//   // Your existing styles
// };