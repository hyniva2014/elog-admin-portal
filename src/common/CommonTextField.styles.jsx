import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CommonTextFieldStyled = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "isEdit" && prop !== "required",
})(({ theme, isEdit, multiline }) => ({
  width: "100%",

  "& .MuiOutlinedInput-root": {
    borderRadius: 5,
    opacity: 1,
    backgroundColor: "#FFFFFF",

    ...(multiline ? {} : {}),

    "& fieldset": {
      borderColor: "#ccc",
    },

    "&.Mui-disabled": {
      backgroundColor: "#F9F9F9",
      opacity: 1,
    },

    "& .MuiOutlinedInput-input": {
      fontSize: 14,
      color:
        theme.palette.mode === "dark" ? "#000000" : theme.palette.text.primary,
      caretColor:
        theme.palette.mode === "dark" ? "#000000" : theme.palette.text.primary,
    },

    "& .MuiOutlinedInput-inputMultiline": {
      paddingTop: "16px",
      paddingBottom: "12px",
    },
  },

  "& .MuiInputLabel-root": {
    fontSize: 13,
    color:
      theme.palette.mode === "dark" ? "#000000" : theme.palette.text.secondary,
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color:
      theme.palette.mode === "dark" ? "#000000" : theme.palette.primary.main,
  },

  "& .MuiInputLabel-root.Mui-error": {
    color: theme.palette.error.main,
  },
  "& .MuiFormLabel-asterisk": {
    color: "#d32f2f",
    fontWeight: 600,
  },
}));

export default CommonTextFieldStyled;
