import dayjs from "dayjs";

const formatDisplayDate = (date) => {
  return dayjs(date).format("MM-DD-YYYY");
};

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

export const buildSummaryCards = (apiBody = {}, config = {}) => {
  const configList = Array.isArray(config)
    ? config
    : Object.entries(config).map(([key, meta]) => ({ key, ...meta }));

  return configList
    .map((meta) => {
      const sourceKey = meta.key || meta.id;
      return {
        id: meta.id,
        title: meta.title,
        value: apiBody[sourceKey] ?? 0,
        accentcolor: meta.accentcolor,
        icon: meta.icon || meta.iconPath || null,
        iconPath: meta.iconPath,
      };
    })
    .filter((card) => card.id && card.title);
};
