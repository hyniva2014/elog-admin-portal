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
  return Object.entries(config)
    .filter(([key]) => key in apiBody)
    .map(([key, meta]) => ({
      id: meta.id,
      title: meta.title,
      value: apiBody[key] ?? 0,
      accentcolor: meta.accentcolor,
      icon: meta.icon,
    }));
};

export const formatDuration = (duration = "") => {
  if (!duration) return "-";

  const [hours = 0, minutes = 0] = duration.split(":").map(Number);

  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
};
export const formatLastSync = (value) => {
  if (!value) return "-";

  const d = dayjs(value, "YYYY-MM-DD HH:mm:ss");

  if (!d.isValid()) return "-";

  const datePart = d.format("MMM DD,YYYY");
  const timePart = d.format("hh:mmA");

  return `${datePart}\n${timePart}`;
};
export const formatDateTime = (isoString) => {
  if (!isoString || typeof isoString !== "string") {
    return { date: "-", time: "-" };
  }

  // Must contain T
  if (!isoString.includes("T")) {
    return { date: "-", time: "-" };
  }

  const parts = isoString.split("T");

  if (parts.length < 2) {
    return { date: "-", time: "-" };
  }

  const [datePart, timePartRaw] = parts;

  if (!timePartRaw) {
    return { date: "-", time: "-" };
  }

  const timePart = timePartRaw.split("-")[0]; // remove timezone safely

  const timeSplit = timePart.split(":");

  if (timeSplit.length < 2) {
    return { date: "-", time: "-" };
  }

  const [hh, mm] = timeSplit;

  const hours = Number(hh);
  const minutes = mm;

  if (isNaN(hours)) {
    return { date: "-", time: "-" };
  }

  const date = new Date(datePart).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return {
    date,
    time: `${String(displayHour).padStart(2, "0")}:${minutes} ${period}`,
  };
};
export const formatDisplayDateRange = (firstParam, secondParam) => {
  let startDateStr, endDateStr;

  if (secondParam !== undefined) {
    startDateStr = firstParam;
    endDateStr = secondParam;
  } else if (typeof firstParam === "string" && firstParam.includes(" to ")) {
    const parts = firstParam.split(" to ");
    startDateStr = parts[0];
    endDateStr = parts[1];
  } else if (typeof firstParam === "string") {
    return dayjs(firstParam).format("MMM DD, YYYY");
  } else {
    return "-";
  }

  if (!startDateStr || !endDateStr) return "-";

  const startFormatted = dayjs(startDateStr).format("MMM DD, YYYY");
  const endFormatted = dayjs(endDateStr).format("MMM DD, YYYY");

  return `${startFormatted} to ${endFormatted}`;
};

export const formatSSN = (value) => {
  if (!value) return value;
  const ssn = value.replace(/\D/g, "");
  if (ssn.length <= 3) {
    return ssn;
  }
  if (ssn.length <= 5) {
    return `${ssn.slice(0, 3)}-${ssn.slice(3)}`;
  }
  return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 9)}`;
};

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "";
  const cleaned = String(phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

export const showFileValidationError = (
  type,
  message,
  maxSize,
  formatFileSize,
) => {
  const maxSizeFormatted = formatFileSize(maxSize);
  let errorMessage = "";

  if (type === "invalid_type") {
    errorMessage = message || "Invalid file type";
  } else if (type === "oversized") {
    errorMessage = `File size must be less than ${maxSizeFormatted}`;
  } else {
    errorMessage = "File validation failed";
  }

  alert(errorMessage);
};
export const getSelectedDevices = (selectedIds) => {
  return allRows
    .filter((row) => selectedIds.includes(row.id))
    .map((row) => ({
      device_id: row.id,
    }));};