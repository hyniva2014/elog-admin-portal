import { MdDashboard } from "react-icons/md";
const MENU_ITEMS = [
  {
    key: "compliance",
    label: "Compliance",
    icon: MdDashboard,
    children: [
      {
        key: "dashboard",
        label: "Dashboard",
        url: "/dashboard",
        parentKey: "compliance",
      },
      {
        key: "device-asset-management",
        label: "Device Asset Management",
        url: "/device-asset-management",
        parentKey: "compliance",
      },
      {
        key: "account-management",
        label: "Account Management",
        url: "/account-management",
        parentKey: "compliance",
      },
      {
        key: "device-model-management",
        label: "Device Model Management",
        url: "/device-model-management",
        parentKey: "compliance",
      },
      {
        key: "device-management",
        label: "Device Management",
        url: "/device-management",
        parentKey: "compliance",
      },
      {
        key: "user-management",
        label: "User Management",
        url: "/user-management",
        parentKey: "compliance",
      },
    ],
  },
];
export { MENU_ITEMS };
