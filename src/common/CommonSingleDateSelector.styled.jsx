export const getTextFieldSx = (disabled) => (theme) => ({
  minWidth: theme.spacing(30),
  "& .MuiInputBase-root": {
    height: theme.spacing(4.5),
    display: "flex",
    alignItems: "center",
  },
  "& .MuiInputBase-input": {
    fontSize: theme.typography.pxToRem(13),
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(0.625),
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

export const PopoverContentBoxSx = {
  p: 1,
};
