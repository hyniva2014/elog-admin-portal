import { Controller, useForm } from "react-hook-form";
import { useEffect, useCallback } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonTextField from "../../../common/CommonTextField";
import { FormContainer } from "./RequestDeviceForm.styled";
import { getCompaniesDropdown } from "../UserManagement/userManagementService";
import { useState } from "react";
import { REQUEST_DEVICE_ENDPOINTS } from "./ApiEndpoints";
import { useServices } from "../../../services/services";
import CommonAutocompleteDropdown from "../../../common/CommonAutocompleteDropdown";

const requestDeviceSchema = yup.object().shape({
  companyId: yup.string().required("Carrier Name is required"),
  numberOfDevices: yup
    .number()
    .typeError("Number of devices must be a number")
    .required("Number of devices is required")
    .min(1, "At least 1 device must be requested"),
  description: yup.string().required("Description is required"),
});

const RequestDeviceForm = ({
  formData,
  onSubmit,
  setSubmitRef,
  companyOptions,
}) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(requestDeviceSchema),
    defaultValues: {
      companyId: "",
      numberOfDevices: "",
      description: "",
    },
  });

  const renderCompanyField = useCallback(
    ({ field, fieldState: { error } }) => (
      <CommonAutocompleteDropdown
        select
        value={field.value}
        onChange={field.onChange}
        label="Carrier Name"
        options={companyOptions}
        error={!!error}
        helperText={error?.message}
        required
      />
    ),
    [companyOptions],
  );

  const renderNumberOfDevicesField = useCallback(
    ({ field, fieldState: { error } }) => (
      <CommonTextField
        value={field.value}
        onChange={field.onChange}
        label="Add Number of devices"
        type="number"
        error={!!error}
        helperText={error?.message}
        required
      />
    ),
    [],
  );

  const renderDescriptionField = useCallback(
    ({ field, fieldState: { error } }) => (
      <CommonTextField
        value={field.value}
        onChange={field.onChange}
        label="Description"
        multiline
        rows={3}
        error={!!error}
        helperText={error?.message}
        required
      />
    ),
    [],
  );

  const handleFormSubmit = useCallback(
    (data) => {
      onSubmit(data);
    },
    [onSubmit],
  );

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      reset(formData);
    } else {
      reset({
        companyId: "",
        numberOfDevices: "",
        description: "",
      });
    }
  }, [formData, reset]);

  useEffect(() => {
    if (setSubmitRef) {
      setSubmitRef.current = handleSubmit(handleFormSubmit);
    }
  }, [handleSubmit, handleFormSubmit, setSubmitRef]);

  return (
    <FormContainer
      component="form"
      id="request-device-form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Controller
        name="companyId"
        control={control}
        render={renderCompanyField}
      />
      <Controller
        name="numberOfDevices"
        control={control}
        render={renderNumberOfDevicesField}
      />
      <Controller
        name="description"
        control={control}
        render={renderDescriptionField}
      />
    </FormContainer>
  );
};

export default RequestDeviceForm;
