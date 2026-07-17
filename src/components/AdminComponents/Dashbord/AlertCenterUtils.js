import { ALERT_STATUS_COLORS } from "./AdminConstant";
import {
  SEVERITY_MAP,
  MODULE_CATEGORY_MAP,
} from "./AlertCeneter/AlertCategoryConfig";

export const AlertCenterRowData = (records = []) => {
  return records.map((record) => {
    const severity = SEVERITY_MAP[record.alert_severity] || "Medium";
    const category = MODULE_CATEGORY_MAP[record.alert_module] || "system_monitoring";

    const location =
      record.latitude && record.longitude
        ? `${Number(record.latitude).toFixed(4)}, ${Number(record.longitude).toFixed(4)}`
        : record.location || "-";

    return {
      ...record,
      id: record.notification_id,
      title: record.title,
      message: "-",
      company: record.company_name ?? "-",
      carrier_name: record.company_name ?? "-",
      truck: record.truck_number ?? "-",
      truck_number: record.truck_number ?? "-",
      driver_name: record.driver_name ?? "-",
      driver: record.driver_name ?? "-",
      location: location,
      location1: record.latitude ?? "-",
      location2: record.longitude ?? "-",
      severity: severity,
      category: category,
      created_at: record.created_at,
      color: ALERT_STATUS_COLORS[record.status] ?? "#EF4444",
    };
  });
};
