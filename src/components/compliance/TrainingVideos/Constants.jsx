import videoIcon from "../../../assets/images/VideoIcon.png";
import verifyIcon from "../../../assets/images/VerifyIcon.png";
import draftIcon from "../../../assets/images/DraftIcon.png";
import moduleIcon from "../../../assets/images/ModuleIcon.png";
import { CardIcon } from "../../AdminComponents/Dashbord/AdminDashBoard.styles";

export const TotalVideosIcon = (
  <CardIcon src={videoIcon} alt="totalVideosIcon" />
);

export const PublishedIcon = (
  <CardIcon src={verifyIcon} alt="publishedIcon" />
);

export const DraftsIcon = (
  <CardIcon src={draftIcon} alt="draftsIcon" />
);

export const TotalModulesIcon = (
  <CardIcon src={moduleIcon} alt="totalModulesIcon" />
);

export const defaultPageSize = 10;

export const TRAINING_VIDEOS_SUMMARY_CARDS = {
  totalVideos: {
    id: "totalVideos",
    title: "Total Videos",
    accentcolor: "brand",
    icon: TotalVideosIcon,
  },
  published: {
    id: "published",
    title: "Published",
    accentcolor: "success",
    icon: PublishedIcon,
  },
  drafts: {
    id: "drafts",
    title: "Drafts",
    accentcolor: "warning",
    icon: DraftsIcon,
  },
  totalModules: {
    id: "totalModules",
    title: "Total Modules",
    accentcolor: "info",
    icon: TotalModulesIcon,
  },
};

export const VIDEO_STATUS = {
  PUBLISHED: "Published",
  DRAFT: "Draft",
};

export const VIDEO_STATUS_OPTIONS = [
  { label: "Published", value: "Published" },
  { label: "Draft", value: "Draft" },
];

export const VIDEO_STATUS_CONFIG = {
  Published: {
    colorKey: "success.main",
  },
  Draft: {
    colorKey: "warning.main",
  },
};

export const MODULE_OPTIONS = [
  { value: 1,  label: "Compliance Dashboard" },
  { value: 2,  label: "Log" },
  { value: 3,  label: "HOS" },
  { value: 4,  label: "DVIR" },
  { value: 5,  label: "DOT" },
  { value: 6,  label: "Accidents" },
  { value: 7,  label: "Document Center" },
  { value: 8,  label: "Operation Center" },
  { value: 9,  label: "HOS Settings" },
  { value: 10, label: "Fleet Dashboard" },
  { value: 11, label: "Driver Management" },
  { value: 12, label: "Truck Management" },
  { value: 13, label: "Trailer Management" },
  { value: 14, label: "Carrier Device Management" },
  { value: 15, label: "Requested Devices" },
  { value: 16, label: "Asset Mapping" },
  { value: 17, label: "Platform Configuration" },
  { value: 18, label: "Roles" },
  { value: 19, label: "Users" },
  { value: 20, label: "Driver Daily Log Summary Report" },
  { value: 21, label: "Driver Violation Report" },
  { value: 22, label: "Driver Weekly HOS Report" },
  { value: 23, label: "Unassigned Driving Report" },
  { value: 24, label: "Driver Log Certification Summary Report" },
  { value: 25, label: "DVIR Inspection Report Summary" },
  { value: 26, label: "DOT Inspection Dashboard" },
  { value: 27, label: "Scheduled Reports" },
  { value: 28, label: "Report Incident" },
  { value: 29, label: "Platform Dashboard" },
  { value: 30, label: "Alert Center" },
  { value: 31, label: "Account Management" },
  { value: 32, label: "Platform Device Management" },
  { value: 33, label: "Device Asset Management" },
  { value: 34, label: "Device Model Management" },
  { value: 35, label: "Platform Request Devices" },
  { value: 36, label: "Platform Users" },
  { value: 37, label: "Carrier Users" },
  { value: 38, label: "Role Management" },
];

export const VIDEO_TITLE_OPTIONS = [
  { label: "Introduction to ELD Compliance", value: "Introduction to ELD Compliance" },
  { label: "Pre-Trip Inspection Guide", value: "Pre-Trip Inspection Guide" },
  { label: "Hours of Service Rules", value: "Hours of Service Rules" },
  { label: "Driver Wellness Program", value: "Driver Wellness Program" },
  { label: "Emergency Response Procedures", value: "Emergency Response Procedures" },
  { label: "Vehicle Maintenance Basics", value: "Vehicle Maintenance Basics" },
  { label: "Winter Driving Safety", value: "Winter Driving Safety" },
  { label: "Load Securement Techniques", value: "Load Securement Techniques" },
  { label: "Fatigue Management", value: "Fatigue Management" },
  { label: "Electronic Logging Device Operation", value: "Electronic Logging Device Operation" },
];

export const MOCK_TRAINING_VIDEOS = [
  {
    id: 1,
    title: "Introduction to ELD Compliance",
    description: "Learn the basics of electronic logging device requirements",
    module: "Compliance",
    duration: "15:30",
    status: "Published",
    uploadedBy: "John Smith",
    uploadDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Pre-Trip Inspection Guide",
    description: "Complete guide to vehicle inspection before trips",
    module: "Safety Training",
    duration: "22:45",
    status: "Published",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2024-01-18",
  },
  {
    id: 3,
    title: "Hours of Service Rules",
    description: "Understanding HOS regulations and limits",
    module: "Hours of Service",
    duration: "18:20",
    status: "Published",
    uploadedBy: "Mike Davis",
    uploadDate: "2024-01-20",
  },
  {
    id: 4,
    title: "Driver Wellness Program",
    description: "Health and wellness tips for commercial drivers",
    module: "Driver Wellness",
    duration: "12:15",
    status: "Draft",
    uploadedBy: "Emily Brown",
    uploadDate: "2024-01-22",
  },
  {
    id: 5,
    title: "Emergency Response Procedures",
    description: "What to do in case of road emergencies",
    module: "Emergency Procedures",
    duration: "25:00",
    status: "Published",
    uploadedBy: "John Smith",
    uploadDate: "2024-01-25",
  },
  {
    id: 6,
    title: "Vehicle Maintenance Basics",
    description: "Essential maintenance knowledge for drivers",
    module: "Vehicle Maintenance",
    duration: "20:10",
    status: "Published",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2024-01-28",
  },
  {
    id: 7,
    title: "Winter Driving Safety",
    description: "Safe driving practices in winter conditions",
    module: "Safety Training",
    duration: "16:40",
    status: "Draft",
    uploadedBy: "Mike Davis",
    uploadDate: "2024-02-01",
  },
  {
    id: 8,
    title: "Load Securement Techniques",
    description: "Proper cargo securement methods and regulations",
    module: "Compliance",
    duration: "19:55",
    status: "Published",
    uploadedBy: "Emily Brown",
    uploadDate: "2024-02-05",
  },
  {
    id: 9,
    title: "Fatigue Management",
    description: "Strategies to prevent driver fatigue",
    module: "Driver Wellness",
    duration: "14:30",
    status: "Published",
    uploadedBy: "John Smith",
    uploadDate: "2024-02-08",
  },
  {
    id: 10,
    title: "Electronic Logging Device Operation",
    description: "Hands-on ELD device training",
    module: "Compliance",
    duration: "28:15",
    status: "Published",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2024-02-10",
  },
];
