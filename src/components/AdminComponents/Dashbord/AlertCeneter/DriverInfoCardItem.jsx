import {
  InfoCard,
  InfoLabel,
  InfoValue,
  StatusBadge,
} from "./AlertCenterScreenCard.styles.jsx";

const DriverInfoCardItem = ({ label, value, isStatus }) => {
  if (isStatus) {
    return (
      <InfoCard>
        <InfoLabel>{label}</InfoLabel>
        <StatusBadge>{value}</StatusBadge>
      </InfoCard>
    );
  }

  return (
    <InfoCard>
      <InfoLabel>{label}</InfoLabel>
      <InfoValue>{value}</InfoValue>
    </InfoCard>
  );
};

export default DriverInfoCardItem;
