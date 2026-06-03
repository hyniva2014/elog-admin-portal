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
