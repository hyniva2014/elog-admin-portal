import totalUsersIcon from "../../../assets/images/svg/totalUsers.png";
import activeUsersIcon from "../../../assets/images/svg/activeUsers.png";
import inactiveUsersIcon from "../../../assets/images/svg/inactiveUsers.png";
import { CardIcon } from "../../AdminComponents/Dashbord/AdminDashBoard.styles";
export const BRAND_COLOR = "#284495";
export const SUCCESS_COLOR = "#008236";
export const ERROR_COLOR = "#C10007";

export const USER_PROFILE_OPTIONS = [
  { label: "Admin", value: "1" },
  { label: "Master Admin", value: "43" },
];

export const TotalUsersIcon = (
  <CardIcon src={totalUsersIcon} alt="totalUsersIcon" />
);

export const ActiveUsersIcon = (
  <CardIcon src={activeUsersIcon} alt="activeUsersIcon" />
);

export const InactiveUsersIcon = (
  <CardIcon src={inactiveUsersIcon} alt="inactiveUsersIcon" />
);

export const USER_SUMMARY_CARDS = {
  total_users: {
    id: "total_users",
    title: "Total Users",
    accentcolor: BRAND_COLOR,
    icon: TotalUsersIcon,
  },
  active_users: {
    id: "active_users",
    title: "Active Users",
    accentcolor: SUCCESS_COLOR,
    icon: ActiveUsersIcon,
  },
  inactive_users: {
    id: "inactive_users",
    title: "Inactive Users",
    accentcolor: ERROR_COLOR,
    icon: InactiveUsersIcon,
  },
};

export const USER_STATUS = { 1: "Active", 2: "Inactive" };
export const USER_STATUS_COL_CONFIG = {
  Active: { colorKey: SUCCESS_COLOR },
  Inactive: { colorKey: ERROR_COLOR },
};
