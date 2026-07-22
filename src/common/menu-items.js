import { MdDashboard } from "react-icons/md";
import GroupIcon from "@mui/icons-material/Group";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';

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
        label: "Request Devices",
        url: "/request-device",
        parentKey: "device-management",
      },
    ],
  },
  {
    key: "user-management",
    label: "User Management",
    icon: GroupIcon,
    children: [
      {
        key: "platform-users-management",
        label: "Platform Users",
        url: "/platform-users",
        parentKey: "user-management",
      },
      {
        key: "carrier-users-management",
        label: "Carrier Users",
        url: "/carrier-users",
        parentKey: "user-management",
      },
      {
        key: "role-management",
        label: "Role Management",
        url: "/role-management",
        parentKey: "user-management",
      },
      // {
      //   key: "training-vidoes",
      //   label: "Training Videos",
      //   url: "/training-videos",
      //   parentKey: "user-management",
      // },
    ],
  },
  {key: "training-vidoes",
    label: "Training Videos",
    url: "/training-videos",
    icon: VideoSettingsIcon,
  },
];
export { MENU_ITEMS };
