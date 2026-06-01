export const AutocompleteSx = (minWidth) => ({
  minWidth,
  "& .MuiInputBase-root.Mui-disabled": {
    backgroundColor: "#f5f5f5",
    color: "rgba(0, 0, 0, 0.6)",
  },
});

export const TextFieldSx = {
  "& .MuiInputBase-root.Mui-disabled": {
    backgroundColor: "#f5f5f5",
    color: "rgba(0, 0, 0, 0.6)",
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: "rgba(0, 0, 0, 0.6)",
  },
};

export const CheckboxSx = {
  mr: 1,
};

export const CheckboxIconSx = {
  mr: 1,
};

export const OptionListItemSx = {
  display: "flex",
  alignItems: "center",
};
