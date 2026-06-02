export const STATUS_OPTIONS = [
  { label: "Active", value: "1" },
  { label: "Inactive", value: "2" },
];

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
