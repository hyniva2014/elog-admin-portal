export const AutocompleteSx = (minWidth) => (theme) => ({
  minWidth,
  "& .MuiInputBase-root.Mui-disabled": {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.disabled,
  },
});

export const TextFieldSx = (theme) => ({
  "& .MuiInputBase-root.Mui-disabled": {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.disabled,
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: theme.palette.text.disabled,
  },
});

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
