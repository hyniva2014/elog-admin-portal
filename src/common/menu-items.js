import DashboardIcon from "@src/assets/images/active/Icon.png";
import AccountManagementIcon from "@src/assets/images/active/Icon-1.png";
import DeviceModelManagementIcon from "@src/assets/images/active/Icon-2.png";
import DeviceAssetManagementIcon from "@src/assets/images/active/Icon-3.png";
import DeviceManagementIcon from "@src/assets/images/active/Icon-4.png";
import UserManagementIcon from "@src/assets/images/active/Icon-5.png";
import { MdDashboard } from "react-icons/md";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import MemoryIcon from '@mui/icons-material/Memory';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

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
    key: "device-model-management",
    label: "Device Model Management",
    url: "/device-model-management",
    icon: MemoryIcon,
  },
  {
    key: "device-asset-management",
    label: "Device Asset Management",
    url: "/device-asset-management",
    icon: LocationOnIcon,
  },
  {
    key: "device-management",
    label: "Device Management",
    url: "/device-management",
    icon: TabletMacIcon,
  },
  {
    key: "user-management",
    label: "User Management",
    url: "/user-management",
    icon: GroupIcon,
  },
];
export { MENU_ITEMS };
