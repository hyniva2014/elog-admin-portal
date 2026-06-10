import {
  InfoCard,
  InfoLabel,
  InfoValue,
  StatusBadge,
} from "./AlertCenterScreenCard.styles.jsx";

const DriverInfoCardItem = ({ label, value, isStatus }) => {
  const content = isStatus ? (
    <StatusBadge>{value}</StatusBadge>
  ) : (
    <InfoValue>{value}</InfoValue>
  );

  return (
    <InfoCard>
      <InfoLabel>{label}</InfoLabel>
      {content}
    </InfoCard>
  );
};

export default DriverInfoCardItem;
