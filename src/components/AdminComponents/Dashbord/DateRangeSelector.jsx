import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  useTheme,
  Grid,
} from "@mui/material";
import { buttonGroupStyles } from "./AlertCenter.styles";


const calculateDateRange = (period) => {
  const today = new Date();
  const end = new Date(today);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (period === "Today") {
    return {
      startDate: formatDate(today),
      endDate: formatDate(today),
      startDateObj: today,
      endDateObj: today,
    };
  }

  const days = parseInt(period);
  const start = new Date(today);
  start.setDate(start.getDate() - days + 1);

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
    startDateObj: start,
    endDateObj: end,
  };
};

const DateRangeSelector = ({
  onDateRangeChange,
  initialPeriod = "Today",
  title = "",
  periods = [
    { label: "Today", value: "Today" },
    { label: "7D", value: "7D" },
    { label: "14D", value: "14D" },
    { label: "30D", value: "30D" },
  ],
}) => {
  const theme = useTheme();

  const buttonStyles = buttonGroupStyles(theme);

  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    const newRange = calculateDateRange(period);

    onDateRangeChange?.({
      period,
      startDate: newRange.startDate,
      endDate: newRange.endDate,
      startDateObj: newRange.startDateObj,
      endDateObj: newRange.endDateObj,
    });
  };

  return (
    <ButtonGroup
      variant="contained"
      sx={{
        ...buttonStyles,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {periods.map((period) => (
        <Button
          key={period.value}
          onClick={() => handlePeriodChange(period.value)}
          className={selectedPeriod === period.value ? "selected" : ""}
          sx={{
            "&:not(:last-of-type)": {
              borderRight: "1px solid",
              borderRightColor: "divider",
            },
          }}
        >
          {period.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default DateRangeSelector;
