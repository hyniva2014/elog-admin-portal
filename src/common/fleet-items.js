import GroupIcon from "@mui/icons-material/Group";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
const FLEET_ITEMS = [
  {
    key: "fleet-management",
    label: "Fleet Management",
    icon: GroupIcon,
    children: [
      {
        key: "fleet dashboard",
        label: "Fleet Dashboard",
        url: "/fleet-dashboard",
        parentKey: "fleet-management",
      },
    ],
  },
];

export { FLEET_ITEMS };
