import {
  TriggerInfoCard,
  InfoLabel,
  InfoValue,
} from "./AlertCenterScreenCard.styles.jsx";

const TriggerInfoCardItem = ({ label, value }) => (
  <TriggerInfoCard>
    <InfoLabel>{label}</InfoLabel>
    <InfoValue>{value}</InfoValue>
  </TriggerInfoCard>
);

export default TriggerInfoCardItem;
