export const getTextFieldSx = (disabled) => ({
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
    backgroundColor: "#f5f5f5",
    color: "rgba(0, 0, 0, 0.6)",
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: "rgba(0, 0, 0, 0.6)",
  },
  "& .MuiFormLabel-asterisk": {
    color: "#d32f2f",
    fontWeight: 600,
  },
});

export const CalendarIconSx = {
  fontSize: 22,
};

export const getCalendarIconSx = (hideBorder) =>
  hideBorder
    ? {
        ...CalendarIconSx,
        color: "#2563EB",
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
