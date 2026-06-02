import { styled } from "@mui/material/styles";
import { Autocomplete, TextField } from "@mui/material";

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: "100%",

  "& .MuiInputBase-root": {
    height: 36,
    fontSize: 13,
    backgroundColor: theme.palette.common.white,
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[400],
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root.Mui-disabled": {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.disabled,
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: theme.palette.text.disabled,
  },
  "& .MuiFormLabel-asterisk": {
    color: theme.palette.error.main,
    fontWeight: 600,
  },
}));
