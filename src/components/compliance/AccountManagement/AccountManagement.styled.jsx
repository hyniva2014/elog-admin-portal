import { Box, Button, DialogActions, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HeaderContainer = styled(Box)(() => ({
  marginBottom: 16,
}));

export const AddAccountButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.brand.main,
  textTransform: "none",
  fontWeight: 600,
  minWidth: 102,
  height: 36,
  "&:hover": {
    backgroundColor: theme.palette.brand.dark,
  },
}));

export const GridContainer = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
}));

export const StatusText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "accountStatus",
})(({ accountStatus, theme }) => {
  const getStatusColor = () => {
    switch (accountStatus) {
      case "Active":
        return theme.palette.success.main;
      case "Suspended":
        return theme.palette.warning.main;
      case "Inactive":
      default:
        return theme.palette.error.main;
    }
  };

  return {
    color: getStatusColor(),
    fontSize: 13,
    fontWeight: 400,
  };
});

const TRI_SWITCH_WIDTH = 42;
const TRI_SWITCH_HEIGHT = 16;
const TRI_THUMB_SIZE = 12;
const TRI_THUMB_GAP = 2;

const getTrackColor = (status, theme) => {
  switch (status) {
    case "Active":
      return theme.palette.success.main;
    case "Suspended":
      return theme.palette.warning.main;
    case "Inactive":
    default:
      return theme.palette.error.main;
  }
};

const getThumbOffset = (status) => {
  switch (status) {
    case "Active":
      return TRI_SWITCH_WIDTH - TRI_THUMB_SIZE - TRI_THUMB_GAP;
    case "Suspended":
    case "Inactive":
    default:
      return TRI_THUMB_GAP;
  }
};

export const TriSwitchTrack = styled(Box, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status, theme }) => ({
  position: "relative",
  width: TRI_SWITCH_WIDTH,
  height: TRI_SWITCH_HEIGHT,
  borderRadius: 999,
  cursor: "pointer",
  flexShrink: 0,
  backgroundColor: getTrackColor(status, theme),
  transition: "background-color 0.25s ease",
  display: "flex",
}));

export const TriSwitchThumb = styled(Box, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status, theme }) => ({
  position: "absolute",
  top: TRI_THUMB_GAP,
  left: getThumbOffset(status),
  width: TRI_THUMB_SIZE,
  height: TRI_THUMB_SIZE,
  borderRadius: "50%",
  backgroundColor: theme.palette.common.white,
  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
  transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
}));

export const TriSwitchZone = styled(Box)(() => ({
  flex: 1,
  height: "100%",
  zIndex: 1,
}));

export const AddressCellText = styled(Typography)(() => ({
  fontSize: 13,
  whiteSpace: "normal",
  lineHeight: 1.35,
}));

export const actionIconSx = {
  fontSize: 18,
  color: "text.secondary",
};

export const StatusDropdownContainer = styled(Box)(() => ({
  marginTop: 16,
  marginBottom: 16,
}));

export const DialogFormContainer = styled(Box)(() => ({
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 24,
  paddingBottom: 8,
}));

export const SectionHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: 8,
}));

export const PrimarySectionHeader = styled(SectionHeaderText)(() => ({
  marginTop: 0.5,
}));

export const SecondarySectionHeader = styled(SectionHeaderText)(() => ({
  marginTop: 1,
}));

export const EditButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const CancelEditButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
}));

export const DialogFormActionsContainer = styled(DialogActions)({
  justifyContent: "center",
  gap: 16,
  paddingLeft: 48,
  paddingRight: 48,
  paddingBottom: 24,
});

export const DialogCancelButton = styled(Button)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 8,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const DialogSubmitButton = styled(Button)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 8,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
