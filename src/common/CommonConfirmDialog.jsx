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
  DialogBackdropSx,
  ReasonTextFieldSx,
} from "./CommonConfirmDialog.styled";
import { useEffect, useState } from "react";

const CommonConfirmDialog = ({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  showReasonField = false,
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
      BackdropProps={{
        sx: DialogBackdropSx,
      }}
    >
      <DialogTitle fontSize={16}>
        <strong>{title}</strong>
      </DialogTitle>

      <DialogContent>
        <Typography sx={MessageTypographySx}>
          <strong>{message}</strong>
        </Typography>

        {showReasonField && (
          <TextField
            fullWidth
            multiline
            minRows={3}
            margin="normal"
            label="Reason for Deactivation"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
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
          color="error"
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