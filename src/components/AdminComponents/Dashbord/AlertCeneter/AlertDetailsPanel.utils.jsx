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
    sender: "TP",
    message: "Hello Emily Wilson!",
    time: "10:25",
    isCurrentUser: true,
  },
  {
    sender: "EW",
    message: "Hello",
    time: "10:26",
    isCurrentUser: false,
  },
  {
    sender: "TP",
    message: "Your 14-Hour Limit Approaching",
    time: "10:27",
    isCurrentUser: true,
  },
];