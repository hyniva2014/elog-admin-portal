export const DEVICE_MODEL_ASSET_OPTIONS = [
  { value: "Truck", label: "Truck" },
  { value: "Trailer", label: "Trailer" },
];

export const DEVICE_MODEL_ELOG_OPTIONS = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

export const DEVICE_MODEL_STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export const ASSET_TYPE_MAP = {
  1: "Truck",
  2: "Trailer",
};

export const ASSET_TYPE_REVERSE_MAP = {
  Truck: 1,
  Trailer: 2,
};

export const ELOGS_MAP = {
  1: "Yes",
  0: "No",
};

export const ELOGS_REVERSE_MAP = {
  Yes: 1,
  No: 0,
};

export const STATUS_MAP = {
  1: "Active",
  2: "Inactive",
};

export const STATUS_REVERSE_MAP = {
  Active: 1,
  Inactive: 2,
};

const DATE_FORMAT_OPTIONS = { month: "short", day: "2-digit", year: "numeric" };

const formatApiDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", DATE_FORMAT_OPTIONS).replace(/,/g, "");

export const mapApiDataToComponent = (apiData) =>
  apiData.map((item) => ({
    id: item.device_model_id,
    device_model_id: item.device_model_id,
    device_code: item.device_code,
    model: item.model_name,
    modelName: item.model_name,
    assetType: ASSET_TYPE_MAP[item.asset_type] || item.asset_type,
    description: item.description,
    eLogs: ELOGS_MAP[item.supports_elogs] ?? (item.supports_elogs ? "Yes" : "No"),
    status: STATUS_MAP[item.status] || item.status,
    createdOn: formatApiDate(item.created_at),
    updatedOn: formatApiDate(item.updated_at),
    created_by: item.created_by,
    updated_by: item.updated_by,
  }));

export const mapComponentDataToApi = (componentData, userId) => {
  const words = componentData.modelName.split(/\s+/);
  const deviceCode =
    words.map((word) => word[0]).join("").toUpperCase() +
    (words[words.length - 1].match(/\d+/) || "");

  return {
    device_code: deviceCode,
    model_name: componentData.modelName,
    asset_type: ASSET_TYPE_REVERSE_MAP[componentData.assetType],
    description: componentData.description,
    supports_elogs: ELOGS_REVERSE_MAP[componentData.eLogs],
    status: 2,
    created_by: userId,
    updated_by: userId,
  };
};

export const buildUpdatePayload = (selectedDeviceModel, deviceModel, userId) => ({
  device_model_id: selectedDeviceModel.device_model_id,
  device_code: selectedDeviceModel.device_code,
  model_name: deviceModel.modelName,
  asset_type: ASSET_TYPE_REVERSE_MAP[deviceModel.assetType],
  description: deviceModel.description,
  supports_elogs: ELOGS_REVERSE_MAP[deviceModel.eLogs],
  status: STATUS_REVERSE_MAP[deviceModel.status] || 2,
  updated_by: userId,
});
