import {
  AlertIcon,
  CoordinateBadge,
} from "./AlertCenterScreenCard.styles.jsx";
import LocationIcon from "../../../../assets/images/active/Icon-3.png";

const LocationContentItem = ({ primaryLocation, location2 }) => {
  if (location2) {
    return (
      <>
        <AlertIcon src={LocationIcon} alt="Location" />
        <CoordinateBadge>{primaryLocation}</CoordinateBadge>
        <AlertIcon src={LocationIcon} alt="Location" />
        <CoordinateBadge>{location2}</CoordinateBadge>
      </>
    );
  }

  return (
    <>
      <AlertIcon src={LocationIcon} alt="Location" />
      <CoordinateBadge>{primaryLocation}</CoordinateBadge>
    </>
  );
};

export default LocationContentItem;
