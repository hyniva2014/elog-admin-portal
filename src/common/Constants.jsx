import totalUsersIcon from "../../src/assets/images/svg/totalUsers.png";
import activeUsersIcon from "../../src/assets/images/svg/activeUsers.png";
import inactiveUsersIcon from "../../src/assets/images/svg/inactiveUsers.png";

const BRAND_COLOR = "#284495";
const SUCCESS_COLOR = "#26c362";
const ERROR_COLOR = "#ff0a0a";

export const ACCOUNT_OPTIONS = [
  {
    label: "TrackPulse Logistics Inc",
    value: "7",
  },
];

export const USER_PROFILE_OPTIONS = [
  {
    label: "Admin",
    value: "1",
  },
  {
    label: "Super Admin",
    value: "2",
  },
];

export const FILTER_USER_PROFILE_OPTIONS = [
  { label: "Admin", value: "1" },
  { label: "Super Admin", value: "2" },
];

// export const FILTER_CARRIER_OPTIONS = [
//   { label: "Carrier 1", value: "1" },
//   { label: "Carrier 2", value: "2" },
// ];

export const FILTER_STATUS_OPTIONS = [
  {
    label: "Active",
    value: "1",
  },
  {
    label: "Inactive",
    value: "2",
  },
];

export const USER_MANAGEMENT_FILTERS = [
  {
    label: "User Profile",
    dataKey: "role_id",
    options: FILTER_USER_PROFILE_OPTIONS,
  },
  {
    label: "All Carrier",
    dataKey: "company_id",
    // options: FILTER_CARRIER_OPTIONS,
  },
  {
    label: "All Status",
    dataKey: "status_id",
    options: FILTER_STATUS_OPTIONS,
  },
];

export const USER_SUMMARY_CARDS = [
  {
    id: "total_users",
    title: "Total Users",
    key: "total_users",
    accentcolor: BRAND_COLOR,
    icon: <img src={totalUsersIcon} alt="Total Users" width={36} height={36} />,
  },
  {
    id: "active_users",
    title: "Active Users",
    key: "active_users",
    accentcolor: SUCCESS_COLOR,
    icon: (
      <img src={activeUsersIcon} alt="Total Users" width={36} height={36} />
    ),
  },
  {
    id: "inactive_users",
    title: "Inactive Users",
    key: "inactive_users",
    accentcolor: ERROR_COLOR,
    icon: (
      <img src={inactiveUsersIcon} alt="Total Users" width={36} height={36} />
    ),
  },
];

export const USER_STATUS = {
  1: "Active",
  2: "Inactive",
};
export const USER_STATUS_COL_CONFIG = {
  Active: {
    color: "#3D9B26",
  },
  Inactive: {
    color: "#DA0008",
  },
};
