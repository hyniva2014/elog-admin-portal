import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CommonTextFieldStyled = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "isEdit" && prop !== "required",
})(({ theme, isEdit, multiline }) => ({
  width: "100%",

  "& .MuiOutlinedInput-root": {
    borderRadius: 5,
    opacity: 1,
    backgroundColor: theme.palette.background.paper,

    ...(multiline ? {} : {}),

    "& fieldset": {
      borderColor: theme.palette.divider,
    },

    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[100],
      opacity: 1,
    },

    "& .MuiOutlinedInput-input": {
      fontSize: 14,
      color: theme.palette.text.primary,
      caretColor: theme.palette.text.primary,
    },

    "& .MuiOutlinedInput-inputMultiline": {
      paddingTop: "16px",
      paddingBottom: "12px",
    },
  },

  "& .MuiInputLabel-root": {
    fontSize: 13,
    color: theme.palette.text.secondary,
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },

  "& .MuiInputLabel-root.Mui-error": {
    color: theme.palette.error.main,
  },
  "& .MuiFormLabel-asterisk": {
    color: theme.palette.error.main,
    fontWeight: 600,
  },
}));

export default CommonTextFieldStyled;
