import { useState } from "react";
import { PageContainer } from "../../component.styled";
import AlertCenterScreenHeader from "./AlertCenterScreenHeader";
import AlertCenterScreenCards from "./AlertCenterScreenCards";

const categoryOptions = [
  { value: "", label: "All Category" },
  { value: "maintenance", label: "Maintenance" },
  { value: "safety", label: "Safety" },
  { value: "performance", label: "Performance" },
];

const severityOptions = [
  { value: "", label: "All Severity" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const AlertCenterScreen = () => {
  const [data, setData] = useState({
    search: "",
    fromDate: null,
    toDate: null,
    category: "",
    severity: "",
    page: 1,
    pageSize: 10,
  });

  return (
    <PageContainer>
      <AlertCenterScreenHeader
        data={data}
        setData={setData}
        searchKey={0}
        categoryOptions={categoryOptions}
        severityOptions={severityOptions}
      />
      <AlertCenterScreenCards alerts={alerts} />
    </PageContainer>
  );
};

export default AlertCenterScreen;

export const alerts = [
  {
    title: "Device Offline Issue",
    severity: "Critical",
    severityColor: "#DC2626",
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
    title: "ELD - Device Connection Lost",
    severity: "warning",
    severityColor: "#D97706",
    status: "in-progress",
    driver: "Sarah Johnson",
    truck: "TRK-109",
    role: "System",
    city: "Dallas, TX.",
    time: "07:54 AM",
    color: "#2563EB",
    company: null,
    serial: null,
    role: "System",
  },

  {
    title: "ELD device Issue",
    severity: "Critical",
    severityColor: "#DC2626",
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
    title: "New devices assigned",
    driver: "John Miller",
    truck: "TRK-221",
    role: "Admin",
    city: "Dallas, TX.",
    time: "07:51 AM",
    color: "#3B82F6",
    severity: null,
    role: "Admin",
    status: null,
  },

  {
    title: "GPS Failure detected",
    severity: "Critical",
    severityColor: "#DC2626",
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