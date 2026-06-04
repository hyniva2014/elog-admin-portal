import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import {
  DialogActionsSx,
  ActionButtonSx,
  MessageTypographySx,
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

  useEffect(() => {
    if (!open) {
      setReason("");
    }
  }, [open]);

  const handleConfirm = () => {
    onConfirm(reason);
    setReason("");
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography sx={MessageTypographySx}>{message}</Typography>

        {showReasonField && (
          <TextField
            fullWidth
            multiline
            minRows={3}
            margin="normal"
            label="Reason for Deactivation"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
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
