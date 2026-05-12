export const formatDateRange = (start, end, variant = "single-or-range") => {
  if (!start || !end) return "";

  const sameDay = dayjs(start).isSame(end, "day");

  switch (variant) {
    case "iso":
      return `${dayjs(start).format("YYYY-MM-DD")} to ${dayjs(end).format(
        "YYYY-MM-DD",
      )}`;

    case "range-only":
      return `${formatDisplayDate(start)} - ${formatDisplayDate(end)}`;

    case "single-or-range":
    default:
      return sameDay
        ? formatDisplayDate(start)
        : `${formatDisplayDate(start)} - ${formatDisplayDate(end)}`;
  }
};