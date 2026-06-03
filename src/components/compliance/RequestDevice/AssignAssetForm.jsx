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

const assignAssetSchema = yup.object().shape({
  modelName: yup.string().required("Model name is required"),
  numberOfDevices: yup
    .number()
    .typeError("Number of devices must be a number")
    .required("Number of devices is required")
    .min(1, "At least 1 device must be assigned"),
});

const AssignAssetForm = ({ formData, onSubmit, setSubmitRef, onStockStatusChange, }) => {
  const dispatch = useDispatch();
  // const { models: modelOptions, isLoading: modelsLoading } = useSelector(
  //   (state) => state.deviceModelsSlice
  // );
  
  const [availableCount, setAvailableCount] = useState(null);
  const [stockMessage, setStockMessage] = useState("");
  const [deviceIds, setDeviceIds] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const checkTimer = useRef(null);
  const { fetchApi } = useServices();
  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(assignAssetSchema),
    defaultValues: {
      modelName: "",
      numberOfDevices: "",
    },
  });

  // Fetch device models from Redux on mount
  // useEffect(() => {
  //   // Only fetch if not already loaded or if stale (older than 5 minutes)
  //   const state = dispatch(fetchDeviceModels());
  //   return () => {
  //     // Optional: cleanup if needed
  //   };
  // }, [dispatch]);
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
        onStockStatusChange(true);
      }
      return;
    }

    checkTimer.current = setTimeout(async () => {
      try {
        const endUrl = `${REQUEST_DEVICE_ENDPOINTS.CHECK_DEVICE_STOCK}?requested_devices_count=${count}`;
        const resp = await fetchApi(endUrl);
        const { body = {} } = resp || {};
        const { available_count, message = "", device_id } = body;
        
        setAvailableCount(available_count ?? null);
        setStockMessage(message);
        setDeviceIds(Array.isArray(device_id) ? device_id : []);
        
        // Determine if stock is sufficient. Prefer available_count when provided,
        // otherwise infer from returned device_id array length.
        const ids = Array.isArray(device_id) ? device_id : [];
        const sufficient = typeof available_count === "number" ? available_count >= count : ids.length >= count;
        
        if (typeof onStockStatusChange === "function") {
          onStockStatusChange(sufficient);
        }
      } catch (err) {
        console.error("Check device stock error:", err);
        setAvailableCount(null);
        setStockMessage("");
        setDeviceIds([]);
        if (typeof onStockStatusChange === "function") {
          onStockStatusChange(true);
        }
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
    [onSubmit, deviceIds]
  );

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      const { modelName = "", numberOfDevices = "" } = formData;
      reset({
        modelName,
        numberOfDevices,
      });
    } else {
      reset({
        modelName: "",
        numberOfDevices: "",
      });
    }
  }, [formData, reset]);

  useEffect(() => {
    if (setSubmitRef) {
      setSubmitRef.current = handleSubmit(handleFormSubmit);
    }
  }, [handleSubmit, handleFormSubmit, setSubmitRef]);

  const renderStockStatus = useCallback(() => {
    if (stockMessage) {
      return <StockMessageText>{stockMessage}</StockMessageText>;
    }
    
    if (availableCount !== null) {
      return <AvailableCountText>Available: {availableCount}</AvailableCountText>;
    }
    
    return null;
  }, [stockMessage, availableCount]);

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
    [modelOptions]
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
    [renderStockStatus]
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
