import {
  TotalCarrierIcon,
  ActiveDevicesCardIcon,
  OpenIncidentsIcon,
  FMCSAIcon,
} from "./AdminDashboard.icons";

export const Device_Metrics_Cards = {
  total_carriers: {
    id: "total_carriers",
    title: "Total Carriers",
    icon: TotalCarrierIcon,
  },
  active_devices: {
    id: "active_devices",
    title: "Active Devices",
    icon: ActiveDevicesCardIcon,
  },
  open_incidents: {
    id: "open_incidents",
    title: "Open Incidents",
    icon: OpenIncidentsIcon,
  },
  // average_fmcsa_score:{
  //   id: "average_fmcsa_score",
  //   title: "Average FMCSA Score",
  //   icon: FMCSAIcon,
  // },
};

// export const chartData = [
//   {
//     month: "Jan",
//     value: 45,
//     Total: 15,
//     newAddition: 20,
//     loss: 10,
//   },
//   {
//     month: "Feb",
//     value: 52,
//     Total: 23,
//     newAddition: 25,
//     loss: 12,
//   },
//   {
//     month: "Mar",
//     value: 60,
//     Total: 40,
//     newAddition: 30,
//     loss: 15,
//   },
//   {
//     month: "Apr",
//     value: 78,
//     Total: 50,
//     newAddition: 35,
//     loss: 14,
//   },
// ];

// export const alerts = [
//   {
//     id: "alert-eld-device-issue",
//     title: "ELD device Issue",
//     company: "Swift Transportation",
//     truck: "TRK-256",
//     serial: "SN-ABC12345",
//     location1: "30.250661",
//     location2: "-97.735925",
//     date: "13/05/2026",
//     color: "#EF4444",
//   },
//   {
//     id: "alert-incident-2301",
//     title: "Incident #INC-2301 requires attention",
//     company: "Schneider National",
//     truck: "TRK-256",
//     serial: "SN-ABC12345",
//     location1: "32.345664",
//     location2: "-73.834832",
//     date: "03/05/2026",
//     color: "#F59E0B",
//   },
//   {
//     id: "alert-new-devices",
//     title: "12 new devices assigned",
//     company: "Schneider National",
//     truck: "TRK-256",
//     serial: "SN-ABC12345",
//     location1: "31.787654",
//     location2: "-72.128374",
//     date: "12/05/2026",
//     color: "#3B82F6",
//   },
// ];

export const ALERT_STATUS_COLORS = {
  1: "#F59E0B",
  2: "#EF4444",
  3: "#3B82F6",
};

export const TooltipKeys = [
  {
    key: "Total",
    label: "Total",
    color: "blue",
  },
  {
    key: "newAddition",
    label: "New Addition",
    color: "green",
  },
  {
    key: "loss",
    label: "Loss",
    color: "red",
  },
];

export const AlertCenterCards = [
  {
    id: "mobile_driver_log",
    title: "Mobile Driver Log",
    value: "06",
    icon: ActiveDevicesCardIcon,
  },
  {
    id: "web_compliance_management",
    title: "Web-Compliance Management",
    value: "01",
    icon: ActiveDevicesCardIcon,
  },
  {
    id: "eld_device_issues",
    title: "ELD Device Issues",
    value: "10",
    icon: ActiveDevicesCardIcon,
  },
];

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

export const alertCategoryOptions = [
  { value: ALERT_CENTRE_MODULES.MOBILE_MODULE, label: "Mobile Module" },
  { value: ALERT_CENTRE_MODULES.CARRIER_REQUESTS, label: "Carrier Requests" },
  { value: ALERT_CENTRE_MODULES.ASSET_MANAGEMENT, label: "Asset Management" },
  { value: ALERT_CENTRE_MODULES.ELD_DEVICE_MONITORING, label: "ELD Device Monitoring" },
  { value: ALERT_CENTRE_MODULES.INCIDENT_MANAGEMENT, label: "Incident Management" },
  { value: ALERT_CENTRE_MODULES.SYSTEM_MONITORING, label: "System Monitoring" },
  { value: ALERT_CENTRE_MODULES.APPLICATION_ERRORS, label: "Application Errors" },
  { value: ALERT_CENTRE_MODULES.SECURITY, label: "Security" },
  { value: ALERT_CENTRE_MODULES.INTEGRATION, label: "Integration" },
  { value: ALERT_CENTRE_MODULES.TRACKPULSE_PLATFORM, label: "TrackPulse Platform" },
];

export const alertSeverityOptions = [
  { value: ALERT_CENTRE_SEVERITY.CRITICAL, label: "Critical" },
  { value: ALERT_CENTRE_SEVERITY.HIGH, label: "High" },
  { value: ALERT_CENTRE_SEVERITY.MEDIUM, label: "Medium" },
  { value: ALERT_CENTRE_SEVERITY.LOW, label: "Low" },
  { value: ALERT_CENTRE_SEVERITY.INFORMATION, label: "Information" },
];

export const alertCenterAlerts = [
  {
    id: "ac-device-offline",
    title: "Device Offline Issue",
    severity: "Critical",
    status: "Open",
    company: "Swift Transportation",
    truck: "TRK-256",
    serial: "SN-ABC12345",
    role: "ELD",
    location1: "30.250661",
    location2: "-97.735925",
    color: "#2563EB",
    driver: null,
    time: null,
    type: "device",
  },
  {
    id: "ac-eld-connection-lost",
    title: "ELD - Device Connection Lost",
    severity: "warning",
    status: "in-progress",
    driver: "Sarah Johnson",
    truck: "TRK-109",
    role: "System",
    city: "Dallas, TX.",
    time: "07:54 AM",
    color: "#2563EB",
    company: "Swift Transportation",
    serial: "SN-XYZ9876",
  },
  {
    id: "ac-eld-device-issue",
    title: "ELD device Issue",
    severity: "Critical",
    status: "Open",
    company: "Swift Transportation",
    truck: "TRK-256",
    serial: "SN-ABC12345",
    role: "ELD",
    location1: "30.250661",
    location2: "-97.735925",
    color: "#EF4444",
  },
  {
    id: "ac-new-devices",
    title: "New devices assigned",
    company: "Swift Transportation",
    driver: "John Miller",
    truck: "TRK-221",
    serial: "SN-NEW0011",
    role: "Admin",
    city: "Dallas, TX.",
    time: "07:51 AM",
    color: "#3B82F6",
    severity: null,
    status: null,
  },
  {
    id: "ac-gps-failure",
    title: "GPS Failure detected",
    severity: "Critical",
    status: "Open",
    company: "Werner Enterprises",
    driver: "Linda Garcia",
    truck: "TRK-256",
    serial: "SN-GPS0033",
    role: "ELD",
    duration: "35 mins remaining",
    city: "Phoenix, AZ",
    time: "07:45 AM",
    color: "#EF4444",
    type: "gps",
  },
];
