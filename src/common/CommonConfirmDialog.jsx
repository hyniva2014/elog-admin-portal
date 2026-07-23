import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import {
  DialogActionsSx,
  ActionButtonSx,
  MessageTypographySx,
  DialogPaperSx,
  ReasonTextFieldSx,
} from "./CommonConfirmDialog.styled";
import { useEffect, useState } from "react";

const CommonConfirmDialog = ({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "OK",
  cancelText = "Cancel",
  confirmColor = "error",
  onConfirm,
  onCancel,
  showReasonField = false,
  reasonLabel = "Reason for Deactivation",
  customContent = null,
}) => {
  const [reason, setReason] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (!open) {
      setReason("");
    }
  }, [open]);

  const handleConfirm = () => {
    onConfirm(reason);
    setReason("");
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleDialogClose = (event, reason) => {
    if (reason === "backdropClick") {
      return; // Prevent closing on outside click
    }

    onCancel?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: DialogPaperSx(theme),
      }}
      hideBackdrop={false}
    >
      <DialogTitle fontSize={16}>
        <strong>{title}</strong>
      </DialogTitle>

      <DialogContent>
        <Typography sx={MessageTypographySx}>
          <strong>{message}</strong>
        </Typography>

        {customContent}

        {showReasonField && (
          <TextField
            fullWidth
            multiline
            minRows={3}
            margin="normal"
            label={reasonLabel}
            value={reason}
            onChange={handleReasonChange}
            sx={ReasonTextFieldSx}
          />
        )}
      </DialogContent>

      <DialogActions sx={DialogActionsSx}>
        <Button variant="outlined" onClick={onCancel} sx={ActionButtonSx}>
          {cancelText}
        </Button>

        <Button
          variant="contained"
          color={confirmColor}
          onClick={handleConfirm}
          sx={ActionButtonSx}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonConfirmDialog;