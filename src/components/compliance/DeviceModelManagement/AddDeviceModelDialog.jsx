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
  title,
  mode,
  submitButtonText,
}) => {
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
      mode={mode}
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
