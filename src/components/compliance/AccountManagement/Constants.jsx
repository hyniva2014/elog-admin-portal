export const STATUS_OPTIONS = [
  { label: "Active", value: "1" },
  { label: "Inactive", value: "2" },
  { label: "Suspended", value: "3" },
];

export const ACCOUNT_STATUS_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Suspended", value: "Suspended" },
];

export const STATUS_ID_MAP = {
  "1": "Active",
  "2": "Inactive",
  "3": "Suspended",
};

export const STATUS_TRANSITION_OPTIONS = {
  Active: [
    { label: "Inactive", value: "Inactive", statusId: "2" },
    { label: "Suspended", value: "Suspended", statusId: "3" },
  ],
  Inactive: [
    { label: "Active", value: "Active", statusId: "1" },
    { label: "Suspended", value: "Suspended", statusId: "3" },
  ],
  Suspended: [
    { label: "Active", value: "Active", statusId: "1" },
    { label: "Inactive", value: "Inactive", statusId: "2" },
  ],
};

export const getDefaultTargetStatus = (currentStatus) => {
  if (currentStatus === "Active") return "Inactive";
  return "Active";
};

export const getStatusNameFromId = (statusId, statusName) => {
  const mappedStatus = STATUS_ID_MAP[String(statusId)];

  if (statusName && statusName !== "-" && mappedStatus?.toLowerCase() === statusName.toLowerCase()) {
    return mappedStatus;
  }

  return mappedStatus || statusName || "-";
};

export const MIN_SEARCH_LENGTH = 3;
export const DEBOUNCE_DELAY_MS = 300;
export const SELECTION_SUPPRESSION_MS = 1000;

export const defaultPageSize = 25;

export const defaultColumnProps = {
  minWidth: 180,
  maxWidth: 250,
  headerTooltip: true,
  flex: 1,
  align: "center",
  headerAlign: "center",
};

export const getStickyColumnProps = (className) => ({
  minWidth: 180,
  maxWidth: 250,
  headerTooltip: true,
  cellClassName: className,
  headerClassName: className,
  flex: 1,
});

export const CARRIER_FIELD_MAP = {
  carrier_name: "carrierName",
  carrier_address: "carrierAddress",
  usdot_number: "usdot",
  tax_id: "taxId",
  mc_number: "mcNumber",
  max_devices: "maxDevices",
  toll_free_number: "tollFree",
  primary_contact_name: "primaryContactName",
  primary_contact_number: "primaryContactNumber",
  primary_contact_email: "primaryContactEmail",
  secondary_contact_name: "secondaryContactName",
  secondary_contact_number: "secondaryContactNumber",
  secondary_contact_email: "secondaryContactEmail",
};

export const ACCOUNT_FORM_FIELDS = [
  { name: "carrierName", label: "Carrier Name", required: true },
  { name: "carrierAddress", label: "Carrier Address" },
  {
    name: "usdot",
    label: "USDOT Number",
    required: true,
    formatter: "usdot",
  },
  {
    name: "taxId",
    label: "Tax ID (EIN)",
    placeholder: "XX-XXXXXXX",
    formatter: "taxId",
  },
  {
    name: "mcNumber",
    label: "MC Number",
    formatter: "mcNumber",
  },
  { name: "maxDevices", label: "Max Devices", type: "number" },
  {
    name: "tollFree",
    label: "Toll Free",
    placeholder: "(XXX) XXX-XXXX",
    formatter: "phone",
  },
];

export const ACCOUNT_FORM_FIELDS_WITHOUT_CARRIER = ACCOUNT_FORM_FIELDS.filter(
  (f) => f.name !== "carrierName",
);

export const PRIMARY_CONTACT_FIELDS = [
  { name: "primaryContactName", label: "Primary Contact Name" },
  {
    name: "primaryContactNumber",
    label: "Primary Contact Number",
    placeholder: "(XXX) XXX-XXXX",
    formatter: "phone",
  },
  {
    name: "primaryContactEmail",
    label: "Primary Contact Email",
  },
];

export const SECONDARY_CONTACT_FIELDS = [
  {
    name: "secondaryContactName",
    label: "Secondary Contact Name",
  },
  {
    name: "secondaryContactNumber",
    label: "Secondary Contact Number",
    placeholder: "(XXX) XXX-XXXX",
    formatter: "phone",
  },
  {
    name: "secondaryContactEmail",
    label: "Secondary Contact Email",
  },
];

export const DEACTIVATION_FIELDS = [
  {
    name: "reasonForDeactivation",
    label: "Reason for Deactivation",
    multiline: true,
    rows: 4,
    xs: 12,
  },
];

export const AUDIT_LOG_TITLE = "Audit History";
export const ACCOUNT_HISTORY_TITLE = "Account Audit History";
export const BACK_BUTTON_TEXT = "Back";