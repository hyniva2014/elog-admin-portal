export const ACTION_BUTTONS = [
  "Acknowledge",
  "Assign Operator",
  "Escalate",
  "Resolve",
];

export const getDriverDeviceInfo = (company, truck) => [
  {
    label: "Driver Name",
    value: "Sarah Johnson",
  },
  {
    label: "Driver Status",
    value: "Active",
    isStatus: true,
  },
  {
    label: "Carrier Name",
    value: company,
  },
  {
    label: "Device ID",
    value: "DEV-8921",
  },
  {
    label: "Truck Number",
    value: truck,
  },
  {
    label: "Route",
    value: "US-75 South",
  },
];

// Pure utility constants and helpers, no JSX rendering logic.

export const getTriggerInfo = () => [
  {
    label: "Alert Source",
    value: "ELD Device",
  },
  {
    label: "Trigger Event",
    value: "Device Connection Lost",
  },
];


// Sample conversation data if not provided
export const defaultConversations = [
  {
    sender: "J",
    message: "We need to update the ELD config for TRK-512. Driver swap happening tomorrow.",
    time: "08:26 AM",
    isCurrentUser: false,
  },
  {
    sender: "P",
    message: "Received. Can you confirm the new driver ID?",
    time: "08:28 AM",
    isCurrentUser: true,
  },
];

/**
 * Calculate a numeric alert ID from the item's string id
 * @param {string} itemId - The alert item id
 * @returns {number} - Calculated alert ID (1000-9999)
 */
export const calculateAlertId = (itemId) => {
  if (!itemId) return 1001;
  return String(itemId).split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 9000 + 1000;
};