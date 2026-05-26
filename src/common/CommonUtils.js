import dayjs from "dayjs";

export const buildSummaryCards = (responseData, cardConfig) => {
  return cardConfig.map((card) => ({
    ...card,
    value: String(responseData?.[card.key] ?? 0),
  }));
};

export const formatDateRange = (
  start,
  end,
  displayVariant = "single-or-range",
) => {
  const formattedStart = start ? dayjs(start).format("MM-DD-YYYY") : "";
  const formattedEnd = end ? dayjs(end).format("MM-DD-YYYY") : "";

  if (!formattedStart && !formattedEnd) return "";

  if (displayVariant === "single-or-range") {
    if (!formattedEnd || formattedStart === formattedEnd) {
      return formattedStart;
    }
    return `${formattedStart} - ${formattedEnd}`;
  }

  return `${formattedStart}${formattedEnd ? ` - ${formattedEnd}` : ""}`;
};
