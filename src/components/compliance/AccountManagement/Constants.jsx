export const STATUS_OPTIONS = [
  { label: "Active", value: "1" },
  { label: "Inactive", value: "2" },
];

export const defaultPageSize = 25;

export const defaultColumnProps = {
  minWidth: 180,
  maxWidth: 250,
  headerTooltip: true,
};

export const getStickyColumnProps = (className) => ({
  ...defaultColumnProps,
  cellClassName: className,
  headerClassName: className,
});

export const ACCOUNT_FORM_FIELDS = [
  { name: "carrierName", label: "Carrier Name", required: true },
  { name: "carrierAddress", label: "Carrier Address", required: true },
  { name: "usdot", label: "USDOT Number", required: true },
  { name: "taxId", label: "Tax ID (EIN)", required: true, placeholder: "XX-XXXXXXX", formatter: "taxId" },
  { name: "mcNumber", label: "MC Number", required: true },
  { name: "maxDevices", label: "Max Devices", required: true, type: "number" },
  { name: "website", label: "Website" },
  { name: "tollFree", label: "Toll Free", required: true, placeholder: "(XXX) XXX-XXXX", formatter: "phone" },
  { name: "fax", label: "Fax", required: true, placeholder: "(XXX) XXX-XXXX", formatter: "phone" },
];

export const PRIMARY_CONTACT_FIELDS = [
  { name: "primaryContactName", label: "Primary Contact Name", required: true },
  { name: "primaryContactNumber", label: "Primary Contact Number", required: true, placeholder: "(XXX) XXX-XXXX", formatter: "phone" },
  { name: "primaryContactEmail", label: "Primary Contact Email", required: true },
];

export const SECONDARY_CONTACT_FIELDS = [
  { name: "secondaryContactName", label: "Secondary Contact Name", required: true },
  { name: "secondaryContactNumber", label: "Secondary Contact Number", required: true, placeholder: "(XXX) XXX-XXXX", formatter: "phone" },
  { name: "secondaryContactEmail", label: "Secondary Contact Email", required: true },
];