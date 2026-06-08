import { ALERT_STATUS_COLORS } from "./AdminConstant";

export const AlertCenterRowData = (records = []) => {
  return records.map((record) => ({
    id: record.notification_id,

    title: record.title,
    message: record.message,

    truck: record.truck_number ?? "-",

    serial: record.device_serial_number ?? "-",

    location1:
      record.latitude !== null && record.latitude !== undefined
        ? record.latitude
        : "-",

    location2:
      record.longitude !== null && record.longitude !== undefined
        ? record.longitude
        : "-",

    date: record.created_at
      ? new Date(record.created_at).toLocaleDateString("en-GB")
      : "-",

    color: ALERT_STATUS_COLORS[record.status] ?? "#EF4444",
  }));
};
