import React, { useState } from "react";
import { StyledButtonGroup, PeriodButton } from "./DateRangeSelector.styled";

const DEFAULT_PERIODS = [
  { label: "Today", value: "Today" },
  { label: "7D", value: "7D" },
  { label: "14D", value: "14D" },
  { label: "30D", value: "30D" },
];

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
  periods = DEFAULT_PERIODS,
}) => {
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
    <StyledButtonGroup variant="contained">
      {periods.map((period) => (
        <PeriodButton
          key={period.value}
          onClick={() => handlePeriodChange(period.value)}
          className={selectedPeriod === period.value ? "selected" : ""}
        >
          {period.label}
        </PeriodButton>
      ))}
    </StyledButtonGroup>
  );
};

export default DateRangeSelector;
