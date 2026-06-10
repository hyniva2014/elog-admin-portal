import {
  AlertIcon,
  CoordinateBadge,
} from "./AlertCenterScreenCard.styles.jsx";
import LocationIcon from "../../../../assets/images/active/Icon-3.png";

const LocationContentItem = ({ primaryLocation, location2 }) => {
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

export default LocationContentItem;
