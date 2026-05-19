export const ACCOUNT_OPTIONS = [
  {
    label: "Swift Transportation",
    value: "Swift Transportation",
  },
  {
    label: "J.B. Hunt",
    value: "J.B. Hunt",
  },
  {
    label: "Knight Transportation",
    value: "Knight Transportation",
  },
];

export const USER_PROFILE_OPTIONS = [
  {
    label: "Admin",
    value: "Admin",
  },
  {
    label: "Super Admin",
    value: "Super Admin",
  },
  {
    label: "User",
    value: "User",
  },
];

export const FILTER_USER_PROFILE_OPTIONS = [
  { label: "Admin", value: "1" },
  { label: "Super Admin", value: "2" },
];

export const FILTER_CARRIER_OPTIONS = [
  { label: "Carrier 1", value: "1" },
  { label: "Carrier 2", value: "2" },
];

export const FILTER_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const USER_MANAGEMENT_FILTERS = [
  {
    label: "User Profile",
    name: "userProfile",
    type: "select",
    options: FILTER_USER_PROFILE_OPTIONS,
  },
  {
    label: "All Carrier",
    name: "carrier",
    type: "select",
    options: FILTER_CARRIER_OPTIONS,
  },
  {
    label: "All Status",
    name: "status",
    type: "select",
    options: FILTER_STATUS_OPTIONS,
  },
];



export const summaryCards = [
  {
    id: "total_users",
    title: "Total Users",
    value: "1095",
    accentcolor: "brand",
    // icon: <DevicesIcon sx={{ fontSize: 28 }} color="brand" />,
  },
  {
    id: "active_users",
    title: "Active Users",
    value: "1077",
    accentcolor: "success",
  },
  {
    id: "inactive_users",
    title: "Inactive Users",
    value: "18",
    accentcolor: "error",
  }
];

export const STATUS_COLOR_MAP = {
  Active: "success",
  Inactive: "error",
};