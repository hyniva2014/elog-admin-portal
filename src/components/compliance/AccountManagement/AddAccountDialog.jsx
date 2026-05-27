import React, { useCallback, useEffect, useMemo } from "react";
import { Divider, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CommonDialogForm from "../../../common/CommonDialogForm";
import {
  DialogFormContainer,
  PrimarySectionHeader,
  SecondarySectionHeader,
  EditButton,
  CancelEditButton,
} from "./AccountManagement.styled";

import { STATUS_OPTIONS, ACCOUNT_FORM_FIELDS, PRIMARY_CONTACT_FIELDS, SECONDARY_CONTACT_FIELDS } from "./Constants";
import FormSelect from "./FormSelect";
import FormFieldsSection from "./FormFieldsSection";

const ADD_ACCOUNT_FORM_ID = "add-account-form";

const validationSchema = yup.object({
  carrierName: yup
    .string()
    .required("Carrier Name is required")
    .min(2, "Carrier Name must be at least 2 characters")
    .max(100, "Carrier Name must not exceed 100 characters"),
  usdot: yup
    .string()
    .required("USDOT Number is required")
    .matches(/^\d{6,8}$/, "USDOT Number must be 6-8 digits"),
  taxId: yup
    .string()
    .required("Tax ID (EIN) is required")
    .matches(/^\d{2}-\d{7}$/, "Tax ID (EIN) must be in format XX-XXXXXXX"),
  mcNumber: yup
    .string()
    .required("MC Number is required")
    .matches(/^(MC-?\d{6,8}|\d{6,8})$/, "MC Number must be 6-8 digits (e.g., 123456, MC123456, or MC-123456)"),
  maxDevices: yup
    .number()
    .typeError("Max Devices must be a number")
    .required("Max Devices is required")
    .positive("Max Devices must be greater than 0")
    .integer("Max Devices must be a whole number"),
  website: yup
    .string()
    .test(
      "website",
      "Please enter a valid website URL (e.g., example.com, www.example.com, https://example.com)",
      (value) => {
        if (!value) return true;
        try {
          const urlToTest = value.startsWith('http://') || value.startsWith('https://') 
            ? value 
            : `http://${value}`;
          const url = new URL(urlToTest);
          return url.hostname && url.hostname.includes('.');
        } catch {
          return false;
        }
      }
    )
    .nullable(),
  tollFree: yup
    .string()
    .required("Toll Free is required")
    .matches(
      /^(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
      "Please enter a valid phone number",
    ),
  fax: yup
    .string()
    .required("Fax is required")
    .matches(
      /^(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
      "Please enter a valid fax number",
    ),
  carrierAddress: yup
    .string()
    .required("Carrier Address is required")
    .min(5, "Address must be at least 5 characters"),
  primaryContactName: yup
    .string()
    .required("Primary Contact Name is required")
    .min(2, "Name must be at least 2 characters"),
  primaryContactNumber: yup
    .string()
    .required("Primary Contact Number is required")
    .matches(
      /^(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
      "Please enter a valid phone number (e.g., +1 (555) 123-4567)",
    ),
  primaryContactEmail: yup
    .string()
    .required("Primary Contact Email is required")
    .email("Please enter a valid email address (e.g., user@example.com)"),
  secondaryContactName: yup
    .string()
    .required("Secondary Contact Name is required")
    .min(2, "Name must be at least 2 characters"),
  secondaryContactNumber: yup
    .string()
    .required("Secondary Contact Number is required")
    .matches(
      /^(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
      "Please enter a valid phone number (e.g., +1 (555) 123-4567)",
    ),
  secondaryContactEmail: yup
    .string()
    .required("Secondary Contact Email is required")
    .email("Please enter a valid email address (e.g., user@example.com)"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["1", "2"], "Status must be Active or Inactive"),
});

const defaultValues = {
  carrierName: "",
  usdot: "",
  taxId: "",
  mcNumber: "",
  maxDevices: "",
  website: "",
  tollFree: "",
  fax: "",
  carrierAddress: "",
  primaryContactName: "",
  primaryContactNumber: "",
  primaryContactEmail: "",
  secondaryContactName: "",
  secondaryContactNumber: "",
  secondaryContactEmail: "",
  status: "1",
};

const DIALOG_TITLES = {
  view: "View Account",
  edit: "Edit Account",
  add: "Add New Account",
};

const AddAccountDialog = ({ open, onClose, onSubmit, loading = false, mode = "add", initialData = null, onEditClick, onCancelEdit }) => {
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const isFieldDisabled = loading || isViewMode;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
    } else if (initialData) {
      reset(initialData);
    }
  }, [open, reset, initialData]);

  const shouldShowStatusField = mode !== "add";
  const submitButtonText = isEditMode ? "Update" : "Save";
  const dialogTitle = DIALOG_TITLES[mode] ?? DIALOG_TITLES.add;

  const handleCancel = useCallback(() => {
    reset(defaultValues);
    onClose();
  }, [reset, onClose]);

  const submitHandler = useCallback(
    (data) => {
      onSubmit({
        ...data,
        maxDevices: Number(data.maxDevices),
        companyId: initialData?.companyId,
      });
      reset(defaultValues);
    },
    [onSubmit, initialData, reset]
  );

  const headerActions = useMemo(() => {
    if (isViewMode && onEditClick) {
      return (
        <EditButton variant="contained" onClick={onEditClick} disabled={loading}>
          Edit
        </EditButton>
      );
    }
    if (isEditMode && onCancelEdit) {
      return (
        <CancelEditButton variant="outlined" onClick={onCancelEdit} disabled={loading}>
          Cancel Edit
        </CancelEditButton>
      );
    }
    return null;
  }, [isViewMode, isEditMode, onEditClick, onCancelEdit, loading]);

  const contentWithActions = useMemo(
    () => (
      <>
        <form id={ADD_ACCOUNT_FORM_ID} onSubmit={handleSubmit(submitHandler)}>
          <DialogFormContainer>
            <Grid container spacing={2}>
              <FormFieldsSection
                fields={ACCOUNT_FORM_FIELDS}
                control={control}
                errors={errors}
                disabled={isFieldDisabled}
              />

              {shouldShowStatusField && (
                <FormSelect
                  name="status"
                  label="Status"
                  control={control}
                  errors={errors}
                  disabled={isFieldDisabled}
                  required
                  options={STATUS_OPTIONS}
                />
              )}

              <Grid item xs={12}>
                <PrimarySectionHeader>PRIMARY DETAILS</PrimarySectionHeader>
                <Divider />
              </Grid>

              <FormFieldsSection
                fields={PRIMARY_CONTACT_FIELDS}
                control={control}
                errors={errors}
                disabled={isFieldDisabled}
              />

              <Grid item xs={12}>
                <SecondarySectionHeader>SECONDARY DETAILS</SecondarySectionHeader>
                <Divider />
              </Grid>

              <FormFieldsSection
                fields={SECONDARY_CONTACT_FIELDS}
                control={control}
                errors={errors}
                disabled={isFieldDisabled}
              />
            </Grid>
          </DialogFormContainer>
        </form>

       
      </>
    ),
    [control, errors, isFieldDisabled, shouldShowStatusField]
  );

  return (
    <CommonDialogForm
      open={open}
      title={dialogTitle}
      content={contentWithActions}
      formId={ADD_ACCOUNT_FORM_ID}
      onCancel={handleCancel}
      onSubmit={handleSubmit(submitHandler)}
      loading={loading}
      maxWidth="md"
      headerActions={headerActions}
      mode={isViewMode ? "view" : isEditMode ? "edit" : "add"}
      key={mode}
    />
  );
};

export default AddAccountDialog;
