export const getTextFieldSx = (disabled) => (theme) => ({
  minWidth: 240,
  "& .MuiInputBase-root": {
    height: 36,
    display: "flex",
    alignItems: "center",
  },
  "& .MuiInputBase-input": {
    fontSize: 13,
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    paddingLeft: "8px",
    paddingTop: "5px",
    textAlign: "left",
  },
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
});

export const CalendarIconSx = {
  fontSize: 22,
};

export const getCalendarIconSx = (hideBorder) => (theme) =>
  hideBorder
    ? {
        ...CalendarIconSx,
        color: theme.palette.info.main,
      }
    : CalendarIconSx;

export const PopoverPaperSx = {
  borderRadius: 2,
  boxShadow: 4,
};

export const StaticDatePickerSx = {
  "& .MuiPickersLayout-root": {
    pb: 0,
  },
  "& .MuiPickersCalendarHeader-root": {
    mb: 1,
  },
  "& .MuiDayCalendar-root": {
    mb: 0,
  },
};
