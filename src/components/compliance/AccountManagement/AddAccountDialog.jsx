import React, { useEffect } from "react";
import { Divider, Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonTextField from "../../../common/CommonTextField";
import { DialogFormContainer, PrimarySectionHeader, SecondarySectionHeader, EditButton, CancelEditButton } from "./AccountManagement.styled";

import { formatTaxId, formatPhoneNumber } from "./utils";
import { STATUS_OPTIONS } from "./Constants";

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
    .number()
    .required("Status is required")
    .oneOf([1, 2], "Status must be Active or Inactive"),
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
  status: 1,
};

const createFormatChangeHandler = (field, formatter) => (event) => {
  field.onChange(formatter(event.target.value));
};

const AddAccountDialog = ({ open, onClose, onSubmit, loading = false, mode = "add", initialData = null, onEditClick, onCancelEdit }) => {
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData || defaultValues,
  });

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
    } else if (initialData) {
      reset(initialData);
    }
  }, [open, reset, initialData]);

  useEffect(() => {
    const hideButtons = () => {
      const dialogActions = document.querySelector('.MuiDialogActions-root');
      if (dialogActions) {
        if (isViewMode) {
          dialogActions.style.display = 'none';
        } else {
          dialogActions.style.display = 'flex';
        }
      }
    };

    if (open) {
      hideButtons();
      const observer = new MutationObserver(hideButtons);
      observer.observe(document.body, { childList: true, subtree: true });
      return () => observer.disconnect();
    }
  }, [open, isViewMode]);

  const handleCancel = () => {
    if (isViewMode) {
      onClose();
    } else {
      reset(defaultValues);
      onClose();
    }
  };

  const submitHandler = (data) => {
    onSubmit({
      ...data,
      maxDevices: Number(data.maxDevices),
      companyId: initialData?.companyId,
    });

    reset(defaultValues);
  };

  const formContent = (
    <form id={ADD_ACCOUNT_FORM_ID} onSubmit={handleSubmit(submitHandler)}>
      <DialogFormContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="carrierName"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Carrier Name"
                  required
                  disabled={loading || isViewMode}
                  error={!!errors.carrierName}
                  helperText={errors.carrierName?.message}
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="carrierAddress"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Carrier Address"
                  required
                  disabled={loading || isViewMode}
                  error={!!errors.carrierAddress}
                  helperText={errors.carrierAddress?.message}
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="usdot"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="USDOT Number"
                  required
    disabled={loading || isViewMode}
                  error={!!errors.usdot}
                  helperText={errors.usdot?.message}
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="taxId"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Tax ID (EIN)"
                  required
    disabled={loading || isViewMode}
                  error={!!errors.taxId}
                  helperText={errors.taxId?.message}
                  fullWidth
                  size="small"
                  placeholder="XX-XXXXXXX"
                  onChange={createFormatChangeHandler(field, formatTaxId)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="mcNumber"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="MC Number"
                  required
    disabled={loading || isViewMode}
                  error={!!errors.mcNumber}
                  helperText={errors.mcNumber?.message}
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="maxDevices"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Max Devices"
                  type="number"
                  required
    disabled={loading || isViewMode}
                  error={!!errors.maxDevices}
                  helperText={errors.maxDevices?.message}
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Website"
    disabled={loading || isViewMode}
                  error={!!errors.website}
                  helperText={errors.website?.message}
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="tollFree"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Toll Free"
                  required
    disabled={loading || isViewMode}
                  error={!!errors.tollFree}
                  helperText={errors.tollFree?.message}
                  fullWidth
                  size="small"
                  placeholder="(XXX) XXX-XXXX"
                  onChange={createFormatChangeHandler(field, formatPhoneNumber)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="fax"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Fax"
                  required
    disabled={loading || isViewMode}
                  error={!!errors.fax}
                  helperText={errors.fax?.message}
                  fullWidth
                  size="small"
                  placeholder="(XXX) XXX-XXXX"
                  onChange={createFormatChangeHandler(field, formatPhoneNumber)}
                />
              )}
            />
          </Grid>

          {mode !== "add" && (
            <Grid item xs={12} sm={6}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small" error={!!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      {...field}
                      label="Status"
                      disabled={loading || isViewMode}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <PrimarySectionHeader>
              PRIMARY DETAILS
            </PrimarySectionHeader>

            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="primaryContactName"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Primary Contact Name"
                  required
    disabled={loading || isViewMode}
                  error={!!errors.primaryContactName}
                  helperText={errors.primaryContactName?.message}
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="primaryContactNumber"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Primary Contact Number"
                  required
    disabled={loading || isViewMode}
                  error={!!errors.primaryContactNumber}
                  helperText={errors.primaryContactNumber?.message}
                  fullWidth
                  size="small"
                  placeholder="(XXX) XXX-XXXX"
                  onChange={createFormatChangeHandler(field, formatPhoneNumber)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="primaryContactEmail"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Primary Contact Email"
                  required
    disabled={loading || isViewMode}
                  error={!!errors.primaryContactEmail}
                  helperText={errors.primaryContactEmail?.message}
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <SecondarySectionHeader>
              SECONDARY DETAILS
            </SecondarySectionHeader>

            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="secondaryContactName"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Secondary Contact Name"
    disabled={loading || isViewMode}
                  required
                  error={!!errors.secondaryContactName}
                  helperText={errors.secondaryContactName?.message}
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="secondaryContactNumber"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Secondary Contact Number"
    disabled={loading || isViewMode}
                  required
                  error={!!errors.secondaryContactNumber}
                  helperText={errors.secondaryContactNumber?.message}
                  fullWidth
                  size="small"
                  placeholder="(XXX) XXX-XXXX"
                  onChange={createFormatChangeHandler(field, formatPhoneNumber)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="secondaryContactEmail"
              control={control}
              render={({ field }) => (
                <CommonTextField
                  {...field}
                  label="Secondary Contact Email"
    disabled={loading || isViewMode}
                  required
                  error={!!errors.secondaryContactEmail}
                  helperText={errors.secondaryContactEmail?.message}
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogFormContainer>
    </form>
  );

  return (
    <CommonDialogForm
      open={open}
      title={isViewMode ? "View Account" : isEditMode ? "Edit Account" : "Add New Account"}
      content={formContent}
      formId={ADD_ACCOUNT_FORM_ID}
      onCancel={handleCancel}
      loading={loading}
      submitButtonText={isViewMode ? "" : "Save"}
      maxWidth="md"
      headerActions={
        isViewMode && onEditClick ? (
          <EditButton
            variant="contained"
            onClick={onEditClick}
            disabled={loading}
          >
            Edit
          </EditButton>
        ) : isEditMode && onCancelEdit ? (
          <CancelEditButton
            variant="outlined"
            onClick={onCancelEdit}
            disabled={loading}
          >
            Cancel Edit
          </CancelEditButton>
        ) : null
      }
    />
  );
};

export default AddAccountDialog;
