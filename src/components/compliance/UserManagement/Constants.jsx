import totalUsersIcon from "../../../assets/images/svg/totalUsers.png";
import activeUsersIcon from "../../../assets/images/svg/activeUsers.png";
import inactiveUsersIcon from "../../../assets/images/svg/inactiveUsers.png";
import { CardIcon } from "../../AdminComponents/Dashbord/AdminDashBoard.styles";
export const BRAND_COLOR = "primary";
export const SUCCESS_COLOR = "success";
export const ERROR_COLOR = "error";

export const USER_PROFILE_OPTIONS = [
  { label: "Admin", value: "1" },
  { label: "Master Admin", value: "43" },
];

export const FILTER_USER_PROFILE_OPTIONS = [
  { label: "Admin", value: "1" },
  { label: "Master Admin", value: "43" },
];

export const FILTER_STATUS_OPTIONS = [
  { label: "Active", value: "1" },
  { label: "Inactive", value: "2" },
];

export const getUserManagementFilters = (companyOptions = []) => [
  {
    label: "User Profile",
    dataKey: "role_id",
    options: FILTER_USER_PROFILE_OPTIONS,
  },
  {
    label: "All Carrier",
    dataKey: "company_id",
    options: companyOptions,
  },
  {
    label: "All Status",
    dataKey: "status_id",
    options: FILTER_STATUS_OPTIONS,
  },
];
export const TotalUsersIcon = (
  <CardIcon src={totalUsersIcon} alt="totalUsersIcon" />
);

export const ActiveUsersIcon = (
  <CardIcon src={activeUsersIcon} alt="activeUsersIcon" />
);

export const OnactiveUsersIcon = (
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
    icon: OnactiveUsersIcon,
  },
};

export const USER_STATUS = { 1: "Active", 2: "Inactive" };
export const USER_STATUS_COL_CONFIG = {
  Active: { colorKey: SUCCESS_COLOR },
  Inactive: { colorKey: ERROR_COLOR },
};
