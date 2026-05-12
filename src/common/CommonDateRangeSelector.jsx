import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { StaticDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { formatDateRange } from "../components/CommonUtils";
import CloseIcon from "@mui/icons-material/Close";

const DATE_FORMAT = "MM-DD-YYYY";
const PRESET_DAYS = [7, 14, 30];
const today = dayjs().endOf("day");

const detectPreset = (start, end) => {
  if (!start || !end) return null;
  const todayStart = dayjs().startOf("day");
  const todayEnd = dayjs().endOf("day");
  if (start.isSame(todayStart, "day") && end.isSame(todayEnd, "day")) {
    return "today";
  }
  if (!end.isSame(todayEnd, "day")) return "custom";
  const diff = end.diff(start, "day") + 1;
  if (diff === 7) return 7;
  if (diff === 14) return 14;
  if (diff === 30) return 30;
  return "custom";
};

const CommonDateRangeSelector = (props) => {
  const {
    value,
    onChange,
    hideBorder = false,
    hideButtons = false,
    displayVariant = "single-or-range",
    allowClear = false,
  } = props;

  const [tempDateRange, setTempDateRange] = useState(value || null);
  const [clicks, setClicks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePreset, setActivePreset] = useState(null);
  const [showInlineError, setShowInlineError] = useState(false);
  const [currentView, setCurrentView] = useState("day");

  const handleToday = () => {
    const start = dayjs().startOf("day");
    const end = dayjs().endOf("day");
    setActivePreset("today");
    setTempDateRange({ start, end });
    return {
      start: start.format(DATE_FORMAT),
    };
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  const handlePresetClick = (days) => {
    const end = dayjs().endOf("day");
    const start = end.subtract(days - 1, "day").startOf("day");

    setActivePreset(days);
    setTempDateRange({ start, end });

    return {
      start: start.format(DATE_FORMAT),
      end: end.format(DATE_FORMAT),
    };
  };

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
    setClicks([]);
    const defaultStart = dayjs().startOf("day");
    const defaultEnd = dayjs().endOf("day");
    if (!value?.start || !value?.end) {
      setTempDateRange({ start: defaultStart, end: defaultEnd });
      setActivePreset("today");
    } else {
      setTempDateRange(value);
      setActivePreset(detectPreset(value.start, value.end));
    }
  };

  const closePopover = () => setAnchorEl(null);

  const handleOk = () => {
    if (!tempDateRange?.start || !tempDateRange?.end) {
      if (activePreset === "custom") {
        setShowInlineError(true);
        setTimeout(() => {
          setShowInlineError(false);
        }, 5000);
        return;
      }
      return;
    }
    setShowInlineError(false);
    onChange(tempDateRange);
    closePopover();
  };

  const handleCustomSelection = () => {
    setActivePreset("custom");
    setTempDateRange(null);
    setClicks([]);
    setShowInlineError(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <TextField
          fullWidth
          size="small"
          label={hideBorder ? undefined : "Date Range"}
          value={formatDateRange(value?.start, value?.end, displayVariant)}
          placeholder="Select date range"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Box display="flex" alignItems="center">
                {allowClear && value?.start && (
                  <IconButton size="small" onClick={handleClear}>
                    <CloseIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                )}

                <IconButton size="small" onClick={openPopover}>
                  <CalendarMonthIcon
                    sx={{
                      fontSize: 22,
                      ...(hideBorder && {
                        color: "#2563EB",
                      }),
                    }}
                  />
                </IconButton>
              </Box>
            ),
            disableUnderline: true,
          }}
          onClick={openPopover}
          variant={hideBorder ? "standard" : "outlined"}
          sx={{
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
          }}
        />

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={closePopover}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          disableAutoFocus
          PaperProps={{
            sx: {
              width: 530,
              maxWidth: !hideButtons ? "90vw" : 380,
              borderRadius: 2,
              boxShadow: 4,
            },
          }}
        >
          <Box p={2} display="flex" gap={2}>
            {!hideButtons && (
              <Stack spacing={1} sx={{ minWidth: 140 }}>
                <Button
                  variant={activePreset === "today" ? "contained" : "filled"}
                  onClick={handleToday}
                >
                  Today
                </Button>

                {PRESET_DAYS.map((days) => (
                  <Button
                    key={days}
                    variant={activePreset === days ? "contained" : "filled"}
                    onClick={() => handlePresetClick(days)}
                  >
                    Last {days} days
                  </Button>
                ))}
                <Button
                  variant={activePreset === "custom" ? "contained" : "filled"}
                  onClick={handleCustomSelection}
                >
                  Custom
                </Button>
              </Stack>
            )}

            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                views={["year", "month", "day"]}
                openTo="day"
                value={tempDateRange?.start || null}
                onChange={(date) => {
                  if (!date) return;

                  if (currentView !== "day") return;

                  setClicks((prev) => {
                    let next;
                    if (prev.length === 0) {
                      next = [date];
                    } else if (prev.length === 1) {
                      next = [prev[0], date];
                    } else {
                      next = [date];
                    }
                    const [a, b] = next;
                    if (a && b) {
                      const start = b.isBefore(a, "day")
                        ? b.startOf("day")
                        : a.startOf("day");
                      const end = b.isBefore(a, "day")
                        ? a.endOf("day")
                        : b.endOf("day");
                      setTempDateRange({ start, end });
                      const preset = detectPreset(start, end);
                      setActivePreset(preset);
                      setShowInlineError(false);
                    } else if (a) {
                      const todayStart = dayjs().startOf("day");
                      const todayEnd = dayjs().endOf("day");
                      if (a.isSame(todayStart, "day")) {
                        const start = todayStart;
                        const end = todayEnd;
                        setTempDateRange({ start, end });
                        setActivePreset("today");
                      } else {
                        setTempDateRange({
                          start: a.startOf("day"),
                          end: a.endOf("day"),
                        });
                        setActivePreset("custom");
                      }
                    } else {
                      setTempDateRange({ start: a, end: null });
                    }
                    return next;
                  });
                }}
                onViewChange={(newView) => {
                  setCurrentView(newView);
                }}
                maxDate={today}
                slotProps={{
                  actionBar: { actions: [] },
                  day: ({ day }) => {
                    const start = tempDateRange?.start;
                    const end = tempDateRange?.end;
                    const isEnd = end && day.isSame(end, "day");
                    const inRange =
                      start &&
                      end &&
                      day.isAfter(start, "day") &&
                      day.isBefore(end, "day");

                    return {
                      sx: {
                        ...(inRange && {
                          backgroundColor: "lightblue !important",
                          "&:hover": {
                            backgroundColor: "lightblue !important",
                          },
                        }),
                        ...(isEnd && {
                          backgroundColor: "rgb(40,62,138) !important",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgb(40,62,138) !important",
                          },
                        }),
                      },
                    };
                  },
                }}
                sx={{ flex: 1 }}
              />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
                width="100%"
              >
                <Box>
                  {showInlineError && (
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#d32f2f",
                      }}
                    >
                      Please select custom date range
                    </Typography>
                  )}
                </Box>
                <Box display="flex" gap={1}>
                  <Button onClick={closePopover}>Cancel</Button>
                  <Button variant="contained" onClick={handleOk}>
                    OK
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Popover>
      </Box>
    </LocalizationProvider>
  );
};
export default CommonDateRangeSelector;
