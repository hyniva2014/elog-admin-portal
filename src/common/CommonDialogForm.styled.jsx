import { COLORS } from "../components/compliance/DeviceAssetManagement/DeviceAssetManagement.styles";

export const dialogStyles = (theme) => ({
  paper: {
    borderRadius: theme.spacing(1.25),
    width: "100%",
    position: "relative",
  },

  loaderWrapper: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    borderRadius: theme.spacing(0.375),
  },

  loader: {
    color: theme.palette.primary.main,
  },

  title: {
    backgroundColor: theme.palette.background.default,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },

  headerActions: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },

  closeButton: {
    color: theme.palette.grey[700],
  },

  dialogActions: {
    justifyContent: "center",
    gap: theme.spacing(2),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },

  cancelButton: {
    fontSize: 16,
    fontWeight: 400,
    color: theme.palette.primary.main,
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
  },

  submitButton: {
    fontSize: 16,
    fontWeight: 400,
    color: theme.palette.common.white,
    backgroundColor: COLORS.primary,
    borderRadius: theme.spacing(0.5),
    borderColor: COLORS.primary,
  },
});

export const DIALOG_MODES = {
  ADD: "add",
  EDIT: "edit",
};

export const BUTTON_LABELS = {
  SAVE: "Save",
  UPDATE: "Update",
  SAVING: "Saving...",
  CANCEL: "Cancel",
};

export const DialogPaperSx = (theme) => ({
  background: theme.palette.background.paper,
  borderRadius: "14px",
  boxShadow: theme.shadows[5],
});

export const DialogBackdropSx = (theme) => ({
  backgroundColor: theme.palette.action.backdrop || "rgba(0, 0, 0, 0.7)",
});