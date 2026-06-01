import { styled, Typography } from "@mui/material";


export const DRIVER_STATUS = {
  1: "Active",
  2: "Inactive",
};
export const DRIVER_STATUS_CONFIG = {
  total_drivers: {
    id: "total_drivers",
    title: "Total Drivers",
    accentcolor: "#284495",
  },
  on_trip: {
    id: "on_trip",
    title: "On Trip",
    accentcolor: "#008236",
  },
  unassigned: {
    id: "unassigned",
    title: "Unassigned",
    accentcolor: "#FEE685",
  },
  inactive: {
    id: "inactive",
    title: "Off Duty",
    accentcolor: "#C10007",
  },
};
export const defaultPageSize = 25;
export const USER_SUMMARY_CARDS = {
  totalCount: {
    id: "totalCount",
    title: "Total Users",
    accentcolor: "#284495",
  },
  active: {
    id: "active",
    title: "Active",
    accentcolor: "#008236",
  },
  inactive: {
    id: "inactive",
    title: "In Active",
    accentcolor: "#C10007",
  },
};
export const citizenship_options = [
  { label: "USA", value: 1 },
  { label: "Canada", value: 2 },
  { label: "Mexico", value: 3 },
  // { label: "Others", value: 4 },
];

export const LANGUAGE = {
  ENGLISH: 1,
  SPANISH: 2,
};

export const LANGUAGE_OPTIONS = [
  { label: "English", value: LANGUAGE.ENGLISH },
  { label: "Spanish", value: LANGUAGE.SPANISH },
];

export const employment_type_options = [
  { label: "Employee", value: 1 },
  { label: "Contractor", value: 2 },
];

export const genderOptions = [
  { label: "Male", value: 0 },
  { label: "Female", value: 1 },
  { label: "Other", value: 2 },
];

export const filterNameInput = (value) => {
  return value.replace(/[^A-Za-z\s'-]/g, "");
};

export const formatZipCode = (value) => {
  if (!value) return value;
  return value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
};

export const RegistrationState = [
  { label: "USA", value: "USA" },
  { label: "Mexico", value: "MX" },
  { label: "Canada", value: "CA" },
];
export const DRIVER_STATUS_FORM = [
  { label: "Active", value: 1 },
  { label: "Inactive", value: 2 },
];
export const countryCodeToName = {
  USA: "United States",
  CA: "Canada",
  MX: "Mexico",
};
export const USER_STATUS_COL_CONFIG = {
  Active: {
    color: "#3D9B26",
  },
  Inactive: {
    color: "#DA0008",
  },
};
export const USER_STATUS = {
  1: "ACTIVE",
  2: "DEACTIVATE",
};


export const hasPermission = (permissions = {}, moduleKey = "", actionKey = "") => {
  if (!permissions || !moduleKey || !actionKey) return false;

  const modulePermissions =
    permissions[moduleKey] || permissions[moduleKey.toLowerCase()];

  if (!modulePermissions) return false;

  if (Array.isArray(modulePermissions)) {
    return modulePermissions.includes(actionKey);
  }

  if (typeof modulePermissions === "object") {
    return Boolean(
      modulePermissions[actionKey] ||
        modulePermissions[actionKey.toLowerCase()] ||
        modulePermissions[actionKey.toUpperCase()],
    );
  }

  return modulePermissions === actionKey;
};

export const BreadcrumbText = styled(Typography)({
  fontSize: "15px",
  color: "#6B7280",
});

export const BreadcrumbBold = styled("span")({
  fontWeight: 600,
  color: "#111827",
});

export const citizenshipMap = {
  US: 1,
  CA: 2,
  MX: 3,
};

export const languageMap = {
  en: 1,
  english: 1,
  es: 2,
  spanish: 2,
};