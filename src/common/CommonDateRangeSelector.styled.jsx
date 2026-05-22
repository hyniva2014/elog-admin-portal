import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CloseIconSx = {
  fontSize: 18,
};

export const CalendarIconSx = {
  fontSize: 22,
};

export const CalendarIconHideBorderSx = (theme) => ({
  color: theme.palette.custom.blue,
});

export const TextFieldSx = {
  minWidth: 270,
  "& .MuiInput-underline:before": {
    borderBottom: "none",
  },
  "& .MuiInput-underline:hover:before": {
    borderBottom: "none",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiInputBase-root": {
    height: 36,
    display: "flex",
    alignItems: "center",
  },
  "& .MuiInputBase-input": {
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    paddingLeft: "8px",
    paddingTop: "5px",
    textAlign: "center",
  },
};

export const StackSx = {
  minWidth: 140,
};

export const StaticDatePickerSx = {
  flex: 1,
};

export const ErrorTypographySx = (theme) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.custom.errorRed,
});
