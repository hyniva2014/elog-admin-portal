import { useCallback } from "react";
import { Grid } from "@mui/material";

import {
  AlertDetailItem,
  AlertIcon,
  DetailAlertIcon,
  AlertCardContainer,
  DetailHeader,
  DetailTitleWrapper,
  DetailTitle,
  DetailSubTitle,
  InfoSection,
  TriggerSectionTitle,
  InfoGrid,
  TriggerInfoGrid,
  InfoCard,
  InfoLabel,
  InfoValue,
  StatusBadge,
  LocationItem,
  CoordinateBadge,
  TriggerSection,
  TriggerInfoCard,
  ActionSection,
  ActionButton,
  ConversationContainer,
  ConversationMessage,
  MessageContent,
  Timestamp,
  DateSection,
  DateText,
  AvatarCircle,
  MessageBubble,
  RightAvatar,
  MessageText,
} from "./AlertCenterScreenCard.styles.jsx";

import HOS from "../../../../assets/images/active/Hos.png";
import LocationIcon from "../../../../assets/images/active/Icon-3.png";
import TpLogo from "../../../../assets/images/TP logo.png";

import {
  defaultConversations,
  getDriverDeviceInfo,
} from "./AlertDetailsPanel.utils";

const AlertActionButton = ({ label }) => {
  const handleClick = useCallback(() => {
    // TODO
  }, []);

  return (
    <Grid item xs={6}>
      <ActionButton fullWidth variant="outlined" onClick={handleClick}>
        {label}
      </ActionButton>
    </Grid>
  );
};

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

const TriggerInfoCardItem = ({ label, value }) => (
  <TriggerInfoCard>
    <InfoLabel>{label}</InfoLabel>
    <InfoValue>{value}</InfoValue>
  </TriggerInfoCard>
);

const ConversationItem = ({ sender, message, time, isCurrentUser }) => {
  return (
    <ConversationMessage isCurrentUser={isCurrentUser}>
      {!isCurrentUser && <AvatarCircle>{sender?.substring(0, 2)}</AvatarCircle>}

      <MessageBubble isCurrentUser={isCurrentUser}>
        <MessageText>{message}</MessageText>
        <Timestamp>{time}</Timestamp>
      </MessageBubble>

      {isCurrentUser && <RightAvatar src={TpLogo} alt="TP" />}
    </ConversationMessage>
  );
};

const AlertDetailsPanel = ({ selectedAlert }) => {
  if (!selectedAlert) return null;

  const {
    title,
    message,
    severity,
    company,
    truck,
    location1,
    location2,
    city,
    date,
    conversations = [],
  } = selectedAlert;

  const displayTitle = title || message;
  const displaySeverity = severity || "Critical";
  const primaryLocation = location1 || city;
  const formattedDate = date || "25 April";

  const driverInfo = getDriverDeviceInfo(company, truck);
  // const triggerInfo = getTriggerInfo();

  const conversationList =
    conversations.length > 0 ? conversations : defaultConversations;

  const conversationItems = conversationList.map(
    ({ sender, message, time, isCurrentUser }, index) => (
      <ConversationItem
        key={index}
        sender={sender}
        message={message}
        time={time}
        isCurrentUser={isCurrentUser}
      />
    ),
  );

  return (
    <AlertCardContainer detailsPanel>
      <DetailHeader>
        <AlertDetailItem mt={2}>
          <DetailAlertIcon src={HOS} alt="Alert type icon" />
          <DetailTitleWrapper>
            <DetailTitle>{displayTitle}</DetailTitle>
            <DetailSubTitle>{displaySeverity}</DetailSubTitle>
          </DetailTitleWrapper>
        </AlertDetailItem>
      </DetailHeader>

      {/* <InfoSection>
        <InfoGrid>
          {driverInfo.map(({ label, value, isStatus }) => (
            <DriverInfoCardItem
              key={label}
              label={label}
              value={value}
              isStatus={isStatus}
            />
          ))}
        </InfoGrid>
      </InfoSection> */}

      {/* <DividerLine /> */}

      {/* Date Section */}
      <DateSection>
        <DateText>{formattedDate}</DateText>
      </DateSection>

      {/* Conversation Section */}
      <ConversationContainer>
        {conversationItems}
      </ConversationContainer>
    </AlertCardContainer>
  );
};

export default AlertDetailsPanel;
