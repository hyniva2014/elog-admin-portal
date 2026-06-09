import React from "react";

import {
  InfoCard,
  InfoLabel,
  InfoValue,
  StatusBadge,
  AlertIcon,
  CoordinateBadge,
  TriggerInfoCard,
} from "./AlertCenterScreenCard.styles.jsx";

import LocationIcon from "../../../../assets/images/active/Icon-3.png";

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