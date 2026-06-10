import { useState, useEffect } from "react";
import { Box, Grid, List } from "@mui/material";
import { useServices } from "../../../../services/services";
import CommonDialogForm from "../../../../common/CommonDialogForm";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  AlertDetailItem,
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
  InfoLabel,
  LocationItem,
  TriggerSection,
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
  TelegramIconStyled,
} from "./AlertCenterScreenCard.styles.jsx";

import HOS from "../../../../assets/images/active/Hos.png";

import {
  getDriverDeviceInfo,
  getTriggerInfo,
  defaultConversations,
} from "./AlertDetailsPanel.utils";

import ChatMessageItem from "./ChatMessageItem.jsx";
import AlertActionButton from "./AlertActionButton.jsx";
import DriverInfoCardItem from "./DriverInfoCardItem.jsx";
import LocationContentItem from "./LocationContentItem.jsx";
import TriggerInfoCardItem from "./TriggerInfoCardItem.jsx";
import OperatorItem from "./OperatorItem.jsx";

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

const ALERT_STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "resolved", label: "Resolved" },
  { value: "inprogress", label: "In Progress" },
  { value: "pending", label: "Pending" },
];

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

  const handleOperatorSelect = useCallback((operatorId) => {
    setSelectedOperator(operatorId);
  }, []);

  const handleCloseAssign = useCallback(() => {
    setAssignOpen(false);
  }, []);

  const renderChatMessage = useCallback((msgItem, index) => (
    <ChatMessageItem key={index} messageItem={msgItem} />
  ), []);

  const renderOperator = useCallback(({ id, name, role }) => (
    <OperatorItem
      key={id}
      op={{ id, name, role }}
      selectedOperator={selectedOperator}
      onSelect={handleOperatorSelect}
    />
  ), [selectedOperator, handleOperatorSelect]);

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
            {messages.map(renderChatMessage)}
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
        onCancel={handleCloseAssign}
        onClose={handleCloseAssign}
        onSubmit={handleAssignOperator}
        submitButtonText="Assign"
        disableSubmit={!selectedOperator}
        loading={assignLoading}
        maxWidth="xs"
        content={
          <ScrollableListBox>
            <List disablePadding>
              {OPERATORS.map(renderOperator)}
            </List>
          </ScrollableListBox>
        }
      />
    </AlertCardContainer>
    </DetailsPanelWrapper>
  );
};

export default AlertDetailsPanel;
