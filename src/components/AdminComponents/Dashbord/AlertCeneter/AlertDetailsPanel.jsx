import { useState, useEffect } from "react";
import { Box, Grid, Typography, List, ListItemText, Autocomplete, TextField } from "@mui/material";
import { useServices } from "../../../../services/services";
import CommonDialogForm from "../../../../common/CommonDialogForm";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
  ChatContainer,
  ChatHeader,
  ChatMessages,
  CurrentUserBubble,
  OtherUserBubble,
  ChatInputRow,
  ChatInput,
  ChatSendButton,
  MessageContainer,
  CurrentChatTimestamp,
  ChatCloseButton,
  DetailsPanelWrapper,
  InfoSectionSpaced,
  ScrollableListBox,
  LocationItemSpaced,
  OperatorListItemButton,
  OperatorRadio,
  TelegramIconStyled,
} from "./AlertCenterScreenCard.styles.jsx";

import HOS from "../../../../assets/images/active/Hos.png";
import LocationIcon from "../../../../assets/images/active/Icon-3.png";

import {
  getDriverDeviceInfo,
  getTriggerInfo,
  defaultConversations,
} from "./AlertDetailsPanel.utils";

const OPERATORS = [
  { id: 1, name: "James Carter", role: "Senior Operator" },
  { id: 2, name: "Maria Lopez", role: "Operator" },
  { id: 3, name: "David Kim", role: "Operator" },
  { id: 4, name: "Sarah Mitchell", role: "Junior Operator" },
  { id: 5, name: "Robert Chen", role: "Senior Operator" },
  { id: 6, name: "Emily Johnson", role: "Operator" },
  { id: 7, name: "Michael Brown", role: "Senior Operator" },
  { id: 8, name: "Jessica Davis", role: "Junior Operator" },
  { id: 9, name: "William Wilson", role: "Operator" },
  { id: 10, name: "Amanda Martinez", role: "Senior Operator" },
];

const PANEL_STATE = {
  DETAILS: "details",
  ASSIGNED: "assigned",
  CHAT: "chat",
};

const AlertActionButton = ({ label, isResolve, isOpenChat, isAssignOperator, onClick }) => {
  const isNoEffects = isOpenChat || isAssignOperator;
  return (
    <Grid item xs={6}>
      <ActionButton 
        fullWidth 
        disableRipple={isNoEffects}
        isResolve={isResolve} 
        isOpenChat={isOpenChat} 
        isAssignOperator={isAssignOperator} 
        onClick={onClick}
      >
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

const ALERT_STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "resolved", label: "Resolved" },
  { value: "inprogress", label: "In Progress" },
  { value: "pending", label: "Pending" },
];

const OperatorItem = ({ op, selectedOperator, onSelect }) => {
  const handleClick = () => onSelect(op.id);
  return (
    <OperatorListItemButton
      key={op.id}
      onClick={handleClick}
      selected={selectedOperator === op.id}
    >
      <OperatorRadio checked={selectedOperator === op.id} size="small" />
      <ListItemText
        primary={op.name}
        secondary={op.role}
        primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }}
        secondaryTypographyProps={{ fontSize: 12 }}
      />
    </OperatorListItemButton>
  );
};

const AlertDetailsPanel = ({ selectedAlert }) => {
  const { updateApi } = useServices();
  const [panelState, setPanelState] = useState(PANEL_STATE.DETAILS);
  const [alertStatus, setAlertStatus] = useState("");
  const [assignOpen, setAssignOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(defaultConversations);
  const [assignLoading, setAssignLoading] = useState(false);

  useEffect(() => {
    setPanelState(PANEL_STATE.DETAILS);
    setMessages(defaultConversations);
    setChatInput("");
    setAlertStatus("");
    setAssignOpen(false);
    setSelectedOperator(null);
  }, [selectedAlert]);

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
  } = selectedAlert;

  const displayTitle = title || message;
  const displaySeverity = severity || "Critical";
  const primaryLocation = location1 || city;
  const driverInfo = getDriverDeviceInfo(company, truck);
  const triggerInfo = getTriggerInfo();

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: "P", message: chatInput, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isCurrentUser: true },
    ]);
    setChatInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleCloseChat = () => {
    setPanelState(PANEL_STATE.DETAILS);
  };

  const handleChatInputChange = (e) => {
    setChatInput(e.target.value);
  };

  const handleOperatorSelect = (operatorId) => {
    setSelectedOperator(operatorId);
  };

  const renderMessage = ({ sender, message: msg, time, isCurrentUser }, index) => (
    <MessageContainer key={index} $isCurrentUser={isCurrentUser}>
      {isCurrentUser ? (
        <>
          <CurrentUserBubble>{msg}</CurrentUserBubble>
          <CurrentChatTimestamp $isCurrentUser>{time}</CurrentChatTimestamp>
        </>
      ) : (
        <>
          <OtherUserBubble>{msg}</OtherUserBubble>
          <CurrentChatTimestamp>{time}</CurrentChatTimestamp>
        </>
      )}
    </MessageContainer>
  );

  const handleAssignOperator = async () => {
    if (!selectedOperator || !selectedAlert) return;

    setAssignLoading(true);
    const incidentId = selectedAlert.id || "ac-device-offline";
    const endUrl = `/Stage/masteradmin/alert-center/assign-operator?incident_id=${incidentId}&assigned_user_id=${selectedOperator}`;
    const response = await updateApi(null, endUrl);
    setAssignLoading(false);

    if (response?.statusCode === 200) {
      setPanelState(PANEL_STATE.ASSIGNED);
      setAssignOpen(false);
    }
  };

  if (panelState === PANEL_STATE.CHAT) {
    return (
      <AlertCardContainer chatPanel>
        <ChatContainer>
          <ChatHeader>
            Live Chat — {company || "Operator"}
            <ChatCloseButton onClick={handleCloseChat}>×</ChatCloseButton>
          </ChatHeader>

          <ChatMessages>
            {messages.map(renderMessage)}
          </ChatMessages>

          <ChatInputRow>
            <ChatInput
              placeholder="Type a message..."
              value={chatInput}
              onChange={handleChatInputChange}
              onKeyDown={handleKeyDown}
            />
            <ChatSendButton onClick={handleSend}>
              <TelegramIconStyled />
            </ChatSendButton>
          </ChatInputRow>
        </ChatContainer>
      </AlertCardContainer>
    );
  }

  return (
    <DetailsPanelWrapper>
      <AlertCardContainer detailsPanel>
      <DetailHeader>
        <AlertDetailItem>
          <DetailAlertIcon src={HOS} alt="Alert type icon" />
          <DetailTitleWrapper>
            <DetailTitle>{displayTitle}</DetailTitle>
            <DetailSubTitle severity={displaySeverity}>{displaySeverity}</DetailSubTitle>
          </DetailTitleWrapper>
        </AlertDetailItem>
      </DetailHeader>

      <InfoSectionSpaced>
        <TriggerSectionTitle>Driver &amp; Device Information</TriggerSectionTitle>
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
        <Box>
          <InfoLabel>Current Location</InfoLabel>
          <LocationItemSpaced>
            <LocationContentItem
              primaryLocation={primaryLocation}
              location2={location2}
            />
          </LocationItemSpaced>
        </Box>
      </InfoSectionSpaced>

      <TriggerSection>
        <TriggerSectionTitle>Trigger Information</TriggerSectionTitle>
        <TriggerInfoGrid>
          {triggerInfo.map(({ label, value }) => (
            <TriggerInfoCardItem key={label} label={label} value={value} />
          ))}
        </TriggerInfoGrid>
      </TriggerSection>

      
      <CommonDialogForm
        open={assignOpen}
        title="Assign Operator"
        onCancel={() => setAssignOpen(false)}
        onClose={() => setAssignOpen(false)}
        onSubmit={handleAssignOperator}
        submitButtonText="Assign"
        disableSubmit={!selectedOperator}
        loading={assignLoading}
        maxWidth="xs"
        content={
          <ScrollableListBox>
            <List disablePadding>
              {OPERATORS.map((op) => (
                <OperatorItem
                  key={op.id}
                  op={op}
                  selectedOperator={selectedOperator}
                  onSelect={handleOperatorSelect}
                />
              ))}
            </List>
          </ScrollableListBox>
        }
      />
    </AlertCardContainer>
    </DetailsPanelWrapper>
  );
};

export default AlertDetailsPanel;
