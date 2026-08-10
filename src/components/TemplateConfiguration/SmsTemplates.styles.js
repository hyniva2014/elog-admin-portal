import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Avatar,
  Skeleton,
  IconButton,
  FormControl,
  Select,
} from "@mui/material";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Constants & Config                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */

export const STATUS_COLORS = {
  Active: { bg: "#dcfce7", text: "#15803d" },
  Draft: { bg: "#fef9c3", text: "#854d0e" },
  Inactive: { bg: "#fee2e2", text: "#991b1b" },
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  App Main Layout                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */

export const AppContainer = styled(Box)(() => ({
  display: "flex",
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
}));

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Left Panel (Sidebar)                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export const LeftPanel = styled(Box)(({ theme }) => ({
  width: 268,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#fafbfc",
}));

export const SidebarHeaderWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(1.5),
}));

export const SidebarHeaderTitleRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1.5),
}));

export const SidebarHeaderCount = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(0.75),
}));

export const SidebarHeaderIconsRow = styled(Box)(() => ({
  display: "flex",
  gap: "4px",
}));

export const SidebarSearchField = styled(TextField)(() => ({
  width: "100%",
  "& .MuiInputBase-root": {
    fontSize: 13,
    borderRadius: 6,
  },
}));

export const SidebarSelectFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: "100%",
}));

export const SidebarSelectField = styled(Select)(() => ({
  fontSize: 13,
  borderRadius: 6,
}));

export const SidebarListContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

export const SidebarEmptyContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

export const SidebarFooterWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
}));

export const SidebarCreateButton = styled(Button)(() => ({
  borderRadius: 6,
  fontSize: 13,
  fontWeight: 600,
}));

export const StyledListItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  padding: theme.spacing(1.5, 2),
  cursor: "pointer",
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  borderRadius: 6,
  border: "1px solid",
  borderColor: selected ? theme.palette.primary.main : "transparent",
  backgroundColor: selected
    ? alpha(theme.palette.primary.main, 0.07)
    : "transparent",
  "&:hover": {
    backgroundColor: selected
      ? alpha(theme.palette.primary.main, 0.1)
      : alpha(theme.palette.grey[500], 0.06),
  },
  transition: "all 0.15s ease",
}));

export const SidebarListItemAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  width: 32,
  height: 32,
  backgroundColor: selected
    ? theme.palette.primary.main
    : alpha(theme.palette.grey[500], 0.12),
  color: selected ? "#ffffff" : theme.palette.text.secondary,
}));

export const SidebarListItemChip = styled(Chip)(() => ({
  height: 18,
  fontSize: "10px",
  fontWeight: 600,
  borderRadius: "4px",
  flexShrink: 0,
}));

export const SidebarListItemText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  color: selected ? theme.palette.primary.main : theme.palette.text.primary,
}));

export const SidebarListItemSub = styled(Typography)(({ theme }) => ({
  fontSize: 11,
  color: theme.palette.text.disabled,
  marginTop: 2,
  display: "block",
}));

export const SidebarSkeletonRow = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
}));

export const SkeletonCircle = styled(Skeleton)(() => ({
  flexShrink: 0,
}));

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Middle Panel (Editor)                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

export const EditorPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRight: "1px solid",
  borderColor: theme.palette.divider,
}));

export const EditorHeaderWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(2.5),
  paddingBottom: theme.spacing(1.5),
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
}));

export const EditorContentContainer = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  flex: 1,
  overflow: "auto",
}));

export const EditorFieldWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const EditorInputField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    fontSize: 13,
    borderRadius: 6,
  },
}));

export const EditorBodyLabelRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(0.5),
}));

export const EditorVariablesContainer = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
}));

export const EditorVariableChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "isDark",
})(({ theme, isDark }) => ({
  height: 22,
  fontSize: "11px",
  fontFamily: "monospace",
  backgroundColor: isDark ? alpha("#3e60d5", 0.15) : "#eff6ff",
  color: isDark ? "#93c5fd" : "#1d4ed8",
  border: "1px solid",
  borderColor: isDark ? alpha("#3e60d5", 0.3) : "#bfdbfe",
  "&:hover": {
    backgroundColor: isDark ? alpha("#3e60d5", 0.25) : "#dbeafe",
  },
}));

export const EditorActionBarWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderTop: "1px solid",
  borderColor: theme.palette.divider,
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(1),
}));

export const EditorActionBarButton = styled(Button)(() => ({
  borderRadius: 6,
  fontSize: 13,
}));

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Right Panel (Phone Preview)                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

export const PreviewPanel = styled(Box)(() => ({
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

export const PreviewHeaderWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(1.5),
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const PreviewHeaderTitleRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.75),
}));

export const PreviewHeaderGripIcon = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "default",
}));

export const PreviewHeaderActionsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.75),
}));

export const PreviewDeviceButtonGroup = styled(Box)(({ theme }) => ({
  "& .MuiToggleButton-root": {
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(0.75),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export const PreviewThemeIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "isDarkPreview",
})(({ theme, isDarkPreview }) => ({
  backgroundColor: isDarkPreview
    ? "#1a2b5a"
    : alpha(theme.palette.grey[500], 0.1),
  "&:hover": {
    backgroundColor: isDarkPreview
      ? "#1e3370"
      : alpha(theme.palette.grey[500], 0.18),
  },
}));

export const PreviewExpandIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[500], 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[500], 0.2),
  },
}));

export const PreviewSmsToWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
}));

export const PreviewSmsField = styled(TextField)(() => ({
  width: "100%",
  "& .MuiInputBase-root": {
    fontSize: 13,
    borderRadius: 6,
  },
}));

export const PreviewContentArea = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDarkPreview",
})(({ theme, isDarkPreview }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(5, 3, 3, 3),
  backgroundColor: isDarkPreview ? "#0f1117" : "#eef0f5",
  transition: "background-color 0.15s ease",
  overflowY: "auto",
}));

export const PhoneFrame = styled(Box, {
  shouldForwardProp: (prop) => prop !== "previewDevice",
})(({ previewDevice }) => ({
  width: previewDevice === "tablet" ? 380 : 240,
  backgroundColor: "#1a1a2e",
  borderRadius: 16,
  padding: 12,
  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
  transition: "width 0.3s ease",
}));

export const PhoneStatusBar = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  paddingLeft: 8,
  paddingRight: 8,
  paddingBottom: 8,
}));

export const PhoneStatusBarText = styled(Typography)(() => ({
  color: "rgba(255,255,255,0.7)",
  fontSize: 10,
}));

export const PhoneMessageThread = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDarkPreview",
})(({ theme, isDarkPreview }) => ({
  backgroundColor: isDarkPreview ? "#2e2e38" : "#f2f2f7",
  borderRadius: 10,
  padding: 12,
  minHeight: 200,
  transition: "background-color 0.15s ease",
}));

export const PhoneMessageSender = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isDarkPreview",
})(({ theme, isDarkPreview }) => ({
  fontSize: 11,
  color: isDarkPreview ? "#b3b3b8" : "#8e8e93",
  textAlign: "center",
  marginBottom: 8,
}));

export const PhoneBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDarkPreview",
})(({ theme, isDarkPreview }) => ({
  backgroundColor: isDarkPreview ? "#3a3a4c" : "#e9e9eb",
  borderRadius: "16px 16px 16px 4px",
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 8,
  paddingBottom: 8,
  maxWidth: "90%",
  transition: "background-color 0.15s ease",
}));

export const PhoneBubbleText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isDarkPreview",
})(({ theme, isDarkPreview }) => ({
  fontSize: 12,
  color: isDarkPreview ? "#fff" : "#000",
  lineHeight: 1.5,
}));

export const PhoneDeliveredText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isDarkPreview",
})(({ theme, isDarkPreview }) => ({
  fontSize: 10,
  color: isDarkPreview ? "#b3b3b8" : "#8e8e93",
  marginTop: 4,
}));

export const PreviewVariablesWrapper = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}));

export const PreviewVariablesHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
}));

export const PreviewVariablesContainer = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
}));

export const PreviewVariableChip = styled(Chip)(({ theme }) => ({
  height: 22,
  fontSize: "11px",
  fontFamily: "monospace",
  backgroundColor:
    theme.palette.mode === "dark" ? alpha("#3e60d5", 0.15) : "#eff6ff",
  color: theme.palette.mode === "dark" ? "#93c5fd" : "#1d4ed8",
  border: "1px solid",
  borderColor:
    theme.palette.mode === "dark" ? alpha("#3e60d5", 0.3) : "#bfdbfe",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? alpha("#3e60d5", 0.25) : "#dbeafe",
  },
}));

export const PreviewVariableChipMore = styled(Chip)(() => ({
  height: 22,
  fontSize: "11px",
  color: "text.secondary",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.08)",
  },
}));

export const DragHandle = styled(Box)(({ theme }) => ({
  width: 6,
  flexShrink: 0,
  cursor: "ew-resize",
  position: "relative",
  backgroundColor: theme.palette.divider,
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.15s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "&:hover .grip-dots": {
    opacity: 1,
  },
  "&:active": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const DragHandleDotsContainer = styled(Box)(() => ({
  opacity: 0.3,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  transition: "opacity 0.15s",
}));

export const DragHandleDot = styled(Box)(({ theme }) => ({
  width: 3,
  height: 3,
  borderRadius: "50%",
  backgroundColor: theme.palette.background.paper,
}));

export const DialogHeaderRow = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const DialogScrollArea = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDarkPreview",
})(({ theme, isDarkPreview }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(3),
  backgroundColor: isDarkPreview ? "#0f1117" : "#eef0f5",
}));

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Create Dialog Layout                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export const CreateDialogHeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
}));

export const CreateDialogLogoWrapper = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
}));

export const CreateDialogContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const CreateDialogActionsWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  gap: theme.spacing(1),
  display: "flex",
  justifyContent: "flex-end",
}));

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Flex & general layout utilities                                            */
/* ─────────────────────────────────────────────────────────────────────────── */

export const FlexRowGap = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

export const FlexFill = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
}));

export const FlexRowAlignStart = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: theme.spacing(1.5),
}));

export const FlexRowSpaceBetweenGap = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(1),
}));
