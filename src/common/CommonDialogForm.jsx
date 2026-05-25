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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CommonDialogForm = ({
  open,
  title,
  content,
  formId,
  onSubmit,
  onCancel,
  onClose,
  mode = "add",
  loading = false,
  submitButtonText,
  maxWidth = "sm",
  headerActions,
  isEditing,
}) => {
  const isEdit = mode === "edit";
  const handleClose = onClose ?? onCancel;

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          width: "100%",
          color: "#FFFFFF",
          position: "relative",
        },
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            borderRadius: 3,
          }}
        >
          <CircularProgress size={40} sx={{ color: "#284495" }} />
        </Box>
      )}
      <DialogTitle
        sx={{
          backgroundColor: "#F3F8FF",
        }}
      >
        <Typography
          variant="inherit"
          fontSize={20}
          fontWeight={500}
          color="#2C2D33"
        >
          {title || (isEdit ? "Edit Item" : "Add Item")}
        </Typography>

        <Box
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {headerActions}
          <IconButton
            onClick={loading ? undefined : handleClose}
            sx={{
              color: "#343741",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {typeof content === "string" ? (
          <Typography color="text.secondary">{content}</Typography>
        ) : (
          content
        )}
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
          px: 6,
          pb: 3,
        }}
      >
        {submitButtonText !== null && (
          <>
            <Button
              variant="outlined"
              onClick={loading ? undefined : onCancel}
              fullWidth
              disabled={loading}
              sx={{
                fontSize: 16,
                fontWeight: 400,
                color: "#284495",
                border: 1,
                borderRadius: 2,
                borderColor: "#284495",
                backgroundColor: "#FFFFFF",
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              form={formId}
              onClick={onSubmit}
              disabled={loading}
              sx={{
                fontSize: 16,
                fontWeight: 400,
                color: "#FFFFFF",
                backgroundColor: "#284495",
                border: 1,
                borderRadius: 2,
                borderColor: "#284495",
              }}
            >
              {submitButtonText
                ? submitButtonText
                : loading
                  ? "Saving..."
                  : isEdit
                    ? "Update"
                    : "Save"}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialogForm;
