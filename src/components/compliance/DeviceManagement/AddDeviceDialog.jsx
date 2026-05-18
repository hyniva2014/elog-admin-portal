import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CommonDialogForm from "../../../common/CommonDialogForm";
import AddDeviceForm from "./AddDeviceForm";
import { ADD_DEVICE_FORM_ID } from "./Constants";

// ─── Validation Schema ────────────────────────────────────────────────────────

const validationSchema = yup.object({
  carrierId: yup.string().required("Carrier ID is required"),
  serialNumber: yup.string().required("Serial Number is required"),
  carrierName: yup.string().nullable(),
  deviceModel: yup.string().nullable(),
  firmwareVersion: yup.string().nullable(),
  currentStatus: yup.string().nullable(),
  status: yup.string().required("Status is required"),
  truckNumber: yup.string().required("Truck No is required"),
  vinNo: yup.string().nullable(),
  plateNumber: yup.string().nullable(),
  make: yup.string().nullable(),
  model: yup.string().nullable(),
  year: yup
    .string()
    .matches(/^\d{4}$/, "Year must be 4 digits")
    .nullable(),
  gvwr: yup.string().nullable(),
  registrationState: yup.string().nullable(),
});

// ─── Default Values ───────────────────────────────────────────────────────────

const defaultValues = {
  carrierId: "",
  serialNumber: "",
  carrierName: "",
  deviceModel: "",
  firmwareVersion: "",
  currentStatus: "",
  status: "",
  truckNumber: "",
  vinNo: "",
  plateNumber: "",
  make: "",
  model: "",
  year: "",
  gvwr: "",
  registrationState: "",
};

// ─── Component ────────────────────────────────────────────────────────────────

const AddDeviceDialog = ({ open, onClose, onSubmit, loading = false }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
    }
  }, [open, reset]);

  // ── Named handlers (V2 fix: no curried factory, individual useCallback per field) ──

  const handleCancel = useCallback(() => {
    reset(defaultValues);
    onClose();
  }, [reset, onClose]);

  const submitHandler = useCallback(
    (formData) => {
      onSubmit(formData);
      reset(defaultValues);
    },
    [onSubmit, reset]
  );

  const handleCarrierIdChange = useCallback(
    (value) => setValue("carrierId", value, { shouldValidate: true }),
    [setValue]
  );

  const handleDeviceModelChange = useCallback(
    (value) => setValue("deviceModel", value, { shouldValidate: true }),
    [setValue]
  );

  const handleStatusChange = useCallback(
    (value) => setValue("status", value, { shouldValidate: true }),
    [setValue]
  );

  const handleTruckNumberChange = useCallback(
    (value) => setValue("truckNumber", value, { shouldValidate: true }),
    [setValue]
  );

  const handleMakeChange = useCallback(
    (value) => setValue("make", value, { shouldValidate: true }),
    [setValue]
  );

  const handleGvwrChange = useCallback(
    (value) => setValue("gvwr", value, { shouldValidate: true }),
    [setValue]
  );

  const handleRegistrationStateChange = useCallback(
    (value) => setValue("registrationState", value, { shouldValidate: true }),
    [setValue]
  );

  return (
    <CommonDialogForm
      open={open}
      title="Assign Device to Carrier"
      content={
        <AddDeviceForm
          control={control}
          errors={errors}
          loading={loading}
          onSubmit={handleSubmit(submitHandler)}
          onCarrierIdChange={handleCarrierIdChange}
          onDeviceModelChange={handleDeviceModelChange}
          onStatusChange={handleStatusChange}
          onTruckNumberChange={handleTruckNumberChange}
          onMakeChange={handleMakeChange}
          onGvwrChange={handleGvwrChange}
          onRegistrationStateChange={handleRegistrationStateChange}
        />
      }
      formId={ADD_DEVICE_FORM_ID}
      onCancel={handleCancel}
      loading={loading}
      submitButtonText="Save"
      maxWidth="md"
    />
  );
};

export default AddDeviceDialog;
