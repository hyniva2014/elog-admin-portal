import { useCallback } from "react";
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
} from "./AlertCenterScreenCard.styles.jsx";

import CarrierIcon from "../../../../assets/images/active/Icon-1.png";
import LocationIcon from "../../../../assets/images/active/Icon-3.png";
import DeviceIcon from "../../../../assets/images/active/Icon-4.png";
import TruckIcon from "../../../../assets/images/active/Truck.png";
import TimeIcon from "../../../../assets/images/active/ti.png";
import { AlertAccentBar } from "../AlertCenter.styles";

const AlertCardItem = ({ item, isSelected, onSelect }) => {
  const {
    role,
    color,
    title,
    severity,
    company,
    truck,
    serial,
    location1,
    location2,
    city,
    time,
  } = item;

  const handleClick = useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  const isSystem = role === "System";
  const showStatusLabel = role !== "Admin";

  const secondaryIcon = time ? TimeIcon : LocationIcon;
  const statusText = isSystem ? "in-progress" : "Open";

  return (
    <AlertCard accentcolor={color} active={isSelected} onClick={handleClick}>
      <AlertAccentBar accentcolor={color} />

      <AlertContent>
        <AlertTopRow>
          <AlertCardTitle>{title}</AlertCardTitle>

          <AlertRight>
            <AlertStatus>{severity}</AlertStatus>

            {showStatusLabel && (
              <AlertOpen inProgress={isSystem}>{statusText}</AlertOpen>
            )}
          </AlertRight>
        </AlertTopRow>

        <AlertDetailRow>
          <AlertDetailItem>
            <AlertIcon src={CarrierIcon} alt="Carrier" />
            {company}
          </AlertDetailItem>

          <AlertDetailItem>
            <AlertIcon src={TruckIcon} alt="Truck" />
            {truck}
          </AlertDetailItem>

          <AlertDetailItem>
            <AlertIcon src={DeviceIcon} alt="Device" />
            {serial}
          </AlertDetailItem>

          <ELDTag>{role}</ELDTag>
        </AlertDetailRow>

        <LocationRow>
          <AlertDetailItem>
            <AlertIcon src={LocationIcon} alt="Location" />
            {location1 || city}
          </AlertDetailItem>

          <AlertDetailItem>
            <AlertIcon src={secondaryIcon} alt="Time or Location" />
            {location2 || time}
          </AlertDetailItem>
        </LocationRow>
      </AlertContent>
    </AlertCard>
  );
};

export default AlertCardItem;
