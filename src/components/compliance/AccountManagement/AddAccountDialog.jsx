import React, { useCallback, useEffect, useMemo } from "react";
import CarrierNameAutocomplete from "./CarrierNameAutocomplete";
import { Divider, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CommonDialogForm from "../../../common/CommonDialogForm";
import {
  DialogFormContainer,
  PrimarySectionHeader,
  SecondarySectionHeader,
  CancelEditButton,
} from "./AccountManagement.styled";

import {
  STATUS_OPTIONS,
  ACCOUNT_FORM_FIELDS,
  ACCOUNT_FORM_FIELDS_WITHOUT_CARRIER,
  CARRIER_FIELD_MAP,
  PRIMARY_CONTACT_FIELDS,
  SECONDARY_CONTACT_FIELDS,
  DEACTIVATION_FIELDS,
} from "./Constants";
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
    .nullable()
    .test(
      "taxId",
      "Tax ID (EIN) must be in format XX-XXXXXXX",
      (value) => !value || /^\d{2}-\d{7}$/.test(value),
    ),

  mcNumber: yup
    .string()
    .nullable()
    .test(
      "mcNumber",
      "MC Number must be 6-8 digits",
      (value) => !value || /^(?:MC)?\d{6,8}$/i.test(value),
    ),

  maxDevices: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .positive("Max Devices must be greater than 0")
    .integer("Max Devices must be a whole number"),

  tollFree: yup
    .string()
    .test(
      "phone",
      "Please enter a valid phone number",
      (value) =>
        !value ||
        /^(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/.test(
          value,
        ),
    ),

  carrierAddress: yup
    .string()
    .test(
      "address",
      "Address must be at least 5 characters",
      (value) => !value || value.length >= 5,
    ),

  primaryContactName: yup
    .string()
    .test(
      "name",
      "Name must be at least 2 characters",
      (value) => !value || value.length >= 2,
    ),

  primaryContactNumber: yup
    .string()
    .test(
      "phone",
      "Please enter a valid phone number",
      (value) =>
        !value ||
        /^(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/.test(
          value,
        ),
    ),

  primaryContactEmail: yup
    .string()
    .email("Please enter a valid email address")
    .nullable(),

  secondaryContactName: yup
    .string()
    .test(
      "name",
      "Name must be at least 2 characters",
      (value) => !value || value.length >= 2,
    ),

  secondaryContactNumber: yup
    .string()
    .test(
      "phone",
      "Please enter a valid phone number",
      (value) =>
        !value ||
        /^(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/.test(
          value,
        ),
    ),

  secondaryContactEmail: yup
    .string()
    .email("Please enter a valid email address")
    .nullable(),

  status: yup.string().oneOf(["1", "2"]),
  reasonForDeactivation: yup.string().when("status", {
  is: "2",
  then: (schema) =>
    schema.required("Reason for Deactivation is required"),
  otherwise: (schema) => schema.notRequired(),
  }),
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
  reasonForDeactivation: "",
  status: "1",
};

const DIALOG_TITLES = {
  view: "View Account",
  edit: "Edit Account",
  add: "Add New Account",
};

const AddAccountDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  mode = "add",
  initialData = null,
  onCancelEdit,
  fetchCarrierOptions,
}) => {
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const isFieldDisabled = loading || isViewMode;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
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

  const selectedStatus = watch("status");

  const shouldShowStatusField = isEditMode;
  const dialogTitle = DIALOG_TITLES[mode] ?? DIALOG_TITLES.add;

  const handleCarrierSelect = useCallback(
    (carrier) => {
      Object.entries(CARRIER_FIELD_MAP).forEach(([apiKey, formKey]) => {
        const value = carrier[apiKey];
        if (value !== undefined && value !== null) {
          setValue(formKey, String(value), { shouldValidate: true, shouldDirty: true });
        }
      });
    },
    [setValue],
  );

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
    [onSubmit, initialData, reset],
  );

  const headerActions = useMemo(() => {
    if (isEditMode && onCancelEdit) {
      return (
        <CancelEditButton
          variant="outlined"
          onClick={onCancelEdit}
          disabled={loading}
        >
          Cancel Edit
        </CancelEditButton>
      );
    }
    return null;
  }, [isEditMode, onCancelEdit, loading]);

  const formContent = (
    <form id={ADD_ACCOUNT_FORM_ID} onSubmit={handleSubmit(submitHandler)}>
      <DialogFormContainer>
        <Grid container spacing={2}>
          <CarrierNameAutocomplete
            formProps={{ control, errors }}
            carrierProps={{
              fetchCarrierOptions,
              onCarrierSelect: handleCarrierSelect,
            }}
            disabled={isFieldDisabled}
          />

          <FormFieldsSection
            fields={ACCOUNT_FORM_FIELDS_WITHOUT_CARRIER}
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

          {selectedStatus === "2" && (
            <>
              <Grid item xs={12}>
                <SecondarySectionHeader>
                  Reason for Deactivation
                </SecondarySectionHeader>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <FormFieldsSection
                  fields={DEACTIVATION_FIELDS}
                  control={control}
                  errors={errors}
                  disabled={isFieldDisabled}
                />
              </Grid>
            </>
          )}
        </Grid>
      </DialogFormContainer>
    </form>
  );

  return (
    <CommonDialogForm
      open={open}
      title={dialogTitle}
      content={formContent}
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
