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

export const getDriverInfoCards = (driverInfo) =>
  driverInfo.map(({ label, value, isStatus }) => {
    const content = isStatus ? (
      <StatusBadge>{value}</StatusBadge>
    ) : (
      <InfoValue>{value}</InfoValue>
    );

    return (
      <InfoCard key={label}>
        <InfoLabel>{label}</InfoLabel>

        {content}
      </InfoCard>
    );
  });

export const getLocationContent = (primaryLocation, location2) => {
  const secondaryLocation = location2 ? (
    <>
      <AlertIcon src={LocationIcon} alt="Location" />

      <CoordinateBadge>{location2}</CoordinateBadge>
    </>
  ) : null;

  return (
    <>
      <AlertIcon src={LocationIcon} alt="Location" />

      <CoordinateBadge>{primaryLocation}</CoordinateBadge>

      {secondaryLocation}
    </>
  );
};

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

export const getTriggerInfoCards = (triggerInfo) =>
  triggerInfo.map(({ label, value }) => (
    <TriggerInfoCard key={label}>
      <InfoLabel>{label}</InfoLabel>

      <InfoValue>{value}</InfoValue>
    </TriggerInfoCard>
  ));