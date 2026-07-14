import { useCallback, useEffect, useRef } from "react";
import {
  AlertCard,
  AlertCardTitle,
  AlertContent,
  AlertDetailItem,
  AlertDetailRow,
  AlertIcon,
  ELDTag,
  LocationRow,
  AlertTopRow,
  AlertRight,
  AlertStatus,
  AlertOpen,
  AlertIdIcon,
} from "./AlertCenterScreenCard.styles.jsx";

import CarrierIcon from "../../../../assets/images/active/Icon-1.png";
import LocationIcon from "../../../../assets/images/active/Icon-3.png";
import DeviceIcon from "../../../../assets/images/active/Icon-4.png";
import TruckIcon from "../../../../assets/images/active/Truck.png";
import TimeIcon from "../../../../assets/images/active/ti.png";
import IdIcon from "../../../../assets/images/active/Icon-2.png";
import { calculateAlertId } from "./AlertDetailsPanel.utils";
import { INCIDENT_EVENT_TITLES } from "../../../compliance/DeviceAssetManagement/Constants.js";

const AlertCardItem = ({ item, isSelected, onSelect }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isSelected && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }, 50);
    }
  }, [isSelected]);
  const {
    notification_id,
    title,
    message,
    truck_number,
    device_serial_number,
    created_at,
    latitude,
    longitude,
    time,
    color,
    severity,
    company,
    truck,
    serial,
    location1,
    location2,
    city,
  } = item;

  const handleClick = useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  const alertIdNumber = notification_id;

  const isSystem = false;
  const showStatusLabel = true;

  const displayTruckNumber = truck_number || "-";

  const displayDeviceSerialNumber = device_serial_number || "-";

  const displayLocation =
    latitude && longitude ? `${latitude}, ${longitude}` : "-";

  const displayCreatedAt = created_at
    ? new Date(created_at.replace(" ", "T")).toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "-";

  const secondaryIcon = time ? TimeIcon : LocationIcon;
  const statusText = isSystem ? "in-progress" : "Open";

  const getDisplayTitle = (title) => {
  if (!title) return "-";

  const match = title.match(/(\d+)$/);

  if (!match) {
    return title;
  }

  const incidentTypeId = Number(match[1]);

  const incidentName = INCIDENT_EVENT_TITLES[incidentTypeId];

  if (!incidentName) {
    return title;
  }

  return title.replace(
    /:\s*\d+$/,
    `: ${incidentName}`,
  );
};

const displayTitle = getDisplayTitle(title);

const statusLabel = showStatusLabel ? (
  <AlertOpen inProgress={isSystem}>
    {statusText}
  </AlertOpen>
) : null;

  return (
    <AlertCard ref={cardRef} accentcolor={color} active={isSelected} onClick={handleClick}>
      <AlertContent>
        <AlertTopRow>
          <AlertCardTitle>{displayTitle}</AlertCardTitle>

          <AlertRight>
            <AlertStatus>{severity}</AlertStatus>
            {statusLabel}
          </AlertRight>
        </AlertTopRow>

        <AlertDetailRow>
          <AlertDetailItem>
            <AlertIcon src={CarrierIcon} alt="Carrier" />
            {company}
          </AlertDetailItem>

          {truck_number && (
            <AlertDetailItem>
              <AlertIcon src={TruckIcon} alt="Truck" />
              {displayTruckNumber}
            </AlertDetailItem>
          )}

          <AlertDetailItem>
            <AlertIcon src={DeviceIcon} alt="Device" />
            {displayDeviceSerialNumber}
          </AlertDetailItem>

          <ELDTag>Alert</ELDTag>
        </AlertDetailRow>

        <LocationRow>
          <AlertDetailItem>
            <AlertIcon src={LocationIcon} alt="Location" />
            {displayLocation}
          </AlertDetailItem>

          <AlertDetailItem>
            <AlertIcon src={secondaryIcon} alt="Time or Location" />
            {displayCreatedAt}
          </AlertDetailItem>

        </LocationRow>
      </AlertContent>
    </AlertCard>
  );
};

export default AlertCardItem;
