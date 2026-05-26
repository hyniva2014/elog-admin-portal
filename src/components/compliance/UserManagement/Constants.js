import totalUsersIcon from "../../../assets/images/svg/totalUsers.png";
import activeUsersIcon from "../../../assets/images/svg/activeUsers.png";
import inactiveUsersIcon from "../../../assets/images/svg/inactiveUsers.png";

// Use palette keys rather than hardcoded hex values
export const BRAND_COLOR = "primary";
export const SUCCESS_COLOR = "success";
export const ERROR_COLOR = "error";

export const ACCOUNT_OPTIONS = [
  {
    label: "TrackPulse Logistics Inc",
    value: "7",
  },
];

export const USER_PROFILE_OPTIONS = [
  { label: "Admin", value: "1" },
  { label: "Super Admin", value: "2" },
];

export const FILTER_USER_PROFILE_OPTIONS = [
  { label: "Admin", value: "1" },
  { label: "Super Admin", value: "2" },
];

export const FILTER_STATUS_OPTIONS = [
  { label: "Active", value: "1" },
  { label: "Inactive", value: "2" },
];

export const USER_MANAGEMENT_FILTERS = [
  { label: "User Profile", dataKey: "role_id", options: FILTER_USER_PROFILE_OPTIONS },
  { label: "All Carrier", dataKey: "company_id" },
  { label: "All Status", dataKey: "status_id", options: FILTER_STATUS_OPTIONS },
];

export const USER_SUMMARY_CARDS = [
  {
    id: "total_users",
    title: "Total Users",
    key: "total_users",
    accentcolor: BRAND_COLOR,
    iconPath: totalUsersIcon,
  },
  {
    id: "active_users",
    title: "Active Users",
    key: "active_users",
    accentcolor: SUCCESS_COLOR,
    iconPath: activeUsersIcon,
  },
  {
    id: "inactive_users",
    title: "Inactive Users",
    key: "inactive_users",
    accentcolor: ERROR_COLOR,
    iconPath: inactiveUsersIcon,
  },
];

export const USER_STATUS = { 1: "Active", 2: "Inactive" };
export const USER_STATUS_COL_CONFIG = { Active: { colorKey: SUCCESS_COLOR }, Inactive: { colorKey: ERROR_COLOR } };
