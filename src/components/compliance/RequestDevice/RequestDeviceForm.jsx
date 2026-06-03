import { Controller, useForm } from "react-hook-form";
import { useEffect, useCallback } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonTextField from "../../../common/CommonTextField";
import { FormContainer } from "./RequestDeviceForm.styled";

const requestDeviceSchema = yup.object().shape({
  numberOfDevices: yup
    .number()
    .typeError("Number of devices must be a number")
    .required("Number of devices is required")
    .min(1, "At least 1 device must be requested"),
  description: yup.string().required("Description is required"),
});

const RequestDeviceForm = ({ formData, onSubmit, setSubmitRef }) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(requestDeviceSchema),
    defaultValues: {
      numberOfDevices: "",
      description: "",
    },
  });

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
    []
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
    []
  );

  const handleFormSubmit = useCallback(
    (data) => {
      onSubmit(data);
    },
    [onSubmit]
  );

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      reset(formData);
    } else {
      reset({
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
