import { styled, Typography } from "@mui/material";

export const DRIVER_STATUS = {
  1: "Active",
  2: "Inactive",
};
export const DRIVER_STATUS_CONFIG = {
  total_drivers: {
    id: "total_drivers",
    title: "Total Drivers",
    accentcolor: "brand",
  },
  on_trip: {
    id: "on_trip",
    title: "On Trip",
    accentcolor: "success",
  },
  unassigned: {
    id: "unassigned",
    title: "Unassigned",
    accentcolor: "warning",
  },
  inactive: {
    id: "inactive",
    title: "Off Duty",
    accentcolor: "error",
  },
};
export const defaultPageSize = 25;
export const USER_SUMMARY_CARDS = {
  totalCount: {
    id: "totalCount",
    title: "Total Users",
    accentcolor: "brand",
  },
  active: {
    id: "active",
    title: "Active",
    accentcolor: "success",
  },
  inactive: {
    id: "inactive",
    title: "In Active",
    accentcolor: "error",
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

export const formatPassportVisa = (value) => {
  if (!value) return value;
  return value.replace(/[^A-Za-z0-9]/g, "").slice(0, 20);
};

export const formatCountryName = (value) => {
  if (!value) return value;
  return value.replace(/[^A-Za-z\s'-]/g, "").slice(0, 50);
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
    colorKey: "success.main",
  },
  Inactive: {
    colorKey: "error.main",
  },
};
export const USER_STATUS = {
  1: "ACTIVE",
  2: "DEACTIVATE",
};

export const hasPermission = (
  permissions = {},
  moduleKey = "",
  actionKey = "",
) => {
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

export const BreadcrumbText = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  color: theme.palette.text.secondary,
}));

export const BreadcrumbBold = styled("span")(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

// Field configuration arrays for form sections
export const BASIC_INFO_FIELDS = [
  {
    name: "first_name",
    label: "First Name",
    required: true,
    formatter: "name",
  },
  { name: "middle_name", label: "Middle Name", formatter: "name" },
  { name: "last_name", label: "Last Name", required: true, formatter: "name" },
  { name: "dob", label: "Date of Birth", required: true, type: "date" },
  {
    name: "language",
    label: "Language",
    required: true,
    type: "multiselect",
    options: "LANGUAGE_OPTIONS",
  },
  {
    name: "gender",
    label: "Gender",
    required: true,
    type: "autocomplete",
    options: "genderOptions",
  },
  { name: "ssn", label: "SSN", required: true, formatter: "ssn" },
  {
    name: "last_drug_test",
    label: "Last Drug Test",
    required: true,
    type: "date",
  },
  {
    name: "citizenship",
    label: "Citizenship",
    required: true,
    type: "autocomplete",
    options: "citizenship_options",
  },
];

export const PASSPORT_VISA_FIELDS = [
  {
    name: "passport_visa_number",
    label: "Passport / Visa Number",
    formatter: "passportVisa",
    inputProps: { maxLength: 15 },
  },
  {
    name: "passport_visa_expiry",
    label: "Passport / Visa Expiry Date",
    type: "date",
    disablePast: true,
  },
];

export const WORK_PERMIT_FIELDS = [
  {
    name: "work_permit",
    label: "Work Permit Expiry Date",
    type: "date",
    disablePast: true,
  },
  {
    name: "citizenship_country",
    label: "Country",
    formatter: "countryName",
    condition: (selectedCitizenship) => selectedCitizenship === 4,
  },
];

export const EMPLOYMENT_DETAILS_FIELDS = [
  {
    name: "role",
    label: "Role",
    required: true,
    type: "autocomplete",
    options: "roles",
  },
  { name: "hire_date", label: "Hire Date", required: true, type: "date" },
  {
    name: "status",
    label: "Status",
    required: true,
    type: "autocomplete",
    options: "DRIVER_STATUS_FORM",
  },
  {
    name: "employment_type",
    label: "Employment Type",
    required: true,
    type: "autocomplete",
    options: "employment_type_options",
  },
  {
    name: "termination_date",
    label: "Termination Date",
    type: "date",
    condition: (context) => context?.selectedStatus === 2,
  },
  {
    name: "contract_information",
    label: "Contractor Information",
    condition: (context) => context?.selectedEmploymentType === 2,
  },
];

export const CONTACT_INFO_FIELDS = [
  { name: "email", label: "Email", required: true, type: "email" },
  {
    name: "phone",
    label: "Phone Number",
    required: true,
    formatter: "phone",
    placeholder: "(XXX) XXX-XXXX",
  },
  {
    name: "alternate_contact_number",
    label: "Alternative Phone Number",
    formatter: "phone",
    placeholder: "(XXX) XXX-XXXX",
  },
];

export const PRIMARY_ADDRESS_FIELDS = [
  {
    name: "address_line1",
    label: "Address Line",
    required: true,
    type: "address",
  },
  { name: "city", label: "City", required: true, formatter: "name" },
  {
    name: "country",
    label: "Country",
    required: true,
    type: "autocomplete",
    options: "RegistrationState",
  },
  {
    name: "states",
    label: "State",
    required: true,
    type: "autocomplete",
    options: "dynamicStates",
  },
  {
    name: "zip_code",
    label: "Zip Code",
    required: true,
    formatter: "zipCode",
    inputProps: { maxLength: 10 },
  },
];

export const SECONDARY_ADDRESS_FIELDS = [
  { name: "secondary_address_line", label: "Address Line", type: "address" },
  { name: "secondary_city", label: "City", formatter: "name" },
  {
    name: "secondary_country",
    label: "Country",
    type: "autocomplete",
    options: "RegistrationState",
  },
  {
    name: "secondary_states",
    label: "State",
    type: "autocomplete",
    options: "secondaryDynamicStates",
  },
  {
    name: "secondary_zip_code",
    label: "Zip Code",
    formatter: "zipCode",
    inputProps: { maxLength: 10 },
  },
];

export const EMPLOYMENT_HISTORY_FIELDS = [
  {
    name: "total_years_of_experince",
    label: "Total Experience",
    formatter: "experience",
  },
];

export const EMPLOYMENT_ENTRY_FIELDS = [
  { name: "emp_history_details", label: "Employer Details" },
  { name: "emp_history_start_date", label: "Start Date", type: "date" },
  { name: "emp_history_end_date", label: "End Date", type: "date" },
  { name: "emp_history_duration", label: "Duration", disabled: true },
];
export const STATIC_GROUP_DATA = [
  { id: 1, createdBy: "John Miller", createdDate: "Dec 11, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
  { id: 2, createdBy: "John Miller", createdDate: "Dec 12, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
  { id: 3, createdBy: "John Miller", createdDate: "Dec 12, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
  { id: 4, createdBy: "John Miller", createdDate: "Dec 12, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
  { id: 5, createdBy: "John Miller", createdDate: "Dec 15, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
];