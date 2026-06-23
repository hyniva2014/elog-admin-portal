export const DEVICE_ASSET_STATUS_FILTER_OPTIONS = [
  { value: "0", label: "In Stock" },
  { value: "1", label: "Allocated" },
  { value: "2", label: "Assigned" },
  { value: "3", label: "Out of Service" },
];

export const DEVICE_ASSET_IGNITION_FILTER_OPTIONS = [
  { value: "ON", label: "ON" },
  { value: "OFF", label: "OFF" },
];

export const DEVICE_ASSET_MODEL_FILTER_OPTIONS = [
  { value: "Geotab GO9", label: "Geotab GO9" },
  { value: "Samsara VG34", label: "Samsara VG34" },
  { value: "KeepTruckin K5", label: "KeepTruckin K5" },
  { value: "Omnitracs IVG", label: "Omnitracs IVG" },
  { value: "VG34", label: "VG34" },
];

export const STATUS_OPTIONS = [
  {
    value: 1,
    label: "Active",
  },
  {
    value: 0,
    label: "Inactive",
  },
];

export const STATIC_GROUP_DATA = [
  {
    id: 1,
    createdBy: "John Miller",
    createdDate: "Dec 11, 2025",
    createdTime: "06:15 AM",
    notes: "Note Content Here",
  },
  {
    id: 2,
    createdBy: "John Miller",
    createdDate: "Dec 12, 2025",
    createdTime: "06:15 AM",
    notes: "Note Content Here",
  },
  {
    id: 3,
    createdBy: "John Miller",
    createdDate: "Dec 12, 2025",
    createdTime: "06:15 AM",
    notes: "Note Content Here",
  },
  {
    id: 4,
    createdBy: "John Miller",
    createdDate: "Dec 12, 2025",
    createdTime: "06:15 AM",
    notes: "Note Content Here",
  },
  {
    id: 5,
    createdBy: "John Miller",
    createdDate: "Dec 15, 2025",
    createdTime: "06:15 AM",
    notes: "Note Content Here",
  },
];

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

export const INCIDENT_EVENT_TITLES = {
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
