import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DevicesIcon from "@mui/icons-material/Devices";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SecurityIcon from "@mui/icons-material/Security";
import DnsIcon from "@mui/icons-material/Dns";
import LinkIcon from "@mui/icons-material/Link";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CodeIcon from "@mui/icons-material/Code";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AndroidIcon from "@mui/icons-material/Android";

export const ALERT_CENTRE_MODULES = {
  MOBILE_MODULE: 1,
  CARRIER_REQUESTS: 2,
  ASSET_MANAGEMENT: 3,
  ELD_DEVICE_MONITORING: 4,
  INCIDENT_MANAGEMENT: 5,
  SYSTEM_MONITORING: 6,
  APPLICATION_ERRORS: 7,
  SECURITY: 8,
  INTEGRATION: 9,
  TRACKPULSE_PLATFORM: 10,
};

export const ALERT_CENTRE_SEVERITY = {
  CRITICAL: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
  INFORMATION: 5,
};

export const getSeverityColor = (severity) => {
  switch (severity?.toLowerCase()) {
    case "critical":
      return "#EF4444";
    case "high":
      return "#F59E0B";
    case "medium":
      return "#F59E0B";
    case "low":
      return "#10B981";
    case "information":
      return "#3B82F6";
    default:
      return "#6B7280";
  }
};

export const REPORTED_SITE = {
  MOBILE: 1,
  WEB: 2,
};

export const INCIDENT_EVENT_TYPES = {
  HOS: 1,
  LOGS: 2,
  DVIR: 3,
  DOT: 4,
  ACCIDENT: 5,
  TEAM_DRIVER: 6,
  PROFILE: 7,
  COMPLIANCE_DASHBOARD: 8,
  VIOLATIONS: 9,
  DOCUMENT_CENTER: 10,
  OPERATION_CENTER: 11,
  HOS_SETTINGS: 12,
  ROLES: 13,
  USERS: 14,
  REPORT_INCIDENT: 15,
  REPORTS: 16,
  FLEET_MANAGEMENT: 17,
};

export const SEVERITY_MAP = {
  [ALERT_CENTRE_SEVERITY.CRITICAL]: "Critical",
  [ALERT_CENTRE_SEVERITY.HIGH]: "High",
  [ALERT_CENTRE_SEVERITY.MEDIUM]: "Medium",
  [ALERT_CENTRE_SEVERITY.LOW]: "Low",
  [ALERT_CENTRE_SEVERITY.INFORMATION]: "Info",
};

export const MODULE_CATEGORY_MAP = {
  [ALERT_CENTRE_MODULES.MOBILE_MODULE]: "mobile_app",
  [ALERT_CENTRE_MODULES.CARRIER_REQUESTS]: "carrier_request",
  [ALERT_CENTRE_MODULES.ASSET_MANAGEMENT]: "eld_device",
  [ALERT_CENTRE_MODULES.ELD_DEVICE_MONITORING]: "eld_device",
  [ALERT_CENTRE_MODULES.INCIDENT_MANAGEMENT]: "incident",
  [ALERT_CENTRE_MODULES.SYSTEM_MONITORING]: "system_monitoring",
  [ALERT_CENTRE_MODULES.APPLICATION_ERRORS]: "system_monitoring",
  [ALERT_CENTRE_MODULES.SECURITY]: "security",
  [ALERT_CENTRE_MODULES.INTEGRATION]: "integration",
  [ALERT_CENTRE_MODULES.TRACKPULSE_PLATFORM]: "system_monitoring",
};

export const INCIDENT_EVENT_TYPES_MAP = {
  [INCIDENT_EVENT_TYPES.HOS]: "HOS",
  [INCIDENT_EVENT_TYPES.LOGS]: "Logs",
  [INCIDENT_EVENT_TYPES.DVIR]: "DVIR",
  [INCIDENT_EVENT_TYPES.DOT]: "DOT",
  [INCIDENT_EVENT_TYPES.ACCIDENT]: "Accident",
  [INCIDENT_EVENT_TYPES.TEAM_DRIVER]: "Team Driver",
  [INCIDENT_EVENT_TYPES.PROFILE]: "Profile",
  [INCIDENT_EVENT_TYPES.COMPLIANCE_DASHBOARD]: "Compliance Dashboard",
  [INCIDENT_EVENT_TYPES.VIOLATIONS]: "Violations",
  [INCIDENT_EVENT_TYPES.DOCUMENT_CENTER]: "Document Center",
  [INCIDENT_EVENT_TYPES.OPERATION_CENTER]: "Operation Center",
  [INCIDENT_EVENT_TYPES.HOS_SETTINGS]: "HOS Settings",
  [INCIDENT_EVENT_TYPES.ROLES]: "Roles",
  [INCIDENT_EVENT_TYPES.USERS]: "Users",
  [INCIDENT_EVENT_TYPES.REPORT_INCIDENT]: "Report Incident",
  [INCIDENT_EVENT_TYPES.REPORTS]: "Reports",
  [INCIDENT_EVENT_TYPES.FLEET_MANAGEMENT]: "Fleet Management",
};

export const REPORTED_SITE_MAP = {
  [REPORTED_SITE.MOBILE]: "Mobile",
  [REPORTED_SITE.WEB]: "Web",
};

export const CATEGORY_METADATA = {
  eld_device: {
    label: "ELD Device",
    icon: "📱",
  },
  incident: {
    label: "Incident",
    icon: "⚠️",
  },
  mobile_app: {
    label: "Mobile App",
    icon: "🤖",
  },
  carrier_request: {
    label: "Carrier Request",
    icon: "📋",
  },
  security: {
    label: "Security",
    icon: "🔒",
  },
  system_monitoring: {
    label: "System Monitoring",
    icon: "📊",
  },
  integration: {
    label: "Integration",
    icon: "🔗",
  },
};

export const CATEGORY_FIELDS = {
  eld_device: [
    { key: "carrier_name", icon: BusinessIcon, label: "Carrier" },
    { key: "device_serial_number", icon: DevicesIcon, label: "Device" },
    { key: "truck_number", icon: LocalShippingIcon, label: "Truck" },
    { key: "location", icon: LocationOnIcon, label: "Location" },
    { key: "created_at", icon: AccessTimeIcon, label: "Time" },
  ],
  incident: [
    { key: "carrier_name", icon: BusinessIcon, label: "Carrier" },
    { key: "driver_name", icon: PersonIcon, label: "Driver" },
    { key: "truck_number", icon: LocalShippingIcon, label: "Truck" },
    { key: "module", icon: DevicesIcon, label: "Module" },
    { key: "platform", icon: DevicesIcon, label: "Platform" },
    { key: "location", icon: LocationOnIcon, label: "Location" },
    { key: "created_at", icon: AccessTimeIcon, label: "Time" },
  ],
  mobile_app: [
    { key: "carrier_name", icon: BusinessIcon, label: "Carrier" },
    { key: "android_version", icon: PhoneAndroidIcon, label: "Android Version" },
    { key: "device_name", icon: DevicesIcon, label: "Device" },
    { key: "location", icon: LocationOnIcon, label: "Location" },
    { key: "created_at", icon: AccessTimeIcon, label: "Time" },
  ],
  carrier_request: [
    { key: "carrier_name", icon: BusinessIcon, label: "Carrier" },
    { key: "reported_by", icon: PersonIcon, label: "Reported By" },
    { key: "location", icon: LocationOnIcon, label: "Location" },
    { key: "created_at", icon: AccessTimeIcon, label: "Time" },
  ],
  security: [
    { key: "email", icon: PersonIcon, label: "Email" },
    { key: "network_ip", icon: SecurityIcon, label: "IP Address" },
    { key: "location", icon: LocationOnIcon, label: "Location" },
    { key: "created_at", icon: AccessTimeIcon, label: "Time" },
  ],
  system_monitoring: [
    { key: "error_rate", icon: ErrorOutlineIcon, label: "Error Rate" },
    { key: "location", icon: LocationOnIcon, label: "Location" },
    { key: "created_at", icon: AccessTimeIcon, label: "Time" },
  ],
  integration: [
    { key: "carrier_name", icon: BusinessIcon, label: "Carrier" },
    { key: "location", icon: LocationOnIcon, label: "Location" },
    { key: "created_at", icon: AccessTimeIcon, label: "Time" },
  ],
};

export const getCleanTitle = (item) => {
  if (!item) return "-";

  const companyPart = item.company_name || item.carrier_name || item.company || "";
  let titlePart = item.title || item.message || "-";

  const moduleNum = Number(item.alert_module);
  if (moduleNum === ALERT_CENTRE_MODULES.INCIDENT_MANAGEMENT) {
    const apiTitle = item.title || item.message;
    if (apiTitle && apiTitle !== "-") {
      // Extract numeric value from the title (e.g., "A new incident requires your review: 2" -> 2)
      const numberMatch = apiTitle.match(/\d+/);
      const numericValue = numberMatch ? parseInt(numberMatch[0], 10) : NaN;
      if (!isNaN(numericValue) && INCIDENT_EVENT_TYPES_MAP[numericValue]) {
        const moduleName = INCIDENT_EVENT_TYPES_MAP[numericValue];
        // Replace the numeric value in the title with the module name
        titlePart = apiTitle.replace(/\d+/, moduleName);
      } else {
        titlePart = apiTitle;
      }
    } else {
      const eventTypeId = item.module_reported_from || item.incident_event_type || item.event_type;
      if (eventTypeId) {
        const eventName = INCIDENT_EVENT_TYPES_MAP[Number(eventTypeId)] || INCIDENT_EVENT_TYPES_MAP[eventTypeId];
        if (eventName) {
          titlePart = `${eventName} Reported by Driver`;
        }
      } else {
        titlePart = "Incident Reported";
      }
    }
  }

  let codePrefix = "ALT";
  switch (moduleNum) {
    case ALERT_CENTRE_MODULES.MOBILE_MODULE:
      codePrefix = "APP";
      break;
    case ALERT_CENTRE_MODULES.CARRIER_REQUESTS:
      codePrefix = "REQ";
      break;
    case ALERT_CENTRE_MODULES.ASSET_MANAGEMENT:
    case ALERT_CENTRE_MODULES.ELD_DEVICE_MONITORING:
      codePrefix = "ELD";
      break;
    case ALERT_CENTRE_MODULES.INCIDENT_MANAGEMENT:
      codePrefix = "INC";
      break;
    case ALERT_CENTRE_MODULES.SYSTEM_MONITORING:
    case ALERT_CENTRE_MODULES.APPLICATION_ERRORS:
      codePrefix = "SYS";
      break;
    case ALERT_CENTRE_MODULES.SECURITY:
      codePrefix = "USR";
      break;
    case ALERT_CENTRE_MODULES.INTEGRATION:
      codePrefix = "INT";
      break;
  }

  const suffix = item.notification_id ? ` - ${codePrefix}-${item.notification_id}` : "";

  return `${titlePart}${suffix}`;
};

export const getFormattedValue = (field, value) => {
  if (!value && value !== 0) return "-";
  
  if (field.key === "created_at" && typeof value === "string") {
    try {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      return value;
    }
  }
  
  if (field.key === "error_rate" && value) {
    return `Error Rate: ${value}`;
  }
  
  return value;
};

export const groupFieldsIntoRows = (fields, itemsPerRow = 3) => {
  const rows = [];
  for (let i = 0; i < fields.length; i += itemsPerRow) {
    rows.push(fields.slice(i, i + itemsPerRow));
  }
  return rows;
};