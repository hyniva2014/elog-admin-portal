import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  List,
  Breadcrumbs,
  Link,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";
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
  TriggerInformationTitle,
  PanelHeader,
  PanelTitle,
  PanelBreadcrumbs,
  PanelBreadcrumbLink,
  PanelBreadcrumbText,
  PanelDropdown,
  PanelDescription,
  NoDataContainer,
} from "./AlertCenterScreenCard.styles.jsx";

import HOS from "../../../../assets/images/active/Hos.png";

import {
  defaultConversations,
  getDriverDeviceInfo,
  getTriggerInfo,
} from "./AlertDetailsPanel.utils";

import ChatMessageItem from "./ChatMessageItem.jsx";
import AlertActionButton from "./AlertActionButton.jsx";
import DriverInfoCardItem from "./DriverInfoCardItem.jsx";
import LocationContentItem from "./LocationContentItem.jsx";
import TriggerInfoCardItem from "./TriggerInfoCardItem.jsx";
import OperatorItem from "./OperatorItem.jsx";
import AssignOperatorContent from "./AssignOperatorContent.jsx";
import CommonSnackbar from "../../../../common/CommonSnackbar.jsx";
import CommonLoading from "../../../../common/CommonLoading.jsx";
import { INCIDENT_EVENT_TITLES } from "../../../compliance/DeviceAssetManagement/Constants.js";

const PANEL_STATE = {
  DETAILS: "details",
  ASSIGNED: "assigned",
  CHAT: "chat",
};

const AlertDetailsPanel = ({ selectedAlert }) => {
  const { updateApi, fetchApi, createApi } = useServices();
  const { LoadingContainer, setLoading } = CommonLoading();
  const [panelState, setPanelState] = useState(PANEL_STATE.DETAILS);
  const [alertStatus, setAlertStatus] = useState("");
  const [assignOpen, setAssignOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [assignLoading, setAssignLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [operators, setOperators] = useState([]);

  useEffect(() => {
    setPanelState(PANEL_STATE.DETAILS);
    setMessages(defaultConversations);
    setChatInput("");
    setAlertStatus("");
    setAssignOpen(false);
    setSelectedOperator(null);
  }, [selectedAlert]);

  const formatChatTime = (dateTime) => {
    return new Date(dateTime.replace(" ", "T")).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSend = async () => {
    if (!chatInput.trim()) return;

    try {
      setLoading(true);

      const response = await sendChatMessage(chatInput, selectedFiles);

      if (response?.statusCode === 200) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "P",
            message: chatInput,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isCurrentUser: true,
          },
        ]);

        setSnackbar({
          open: true,
          message: response?.body?.message || "Message sent successfully",
          severity: "success",
        });

        setChatInput("");
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error("Send Message Error:", error);

      setSnackbar({
        open: true,
        message: "Failed to send message",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
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

  const renderChatMessage = useCallback(
    (msgItem, index) => <ChatMessageItem key={index} messageItem={msgItem} />,
    [],
  );

  const renderOperator = useCallback(
    ({ id, name }) => (
      <OperatorItem
        key={id}
        op={{
          id,
          name,
        }}
        selectedOperator={selectedOperator}
        onSelect={handleOperatorSelect}
      />
    ),
    [selectedOperator, handleOperatorSelect],
  );

  const renderDriverInfo = useCallback(
    ({ label, value, isStatus }) => (
      <DriverInfoCardItem
        key={label}
        label={label}
        value={value}
        isStatus={isStatus}
      />
    ),
    [],
  );

  const renderTriggerInfo = useCallback(
    ({ label, value }) => (
      <TriggerInfoCardItem key={label} label={label} value={value} />
    ),
    [],
  );

  const fetchOperators = async (companyId) => {
    return await fetchApi(
      `/masteradmin/dropdown/get-support-agents?company_id=${companyId}`,
    );
  };

  const handleOpenAssign = async () => {
    try {
      setLoading(true);

      const response = await fetchOperators(selectedAlert?.company_id);

      if (response?.statusCode === 200) {
        const operatorList =
          response?.body?.users?.map((user) => ({
            id: user.user_id,
            name: user.user_name,
          })) || [];

        setOperators(operatorList);
      }

      setAssignOpen(true);
    } catch (error) {
      console.error("Operators API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendChatMessage = async (messageText, files = []) => {
    const formData = new FormData();
    formData.append("notification_id", selectedAlert?.notification_id);
    formData.append("user_id", "9");
    formData.append("message", messageText);
    formData.append("initiated_by", "superadmin");
    formData.append("is_chat", "1");
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });
    const response = await createApi(
      formData,
      "/admin/operationcenter/save-carrier-platform-admin-message",
    );

    return response;
  };

  const fetchChatHistory = async (notificationId) => {
    return await fetchApi(
      `/masteradmin/alert-center/notifications/chat?notification_id=${notificationId}`,
    );
  };

  const handleAssignOperator = async () => {
    if (!selectedOperator || !selectedAlert) return;

    setAssignLoading(true);

    const incidentId = selectedAlert.incident_id;

    const endUrl = `/masteradmin/alert-center/assign-operator?incident_id=${incidentId}&assigned_user_id=${selectedOperator}`;

    const response = await updateApi(null, endUrl);

    setAssignLoading(false);

    if (response?.statusCode === 200) {
      setPanelState(PANEL_STATE.ASSIGNED);
      setAssignOpen(false);

      setSnackbar({
        open: true,
        message: response?.body?.message || "Operator assigned successfully",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: response?.message || "Failed to assign operator",
        severity: "error",
      });
    }
  };

  if (!selectedAlert) {
    return <NoDataContainer>No Alert Details Available</NoDataContainer>;
  }

  const handleOpenChat = async () => {
    try {
      setLoading(true);

      const response = await fetchChatHistory(selectedAlert.notification_id);

      if (response?.statusCode === 200) {
        const chatData = response?.body?.data || [];

        const formattedMessages = chatData.map((item) => ({
          id: item.id,
          message: item.message,
          time: formatChatTime(item.created_at),
          initiatedBy: item.initiated_by,
          isCurrentUser: item.initiated_by === "superadmin",
        }));

        setMessages(formattedMessages);
      }

      setPanelState(PANEL_STATE.CHAT);
    } catch (error) {
      console.error("Chat History Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const {
    title,
    message,
    truck_number,
    device_serial_number,
    latitude,
    longitude,
    created_at,
    severity,
    company,
    truck,
    location1,
    location2,
    city,
  } = selectedAlert;

  const displayTitle = title || message;
  const displaySeverity = severity || "Critical";
  const primaryLocation =
    latitude && longitude ? `${latitude}, ${longitude}` : "-";

  const driverInfo = [
    {
      label: "Driver Name",
      value: selectedAlert.driver_name || "Linda Garcia",
    },
    {
      label: "Driver Status",
      value: selectedAlert.driver_status || "Active",
      isStatus: true,
    },
    {
      label: "Carrier",
      value: selectedAlert.company_name || "J.B. Hunt",
    },
    {
      label: "Device ID",
      value: device_serial_number || "-",
    },
    {
      label: "Truck Number",
      value: truck_number || "-",
    },
  ];

  const triggerInfo = [
    {
      label: "Alert Source",
      value: "Carrier Admin",
    },
    {
      label: "Trigger Event",
      value: "Carrier ELD Request Submitted",
    },
    {
      label: "Module",
      value: "Carrier Admin",
    },
    {
      label: "Subcategory",
      value: "ELD Carrier Request",
    },
  ];

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const chatTitle = `Live Chat — ${company || "Operator"}`;

  if (panelState === PANEL_STATE.CHAT) {
    return (
      <>
        <LoadingContainer />
        <AlertCardContainer chatPanel>
          <ChatContainer>
            <ChatHeader>
              {chatTitle}
              <ChatCloseButton onClick={handleCloseChat}>×</ChatCloseButton>
            </ChatHeader>

            <ChatMessages>{messages.map(renderChatMessage)}</ChatMessages>

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
      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </>
    );
  }

  const getIncidentTitle = (title) => {
    if (!title) return "Alert Details";

    const match = title.match(/(\d+)$/);

    if (!match) {
      return title;
    }

    const incidentTypeId = Number(match[1]);

    const incidentName = INCIDENT_EVENT_TITLES[incidentTypeId];

    return incidentName
      ? `A new incident requires your review : ${incidentName}`
      : title;
  };

  const headerTitle = getIncidentTitle(title);

  return (
    <DetailsPanelWrapper>
      <LoadingContainer />
      <AlertCardContainer detailsPanel>
        <PanelHeader>
          <Box>
            <PanelTitle variant="inherit">{headerTitle}</PanelTitle>
            <PanelBreadcrumbs separator="•" aria-label="breadcrumb">
              <PanelBreadcrumbLink href="#">Info</PanelBreadcrumbLink>
              <PanelBreadcrumbLink href="#">Open</PanelBreadcrumbLink>
              <PanelBreadcrumbText>ELD Device Information</PanelBreadcrumbText>
            </PanelBreadcrumbs>
          </Box>
          <PanelDropdown variant="outlined" size="small">
            <Select
              value="Open"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </PanelDropdown>
        </PanelHeader>

        <Box>
          <PanelDescription>
            {message || "No description available"}
          </PanelDescription>
        </Box>

        <InfoSectionSpaced>
          <TriggerSectionTitle>
            Driver &amp; Device Information
          </TriggerSectionTitle>
          <InfoGrid>{driverInfo.map(renderDriverInfo)}</InfoGrid>

          <Box mt={1}>
            <InfoLabel>Current Location</InfoLabel>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                color: "#1F2937",
                mt: 0.5,
              }}
            >
              {primaryLocation || "-"}
            </Typography>
          </Box>
        </InfoSectionSpaced>

      <TriggerSection>
        <TriggerInformationTitle>Trigger Information</TriggerInformationTitle>
        <TriggerInfoGrid>
          {triggerInfo.map(renderTriggerInfo)}
        </TriggerInfoGrid>
      </TriggerSection>

        <ActionSection>
          <ActionButton isAssignOperator onClick={handleOpenAssign}>
            Assign
          </ActionButton>
          <ActionButton isOpenChat onClick={handleOpenChat}>
            Open Chat
          </ActionButton>
        </ActionSection>

        <CommonSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
        />

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
          <AssignOperatorContent
            operators={operators}
            renderOperator={renderOperator}
          />
        }
      />
    </AlertCardContainer>
    </DetailsPanelWrapper>
  );
};

export default AlertDetailsPanel;
