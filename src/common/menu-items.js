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
    ],
  },
];
export { MENU_ITEMS };
