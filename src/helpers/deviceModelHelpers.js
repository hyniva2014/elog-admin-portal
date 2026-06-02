import dayjs from "dayjs";

export const generateDeviceCode = (name) => {
  if (!name || typeof name !== "string") {
    return `DM${Date.now().toString().slice(-3)}`;
  }

  const words = name.split(/\s+/);
  const initials = words.map((word) => word[0]?.toUpperCase()).join("");

  // Extract number from last word if present
  const lastWord = words[words.length - 1];
  const number = lastWord?.match(/\d+/)?.[0] || "";

  return initials + number || `DM${Date.now().toString().slice(-3)}`;
};

export default generateDeviceCode;

export const getAssetTypeLabel = (value) => {
  switch (value) {
    case 1:
    case "1":
      return "Truck";
    case 2:
    case "2":
      return "Trailer";
    default:
      return "-";
  }
};

export const getStatusLabel = (value) => {
  switch (value) {
    case 1:
    case "1":
      return "Active";
    case 0:
    case "0":
      return "Inactive";
    default:
      return "-";
  }
};

export const transformDeviceModelData = (apiData) =>
  apiData.map((item) => ({
    id: item.device_model_id,
    modelCode: item.device_code || "-",
    deviceModelId: item.device_model_id,
    deviceCode: item.device_code || "",
    model: item.model_name || "-",
    assetType: getAssetTypeLabel(item.asset_type),
    assetTypeValue: item.asset_type,
    description: item.description || "-",
    supportsElogs:
      item.supports_elogs === 1 || item.supports_elogs === "1" ? 1 : 0,
    createdDate: item.created_at
      ? dayjs(item.created_at).format("MMM DD, YYYY")
      : "-",
    createdTime: item.created_at
      ? dayjs(item.created_at).format("hh:mm A")
      : "-",
    updatedDate: item.updated_at
      ? dayjs(item.updated_at).format("MMM DD, YYYY")
      : "-",
    updatedTime: item.updated_at
      ? dayjs(item.updated_at).format("hh:mm A")
      : "-",
    status: item.status ?? 1,
    statusLabel: getStatusLabel(item.status),
  }));
