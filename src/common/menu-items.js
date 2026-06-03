import { MdDashboard } from "react-icons/md";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import MemoryIcon from "@mui/icons-material/Memory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from '@mui/icons-material/Settings';

const MENU_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    url: "/dashboard",
    icon: MdDashboard,
  },
  {
    key: "account-management",
    label: "Account Management",
    url: "/account-management",
    icon: ManageAccountsIcon,
  },
  {
    key: "device-management",
    label: "Device Management",
    icon: TabletMacIcon,
    children: [
      {
        key: "device-management-overview",
        label: "Device Management",
        url: "/device-management",
        parentKey: "device-management",
      },
      {
        key: "device-asset-management",
        label: "Device Asset Management",
        url: "/device-asset-management",
        parentKey: "device-management",
      },
      {
        key: "device-model-management",
        label: "Device Model Management",
        url: "/device-model-management",
        parentKey: "device-management",
      },
      {
        key: "request-device",
        label: "Request Device",
        url: "/request-device",
        parentKey: "device-management",
      },
    ],
  },
  {
    key: "user-management",
    label: "User Management",
    url: "/user-management",
    icon: GroupIcon,
  },
  {
    key: "career-users-management",
    label: "Career Users Management",
    url: "/career-users",
    icon: GroupIcon,
  },
  {
    key: "role-management",
    label: "Role Management",
    url: "/role-management",
    icon: SettingsIcon,
  },
  {
    key: "request-device",
    label: "Request Device",
    url: "/request-device",
    icon: TabletMacIcon,
  },
];
export { MENU_ITEMS };
