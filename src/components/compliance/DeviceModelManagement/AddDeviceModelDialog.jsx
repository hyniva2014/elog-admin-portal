import React from "react";
import CommonDialogForm from "@src/common/CommonDialogForm";
import AddDeviceModelForm, { ADD_DEVICE_MODEL_FORM_ID } from "./AddDeviceModelForm";

const AddDeviceModelDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  isEditMode = false,
  isEditing = false,
  defaultValues,
  headerActions,
}) => {
  const title = isEditMode ? "View Device Model" : "Add Device Model";
  const submitButtonText = isEditMode ? (isEditing ? "Update" : "Save") : "Add Device";
  const dialogMode = isEditMode ? "edit" : "add";
  const formKey = defaultValues ? `${defaultValues.modelName}|${defaultValues.assetType}` : "new";

  return (
    <CommonDialogForm
      open={open}
      title={title}
      formId={ADD_DEVICE_MODEL_FORM_ID}
      onCancel={onClose}
      loading={loading}
      submitButtonText={submitButtonText}
      maxWidth="sm"
      headerActions={headerActions}
      mode={dialogMode}
      isEditing={isEditing}
      content={
        <AddDeviceModelForm
          key={formKey}
          formId={ADD_DEVICE_MODEL_FORM_ID}
          defaultValues={defaultValues}
          isEditing={isEditing}
          isEditMode={isEditMode}
          loading={loading}
          onSubmit={onSubmit}
        />
      }
    />
  );
};

export default AddDeviceModelDialog;
