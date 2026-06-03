import { Box, IconButton, Popover, TextField } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import {
  getCalendarIconSx,
  getTextFieldSx,
  PopoverPaperSx,
  StaticDatePickerSx,
  PopoverContentBoxSx,
} from "./CommonSingleDateSelector.styled";

dayjs.extend(customParseFormat);

const CommonSingleDateSelector = ({
  value,
  onChange,
  hideBorder = false,
  label = "Date",
  error = false,
  helperText = "",
  minDate,
  maxDate,
  disabled = false,
  customSx = {},
  required = false,
  disablePast = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentView, setCurrentView] = useState("day");
  const [internalValue, setInternalValue] = useState(
    value ? dayjs(value) : null,
  );

  useEffect(() => {
    setInternalValue(value ? dayjs(value) : null);
  }, [value]);

  const today = dayjs().startOf("day");
  const effectiveMinDate = disablePast
    ? minDate && dayjs(minDate).isAfter(today, "day")
      ? dayjs(minDate)
      : today
    : minDate || undefined;

  const getFormattedValue = (value) => {
    return value ? value.format("DD/MM/YYYY") : "";
  };

  const getTextFieldVariant = (hideBorder) => {
    return hideBorder ? "standard" : "outlined";
  };

  const getTextFieldLabel = (hideBorder, label) => {
    return hideBorder ? undefined : label;
  };

  const getShouldOpenPopover = () => {
    return typeof window !== "undefined" && window.Cypress
      ? undefined
      : openPopover;
  };

  const formattedValue = getFormattedValue(internalValue);
  const textFieldVariant = getTextFieldVariant(hideBorder);
  const textFieldLabel = getTextFieldLabel(hideBorder, label);
  const shouldOpenPopover = getShouldOpenPopover();

  const calendarIcon = (
    <IconButton size="small" onClick={openPopover}>
      <CalendarMonthIcon sx={getCalendarIconSx(hideBorder)} />
    </IconButton>
  );

  const getInputProps = (hideBorder, calendarIcon) => {
    if (hideBorder) {
      return {
        readOnly: true,
        disableUnderline: true,
        endAdornment: calendarIcon,
      };
    }
    return {
      readOnly: true,
      endAdornment: calendarIcon,
    };
  };

  const inputProps = getInputProps(hideBorder, calendarIcon);

  const getTextFieldOnClick = () => {
    return shouldOpenPopover;
  };

  function openPopover(event) {
    if (disabled) return;

    setAnchorEl(event.currentTarget);
    setCurrentView("day");
    setInternalValue(value ? dayjs(value) : null);
  }

  function closePopover() {
    setAnchorEl(null);
  }

  const handleDateChange = (newDate) => {
    if (!newDate || !dayjs(newDate).isValid()) {
      return;
    }

    setInternalValue(newDate);

    if (currentView === "day") {
      onChange(newDate);
      closePopover();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <TextField
          fullWidth
          size="small"
          label={textFieldLabel}
          value={formattedValue}
          placeholder="DD/MM/YYYY"
          error={error}
          helperText={helperText}
          required={required}
          disabled={disabled}
          onClick={getTextFieldOnClick()}
          variant={textFieldVariant}
          InputProps={inputProps}
          sx={[getTextFieldSx(disabled), customSx]}
        />

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={closePopover}
          disableAutoFocus
          disableEnforceFocus
          disableRestoreFocus
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          PaperProps={{ sx: PopoverPaperSx }}
        >
          <Box sx={PopoverContentBoxSx}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              views={["year", "month", "day"]}
              value={internalValue}
              onViewChange={setCurrentView}
              onChange={handleDateChange}
              minDate={effectiveMinDate}
              maxDate={maxDate || undefined}
              disablePast={disablePast}
              slotProps={{
                actionBar: { actions: [] },
              }}
              sx={StaticDatePickerSx}
            />
          </Box>
        </Popover>
      </Box>
    </LocalizationProvider>
  );
};

export default CommonSingleDateSelector;
