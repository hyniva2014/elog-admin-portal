// import { chartData } from "./AdminConstant";

export const CURRENT_YEAR = new Date().getFullYear().toString();

export const AVAILABLE_YEARS = [
  "Last 6 months",
  ...Array.from({ length: 5 }, (_, index) => String(CURRENT_YEAR - index)),
];

export const CHART_TITLE = "Carrier Growth Trend";
export const DATA_KEY = "value";
export const X_AXIS_KEY = "monthName";
export const CHART_HEIGHT = 360;

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// export const defaultTrendData = chartData.map((item) => ({
//   ...item,
//   monthName: item.month,
// }));

export const getTrendArray = (trend = {}) => {
  const entries = Object.entries(trend || {});

  return entries
    .map(([monthKey, metrics]) => {
      const [year, month] = monthKey.split("-");
      const monthIndex = Number(month) - 1;

      return {
        monthKey,
        year,
        monthName: MONTH_NAMES[monthIndex] ?? monthKey,
        monthIndex,
        value: Number(metrics.total_carriers ?? metrics.count ?? 0),
        Total: Number(metrics.total_carriers ?? 0),
        newAddition: Number(metrics.new_addition ?? 0),
        loss: Number(metrics.loss ?? 0),
      };
    })
    .sort((a, b) => {
      if (a.year !== b.year) {
        return a.year.localeCompare(b.year);
      }

      return a.monthIndex - b.monthIndex;
    });
};

export const getLast6MonthsKeys = () => {
  const today = new Date();

  return new Set(
    Array.from({ length: 6 }, (_, offset) => {
      const date = new Date(today.getFullYear(), today.getMonth() - offset, 1);

      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0",
      )}`;
    }).reverse(),
  );
};

export const getVisibleTrendData = (trendEntries, selectedYear) => {
  if (selectedYear === "Last 6 months") {
    const today = new Date();

    return Array.from({ length: 6 }, (_, index) => {
      const date = new Date(
        today.getFullYear(),
        today.getMonth() - (5 - index),
        1,
      );

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}`;

      return (
        trendEntries.find((item) => item.monthKey === monthKey) || {
          monthKey,
          year: String(date.getFullYear()),
          monthName: MONTH_NAMES[date.getMonth()],
          value: 0,
          Total: 0,
          newAddition: 0,
          loss: 0,
        }
      );
    });
  }

  return MONTH_NAMES.map((monthName, index) => {
    const monthKey = `${selectedYear}-${String(index + 1).padStart(2, "0")}`;

    return (
      trendEntries.find((item) => item.monthKey === monthKey) || {
        monthKey,
        year: selectedYear,
        monthName,
        value: 0,
        Total: 0,
        newAddition: 0,
        loss: 0,
      }
    );
  });
};

export const formatSubtitle = (trendEntries, selectedYear) => {
  if (!trendEntries.length) return "";

  const first = trendEntries[0];
  const last = trendEntries[trendEntries.length - 1];

  return `${first.monthName}.${first.year} - ${last.monthName}.${last.year}`;
};
