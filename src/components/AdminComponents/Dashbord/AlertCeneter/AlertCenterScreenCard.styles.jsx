import { Box, Button, Grid, Paper, Typography, ListItemButton, Radio, Breadcrumbs, Link, FormControl, Pagination } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import TelegramIcon from "@mui/icons-material/Telegram";

// Main Container
export const AlertsContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  "& > .MuiGrid-container": {
    flex: 1,
    minHeight: 0,
  },
}));

export const AlertGridContainer = styled(Grid)(() => ({
  width: "100%",
}));

export const AlertGridColumn = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const AlertCardContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "detailsPanel" && prop !== "chatPanel",
})(({ theme, detailsPanel, chatPanel }) => ({
  paddingLeft: chatPanel ? 0 : detailsPanel ? theme.spacing(2) : 0,
  paddingTop: chatPanel ? 0 : detailsPanel ? theme.spacing(2) : 0,
  paddingRight: chatPanel ? 0 : detailsPanel ? theme.spacing(2) : 0,
  paddingBottom: chatPanel ? 0 : detailsPanel ? theme.spacing(2) : 0,
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: "0px",
  height: detailsPanel ? "100%" : "auto",
  flex: detailsPanel || chatPanel ? 1 : undefined,
  boxShadow: "none",
  alignSelf: "stretch",
  display: detailsPanel || chatPanel ? "flex" : undefined,
  flexDirection: detailsPanel || chatPanel ? "column" : undefined,
  gap: detailsPanel && !chatPanel ? 16 : undefined,
  overflow: chatPanel ? "hidden" : undefined,
}));

// Left Sidebar - Alert List
export const AlertList = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 159px)",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",

  "&::-webkit-scrollbar": {
    width: 6,
  },
}));

// Alert Card in List
export const AlertCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  display: "flex",
  alignItems: "stretch",
  background: active ? theme.palette.custom.alertActiveBackground : theme.palette.common.white,
  borderRadius: "4px",
  overflow: "hidden",
  minHeight: 130,
  border: `1px solid ${theme.palette.grey[200]}`,
  position: "relative",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: active ? theme.palette.custom.alertActiveBackground : theme.palette.common.white,
  },
  "&:active": {
    backgroundColor: active ? theme.palette.custom.alertActiveBackground : theme.palette.common.white,
  },
}));

// Alert Content in List
export const AlertContent = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 12,
}));

// Alert Details Container
export const AlertDetails = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 12,
}));

// Main Detail Section (Right side)
export const DetailSection = styled(Paper)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 24,
  padding: 24,
  background: theme.palette.background.paper,
  borderRadius: 8,
  border: `1px solid ${theme.palette.grey[200]}`,
  overflowY: "auto",
  boxShadow: "none",

  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.grey[100],
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.grey[400],
    borderRadius: 3,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.grey[500],
  },
}));

export const AlertIdBadge = styled(Box)(({ theme }) => ({
  padding: "3px 10px",
  borderRadius: 4,
  border: `1px solid ${theme.palette.grey[300]}`,
  fontSize: 12,
  fontWeight: 600,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.common.white,
  whiteSpace: "nowrap",
}));

export const AlertAdminRole = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

export const BreadcrumbRow = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexWrap: "wrap",
}));

export const BreadcrumbItem = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme, isActive }) => ({
  fontSize: 13,
  fontWeight: isActive ? 600 : 400,
  color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
  cursor: "default",
}));

export const BreadcrumbSeparator = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.disabled,
}));

export const AlertDescription = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

// Header Section with Title and Badge
export const DetailHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 16px",
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const DetailTitleWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));

export const DetailTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.2,
}));

export const DetailSubTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "severity",
})(({ theme, severity }) => ({
  fontSize: 13,
  fontWeight: 400,
  color:
    severity === "Critical"
      ? theme.palette.error.main
      : theme.palette.warning.main,
}));

export const BadgeContainer = styled(Box)(() => ({
  display: "flex",
  gap: 8,
}));

export const Badge = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ theme, variant }) => ({
  padding: "4px 12px",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  backgroundColor:
    variant === "critical"
      ? theme.palette.error.lighter
      : variant === "warning"
        ? theme.palette.warning.lighter
        : variant === "info"
          ? theme.palette.info.lighter
          : variant === "success"
            ? theme.palette.success.lighter
            : theme.palette.grey[100],
  color:
    variant === "critical"
      ? theme.palette.error.main
      : variant === "warning"
        ? theme.palette.warning.dark
        : variant === "info"
          ? theme.palette.info.dark
          : variant === "success"
            ? theme.palette.success.dark
            : theme.palette.text.secondary,
}));

// Information Grid Section
export const InfoSection = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
}));

export const TriggerSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 5,
  backgroundColor: theme.palette.custom.triggerBackground,
  padding: 16,
  border: `1px solid ${theme.palette.custom.triggerBorder}`,
  borderRadius: 6,
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
  letterSpacing: 0.5,
  marginLeft: 12,
  marginTop: 8,
}));

export const TriggerSectionTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 16,
  fontWeight: 700,
  textTransform: "none",
  color: theme.palette.text.primary,
  letterSpacing: 0,
  marginLeft: 0,
  marginTop: "-25px",
}));

export const InfoGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 10,

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const TriggerInfoGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 0,
}));

export const InfoCard = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 0,
  background: "none",
  boxShadow: "none",
}));

export const TriggerInfoCard = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  padding: 12,
  paddingLeft: 0,
  background: "none",
  boxShadow: "none",
}));

export const InfoLabel = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 400,
  color: theme.palette.text.secondary,
  textTransform: "none",
  letterSpacing: 0,
}));

export const InfoValue = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const StatusBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 18px",
  borderRadius: 50,
  fontSize: 14,
  fontWeight: 700,
  backgroundColor: theme.palette.custom.statusBadgeBackground,
  color: theme.palette.custom.statusBadgeText,
  width: "fit-content",
}));

// Alert Card Title in List
export const AlertCardTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
}));

// Alert Detail Items
export const AlertDetailItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  color: theme.palette.text.secondary,
}));

export const AlertDetailRow = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
}));

// Alert Icon
export const AlertIcon = styled("img")({
  width: 16,
  height: 16,
  objectFit: "contain",
});

export const DetailAlertIcon = styled("img")({
  width: 24,
  height: 24,
  objectFit: "contain",
});

export const AlertIdIcon = styled("img")({
  width: 22,
  height: 22,
  objectFit: "contain",
});

// Alert Time
export const AlertTime = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 12,
  color: theme.palette.text.disabled,
}));

// Action Buttons Section
export const ActionSection = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 10,
  paddingTop: 16,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isResolve" && prop !== "isOpenChat" && prop !== "isAssignOperator",
})(({ theme, isResolve, isOpenChat, isAssignOperator }) => ({
  width: "100%",
  padding: "10px 16px",
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  backgroundColor: isResolve
    ? theme.palette.success.main
    : "transparent",
  color: isResolve
    ? theme.palette.common.white
    : isOpenChat || isAssignOperator
    ? theme.palette.custom.navyBlue
    : theme.palette.text.secondary,
  border: isResolve
    ? "none"
    : isOpenChat || isAssignOperator
    ? `1px solid ${theme.palette.custom.navyBlueBorder}`
    : `1px solid ${theme.palette.grey[200]}`,
  boxShadow: "none",

  "&:hover": isResolve
    ? { backgroundColor: theme.palette.success.dark }
    : isOpenChat || isAssignOperator
    ? { backgroundColor: "transparent" }
    : { backgroundColor: theme.palette.grey[100] },
  "&:active": isOpenChat || isAssignOperator ? { backgroundColor: "transparent" } : {},
  "&:focus": isOpenChat || isAssignOperator ? { backgroundColor: "transparent" } : {},
  "&.MuiButton-root": isOpenChat || isAssignOperator ? { backgroundColor: "transparent", "& *": { backgroundColor: "transparent !important" } } : {},
}));

export const LocationItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: theme.palette.text.secondary,
  flexWrap: "wrap",
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
}));

export const CoordinateBadge = styled(Box)(() => ({
  padding: "4px 8px",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 500,
  maxWidth: "100%",
  overflowWrap: "break-word",
  wordBreak: "break-word",
}));

export const AlertTopRow = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}));

export const AlertRight = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
}));

export const AlertStatus = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.error.main,
}));

export const AlertOpen = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "inProgress",
})(({ theme, inProgress }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: inProgress ? theme.palette.warning.main : theme.palette.primary.dark,
  cursor: "pointer",

  "&:hover": {
    textDecoration: "underline",
  },
}));

export const ELDTag = styled(Box)(({ theme }) => ({
  padding: "3px 10px",
  borderRadius: 8,
  background: theme.palette.custom.blueBadgeBackground,
  color: theme.palette.custom.navyBlue,
  fontSize: 12,
  fontWeight: 600,
  width: "fit-content",
  border: `1px solid ${theme.palette.custom.navyBlueBorder}`,
}));

export const LocationRow = styled(Box)(() => ({
  display: "flex",
  gap: "20px",
  marginTop: 10,
}));

// Alert Center Screen Header layout
export const AlertScreenHeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const AlertSummaryCardBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

// Add these to your existing styles file

export const DateSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  // backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
  marginTop: theme.spacing(2),
  // marginBottom: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const DateText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const DividerLine = styled(Box)(({ theme }) => ({
  height: 1,
  backgroundColor: theme.palette.divider,
  margin: `${theme.spacing(2)} 0`,
}));


export const MessageHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
}));


//---------------------------

export const ConversationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

export const ConversationMessage = styled(Box)(({ isCurrentUser }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: isCurrentUser ? "flex-end" : "flex-start",
  gap: "10px",
  width: "100%",
  marginBottom: "12px",
}));

export const AvatarCircle = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: theme.palette.error.main,
  color: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 600,
  fontSize: 14,
  flexShrink: 0,
}));

export const MessageBubble = styled(Box)(({ theme }) => ({
  maxWidth: "70%",
  padding: "12px 16px",
  borderRadius: "16px",
  border: `1px solid ${theme.palette.grey[300]}`,
  backgroundColor: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "6px",
}));

export const MessageContent = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: theme.palette.text.primary,
}));

export const Timestamp = styled("span")(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.secondary,
  whiteSpace: "nowrap",
}));

export const RightAvatar = styled("img")({
  width: 40,
  height: 40,
  borderRadius: "50%",
  objectFit: "cover",
  flexShrink: 0,
});

export const MessageText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
}));

export const ChatContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
}));

export const ChatHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  fontWeight: 600,
  fontSize: 16,
  color: theme.palette.text.primary,
}));

export const ChatMessages = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  "&::-webkit-scrollbar": { width: 4 },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.grey[300],
    borderRadius: 4,
  },
}));

export const CurrentUserBubble = styled(Box)(({ theme }) => ({
  maxWidth: "65%",
  padding: "10px 14px",
  borderRadius: "16px 4px 16px 16px",
  backgroundColor: theme.palette.custom.navyBlue,
  color: theme.palette.common.white,
  fontSize: 14,
  lineHeight: 1.3,
  alignSelf: "flex-end",
}));

export const OtherUserBubble = styled(Box)(({ theme }) => ({
  maxWidth: "65%",
  padding: "12px 16px",
  borderRadius: "16px 16px 16px 4px",
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,
  fontSize: 14,
  lineHeight: 1.5,
  alignSelf: "flex-start",
}));

export const ChatTimestamp = styled(Typography)(({ theme }) => ({
  fontSize: 11,
  color: theme.palette.text.disabled,
  marginTop: 4,
}));

export const ChatInputRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "12px 16px",
  borderTop: `1px solid ${theme.palette.grey[200]}`,
}));

export const ChatInput = styled("input")(({ theme }) => ({
  flex: 1,
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: 8,
  padding: "10px 14px",
  fontSize: 14,
  outline: "none",
  color: theme.palette.text.primary,
  "&::placeholder": { color: theme.palette.text.disabled },
}));

export const ChatSendButton = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 12,
  backgroundColor: theme.palette.custom.navyBlue,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  flexShrink: 0,
  "&:hover": { backgroundColor: theme.palette.custom.navyBlue },
}));

export const MessageContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "$isCurrentUser",
})(({ $isCurrentUser }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: $isCurrentUser ? "flex-end" : "flex-start",
}));

export const CurrentChatTimestamp = styled(ChatTimestamp, {
  shouldForwardProp: (prop) => prop !== "$isCurrentUser",
})(({ $isCurrentUser }) => ({
  textAlign: $isCurrentUser ? "right" : "left",
}));

export const ChatCloseButton = styled("button")(({ theme }) => ({
  background: "none",
  border: "none",
  fontSize: 20,
  cursor: "pointer",
  color: theme.palette.text.secondary,
  padding: "0 4px",
  lineHeight: 1,
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

// Styled components to replace sx prop usages
export const DetailsPanelWrapper = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const InfoSectionSpaced = styled(InfoSection)(() => ({
  marginTop: 24,
}));

export const ScrollableListBox = styled(Box)(() => ({
  maxHeight: 300,
  overflow: "auto",
}));

export const LocationItemSpaced = styled(LocationItem)(() => ({
  marginTop: 4,
}));

// MUI Component Wrappers to replace sx props
export const OperatorListItemButton = styled(ListItemButton)(() => ({
  borderRadius: 8,
  marginBottom: 4,
}));

export const OperatorRadio = styled(Radio)(() => ({
  marginRight: 8,
}));

export const TelegramIconStyled = styled(TelegramIcon)(() => ({
  fontSize: 20,
  color: "white",
}));

export const OperatorPrimaryText = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: 14,
}));

export const OperatorSecondaryText = styled(Typography)(() => ({
  fontSize: 12,
}));

export const PanelHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "7px 10px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const PanelTitle = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: 4,
}));

export const PanelBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  "& .MuiBreadcrumbs-separator": {
    color: theme.palette.text.disabled,
  },
}));

export const PanelBreadcrumbLink = styled(Link)(({ theme }) => ({
  fontSize: 13,
  fontWeight: 500,
  color: theme.palette.text.secondary,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const PanelBreadcrumbText = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const PanelDropdown = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  "& .MuiOutlinedInput-root": {
    fontSize: 13,
  },
}));

export const PanelDescription = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  marginTop: 8,
  lineHeight: 1.5,
}));

export const TriggerInformationTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 16,
  fontWeight: 700,
  textTransform: "none",
  color: theme.palette.text.primary,
  letterSpacing: 0,
  marginLeft: 0,
  marginTop: 0,
}));

export const NoDataContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "300px",
  width: "100%",
  fontSize: "18px",
  fontWeight: 500,
  borderRadius: "12px",
  padding: theme.spacing(3),
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 16px",
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export const PaginationText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    borderRadius: "6px",
    minWidth: "32px",
    height: "32px",
    fontSize: "13px",
    color: theme.palette.text.primary,
  },

  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: theme.palette.brand.main, 
    color: theme.palette.common.white,
    fontWeight: 600,
  },

  "& .MuiPaginationItem-page.Mui-selected:hover": {
    backgroundColor: theme.palette.brand.dark,
  },

  "& .MuiPaginationItem-previousNext": {
    backgroundColor: theme.palette.grey[100],
    borderRadius: "6px",
    border: `1px solid ${theme.palette.divider}`,
  },

  "& .MuiPaginationItem-previousNext:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));