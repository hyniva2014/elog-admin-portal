import {
  TotalCarrierIcon,
  ActiveDevicesCardIcon,
  OpenIncidentsIcon,
  FMCSAIcon,
} from "./AdminDashboard.icons";

export const summaryCards = [
  {
    id: "total_carriers",
    title: "Total Carriers",
    value: "1095",
    accentcolor: "#284495",
    icon: TotalCarrierIcon,
  },
  {
    id: "active_devices",
    title: "Active Devices",
    value: "1077",
    accentcolor: "#008236",
    icon: ActiveDevicesCardIcon,
  },
  {
    id: "open_incidents",
    title: "Open Incidents",
    value: "18",
    accentcolor: "#FF0000",
    icon: OpenIncidentsIcon,
  },
  {
    id: "avg_fmcsa_score",
    title: "Average FMCSA Score",
    value: "85.5",
    accentcolor: "#E69500",
    icon: FMCSAIcon,
  },
];

export const chartData = [
  {
    month: "Jan",
    value: 45,
    Total: 15,
    newAddition: 20,
    loss: 10,
  },
  {
    month: "Feb",
    value: 52,
    Total: 23,
    newAddition: 25,
    loss: 12,
  },
  {
    month: "Mar",
    value: 60,
    Total: 40,
    newAddition: 30,
    loss: 15,
  },
  {
    month: "Apr",
    value: 78,
    Total: 50,
    newAddition: 35,
    loss: 14,
  },
];

export const alerts = [
  {
    id: "alert-eld-device-issue",
    title: "ELD device Issue",
    company: "Swift Transportation",
    truck: "TRK-256",
    serial: "SN-ABC12345",
    location1: "30.250661",
    location2: "-97.735925",
    date: "13/05/2026",
    color: "#EF4444",
  },
  {
    id: "alert-incident-2301",
    title: "Incident #INC-2301 requires attention",
    company: "Schneider National",
    truck: "TRK-256",
    serial: "SN-ABC12345",
    location1: "32.345664",
    location2: "-73.834832",
    date: "03/05/2026",
    color: "#F59E0B",
  },
  {
    id: "alert-new-devices",
    title: "12 new devices assigned",
    company: "Schneider National",
    truck: "TRK-256",
    serial: "SN-ABC12345",
    location1: "31.787654",
    location2: "-72.128374",
    date: "12/05/2026",
    color: "#3B82F6",
  },
];

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

export const alertCategoryOptions = [
  { value: "", label: "All Category" },
  { value: "maintenance", label: "Maintenance" },
  { value: "safety", label: "Safety" },
  { value: "performance", label: "Performance" },
];

export const alertSeverityOptions = [
  { value: "", label: "All Severity" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
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
    company: null,
    serial: null,
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
    driver: "John Miller",
    truck: "TRK-221",
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
    driver: "Linda Garcia",
    truck: "TRK-256",
    role: "ELD",
    duration: "35 mins remaining",
    city: "Phoenix, AZ",
    time: "07:45 AM",
    color: "#EF4444",
    type: "gps",
  },
];
