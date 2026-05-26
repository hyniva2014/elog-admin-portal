import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import {
  dialogStyles,
  DIALOG_MODES,
  BUTTON_LABELS,
} from "./CommonDialogForm.styled";

const CommonDialogForm = ({
  open,
  title,
  content,
  formId,
  onSubmit,
  onCancel,
  onClose,
  mode = DIALOG_MODES.ADD,
  loading = false,
  submitButtonText,
  maxWidth = "sm",
  headerActions,
  isEditing = false,
}) => {
  const theme = useTheme();
  const styles = dialogStyles(theme);

  const isEditMode = mode === DIALOG_MODES.EDIT;

  const shouldShowActions =
    mode === DIALOG_MODES.ADD || mode === DIALOG_MODES.EDIT || isEditing;

  const handleDialogClose = () => {
    if (loading) {
      return;
    }

    const closeHandler = onClose || onCancel;

    closeHandler?.();
  };

  const handleBackdropClose = (_, reason) => {
    if (reason === "backdropClick") {
      return;
    }

    handleDialogClose();
  };

  const dialogTitle = title || (isEditMode ? "Edit Item" : "Add Item");

  const submitLabel =
    submitButtonText ||
    (loading
      ? BUTTON_LABELS.SAVING
      : isEditMode
        ? BUTTON_LABELS.UPDATE
        : BUTTON_LABELS.SAVE);

  const dialogContent =
    typeof content === "string" ? (
      <Typography color="text.secondary">{content}</Typography>
    ) : (
      content
    );

  const dialogActions = shouldShowActions ? (
    <DialogActions sx={styles.dialogActions}>
      <Button
        variant="outlined"
        onClick={onCancel}
        fullWidth
        disabled={loading}
        sx={styles.cancelButton}
      >
        {BUTTON_LABELS.CANCEL}
      </Button>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        form={formId}
        onClick={onSubmit}
        disabled={loading}
        sx={styles.submitButton}
      >
        {submitLabel}
      </Button>
    </DialogActions>
  ) : null;

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      onClose={handleBackdropClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: styles.paper,
      }}
    >
      <DialogTitle sx={styles.title}>
        <Typography variant="inherit" sx={styles.titleText}>
          {dialogTitle}
        </Typography>

        <Box sx={styles.headerActions}>
          {headerActions}

          <IconButton
            onClick={handleDialogClose}
            disabled={loading}
            sx={styles.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>{dialogContent}</DialogContent>

      {dialogActions}
    </Dialog>
  );
};

export default CommonDialogForm;
