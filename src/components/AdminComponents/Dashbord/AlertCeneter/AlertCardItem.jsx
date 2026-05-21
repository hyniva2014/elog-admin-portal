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
  const handleClick = useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  const isSystem = item.role === "System";
  const showStatusLabel = item.role !== "Admin";

  return (
    <AlertCard
      accentcolor={item.color}
      active={isSelected}
      onClick={handleClick}
    >
      <AlertAccentBar accentcolor={item.color} />

      <AlertContent>
        <AlertTopRow>
          <AlertCardTitle>{item.title}</AlertCardTitle>

          <AlertRight>
            <AlertStatus>{item.severity}</AlertStatus>

            {showStatusLabel && (
              <AlertOpen inProgress={isSystem}>
                {isSystem ? "in-progress" : "Open"}
              </AlertOpen>
            )}
          </AlertRight>
        </AlertTopRow>

        <AlertDetailRow>
          <AlertDetailItem>
            <AlertIcon src={CarrierIcon} alt="Carrier" />
            {item.company}
          </AlertDetailItem>

          <AlertDetailItem>
            <AlertIcon src={TruckIcon} alt="Truck" />
            {item.truck}
          </AlertDetailItem>

          <AlertDetailItem>
            <AlertIcon src={DeviceIcon} alt="Device" />
            {item.serial}
          </AlertDetailItem>

          <ELDTag>{item.role}</ELDTag>
        </AlertDetailRow>

        <LocationRow>
          <AlertDetailItem>
            <AlertIcon src={LocationIcon} alt="Location" />
            {item.location1 || item.city}
          </AlertDetailItem>

          <AlertDetailItem>
            <AlertIcon
              src={item.time ? TimeIcon : LocationIcon}
              alt="Time or Location"
            />
            {item.location2 || item.time}
          </AlertDetailItem>
        </LocationRow>
      </AlertContent>
    </AlertCard>
  );
};

export default AlertCardItem;