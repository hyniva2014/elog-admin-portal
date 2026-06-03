import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import {
  DialogActionsSx,
  ActionButtonSx,
  MessageTypographySx,
} from "./CommonConfirmDialog.styled";

const CommonConfirmDialog = ({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogTitle>{title}</DialogTitle>

    <DialogContent>
      <Typography sx={MessageTypographySx}>{message}</Typography>
    </DialogContent>

    <DialogActions sx={DialogActionsSx}>
      <Button variant="outlined" onClick={onCancel} sx={ActionButtonSx}>
        {cancelText}
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={onConfirm}
        sx={ActionButtonSx}
      >
        {confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);

export default CommonConfirmDialog;
