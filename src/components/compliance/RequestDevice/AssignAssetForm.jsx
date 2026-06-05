import { Controller, useForm } from "react-hook-form";
import { useEffect, useCallback, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonTextField from "../../../common/CommonTextField";
import CommonAutocompleteDropdown from "../../../common/CommonAutocompleteDropdown";
import { FormContainer } from "./RequestDeviceForm.styled";
import { useServices } from "../../../services/services";
import { AvailableCountText, StockMessageText } from "./RequestDevice.styled";
import { REQUEST_DEVICE_ENDPOINTS } from "./ApiEndpoints";
import { fetchDeviceModels } from "../../../store/deviceModelsSlice";
import { Typography } from "@mui/material";

const assignAssetSchema = yup.object().shape({
  modelName: yup.string().required("Model name is required"),
  numberOfDevices: yup
    .number()
    .typeError("Number of devices must be a number")
    .required("Number of devices is required")
    .min(1, "At least 1 device must be assigned"),
});

const AssignAssetForm = ({
  formData,
  onSubmit,
  setSubmitRef,
  onStockStatusChange,
}) => {
  const dispatch = useDispatch();
  const [availableCount, setAvailableCount] = useState(null);
  const [stockMessage, setStockMessage] = useState("");
  const [deviceIds, setDeviceIds] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const checkTimer = useRef(null);
  const { fetchApi } = useServices();
  const [isCheckingStock, setIsCheckingStock] = useState(false);
  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(assignAssetSchema),
    defaultValues: {
      modelName: "",
      numberOfDevices: "",
    },
  });

  const fetchDeviceModels = async () => {
    try {
      const response = await fetchApi("/masteradmin/get-device-model-dropdown");
      if (response?.statusCode === 200) {
        const formattedOptions = (response?.body?.data || []).map((item) => ({
          label: item.model_name,
          value: item.device_model_id,
        }));

        setModelOptions(formattedOptions);
      }
    } catch (error) {
      console.error("Failed to fetch model dropdown", error);
    }
  };
  useEffect(() => {
    fetchDeviceModels();
  }, []);

  const watchedNumber = watch("numberOfDevices");

  useEffect(() => {
    if (checkTimer.current) {
      clearTimeout(checkTimer.current);
    }

    const count = Number(watchedNumber);
    if (!count || count <= 0) {
      setAvailableCount(null);
      setStockMessage("");
      setDeviceIds([]);

      if (typeof onStockStatusChange === "function") {
        onStockStatusChange(false);
      }

      return;
    }

    checkTimer.current = setTimeout(async () => {
      setIsCheckingStock(true);
      try {
        const endUrl = `${REQUEST_DEVICE_ENDPOINTS.CHECK_DEVICE_STOCK}?requested_devices_count=${count}`;
        const resp = await fetchApi(endUrl);
        const { body = {} } = resp || {};
        const { available_count, message = "", device_id } = body;

        setAvailableCount(available_count ?? null);
        setStockMessage(message);
        setDeviceIds(Array.isArray(device_id) ? device_id : []);

        const ids = Array.isArray(device_id) ? device_id : [];
        const sufficient =
          typeof available_count === "number"
            ? available_count >= count
            : ids.length >= count;

        onStockStatusChange?.(sufficient);
      } catch (err) {
        console.error("Check device stock error:", err);
        setAvailableCount(null);
        setStockMessage("");
        setDeviceIds([]);
        onStockStatusChange?.(false);
      } finally {
        setIsCheckingStock(false);
      }
    }, 500);

    return () => {
      if (checkTimer.current) {
        clearTimeout(checkTimer.current);
      }
    };
  }, [watchedNumber]);

  const handleFormSubmit = useCallback(
    (data) => {
      onSubmit({
        ...data,
        deviceIds,
      });
    },
    [onSubmit, deviceIds],
  );

  useEffect(() => {
    reset({
      modelName: formData?.modelName || "",
      numberOfDevices: formData?.numberOfDevices || "",
    });
  }, [formData?.modelName, formData?.numberOfDevices, reset]);

  useEffect(() => {
    if (setSubmitRef) {
      setSubmitRef.current = handleSubmit(handleFormSubmit);
    }
  }, [handleSubmit, handleFormSubmit, setSubmitRef]);

  const renderStockStatus = useCallback(() => {
    if (isCheckingStock) {
      return <Typography variant="body2">Checking stock...</Typography>;
    }

    if (stockMessage) {
      const isAvailable = stockMessage.toLowerCase().includes("in stock");
      const color = isAvailable ? "success.main" : "error.main";
      return (
        <StockMessageText
          sx={{
            color: color,
            fontWeight: 600,
          }}
        >
          {stockMessage}
        </StockMessageText>
      );
    }

    if (availableCount !== null) {
      return (
        <AvailableCountText>Available: {availableCount}</AvailableCountText>
      );
    }

    return null;
  }, [isCheckingStock, stockMessage, availableCount]);

  const renderModelNameField = useCallback(
    ({ field, fieldState: { error } }) => (
      <CommonAutocompleteDropdown
        label="Model Name"
        value={field.value}
        options={modelOptions}
        onChange={field.onChange}
        error={!!error}
        helperText={error?.message}
        required
      />
    ),
    [modelOptions],
  );

  const renderNumberOfDevicesField = useCallback(
    ({ field, fieldState: { error } }) => (
      <>
        <CommonTextField
          value={field.value}
          onChange={field.onChange}
          label="No of devices"
          type="number"
          error={!!error}
          helperText={error?.message}
          required
        />
        {renderStockStatus()}
      </>
    ),
    [renderStockStatus],
  );

  return (
    <FormContainer
      component="form"
      id="assign-asset-form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Controller
        name="modelName"
        control={control}
        render={renderModelNameField}
      />
      <Controller
        name="numberOfDevices"
        control={control}
        render={renderNumberOfDevicesField}
      />
    </FormContainer>
  );
};

export default AssignAssetForm;
