import React, { useState, useCallback } from "react";
import CommonConfirmDialog from "../../common/CommonConfirmDialog";
// import CommonConfirmDialog from "../common/CommonConfirmDialog";

const useUnsavedChangesDialog = (onDiscard, onCancel) => {
  const [open, setOpen] = useState(false);

  const handleCancel = useCallback(
    (hasChanges) => {
      if (hasChanges) {
        setOpen(true);
      } else {
        onDiscard();
      }
    },
    [onDiscard],
  );

  const handleConfirm = useCallback(() => {
    setOpen(false);
    onDiscard();
  }, [onDiscard]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onCancel?.();
  }, [onCancel]);

  const UnsavedChangesDialog = (
    <CommonConfirmDialog
      open={open}
      title="Unsaved Changes"
      message="You have unsaved changes. Are you sure you want to cancel the edit?"
      confirmText="Yes, Cancel"
      cancelText="No, Keep Editing"
      onConfirm={handleConfirm}
      onCancel={handleClose}
    />
  );

  return {
    handleCancel,
    UnsavedChangesDialog,
  };
};

export default useUnsavedChangesDialog;
